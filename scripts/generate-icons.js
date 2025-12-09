/**
 * Script para gerar ícones PWA e iOS a partir de uma imagem fonte
 * Execute: node scripts/generate-icons.js
 */

const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

// Diretórios
const PUBLIC_DIR = path.join(__dirname, '..', 'public');
const ICONS_DIR = path.join(PUBLIC_DIR, 'icons');
const SPLASH_DIR = path.join(PUBLIC_DIR, 'splash');

// Imagem fonte (use seu logo)
const SOURCE_IMAGE = path.join(PUBLIC_DIR, 'logo-header.png');

// Tamanhos de ícones necessários para PWA e iOS
const ICON_SIZES = [
    { size: 16, name: 'favicon-16x16.png' },
    { size: 32, name: 'favicon-32x32.png' },
    { size: 72, name: 'icon-72x72.png' },
    { size: 96, name: 'icon-96x96.png' },
    { size: 120, name: 'icon-120x120.png' },      // iPhone
    { size: 128, name: 'icon-128x128.png' },
    { size: 144, name: 'icon-144x144.png' },
    { size: 152, name: 'icon-152x152.png' },      // iPad
    { size: 167, name: 'icon-167x167.png' },      // iPad Pro
    { size: 180, name: 'apple-touch-icon.png' },  // iPhone Retina
    { size: 192, name: 'icon-192x192.png' },      // Android
    { size: 384, name: 'icon-384x384.png' },
    { size: 512, name: 'icon-512x512.png' },      // PWA
    { size: 1024, name: 'icon-1024x1024.png' },   // App Store
];

// Splash screens para iOS (portrait)
const SPLASH_SCREENS = [
    { width: 640, height: 1136, name: 'splash-640x1136.png' },       // iPhone SE
    { width: 750, height: 1334, name: 'splash-750x1334.png' },       // iPhone 8
    { width: 828, height: 1792, name: 'splash-828x1792.png' },       // iPhone XR
    { width: 1125, height: 2436, name: 'splash-1125x2436.png' },     // iPhone X/XS
    { width: 1170, height: 2532, name: 'splash-1170x2532.png' },     // iPhone 12/13
    { width: 1179, height: 2556, name: 'splash-1179x2556.png' },     // iPhone 14 Pro
    { width: 1242, height: 2208, name: 'splash-1242x2208.png' },     // iPhone 8 Plus
    { width: 1242, height: 2688, name: 'splash-1242x2688.png' },     // iPhone XS Max
    { width: 1284, height: 2778, name: 'splash-1284x2778.png' },     // iPhone 12/13 Pro Max
    { width: 1290, height: 2796, name: 'splash-1290x2796.png' },     // iPhone 14 Pro Max
    { width: 1536, height: 2048, name: 'splash-1536x2048.png' },     // iPad
    { width: 1668, height: 2224, name: 'splash-1668x2224.png' },     // iPad Pro 10.5"
    { width: 1668, height: 2388, name: 'splash-1668x2388.png' },     // iPad Pro 11"
    { width: 2048, height: 2732, name: 'splash-2048x2732.png' },     // iPad Pro 12.9"
];

// Cor de fundo da marca
const BRAND_COLOR = '#0072a2';

async function ensureDir(dir) {
    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
        console.log(`📁 Created directory: ${dir}`);
    }
}

