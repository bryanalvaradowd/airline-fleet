const QRCode = require('qrcode');

async function generateQR() {
  const url = 'https://bryanalvaradowd.github.io/airline-fleet/';
  const outputPath = './public/assets/qr-code.png';

  try {
    await QRCode.toFile(outputPath, url, {
      width: 300,
      margin: 2,
      color: {
        dark: '#000000',
        light: '#ffffff'
      }
    });
    console.log(`QR code generated at ${outputPath}`);
  } catch (err) {
    console.error('Error generating QR:', err);
  }
}

generateQR();