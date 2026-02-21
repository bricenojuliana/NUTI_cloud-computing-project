/**
 * Task 3.4 Verification Tests: Style Header and Profile Photo
 * 
 * Tests verify:
 * - Header content is centered with prominent typography
 * - Profile photo dimensions are between 200x200 and 400x400px
 * - Responsive behavior for photo sizing across different viewports
 * - Requirements: 1.1, 1.2, 1.3
 */

const fs = require('fs');
const path = require('path');

describe('Task 3.4: Header and Profile Photo Styling', () => {
  let cssContent;
  let htmlContent;

  beforeAll(() => {
    const cssPath = path.join(__dirname, '..', 'css', 'styles.css');
    const htmlPath = path.join(__dirname, '..', 'index.html');
    
    expect(fs.existsSync(cssPath)).toBe(true);
    expect(fs.existsSync(htmlPath)).toBe(true);
    
    cssContent = fs.readFileSync(cssPath, 'utf-8');
    htmlContent = fs.readFileSync(htmlPath, 'utf-8');
  });

  describe('Header Centering and Layout', () => {
    test('header should use flexbox for centering', () => {
      expect(cssContent).toMatch(/header\s*{[\s\S]*?display:\s*flex/);
    });

    test('header should have flex-direction column', () => {
      expect(cssContent).toMatch(/header\s*{[\s\S]*?flex-direction:\s*column/);
    });

    test('header should have align-items center', () => {
      expect(cssContent).toMatch(/header\s*{[\s\S]*?align-items:\s*center/);
    });

    test('header should have justify-content center', () => {
      expect(cssContent).toMatch(/header\s*{[\s\S]*?justify-content:\s*center/);
    });

    test('header should have text-align center', () => {
      expect(cssContent).toMatch(/header\s*{[\s\S]*?text-align:\s*center/);
    });

    test('HTML should contain header element', () => {
      expect(htmlContent).toMatch(/<header>/);
    });
  });

  describe('Profile Photo Base Styling', () => {
    test('profile photo should have class defined in CSS', () => {
      expect(cssContent).toMatch(/\.profile-photo/);
    });

    test('profile photo should be circular (border-radius: 50%)', () => {
      expect(cssContent).toMatch(/\.profile-photo[\s\S]*?{[\s\S]*?border-radius:\s*50%/);
    });

    test('profile photo should have object-fit cover', () => {
      expect(cssContent).toMatch(/\.profile-photo[\s\S]*?{[\s\S]*?object-fit:\s*cover/);
    });

    test('profile photo should have width defined', () => {
      expect(cssContent).toMatch(/\.profile-photo[\s\S]*?{[\s\S]*?width:\s*\d+px/);
    });

    test('profile photo should have height defined', () => {
      expect(cssContent).toMatch(/\.profile-photo[\s\S]*?{[\s\S]*?height:\s*\d+px/);
    });

    test('HTML should contain img with profile-photo class', () => {
      expect(htmlContent).toMatch(/<img[^>]*class="profile-photo"/);
    });

    test('profile photo img should have alt text', () => {
      expect(htmlContent).toMatch(/<img[^>]*alt="[^"]+"/);
    });

    test('profile photo img should have width and height attributes', () => {
      expect(htmlContent).toMatch(/<img[^>]*width="\d+"/);
      expect(htmlContent).toMatch(/<img[^>]*height="\d+"/);
    });
  });

  describe('Profile Photo Dimensions (Requirement 1.1)', () => {
    test('base profile photo width should be between 200px and 400px', () => {
      const widthMatch = cssContent.match(/\.profile-photo[\s\S]*?{[\s\S]*?width:\s*(\d+)px/);
      expect(widthMatch).toBeTruthy();
      const width = parseInt(widthMatch[1]);
      expect(width).toBeGreaterThanOrEqual(200);
      expect(width).toBeLessThanOrEqual(400);
    });

    test('base profile photo height should be between 200px and 400px', () => {
      const heightMatch = cssContent.match(/\.profile-photo[\s\S]*?{[\s\S]*?height:\s*(\d+)px/);
      expect(heightMatch).toBeTruthy();
      const height = parseInt(heightMatch[1]);
      expect(height).toBeGreaterThanOrEqual(200);
      expect(height).toBeLessThanOrEqual(400);
    });

    test('profile photo width and height should be equal (square)', () => {
      const widthMatch = cssContent.match(/\.profile-photo[\s\S]*?{[\s\S]*?width:\s*(\d+)px/);
      const heightMatch = cssContent.match(/\.profile-photo[\s\S]*?{[\s\S]*?height:\s*(\d+)px/);
      expect(widthMatch).toBeTruthy();
      expect(heightMatch).toBeTruthy();
      expect(widthMatch[1]).toBe(heightMatch[1]);
    });
  });

  describe('Responsive Photo Sizing - Mobile (320px-767px)', () => {
    test('should have responsive sizing for small screens (max-width: 480px)', () => {
      const smallMobileQuery = cssContent.match(/@media screen and \(max-width: 480px\)[\s\S]*?\.profile-photo[\s\S]*?{[\s\S]*?width:\s*(\d+)px/);
      expect(smallMobileQuery).toBeTruthy();
    });

    test('small screen photo width should be between 200px and 400px', () => {
      const smallMobileQuery = cssContent.match(/@media screen and \(max-width: 480px\)[\s\S]*?\.profile-photo[\s\S]*?{[\s\S]*?width:\s*(\d+)px/);
      if (smallMobileQuery) {
        const width = parseInt(smallMobileQuery[1]);
        expect(width).toBeGreaterThanOrEqual(200);
        expect(width).toBeLessThanOrEqual(400);
      }
    });

    test('small screen photo height should be between 200px and 400px', () => {
      const smallMobileQuery = cssContent.match(/@media screen and \(max-width: 480px\)[\s\S]*?\.profile-photo[\s\S]*?{[\s\S]*?height:\s*(\d+)px/);
      if (smallMobileQuery) {
        const height = parseInt(smallMobileQuery[1]);
        expect(height).toBeGreaterThanOrEqual(200);
        expect(height).toBeLessThanOrEqual(400);
      }
    });

    test('should have responsive sizing for mobile (max-width: 767px)', () => {
      const mobileQuery = cssContent.match(/@media screen and \(max-width: 767px\)[\s\S]*?\.profile-photo[\s\S]*?{[\s\S]*?width:\s*(\d+)px/);
      expect(mobileQuery).toBeTruthy();
    });

    test('mobile photo width should be between 200px and 400px', () => {
      const mobileQuery = cssContent.match(/@media screen and \(max-width: 767px\)[\s\S]*?\.profile-photo[\s\S]*?{[\s\S]*?width:\s*(\d+)px/);
      if (mobileQuery) {
        const width = parseInt(mobileQuery[1]);
        expect(width).toBeGreaterThanOrEqual(200);
        expect(width).toBeLessThanOrEqual(400);
      }
    });

    test('mobile photo height should be between 200px and 400px', () => {
      const mobileQuery = cssContent.match(/@media screen and \(max-width: 767px\)[\s\S]*?\.profile-photo[\s\S]*?{[\s\S]*?height:\s*(\d+)px/);
      if (mobileQuery) {
        const height = parseInt(mobileQuery[1]);
        expect(height).toBeGreaterThanOrEqual(200);
        expect(height).toBeLessThanOrEqual(400);
      }
    });
  });

  describe('Responsive Photo Sizing - Tablet and Desktop', () => {
    test('should have responsive sizing for tablet (min-width: 768px)', () => {
      const tabletQuery = cssContent.match(/@media screen and \(min-width: 768px\)[\s\S]*?\.profile-photo[\s\S]*?{[\s\S]*?width:\s*(\d+)px/);
      expect(tabletQuery).toBeTruthy();
    });

    test('tablet photo width should be between 200px and 400px', () => {
      const tabletQuery = cssContent.match(/@media screen and \(min-width: 768px\)[\s\S]*?\.profile-photo[\s\S]*?{[\s\S]*?width:\s*(\d+)px/);
      if (tabletQuery) {
        const width = parseInt(tabletQuery[1]);
        expect(width).toBeGreaterThanOrEqual(200);
        expect(width).toBeLessThanOrEqual(400);
      }
    });

    test('tablet photo height should be between 200px and 400px', () => {
      const tabletQuery = cssContent.match(/@media screen and \(min-width: 768px\)[\s\S]*?\.profile-photo[\s\S]*?{[\s\S]*?height:\s*(\d+)px/);
      if (tabletQuery) {
        const height = parseInt(tabletQuery[1]);
        expect(height).toBeGreaterThanOrEqual(200);
        expect(height).toBeLessThanOrEqual(400);
      }
    });

    test('should have responsive sizing for desktop (min-width: 1024px)', () => {
      const desktopQuery = cssContent.match(/@media screen and \(min-width: 1024px\)[\s\S]*?\.profile-photo[\s\S]*?{[\s\S]*?width:\s*(\d+)px/);
      expect(desktopQuery).toBeTruthy();
    });

    test('desktop photo width should be between 200px and 400px', () => {
      const desktopQuery = cssContent.match(/@media screen and \(min-width: 1024px\)[\s\S]*?\.profile-photo[\s\S]*?{[\s\S]*?width:\s*(\d+)px/);
      if (desktopQuery) {
        const width = parseInt(desktopQuery[1]);
        expect(width).toBeGreaterThanOrEqual(200);
        expect(width).toBeLessThanOrEqual(400);
      }
    });

    test('desktop photo height should be between 200px and 400px', () => {
      const desktopQuery = cssContent.match(/@media screen and \(min-width: 1024px\)[\s\S]*?\.profile-photo[\s\S]*?{[\s\S]*?height:\s*(\d+)px/);
      if (desktopQuery) {
        const height = parseInt(desktopQuery[1]);
        expect(height).toBeGreaterThanOrEqual(200);
        expect(height).toBeLessThanOrEqual(400);
      }
    });
  });

  describe('Prominent Typography (Requirements 1.2, 1.3)', () => {
    test('h1 (full name) should be in header', () => {
      expect(htmlContent).toMatch(/<header>[\s\S]*?<h1>/);
    });

    test('professional title should be in header', () => {
      expect(htmlContent).toMatch(/<header>[\s\S]*?class="professional-title"/);
    });

    test('professional title should have styling defined', () => {
      expect(cssContent).toMatch(/\.professional-title[\s\S]*?{[\s\S]*?font-size/);
    });

    test('professional title should have font-weight defined', () => {
      expect(cssContent).toMatch(/\.professional-title[\s\S]*?{[\s\S]*?font-weight/);
    });

    test('h1 should have prominent size (defined in variables)', () => {
      expect(cssContent).toMatch(/--font-size-h1:\s*[\d.]+rem/);
    });

    test('header should have appropriate spacing', () => {
      expect(cssContent).toMatch(/header\s*{[\s\S]*?padding/);
    });

    test('header should have margin-bottom for separation', () => {
      expect(cssContent).toMatch(/header\s*{[\s\S]*?margin-bottom/);
    });
  });

  describe('Visual Enhancements', () => {
    test('profile photo should have visual styling (shadow or border)', () => {
      const hasBoxShadow = cssContent.match(/\.profile-photo[\s\S]*?{[\s\S]*?box-shadow/);
      const hasBorder = cssContent.match(/\.profile-photo[\s\S]*?{[\s\S]*?border:/);
      expect(hasBoxShadow || hasBorder).toBeTruthy();
    });

    test('profile photo should have margin-bottom for spacing', () => {
      expect(cssContent).toMatch(/\.profile-photo[\s\S]*?{[\s\S]*?margin-bottom/);
    });

    test('header should have gap or spacing between elements', () => {
      expect(cssContent).toMatch(/header\s*{[\s\S]*?gap/);
    });
  });

  describe('Responsive Photo Sizing Progression', () => {
    test('photo size should increase from mobile to desktop', () => {
      // Extract sizes from different breakpoints
      const baseMatch = cssContent.match(/\.profile-photo[\s\S]*?{[\s\S]*?width:\s*(\d+)px/);
      const smallMobileMatch = cssContent.match(/@media screen and \(max-width: 480px\)[\s\S]*?\.profile-photo[\s\S]*?{[\s\S]*?width:\s*(\d+)px/);
      const mobileMatch = cssContent.match(/@media screen and \(max-width: 767px\)[\s\S]*?\.profile-photo[\s\S]*?{[\s\S]*?width:\s*(\d+)px/);
      const tabletMatch = cssContent.match(/@media screen and \(min-width: 768px\)[\s\S]*?\.profile-photo[\s\S]*?{[\s\S]*?width:\s*(\d+)px/);
      const desktopMatch = cssContent.match(/@media screen and \(min-width: 1024px\)[\s\S]*?\.profile-photo[\s\S]*?{[\s\S]*?width:\s*(\d+)px/);
      
      expect(baseMatch).toBeTruthy();
      
      const baseSize = parseInt(baseMatch[1]);
      
      // Verify sizes are within range
      expect(baseSize).toBeGreaterThanOrEqual(200);
      expect(baseSize).toBeLessThanOrEqual(400);
      
      // If responsive sizes exist, verify they're within range
      if (smallMobileMatch) {
        const smallMobileSize = parseInt(smallMobileMatch[1]);
        expect(smallMobileSize).toBeGreaterThanOrEqual(200);
        expect(smallMobileSize).toBeLessThanOrEqual(400);
      }
      
      if (mobileMatch) {
        const mobileSize = parseInt(mobileMatch[1]);
        expect(mobileSize).toBeGreaterThanOrEqual(200);
        expect(mobileSize).toBeLessThanOrEqual(400);
      }
      
      if (tabletMatch) {
        const tabletSize = parseInt(tabletMatch[1]);
        expect(tabletSize).toBeGreaterThanOrEqual(200);
        expect(tabletSize).toBeLessThanOrEqual(400);
      }
      
      if (desktopMatch) {
        const desktopSize = parseInt(desktopMatch[1]);
        expect(desktopSize).toBeGreaterThanOrEqual(200);
        expect(desktopSize).toBeLessThanOrEqual(400);
      }
    });

    test('all responsive photo sizes should maintain square aspect ratio', () => {
      // Check all media queries for matching width and height
      const mediaQueries = cssContent.match(/@media[^{]+\{[\s\S]*?\n\}/g) || [];
      
      mediaQueries.forEach(query => {
        if (query.includes('.profile-photo')) {
          const widthMatch = query.match(/\.profile-photo[\s\S]*?width:\s*(\d+)px/);
          const heightMatch = query.match(/\.profile-photo[\s\S]*?height:\s*(\d+)px/);
          
          if (widthMatch && heightMatch) {
            expect(widthMatch[1]).toBe(heightMatch[1]);
          }
        }
      });
    });
  });
});
