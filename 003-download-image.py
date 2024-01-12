import requests
from PIL import Image

url = "https://source.unsplash.com/random"
response = requests.get(url)

with open("original.png", "wb") as file:
    file.write(response.content)

# Load the image
image = Image.open("original.png")

# Resize the image 50% smaller
resized_image = image.resize((int(image.width * 0.5), int(image.height * 0.5)))

# Convert the image to greyscale
greyscale_image = resized_image.convert("L")

# Save the greyscale image
greyscale_image.save("greyscale.png")
