#!/usr/bin/env python3
"""
Create favicon from Tengcle logo
Extract the "t7" symbol part and create favicon in multiple sizes
"""

from PIL import Image
import os

# Source logo
logo_path = "/home/ubuntu/upload/Tengcle-logo黒案.png"
output_dir = "/home/ubuntu/tengcle-corporate/client/public"

# Load the logo
logo = Image.open(logo_path)
print(f"Original logo size: {logo.size}")

# The logo has a "t7" symbol on the left side
# We need to crop just that part for the favicon
# Based on the logo structure, the symbol is approximately in the left 25% of the image

width, height = logo.size

# Crop the left portion containing the "t7" symbol
# Adjust these values based on the actual logo proportions
left = 0
top = 0
right = int(width * 0.22)  # The symbol takes about 22% of the width
bottom = height

# Crop the symbol
symbol = logo.crop((left, top, right, bottom))
print(f"Cropped symbol size: {symbol.size}")

# Make it square by adding padding or cropping
symbol_width, symbol_height = symbol.size
max_dim = max(symbol_width, symbol_height)

# Create a new square image with transparent background
square = Image.new('RGBA', (max_dim, max_dim), (255, 255, 255, 0))

# Paste the symbol centered
paste_x = (max_dim - symbol_width) // 2
paste_y = (max_dim - symbol_height) // 2

# Convert symbol to RGBA if needed
if symbol.mode != 'RGBA':
    symbol = symbol.convert('RGBA')

square.paste(symbol, (paste_x, paste_y), symbol)

# Create favicon sizes
favicon_sizes = [16, 32, 48, 64, 128, 180, 192, 512]

# Save as PNG favicons
for size in favicon_sizes:
    resized = square.resize((size, size), Image.Resampling.LANCZOS)
    
    if size == 32:
        # Main favicon
        resized.save(os.path.join(output_dir, "favicon.png"), "PNG")
        print(f"Saved favicon.png ({size}x{size})")
    
    if size == 180:
        # Apple touch icon
        resized.save(os.path.join(output_dir, "apple-touch-icon.png"), "PNG")
        print(f"Saved apple-touch-icon.png ({size}x{size})")
    
    if size == 192:
        # Android icon
        resized.save(os.path.join(output_dir, "android-chrome-192x192.png"), "PNG")
        print(f"Saved android-chrome-192x192.png ({size}x{size})")
    
    if size == 512:
        # Large icon
        resized.save(os.path.join(output_dir, "android-chrome-512x512.png"), "PNG")
        print(f"Saved android-chrome-512x512.png ({size}x{size})")

# Create ICO file with multiple sizes
ico_sizes = [(16, 16), (32, 32), (48, 48)]
ico_images = []
for size in ico_sizes:
    resized = square.resize(size, Image.Resampling.LANCZOS)
    ico_images.append(resized)

# Save as ICO
ico_images[0].save(
    os.path.join(output_dir, "favicon.ico"),
    format='ICO',
    sizes=ico_sizes
)
print("Saved favicon.ico")

print("\nFavicon creation complete!")
