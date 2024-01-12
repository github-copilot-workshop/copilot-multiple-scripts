# Implementing a new idea in minutes

You have been asked to write a tool to download an image from the web https://source.unsplash.com/random resize it (for example 50% smaller), and convert it to grayscale. 


You can choose any language you want, maybe you can start with Python and use the PIL library.

## 001 - Using Python and PIL

Using Copilot Inline Chat provide a prompt to generate the python code to download the image, resize it and convert it to grayscale.

<details>
<summary>Possible Flow</summary>

1. Create a new Python file `003-download-image.py`
2. Use Copilot Inlie Chat (`ctrl+i`) 
3. Ask eht following question: `Download the image from https://source.unsplash.com/random save it locally as original.png then resize the image 50% smaller and using PIL make a greyscale copy`

The result could be something like this:

```python
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

```

</details>


## 002 - Using JavaScript

Let's now rewrite the same code using TypeScript.
You have here different approaches, asking the same question but in a JavaScript context, or ask for a conversion from Python to JavaScript.

<details>
<summary>Possible Flow</summary>

1. Open the file `003-download-image.py` and copy the content
2. Ask for example `Convert selected code to Javascript and let me know which library to import`

The possible result could be something like this:

```javascript
const axios = require('axios');
const fs = require('fs').promises;
const sharp = require('sharp');

async function downloadAndProcessImage() {
  const url = 'https://source.unsplash.com/random';
  const response = await axios.get(url, { responseType: 'arraybuffer' });
  const originalImage = Buffer.from(response.data, 'binary');

  await fs.writeFile('original.png', originalImage);

  const image = sharp(originalImage);
  const metadata = await image.metadata();

  const resizedImage = await image
    .resize({ width: Math.round(metadata.width * 0.5) })
    .toBuffer();

  await sharp(resizedImage)
    .greyscale()
    .toFile('greyscale.png');
}

downloadAndProcessImage().catch(console.error);
```
and it also ask you to install the dependencies:

```bash
npm install axios sharp
```


Remember if you have error you can use GitHub Copilot Chat in the terminal to ask for help/explanation.


</details>