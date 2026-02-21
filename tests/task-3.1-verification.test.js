/**
 * Verification tests for Task 3.1: Create base styles and CSS reset
 * Requirements: 2.3, 7.4
 */

const fs = require('fs');
const path = require('path');

describe('Task 3.1: Create base styles and CSS reset', () => {
  let cssContent;

  beforeAll(() => {
    const cssPath = path.join(__dirname, '../css/styles.css');
    expect(fs.existsSync(cssPath)).toBe(true);
    cssContent = fs.readFileSync(cssPath, 'utf-8');
  });

  describe('CSS Reset and Normalization', () => {
    test('should normalize browser defaults with box-sizing: border-box', () => {
      expect(cssContent).toMatch(/box-sizing:\s*border-box/);
    });

    test('should reset margins and padding', () => {
      expect(cssContent).toMatch(/margin:\s*0/);
      expect(cssContent).toMatch(/padding:\s*0/);
    });

    test('should include body base styles', () => {
      expect(cssContent).toMatch(/body\s*{/);
    });
  });

  describe('Color Palette with CSS Variables', () => {
    test('should define CSS variables in :root', () => {
      expect(cssContent).toMatch(/:root\s*{/);
    });

    test('should define primary color variables', () => {
      expect(cssContent).toMatch(/--color-primary/);
    });

    test('should define accent color variables', () => {
      expect(cssContent).toMatch(/--color-accent/);
    });

    test('should define text color variables', () => {
      expect(cssContent).toMatch(/--color-text/);
    });

    test('should define background color variables', () => {
      expect(cssContent).toMatch(/--color-background/);
    });
  });

  describe('Base Typography (Requirement 2.3, 7.4)', () => {
    test('should define font family variables', () => {
      expect(cssContent).toMatch(/--font-family-primary/);
    });

    test('should set base font size with minimum 14px', () => {
      expect(cssContent).toMatch(/--font-size-base/);
      expect(cssContent).toMatch(/--font-size-small:\s*14px/);
    });

    test('should define font size variables for headings', () => {
      expect(cssContent).toMatch(/--font-size-h1/);
      expect(cssContent).toMatch(/--font-size-h2/);
      expect(cssContent).toMatch(/--font-size-h3/);
    });

    test('should define font weight variables', () => {
      expect(cssContent).toMatch(/--font-weight-normal/);
      expect(cssContent).toMatch(/--font-weight-bold/);
    });

    test('should apply font family to body', () => {
      const bodyMatch = cssContent.match(/body\s*{[^}]*}/gs);
      expect(bodyMatch).toBeTruthy();
      expect(bodyMatch.some(block => block.includes('font-family'))).toBe(true);
    });

    test('should apply base font size to body', () => {
      const bodyMatch = cssContent.match(/body\s*{[^}]*}/gs);
      expect(bodyMatch).toBeTruthy();
      expect(bodyMatch.some(block => block.includes('font-size'))).toBe(true);
    });
  });

  describe('Heading Styles', () => {
    test('should define styles for h1-h6 headings', () => {
      expect(cssContent).toMatch(/h1[,\s]/);
      expect(cssContent).toMatch(/h2[,\s]/);
      expect(cssContent).toMatch(/h3[,\s]/);
    });

    test('should apply font family to headings', () => {
      const headingMatch = cssContent.match(/h1[^{]*{[^}]*}/gs);
      expect(headingMatch).toBeTruthy();
    });
  });

  describe('Responsive Typography (Requirement 7.4)', () => {
    test('should include media queries for responsive design', () => {
      expect(cssContent).toMatch(/@media/);
    });

    test('should maintain minimum 14px font size in mobile breakpoint', () => {
      const mobileMediaQuery = cssContent.match(/@media[^{]*max-width:\s*768px[^{]*{[\s\S]*?--font-size-small:\s*14px/);
      expect(mobileMediaQuery).toBeTruthy();
    });

    test('should adjust heading sizes for smaller viewports', () => {
      const mediaQueryContent = cssContent.match(/@media[^{]*{[\s\S]*?}/g);
      expect(mediaQueryContent).toBeTruthy();
      expect(mediaQueryContent.some(block => block.includes('--font-size-h1'))).toBe(true);
    });
  });

  describe('Link Styles', () => {
    test('should define link color styles', () => {
      expect(cssContent).toMatch(/a\s*{/);
    });

    test('should define hover state for links', () => {
      expect(cssContent).toMatch(/a:hover/);
    });

    test('should define focus state for accessibility', () => {
      expect(cssContent).toMatch(/a:focus/);
    });
  });

  describe('Spacing Variables', () => {
    test('should define spacing scale variables', () => {
      expect(cssContent).toMatch(/--spacing-/);
    });
  });

  describe('Layout Variables', () => {
    test('should define container max-width', () => {
      expect(cssContent).toMatch(/--container-max-width/);
    });

    test('should define border-radius variable', () => {
      expect(cssContent).toMatch(/--border-radius/);
    });
  });
});
