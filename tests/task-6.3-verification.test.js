/**
 * Task 6.3 Verification Test: Validate Total Asset Size
 * 
 * This test validates that the total size of all website assets
 * (HTML, CSS, JS, images) is less than 5MB as per Requirement 8.4.
 * 
 * Requirements: 8.4
 */

const fs = require('fs');
const path = require('path');

describe('Task 6.3: Total Asset Size Validation', () => {
  const MAX_SIZE_MB = 5;
  const MAX_SIZE_BYTES = MAX_SIZE_MB * 1024 * 1024; // 5MB in bytes

  /**
   * Get the size of a file in bytes
   */
  function getFileSize(filePath) {
    try {
      const stats = fs.statSync(filePath);
      return stats.size;
    } catch (error) {
      console.warn(`Warning: Could not read file ${filePath}: ${error.message}`);
      return 0;
    }
  }

  /**
   * Calculate total size of all production assets
   */
  function calculateTotalAssetSize() {
    const assets = {
      html: ['index.html'],
      css: ['css/styles.min.css', 'css/styles.css'],
      js: ['js/script.min.js', 'js/script.js'],
      images: [
        'images/profile.jpg',
        'images/IMG_1384cd_optimized.jpg',
        'images/IMG_1384cd.jpg'
      ],
      config: ['web.config']
    };

    const sizes = {};
    let totalSize = 0;

    // Calculate size for each asset category
    for (const [category, files] of Object.entries(assets)) {
      sizes[category] = 0;
      for (const file of files) {
        const filePath = path.join(process.cwd(), file);
        const size = getFileSize(filePath);
        sizes[category] += size;
        totalSize += size;
      }
    }

    return { totalSize, sizes, assets };
  }

  test('should calculate total asset size correctly', () => {
    const { totalSize, sizes, assets } = calculateTotalAssetSize();

    // Log detailed breakdown
    console.log('\n=== Asset Size Breakdown ===');
    console.log(`HTML files: ${(sizes.html / 1024).toFixed(2)} KB`);
    console.log(`CSS files: ${(sizes.css / 1024).toFixed(2)} KB`);
    console.log(`JavaScript files: ${(sizes.js / 1024).toFixed(2)} KB`);
    console.log(`Image files: ${(sizes.images / 1024).toFixed(2)} KB`);
    console.log(`Config files: ${(sizes.config / 1024).toFixed(2)} KB`);
    console.log(`\nTotal size: ${(totalSize / 1024).toFixed(2)} KB (${(totalSize / 1024 / 1024).toFixed(2)} MB)`);
    console.log(`Maximum allowed: ${MAX_SIZE_MB} MB (${(MAX_SIZE_BYTES / 1024).toFixed(2)} KB)`);
    console.log(`Remaining: ${((MAX_SIZE_BYTES - totalSize) / 1024 / 1024).toFixed(2)} MB`);
    console.log('===========================\n');

    // Verify total size is less than 5MB
    expect(totalSize).toBeLessThan(MAX_SIZE_BYTES);
  });

  test('should have all required production files present', () => {
    const requiredFiles = [
      'index.html',
      'css/styles.min.css',
      'js/script.min.js',
      'images/profile.jpg',
      'web.config'
    ];

    for (const file of requiredFiles) {
      const filePath = path.join(process.cwd(), file);
      expect(fs.existsSync(filePath)).toBe(true);
    }
  });

  test('should have minified files smaller than or equal to original files', () => {
    // CSS comparison
    const cssOriginalSize = getFileSize(path.join(process.cwd(), 'css/styles.css'));
    const cssMinifiedSize = getFileSize(path.join(process.cwd(), 'css/styles.min.css'));
    
    if (cssOriginalSize > 0 && cssMinifiedSize > 0) {
      expect(cssMinifiedSize).toBeLessThanOrEqual(cssOriginalSize);
      console.log(`CSS minification: ${cssOriginalSize} bytes -> ${cssMinifiedSize} bytes (${((1 - cssMinifiedSize / cssOriginalSize) * 100).toFixed(1)}% reduction)`);
    }

    // JS comparison
    const jsOriginalSize = getFileSize(path.join(process.cwd(), 'js/script.js'));
    const jsMinifiedSize = getFileSize(path.join(process.cwd(), 'js/script.min.js'));
    
    if (jsOriginalSize > 0 && jsMinifiedSize > 0) {
      expect(jsMinifiedSize).toBeLessThanOrEqual(jsOriginalSize);
      console.log(`JS minification: ${jsOriginalSize} bytes -> ${jsMinifiedSize} bytes (${((1 - jsMinifiedSize / jsOriginalSize) * 100).toFixed(1)}% reduction)`);
    }
  });

  test('should have optimized profile image within size constraints', () => {
    const profileImagePath = path.join(process.cwd(), 'images/profile.jpg');
    const profileImageSize = getFileSize(profileImagePath);
    
    // Profile image should exist and be reasonably sized (< 500KB for a profile photo)
    expect(profileImageSize).toBeGreaterThan(0);
    expect(profileImageSize).toBeLessThan(500 * 1024); // 500KB max for profile photo
    
    console.log(`Profile image size: ${(profileImageSize / 1024).toFixed(2)} KB`);
  });
});
