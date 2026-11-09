import sharp from 'sharp';
import fs from 'fs';
import path from 'path';

async function generatePWAIcons() {
  const sourceIcon = path.resolve('public/assets/aistudio/file_000000004eec82468ea111a6735b2471_8524203a.png');
  const outputDir = path.resolve('public/icons');

  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  // Deep dark / black background color matching LingoTwice brand theme (#020617)
  const bgBlack = { r: 2, g: 6, b: 23, alpha: 1 };

  console.log('Generating PWA icons on solid black background (#020617)...');

  // 1. Standard 192x192 icon (with slight padding for aesthetic balance)
  const logo192 = await sharp(sourceIcon)
    .resize(164, 164, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .toBuffer();

  await sharp({
    create: {
      width: 192,
      height: 192,
      channels: 4,
      background: bgBlack,
    },
  })
    .composite([{ input: logo192, gravity: 'center' }])
    .png()
    .toFile(path.join(outputDir, 'icon-192x192.png'));
  console.log('  ✓ Generated: public/icons/icon-192x192.png');

  // 2. Standard 512x512 icon
  const logo512 = await sharp(sourceIcon)
    .resize(440, 440, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .toBuffer();

  await sharp({
    create: {
      width: 512,
      height: 512,
      channels: 4,
      background: bgBlack,
    },
  })
    .composite([{ input: logo512, gravity: 'center' }])
    .png()
    .toFile(path.join(outputDir, 'icon-512x512.png'));
  console.log('  ✓ Generated: public/icons/icon-512x512.png');

  // 3. Apple Touch Icon 180x180 (for iOS Safari on iPad / iPhone - strictly NO transparency so iOS never fills with white!)
  const logo180 = await sharp(sourceIcon)
    .resize(150, 150, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .toBuffer();

  await sharp({
    create: {
      width: 180,
      height: 180,
      channels: 4,
      background: bgBlack,
    },
  })
    .composite([{ input: logo180, gravity: 'center' }])
    .png()
    .toFile(path.join(outputDir, 'apple-touch-icon.png'));
  console.log('  ✓ Generated: public/icons/apple-touch-icon.png');

  // Also copy to root public/apple-touch-icon.png as Safari looks there by default
  await sharp({
    create: {
      width: 180,
      height: 180,
      channels: 4,
      background: bgBlack,
    },
  })
    .composite([{ input: logo180, gravity: 'center' }])
    .png()
    .toFile(path.resolve('public/apple-touch-icon.png'));
  console.log('  ✓ Generated: public/apple-touch-icon.png');

  // 4. Android Maskable Icon 512x512 (with 20% safe zone padding on full-bleed solid black background)
  // Android crops maskable icons into circles or squircles. Keeping logo inside 60-70% ensures zero clipping.
  const logoMaskable = await sharp(sourceIcon)
    .resize(340, 340, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .toBuffer();

  await sharp({
    create: {
      width: 512,
      height: 512,
      channels: 4,
      background: bgBlack,
    },
  })
    .composite([{ input: logoMaskable, gravity: 'center' }])
    .png()
    .toFile(path.join(outputDir, 'icon-maskable-512x512.png'));
  console.log('  ✓ Generated: public/icons/icon-maskable-512x512.png');

  console.log('All PWA tablet & mobile icons successfully generated with solid black background!');
}

generatePWAIcons().catch((err) => {
  console.error('Error generating PWA icons:', err);
  process.exit(1);
});