async function generateIcons() {
    await ensureDir(ICONS_DIR);

    console.log('🎨 Generating icons...\n');

    for (const { size, name } of ICON_SIZES) {
        const outputPath = path.join(ICONS_DIR, name);

        try {
            // Criar fundo colorido com o logo centralizado
            const background = await sharp({
                create: {
                    width: size,
                    height: size,
                    channels: 4,
                    background: { r: 0, g: 114, b: 162, alpha: 1 } // #0072a2
                }
            }).png().toBuffer();

            // Redimensionar o logo para caber no ícone (80% do tamanho)
            const logoSize = Math.round(size * 0.7);
            const logo = await sharp(SOURCE_IMAGE)
                .resize(logoSize, logoSize, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
                .toBuffer();

            // Compor o logo sobre o fundo
            const offset = Math.round((size - logoSize) / 2);
            await sharp(background)
                .composite([{
                    input: logo,
                    left: offset,
                    top: offset
                }])
                .png()
                .toFile(outputPath);

            console.log(`  ✅ ${name} (${size}x${size})`);
        } catch (error) {
            console.error(`  ❌ Error generating ${name}:`, error.message);
        }
    }
}

async function generateSplashScreens() {
    await ensureDir(SPLASH_DIR);

    console.log('\n🖼️  Generating splash screens...\n');

    for (const { width, height, name } of SPLASH_SCREENS) {
        const outputPath = path.join(SPLASH_DIR, name);

        try {
            // Criar fundo com gradiente da marca
            const background = await sharp({
                create: {
                    width,
                    height,
                    channels: 4,
                    background: { r: 0, g: 114, b: 162, alpha: 1 } // #0072a2
                }
            }).png().toBuffer();

            // Logo central (30% da largura)
            const logoWidth = Math.round(width * 0.4);
            const logo = await sharp(SOURCE_IMAGE)
                .resize(logoWidth, null, { fit: 'contain' })
                .toBuffer();

            const logoMeta = await sharp(logo).metadata();
            const logoHeight = logoMeta.height;

            // Centralizar logo
            const left = Math.round((width - logoWidth) / 2);
            const top = Math.round((height - logoHeight) / 2);

            await sharp(background)
                .composite([{
                    input: logo,
                    left,
                    top
                }])
                .png()
                .toFile(outputPath);

            console.log(`  ✅ ${name} (${width}x${height})`);
        } catch (error) {
            console.error(`  ❌ Error generating ${name}:`, error.message);
        }
    }
}

async function generateFavicon() {
    console.log('\n🌐 Generating favicon.ico...\n');

    const faviconPath = path.join(PUBLIC_DIR, 'favicon.ico');

    try {
        await sharp(SOURCE_IMAGE)
            .resize(32, 32, { fit: 'contain', background: { r: 0, g: 114, b: 162, alpha: 1 } })
            .toFile(faviconPath);
        console.log('  ✅ favicon.ico');
    } catch (error) {
        console.error('  ❌ Error generating favicon:', error.message);
    }
}

async function generateShortcutIcons() {
    console.log('\n⚡ Generating shortcut icons...\n');

    const shortcuts = [
        { name: 'shortcut-verify.png', emoji: '✓' },
        { name: 'shortcut-schedule.png', emoji: '📅' },
    ];

    for (const { name } of shortcuts) {
        const outputPath = path.join(ICONS_DIR, name);

        try {
            await sharp({
                create: {
                    width: 96,
                    height: 96,
                    channels: 4,
                    background: { r: 0, g: 114, b: 162, alpha: 1 }
                }
            }).png().toFile(outputPath);

            console.log(`  ✅ ${name}`);
        } catch (error) {
            console.error(`  ❌ Error generating ${name}:`, error.message);
        }
    }
}

async function main() {
    console.log('🚀 VacinaCheck Icon Generator\n');
    console.log('='.repeat(50) + '\n');

    if (!fs.existsSync(SOURCE_IMAGE)) {
        console.error(`❌ Source image not found: ${SOURCE_IMAGE}`);
        console.log('\nPlease ensure logo-header.png exists in the public folder.');
        process.exit(1);
    }

    await generateIcons();
    await generateSplashScreens();
    await generateFavicon();
    await generateShortcutIcons();

    console.log('\n' + '='.repeat(50));
    console.log('✨ All assets generated successfully!\n');
    console.log('Next steps:');
    console.log('  1. Run: npm run export');
    console.log('  2. Run: npx cap add ios');
    console.log('  3. Run: npx cap sync ios');
    console.log('  4. Run: npx cap open ios');
    console.log('  5. Configure signing in Xcode');
    console.log('  6. Archive and upload to App Store Connect\n');
}

main().catch(console.error);
