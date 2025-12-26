#!/usr/bin/env python3
"""
Create OG (Open Graph) image for social media sharing
Recommended size: 1200x630 pixels
"""

from PIL import Image, ImageDraw, ImageFont
import os

# Paths
hero_image_path = "/home/ubuntu/tengcle-corporate/client/public/images/hero-global-network.jpg"
logo_path = "/home/ubuntu/upload/Tengcle-logo黒案.png"
output_path = "/home/ubuntu/tengcle-corporate/client/public/images/og-image.jpg"

# OG image dimensions
OG_WIDTH = 1200
OG_HEIGHT = 630

# Load and resize hero image
hero = Image.open(hero_image_path)
hero = hero.convert('RGB')

# Calculate crop area to get 1200x630 from center
hero_width, hero_height = hero.size
target_ratio = OG_WIDTH / OG_HEIGHT
hero_ratio = hero_width / hero_height

if hero_ratio > target_ratio:
    # Hero is wider, crop width
    new_width = int(hero_height * target_ratio)
    left = (hero_width - new_width) // 2
    hero = hero.crop((left, 0, left + new_width, hero_height))
else:
    # Hero is taller, crop height
    new_height = int(hero_width / target_ratio)
    top = (hero_height - new_height) // 2
    hero = hero.crop((0, top, hero_width, top + new_height))

# Resize to OG dimensions
hero = hero.resize((OG_WIDTH, OG_HEIGHT), Image.Resampling.LANCZOS)

# Add a semi-transparent overlay for better text readability
overlay = Image.new('RGBA', (OG_WIDTH, OG_HEIGHT), (255, 255, 255, 180))
hero_rgba = hero.convert('RGBA')
hero_with_overlay = Image.alpha_composite(hero_rgba, overlay)

# Convert back to RGB for saving as JPEG
final_image = hero_with_overlay.convert('RGB')

# Load and add logo
logo = Image.open(logo_path)
logo = logo.convert('RGBA')

# Resize logo to fit nicely (about 400px wide)
logo_width = 400
logo_ratio = logo.width / logo.height
logo_height = int(logo_width / logo_ratio)
logo = logo.resize((logo_width, logo_height), Image.Resampling.LANCZOS)

# Position logo in center
logo_x = (OG_WIDTH - logo_width) // 2
logo_y = (OG_HEIGHT - logo_height) // 2 - 30

# Create a white background for the logo area
logo_bg = Image.new('RGBA', (logo_width + 40, logo_height + 40), (255, 255, 255, 240))
final_rgba = final_image.convert('RGBA')
final_rgba.paste(logo_bg, (logo_x - 20, logo_y - 20), logo_bg)

# Paste logo
final_rgba.paste(logo, (logo_x, logo_y), logo)

# Add tagline text
draw = ImageDraw.Draw(final_rgba)

# Try to use a system font, fallback to default
try:
    font = ImageFont.truetype("/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf", 24)
except:
    font = ImageFont.load_default()

tagline = "Global Business Solutions from Hong Kong"
text_bbox = draw.textbbox((0, 0), tagline, font=font)
text_width = text_bbox[2] - text_bbox[0]
text_x = (OG_WIDTH - text_width) // 2
text_y = logo_y + logo_height + 40

# Draw text with navy color
draw.text((text_x, text_y), tagline, fill=(30, 41, 59), font=font)

# Convert to RGB and save
final_image = final_rgba.convert('RGB')
final_image.save(output_path, 'JPEG', quality=90)

print(f"OG image created: {output_path}")
print(f"Size: {OG_WIDTH}x{OG_HEIGHT}")
