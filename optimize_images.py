"""
Image Optimization Script
Compresses large JPG/PNG images while maintaining high visual quality.
Uses Pillow library with quality settings optimized for web.
"""

import os
from pathlib import Path

try:
    from PIL import Image
except ImportError:
    print("Installing Pillow...")
    import subprocess
    subprocess.run(["pip", "install", "Pillow"], check=True)
    from PIL import Image

IMAGES_DIR = Path(r"c:\Users\onode\Downloads\tengcle-corporate\client\public\images")
MIN_SIZE_KB = 1000  # Only process files larger than 1MB
QUALITY = 85  # High quality setting (85-95 is visually lossless for most images)

def get_file_size_kb(filepath):
    return os.path.getsize(filepath) / 1024

def compress_image(filepath):
    """Compress a single image file."""
    original_size = get_file_size_kb(filepath)
    
    if original_size < MIN_SIZE_KB:
        return None  # Skip small files
    
    try:
        with Image.open(filepath) as img:
            # Convert RGBA to RGB for JPEG
            if img.mode in ('RGBA', 'P'):
                img = img.convert('RGB')
            
            # Save with optimized settings
            img.save(
                filepath,
                quality=QUALITY,
                optimize=True,
                progressive=True
            )
        
        new_size = get_file_size_kb(filepath)
        reduction = ((original_size - new_size) / original_size) * 100
        
        return {
            'file': filepath.name,
            'original_kb': round(original_size),
            'new_kb': round(new_size),
            'reduction': round(reduction, 1)
        }
    except Exception as e:
        print(f"Error processing {filepath}: {e}")
        return None

def main():
    print(f"Scanning {IMAGES_DIR} for large images...")
    
    results = []
    for ext in ['*.jpg', '*.jpeg', '*.png']:
        for filepath in IMAGES_DIR.glob(ext):
            # Skip already optimized WebP source files
            if '-webp' in filepath.stem:
                continue
            
            result = compress_image(filepath)
            if result:
                results.append(result)
                print(f"✓ {result['file']}: {result['original_kb']}KB → {result['new_kb']}KB ({result['reduction']}% reduction)")
    
    if results:
        total_original = sum(r['original_kb'] for r in results)
        total_new = sum(r['new_kb'] for r in results)
        total_saved = total_original - total_new
        print(f"\n=== Summary ===")
        print(f"Files processed: {len(results)}")
        print(f"Total saved: {round(total_saved / 1024, 2)} MB")
    else:
        print("No large images found to optimize.")

if __name__ == "__main__":
    main()
