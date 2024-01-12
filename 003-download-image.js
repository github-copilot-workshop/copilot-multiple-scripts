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