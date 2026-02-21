/**
 * Task 3.3 Verification Tests: Style Typography Hierarchy
 * 
 * Tests verify:
 * - Heading styles (h1, h2, h3) with appropriate sizes
 * - Paragraphs and lists with readable line-height
 * - Minimum 14px font size across all text elements
 * - Requirements: 2.3, 7.4
 */

const fs = require('fs');
const path = require('path');

describe('Task 3.3: Typography Hierarchy', () => {
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

  describe('Heading Hierarchy', () => {
    test('h1 should have appropriate size defined', () => {
      expect(cssContent).toMatch(/h1\s*{[\s\S]*?font-size/);
    });

    test('h2 should have appropriate size defined', () => {
      expect(cssContent).toMatch(/h2\s*{[\s\S]*?font-size/);
    });

    test('h3 should have appropriate size defined', () => {
      expect(cssContent).toMatch(/h3\s*{[\s\S]*?font-size/);
    });

    test('headings should have defined font-family', () => {
      expect(cssContent).toMatch(/h1,[\s\S]*?h2,[\s\S]*?h3[\s\S]*?{[\s\S]*?font-family/);
    });

    test('headings should have defined font-weight', () => {
      expect(cssContent).toMatch(/h1,[\s\S]*?h2,[\s\S]*?h3[\s\S]*?{[\s\S]*?font-weight/);
    });

    test('headings should have defined line-height', () => {
      expect(cssContent).toMatch(/h1,[\s\S]*?h2,[\s\S]*?h3[\s\S]*?{[\s\S]*?line-height/);
    });

    test('HTML should contain h1 element', () => {
      expect(htmlContent).toMatch(/<h1>/);
    });

    test('HTML should contain h2 elements', () => {
      expect(htmlContent).toMatch(/<h2>/);
    });

    test('HTML should contain h3 elements', () => {
      expect(htmlContent).toMatch(/<h3>/);
    });
  });

  describe('Paragraph and List Styling', () => {
    test('paragraphs should have readable line-height defined (>= 1.5)', () => {
      expect(cssContent).toMatch(/p\s*{[\s\S]*?line-height:\s*1\.[5-9]/);
    });

    test('lists should have readable line-height defined', () => {
      expect(cssContent).toMatch(/(ul|ol|li)[\s\S]*?{[\s\S]*?line-height/);
    });

    test('lists should have line-height of at least 1.5', () => {
      // Match the Lists section specifically, not the reset section
      const listsSection = cssContent.match(/\/\* Lists \*\/[\s\S]*?ul,[\s\S]*?ol\s*{[\s\S]*?line-height:\s*([\d.]+)/);
      if (listsSection) {
        const lineHeight = parseFloat(listsSection[1]);
        expect(lineHeight).toBeGreaterThanOrEqual(1.5);
      } else {
        // If not found in Lists section, check any ul/ol with line-height
        const anyListMatch = cssContent.match(/(?:ul|ol)\s*{[^}]*line-height:\s*([\d.]+)/);
        if (anyListMatch) {
          const lineHeight = parseFloat(anyListMatch[1]);
          expect(lineHeight).toBeGreaterThanOrEqual(1.5);
        }
      }
    });

    test('list items should have line-height defined', () => {
      expect(cssContent).toMatch(/li\s*{[\s\S]*?line-height/);
    });

    test('HTML should contain paragraph elements', () => {
      expect(htmlContent).toMatch(/<p>/);
    });
  });

  describe('Minimum Font Size (Requirements 2.3, 7.4)', () => {
    test('CSS should define minimum 14px font size variable', () => {
      expect(cssContent).toMatch(/--font-size-small:\s*14px/);
    });

    test('base font size should be at least 14px', () => {
      expect(cssContent).toMatch(/--font-size-base:\s*(1[6-9]|[2-9]\d)px/);
    });

    test('small text should be minimum 14px', () => {
      expect(cssContent).toMatch(/small\s*{[\s\S]*?font-size:\s*var\(--font-size-small\)/);
    });

    test('responsive typography should maintain minimum 14px on mobile', () => {
      const mobileMediaQuery = cssContent.match(/@media screen and \(max-width: 768px\)[\s\S]*?{[\s\S]*?--font-size-small:\s*14px/);
      expect(mobileMediaQuery).toBeTruthy();
    });

    test('all text elements should use font size variables', () => {
      expect(cssContent).toMatch(/--font-size-h1/);
      expect(cssContent).toMatch(/--font-size-h2/);
      expect(cssContent).toMatch(/--font-size-h3/);
      expect(cssContent).toMatch(/--font-size-base/);
      expect(cssContent).toMatch(/--font-size-small/);
    });
  });

  describe('Typography Hierarchy Structure', () => {
    test('CSS should define heading hierarchy with descending sizes', () => {
      const h1Match = cssContent.match(/--font-size-h1:\s*([\d.]+)rem/);
      const h2Match = cssContent.match(/--font-size-h2:\s*([\d.]+)rem/);
      const h3Match = cssContent.match(/--font-size-h3:\s*([\d.]+)rem/);
      
      expect(h1Match).toBeTruthy();
      expect(h2Match).toBeTruthy();
      expect(h3Match).toBeTruthy();
      
      const h1Size = parseFloat(h1Match[1]);
      const h2Size = parseFloat(h2Match[1]);
      const h3Size = parseFloat(h3Match[1]);
      
      // Verify descending hierarchy
      expect(h1Size).toBeGreaterThan(h2Size);
      expect(h2Size).toBeGreaterThan(h3Size);
    });

    test('component typography should be defined', () => {
      expect(cssContent).toMatch(/\.professional-title/);
      expect(cssContent).toMatch(/\.education-entry/);
      expect(cssContent).toMatch(/\.skill/);
      expect(cssContent).toMatch(/\.project-description/);
      expect(cssContent).toMatch(/\.technologies/);
    });

    test('professional title should have font size defined', () => {
      expect(cssContent).toMatch(/\.professional-title[\s\S]*?{[\s\S]*?font-size/);
    });

    test('education entry typography should be styled', () => {
      expect(cssContent).toMatch(/\.education-entry\s+\.institution/);
      expect(cssContent).toMatch(/\.education-entry\s+\.field/);
      expect(cssContent).toMatch(/\.education-entry\s+\.year/);
    });

    test('skill tags should have font size defined', () => {
      expect(cssContent).toMatch(/\.skill[\s\S]*?{[\s\S]*?font-size/);
    });

    test('project description should have line-height defined', () => {
      expect(cssContent).toMatch(/\.project-description[\s\S]*?{[\s\S]*?line-height/);
    });

    test('technologies text should have font size defined', () => {
      expect(cssContent).toMatch(/\.technologies[\s\S]*?{[\s\S]*?font-size/);
    });
  });

  describe('Accessibility and Readability', () => {
    test('line-height should be at least 1.5 for body text', () => {
      const bodyMatch = cssContent.match(/body\s*{[\s\S]*?line-height:\s*([\d.]+)/);
      expect(bodyMatch).toBeTruthy();
      const lineHeight = parseFloat(bodyMatch[1]);
      expect(lineHeight).toBeGreaterThanOrEqual(1.5);
    });

    test('color contrast should be defined for text', () => {
      expect(cssContent).toMatch(/--color-text/);
      expect(cssContent).toMatch(/--color-text-light/);
      expect(cssContent).toMatch(/--color-text-lighter/);
    });

    test('font smoothing should be enabled', () => {
      expect(cssContent).toMatch(/-webkit-font-smoothing/);
      expect(cssContent).toMatch(/-moz-osx-font-smoothing/);
    });

    test('text should have sufficient color contrast', () => {
      expect(cssContent).toMatch(/color:\s*var\(--color-text/);
    });
  });

  describe('Responsive Typography Adjustments', () => {
    test('should adjust heading sizes for mobile (max-width: 768px)', () => {
      const mobileQuery = cssContent.match(/@media screen and \(max-width: 768px\)[\s\S]*?{[\s\S]*?--font-size-h1/);
      expect(mobileQuery).toBeTruthy();
    });

    test('should adjust heading sizes for small mobile (max-width: 480px)', () => {
      const smallMobileQuery = cssContent.match(/@media screen and \(max-width: 480px\)[\s\S]*?{[\s\S]*?--font-size-h1/);
      expect(smallMobileQuery).toBeTruthy();
    });

    test('should maintain minimum 14px in all responsive breakpoints', () => {
      const allMediaQueries = cssContent.match(/@media[\s\S]*?{[\s\S]*?}/g) || [];
      
      allMediaQueries.forEach(query => {
        if (query.includes('--font-size-small')) {
          expect(query).toMatch(/--font-size-small:\s*14px/);
        }
      });
    });
  });
});
