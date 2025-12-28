from PIL import Image
import numpy as np

# Load the original logo
img = Image.open('/home/ubuntu/tengcle-corporate/client/public/images/tengcle-logo.png').convert('RGBA')
data = np.array(img)

# Convert dark pixels to white (invert for dark background)
# The logo has dark text on transparent background
# We need to make it white text on transparent background

# Get alpha channel
alpha = data[:, :, 3]

# For pixels that have some opacity (part of the logo), make them white
mask = alpha > 0
data[mask, 0] = 255  # R
data[mask, 1] = 255  # G
data[mask, 2] = 255  # B
# Keep alpha as is

# Save the white logo
result = Image.fromarray(data)
result.save('/home/ubuntu/tengcle-corporate/client/public/images/tengcle-logo-white.png')
print("White logo created successfully")
