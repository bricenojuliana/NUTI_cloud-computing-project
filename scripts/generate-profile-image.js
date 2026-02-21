const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

/**
 * Generate an optimized placeholder profile image
 * Requirements:
 * - Dimensions: 300x300px (within 200-400px range)
 * - Format: JPEG with optimization
 * - Compressed for web performance
 */
async function generateProfileImage() {
  const outputPath = path.join(__dirname, '..', 'images', 'profile.jpg');
  
  // Create a simple gradient background with a professional look
  const width = 300;
  const height = 300;
  
  // Create SVG placeholder
  const svg = `
    <svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
      <!-- Professional gradient background -->
      <defs>
        <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style="stop-color:#4A90E2;stop-opacity:1" />
          <stop offset="100%" style="stop-color:#357ABD;stop-opacity:1" />
        </linearGradient>
      </defs>
      <rect width="${width}" height="${height}" fill="url(#grad)"/>
      
      <!-- Profile silhouette -->
      <circle cx="150" cy="110" r="45" fill="#FFFFFF" opacity="0.95"/>
      <ellipse cx="150" cy="220" rx="70" ry="90" fill="#FFFFFF" opacity="0.95"/>
      
      <!-- Decorative circle -->
      <circle cx="150" cy="150" r="130" fill="none" stroke="#FFFFFF" stroke-width="2" opacity="0.3"/>
    </svg>
  `;
  
  try {
    // Generate optimized JPEG from SVG
    await sharp(Buffer.from(svg))
      .resize(width, height)
      .jpeg({
        quality: 85,           // High quality but compressed
        progressive: true,     // Progressive JPEG for better loading
        mozjpeg: true         // Use mozjpeg for better compression
      })
      .toFile(outputPath);
    
    // Get file stats
    const stats = fs.statSync(outputPath);
    const fileSizeKB = (stats.size / 1024).toFixed(2);
    
    console.log('✓ Profile image generated successfully');
    console.log(`  Path: ${outputPath}`);
    console.log(`  Dimensions: ${width}x${height}px`);
    console.log(`  Format: JPEG (optimized)`);
    console.log(`  File size: ${fileSizeKB} KB`);
    console.log(`  Quality: 85% (compressed while maintaining quality)`);
    
    return {
      success: true,
      path: outputPath,
      dimensions: { width, height },
      fileSize: stats.size,
      fileSizeKB
    };
  } catch (error) {
    console.error('✗ Error generating profile image:', error.message);
    throw error;
  }
}

// Run the generator
generateProfileImage()
  .then(result => {
    console.log('\n✓ Profile photo optimization complete');
    process.exit(0);
  })
  .catch(error => {
    console.error('\n✗ Failed to generate profile image');
    process.exit(1);
  });
