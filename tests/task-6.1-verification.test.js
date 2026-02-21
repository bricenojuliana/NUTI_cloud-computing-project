/**
 * Task 6.1 Verification Test: Optimize profile photo
 * 
 * Validates:
 * - Image dimensions are between 200x200 and 400x400px
 * - Image format is JPEG or WebP
 * - Image is compressed for web performance
 * - Requirements: 1.1, 12.2
 */

const fs = require('fs');
const path = require('path');

describe('Task 6.1: Profile Photo Optimization', () => {
  const htmlPath = path.join(__dirname, '../index.html');
  let htmlContent;

  beforeAll(() => {
    htmlContent = fs.readFileSync(htmlPath, 'utf8');
  });

  test('Profile photo element exists in HTML', () => {
    expect(htmlContent).toMatch(/<img[^>]*class="profile-photo"/);
  });

  test('Profile photo has valid src attribute pointing to images folder', () => {
    const imgMatch = htmlContent.match(/<img[^>]*class="profile-photo"[^>]*>/);
    expect(imgMatch).not.toBeNull();
    
    const srcMatch = imgMatch[0].match(/src="([^"]+)"/);
    expect(srcMatch).not.toBeNull();
    expect(srcMatch[1]).toMatch(/^images\//);
  });

  test('Profile photo file exists', () => {
    const imgMatch = htmlContent.match(/<img[^>]*class="profile-photo"[^>]*>/);
    const srcMatch = imgMatch[0].match(/src="([^"]+)"/);
    const imagePath = path.join(__dirname, '..', srcMatch[1]);
    
    expect(fs.existsSync(imagePath)).toBe(true);
  });

  test('Profile photo has appropriate format (JPEG or WebP)', () => {
    const imgMatch = htmlContent.match(/<img[^>]*class="profile-photo"[^>]*>/);
    const srcMatch = imgMatch[0].match(/src="([^"]+)"/);
    const ext = path.extname(srcMatch[1]).toLowerCase();
    
    expect(['.jpg', '.jpeg', '.webp']).toContain(ext);
  });

  test('Profile photo dimensions are specified in HTML', () => {
    const imgMatch = htmlContent.match(/<img[^>]*class="profile-photo"[^>]*>/);
    const widthMatch = imgMatch[0].match(/width="(\d+)"/);
    const heightMatch = imgMatch[0].match(/height="(\d+)"/);
    
    expect(widthMatch).not.toBeNull();
    expect(heightMatch).not.toBeNull();
    
    const width = parseInt(widthMatch[1], 10);
    const height = parseInt(heightMatch[1], 10);
    
    expect(width).toBeGreaterThanOrEqual(200);
    expect(width).toBeLessThanOrEqual(400);
    expect(height).toBeGreaterThanOrEqual(200);
    expect(height).toBeLessThanOrEqual(400);
  });

  test('Profile photo file size is optimized for web (< 100KB)', () => {
    const imgMatch = htmlContent.match(/<img[^>]*class="profile-photo"[^>]*>/);
    const srcMatch = imgMatch[0].match(/src="([^"]+)"/);
    const imagePath = path.join(__dirname, '..', srcMatch[1]);
    const stats = fs.statSync(imagePath);
    const fileSizeKB = stats.size / 1024;
    
    // File should be compressed and under 100KB for good web performance
    expect(fileSizeKB).toBeLessThan(100);
    
    // Log actual size for reference
    console.log(`Profile photo size: ${fileSizeKB.toFixed(2)} KB`);
  });

  test('Profile photo has alt text for accessibility', () => {
    const imgMatch = htmlContent.match(/<img[^>]*class="profile-photo"[^>]*>/);
    const altMatch = imgMatch[0].match(/alt="([^"]+)"/);
    
    expect(altMatch).not.toBeNull();
    expect(altMatch[1].length).toBeGreaterThan(0);
  });

  test('Profile photo dimensions are square or near-square (aspect ratio check)', () => {
    const imgMatch = htmlContent.match(/<img[^>]*class="profile-photo"[^>]*>/);
    const widthMatch = imgMatch[0].match(/width="(\d+)"/);
    const heightMatch = imgMatch[0].match(/height="(\d+)"/);
    
    const width = parseInt(widthMatch[1], 10);
    const height = parseInt(heightMatch[1], 10);
    
    // Allow for slight aspect ratio variation (within 20%)
    const aspectRatio = width / height;
    expect(aspectRatio).toBeGreaterThanOrEqual(0.8);
    expect(aspectRatio).toBeLessThanOrEqual(1.25);
  });

  test('Requirement 1.1: Profile photo dimensions between 200-400px', () => {
    const imgMatch = htmlContent.match(/<img[^>]*class="profile-photo"[^>]*>/);
    const widthMatch = imgMatch[0].match(/width="(\d+)"/);
    const heightMatch = imgMatch[0].match(/height="(\d+)"/);
    
    const width = parseInt(widthMatch[1], 10);
    const height = parseInt(heightMatch[1], 10);
    
    // Both dimensions must be within range
    expect(width).toBeGreaterThanOrEqual(200);
    expect(width).toBeLessThanOrEqual(400);
    expect(height).toBeGreaterThanOrEqual(200);
    expect(height).toBeLessThanOrEqual(400);
  });

  test('Requirement 12.2: Image is compressed to reduce file size', () => {
    const imgMatch = htmlContent.match(/<img[^>]*class="profile-photo"[^>]*>/);
    const srcMatch = imgMatch[0].match(/src="([^"]+)"/);
    const imagePath = path.join(__dirname, '..', srcMatch[1]);
    const stats = fs.statSync(imagePath);
    const fileSizeKB = stats.size / 1024;
    
    // For a 300x300 JPEG, well-compressed should be under 50KB
    // We'll be lenient and allow up to 100KB
    expect(fileSizeKB).toBeLessThan(100);
  });
});
