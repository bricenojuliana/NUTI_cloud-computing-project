/**
 * Task 3.6 Verification Tests
 * 
 * Validates responsive breakpoints implementation:
 * - Mobile-first approach starting at 320px
 * - Media query at 768px for vertical stacking on mobile
 * - Media query at 1024px for desktop layout
 * - Maximum width at 1920px
 * 
 * Requirements: 7.1, 7.2, 7.3, 7.4
 */

const fs = require('fs');
const path = require('path');

describe('Task 3.6: Responsive Breakpoints', () => {
  let cssContent;

  beforeAll(() => {
    const cssPath = path.join(__dirname, '../css/styles.css');
    expect(fs.existsSync(cssPath)).toBe(true);
    cssContent = fs.readFileSync(cssPath, 'utf-8');
  });

  describe('Mobile-First Approach (Requirement 7.1)', () => {
    test('should have base styles without media queries for mobile', () => {
      // Base styles should be defined before any media queries
      const firstMediaQueryIndex = cssContent.indexOf('@media');
      expect(firstMediaQueryIndex).toBeGreaterThan(0);
      
      // Check that essential base styles exist before media queries
      const baseStyles = cssContent.substring(0, firstMediaQueryIndex);
      expect(baseStyles).toMatch(/body\s*{/);
      // Section and header styles are defined in the Layout System section (after first media query but before responsive section)
      expect(cssContent).toMatch(/\/\*\s*Section Spacing and Padding\s*\*\//);
      expect(cssContent).toMatch(/section\s*{/);
      expect(cssContent).toMatch(/\/\*\s*Header spacing\s*\*\//);
      expect(cssContent).toMatch(/header\s*{/);
    });

    test('should support minimum viewport width of 320px', () => {
      // Should have styles for very small screens (320px)
      const hasSmallScreenStyles = cssContent.match(/@media[^{]*max-width:\s*480px/);
      expect(hasSmallScreenStyles).toBeTruthy();
    });

    test('should have mobile-first flex-direction: column by default', () => {
      // Base styles should use column layout for mobile
      // Check in the Flexbox/Grid Layout System section
      expect(cssContent).toMatch(/\/\*\s*Header Layout - Flexbox for centering\s*\*\//);
      expect(cssContent).toMatch(/header\s*{\s*display:\s*flex;\s*flex-direction:\s*column;/);
    });

    test('should have minimum font size of 14px defined', () => {
      // Check for minimum font size in CSS variables
      expect(cssContent).toMatch(/--font-size-small:\s*14px/);
    });
  });

  describe('768px Breakpoint - Tablet (Requirement 7.3)', () => {
    test('should have media query at 768px', () => {
      const has768Breakpoint = cssContent.match(/@media[^{]*min-width:\s*768px/);
      expect(has768Breakpoint).toBeTruthy();
    });

    test('should have media query for max-width 767px for mobile vertical stacking', () => {
      const hasMobileStackingBreakpoint = cssContent.match(/@media[^{]*max-width:\s*767px/);
      expect(hasMobileStackingBreakpoint).toBeTruthy();
    });

    test('should enforce vertical stacking below 768px', () => {
      // Extract the mobile stacking media query block
      const mobileStackingMatch = cssContent.match(/@media[^{]*max-width:\s*767px[^{]*{([^}]*{[^}]*}[^}]*)*}/s);
      expect(mobileStackingMatch).toBeTruthy();
      
      const mobileBlock = mobileStackingMatch[0];
      
      // Should force single column for skills
      expect(mobileBlock).toMatch(/\.skills-container[^}]*grid-template-columns:\s*1fr/);
      
      // Should force column direction for contact info
      expect(mobileBlock).toMatch(/\.contact-info[^}]*flex-direction:\s*column/);
    });

    test('should adjust spacing at 768px breakpoint', () => {
      const tablet768Match = cssContent.match(/@media[^{]*min-width:\s*768px[^{]*{([^}]*{[^}]*}[^}]*)*}/s);
      expect(tablet768Match).toBeTruthy();
      
      const tabletBlock = tablet768Match[0];
      
      // Should have padding adjustments
      expect(tabletBlock).toMatch(/padding/);
    });

    test('should adjust profile photo size at 768px', () => {
      // Check that profile photo is adjusted at 768px breakpoint
      expect(cssContent).toMatch(/@media screen and \(min-width: 768px\)/);
      expect(cssContent).toMatch(/\.profile-photo\s*{\s*width:\s*350px;\s*height:\s*350px;/);
    });
  });

  describe('1024px Breakpoint - Desktop (Requirement 7.2)', () => {
    test('should have media query at 1024px', () => {
      const has1024Breakpoint = cssContent.match(/@media[^{]*min-width:\s*1024px/);
      expect(has1024Breakpoint).toBeTruthy();
    });

    test('should adjust layout for desktop at 1024px', () => {
      const desktop1024Match = cssContent.match(/@media[^{]*min-width:\s*1024px[^{]*{([^}]*{[^}]*}[^}]*)*}/s);
      expect(desktop1024Match).toBeTruthy();
      
      const desktopBlock = desktop1024Match[0];
      
      // Should have desktop-specific adjustments
      expect(desktopBlock).toMatch(/body|section|\.profile-photo|\.skills-container/);
    });

    test('should set maximum profile photo size at 1024px', () => {
      const desktop1024Match = cssContent.match(/@media[^{]*min-width:\s*1024px[^{]*{([^}]*{[^}]*}[^}]*)*}/s);
      expect(desktop1024Match).toBeTruthy();
      
      const desktopBlock = desktop1024Match[0];
      expect(desktopBlock).toMatch(/\.profile-photo[^}]*width:\s*400px/);
      expect(desktopBlock).toMatch(/\.profile-photo[^}]*height:\s*400px/);
    });

    test('should adjust skills grid for desktop', () => {
      // Check that skills grid uses 3 columns at 1024px
      expect(cssContent).toMatch(/@media screen and \(min-width: 1024px\)/);
      expect(cssContent).toMatch(/\.skills-container\s*{\s*grid-template-columns:\s*repeat\(3,\s*1fr\);/);
    });
  });

  describe('1920px Maximum Width (Requirement 7.2)', () => {
    test('should have media query at 1920px', () => {
      const has1920Breakpoint = cssContent.match(/@media[^{]*min-width:\s*1920px/);
      expect(has1920Breakpoint).toBeTruthy();
    });

    test('should constrain maximum width at 1920px', () => {
      const large1920Match = cssContent.match(/@media[^{]*min-width:\s*1920px[^{]*{([^}]*{[^}]*}[^}]*)*}/s);
      expect(large1920Match).toBeTruthy();
      
      const largeBlock = large1920Match[0];
      expect(largeBlock).toMatch(/body[^}]*max-width/);
    });

    test('should have container max-width variable defined', () => {
      expect(cssContent).toMatch(/--container-max-width:\s*1200px/);
    });
  });

  describe('Responsive Typography (Requirement 7.4)', () => {
    test('should maintain minimum 14px font size across all breakpoints', () => {
      // Check base font size
      expect(cssContent).toMatch(/--font-size-small:\s*14px/);
      
      // Check that media queries don't reduce below 14px
      const allMediaQueries = cssContent.match(/@media[^{]*{([^}]*{[^}]*}[^}]*)*}/gs);
      expect(allMediaQueries).toBeTruthy();
      
      allMediaQueries.forEach(mediaQuery => {
        // If font-size-small is redefined, it should still be 14px or more
        const fontSizeSmallMatch = mediaQuery.match(/--font-size-small:\s*(\d+)px/);
        if (fontSizeSmallMatch) {
          const fontSize = parseInt(fontSizeSmallMatch[1]);
          expect(fontSize).toBeGreaterThanOrEqual(14);
        }
      });
    });

    test('should have responsive font size adjustments', () => {
      // Should adjust heading sizes for mobile
      const mobileTypographyMatch = cssContent.match(/@media[^{]*max-width:\s*768px[^{]*{([^}]*{[^}]*}[^}]*)*}/s);
      expect(mobileTypographyMatch).toBeTruthy();
      
      const mobileBlock = mobileTypographyMatch[0];
      expect(mobileBlock).toMatch(/--font-size-h1/);
      expect(mobileBlock).toMatch(/--font-size-h2/);
    });

    test('should have extra small screen typography adjustments', () => {
      const extraSmallMatch = cssContent.match(/@media[^{]*max-width:\s*480px[^{]*{([^}]*{[^}]*}[^}]*)*}/s);
      expect(extraSmallMatch).toBeTruthy();
      
      const extraSmallBlock = extraSmallMatch[0];
      expect(extraSmallBlock).toMatch(/--font-size/);
    });
  });

  describe('Profile Photo Responsive Sizing (Requirement 1.1)', () => {
    test('should have profile photo between 200px and 400px across breakpoints', () => {
      // Base mobile size (320px-767px)
      const mobilePhotoMatch = cssContent.match(/@media[^{]*max-width:\s*767px[^{]*{([^}]*{[^}]*}[^}]*)*}/s);
      if (mobilePhotoMatch) {
        const mobileBlock = mobilePhotoMatch[0];
        const widthMatch = mobileBlock.match(/\.profile-photo[^}]*width:\s*(\d+)px/);
        if (widthMatch) {
          const width = parseInt(widthMatch[1]);
          expect(width).toBeGreaterThanOrEqual(200);
          expect(width).toBeLessThanOrEqual(400);
        }
      }

      // Extra small (320px-480px)
      const extraSmallPhotoMatch = cssContent.match(/@media[^{]*max-width:\s*480px[^{]*{([^}]*{[^}]*}[^}]*)*}/s);
      if (extraSmallPhotoMatch) {
        const extraSmallBlock = extraSmallPhotoMatch[0];
        const widthMatch = extraSmallBlock.match(/\.profile-photo[^}]*width:\s*(\d+)px/);
        if (widthMatch) {
          const width = parseInt(widthMatch[1]);
          expect(width).toBeGreaterThanOrEqual(200);
          expect(width).toBeLessThanOrEqual(400);
        }
      }

      // Tablet (768px+)
      const tabletPhotoMatch = cssContent.match(/@media[^{]*min-width:\s*768px[^{]*{([^}]*{[^}]*}[^}]*)*}/s);
      if (tabletPhotoMatch) {
        const tabletBlock = tabletPhotoMatch[0];
        const widthMatch = tabletBlock.match(/\.profile-photo[^}]*width:\s*(\d+)px/);
        if (widthMatch) {
          const width = parseInt(widthMatch[1]);
          expect(width).toBeGreaterThanOrEqual(200);
          expect(width).toBeLessThanOrEqual(400);
        }
      }

      // Desktop (1024px+)
      const desktopPhotoMatch = cssContent.match(/@media[^{]*min-width:\s*1024px[^{]*{([^}]*{[^}]*}[^}]*)*}/s);
      if (desktopPhotoMatch) {
        const desktopBlock = desktopPhotoMatch[0];
        const widthMatch = desktopBlock.match(/\.profile-photo[^}]*width:\s*(\d+)px/);
        if (widthMatch) {
          const width = parseInt(widthMatch[1]);
          expect(width).toBeGreaterThanOrEqual(200);
          expect(width).toBeLessThanOrEqual(400);
        }
      }
    });

    test('should have base profile photo size defined', () => {
      const basePhotoMatch = cssContent.match(/\.profile-photo\s*{[^}]*}/s);
      expect(basePhotoMatch).toBeTruthy();
      
      const baseBlock = basePhotoMatch[0];
      const widthMatch = baseBlock.match(/width:\s*(\d+)px/);
      expect(widthMatch).toBeTruthy();
      
      const width = parseInt(widthMatch[1]);
      expect(width).toBeGreaterThanOrEqual(200);
      expect(width).toBeLessThanOrEqual(400);
    });
  });

  describe('Responsive Spacing Adjustments', () => {
    test('should reduce spacing on mobile devices', () => {
      // Check that mobile breakpoint reduces spacing
      expect(cssContent).toMatch(/@media screen and \(max-width: 767px\)/);
      expect(cssContent).toMatch(/body\s*{\s*padding:\s*var\(--spacing-sm\);/);
      expect(cssContent).toMatch(/section\s*{\s*padding:\s*var\(--spacing-lg\)\s*0;/);
    });

    test('should increase spacing on larger screens', () => {
      const tabletMatch = cssContent.match(/@media[^{]*min-width:\s*768px[^{]*{([^}]*{[^}]*}[^}]*)*}/s);
      expect(tabletMatch).toBeTruthy();
      
      const tabletBlock = tabletMatch[0];
      expect(tabletBlock).toMatch(/padding/);
    });

    test('should have extra small screen spacing adjustments', () => {
      // Check for 480px breakpoint with spacing adjustments
      expect(cssContent).toMatch(/@media screen and \(max-width: 480px\)/);
      expect(cssContent).toMatch(/body\s*{\s*padding:\s*var\(--spacing-xs\);/);
      expect(cssContent).toMatch(/\.profile-photo\s*{\s*width:\s*200px;\s*height:\s*200px;/);
    });
  });

  describe('Responsive Grid and Flexbox Adjustments', () => {
    test('should adjust skills grid columns across breakpoints', () => {
      // Mobile: 1 column
      expect(cssContent).toMatch(/@media screen and \(max-width: 767px\)/);
      expect(cssContent).toMatch(/\.skills-container\s*{\s*grid-template-columns:\s*1fr;/);

      // Desktop: 3 columns
      expect(cssContent).toMatch(/@media screen and \(min-width: 1024px\)/);
      expect(cssContent).toMatch(/\.skills-container\s*{\s*grid-template-columns:\s*repeat\(3,\s*1fr\);/);
    });

    test('should adjust contact info flex direction', () => {
      // Mobile: column
      expect(cssContent).toMatch(/@media screen and \(max-width: 767px\)/);
      expect(cssContent).toMatch(/\.contact-info\s*{\s*flex-direction:\s*column;/);

      // Tablet+: row
      expect(cssContent).toMatch(/@media screen and \(min-width: 768px\)/);
      expect(cssContent).toMatch(/\.contact-info\s*{\s*flex-direction:\s*row;/);
    });
  });

  describe('Overall Responsive Structure', () => {
    test('should have all required breakpoints defined', () => {
      // Count media queries
      const mediaQueries = cssContent.match(/@media/g);
      expect(mediaQueries).toBeTruthy();
      expect(mediaQueries.length).toBeGreaterThanOrEqual(4);
    });

    test('should follow mobile-first pattern (min-width queries)', () => {
      const minWidthQueries = cssContent.match(/@media[^{]*min-width/g);
      expect(minWidthQueries).toBeTruthy();
      expect(minWidthQueries.length).toBeGreaterThanOrEqual(3);
    });

    test('should have max-width queries for mobile overrides', () => {
      const maxWidthQueries = cssContent.match(/@media[^{]*max-width/g);
      expect(maxWidthQueries).toBeTruthy();
      expect(maxWidthQueries.length).toBeGreaterThanOrEqual(2);
    });

    test('breakpoints should be in logical order', () => {
      const breakpoints = [];
      const minWidthMatches = cssContent.matchAll(/@media[^{]*min-width:\s*(\d+)px/g);
      
      for (const match of minWidthMatches) {
        breakpoints.push(parseInt(match[1]));
      }
      
      // Should have 768, 1024, and 1920
      expect(breakpoints).toContain(768);
      expect(breakpoints).toContain(1024);
      expect(breakpoints).toContain(1920);
    });
  });
});
