/**
 * Task 3.2 Verification Tests: Layout System
 * 
 * Tests for:
 * - Container with max-width and centering
 * - Section spacing and padding
 * - Flexbox/Grid for responsive layout
 * 
 * Requirements: 7.1, 7.2, 7.3
 */

const fs = require('fs');
const path = require('path');

describe('Task 3.2: Layout System', () => {
  let cssContent;

  beforeAll(() => {
    const cssPath = path.join(__dirname, '..', 'css', 'styles.css');
    cssContent = fs.readFileSync(cssPath, 'utf-8');
  });

  describe('Container with max-width and centering', () => {
    test('should define container max-width variable', () => {
      expect(cssContent).toMatch(/--container-max-width:\s*\d+px/);
    });

    test('should apply max-width to body', () => {
      expect(cssContent).toMatch(/body\s*{[^}]*max-width:\s*var\(--container-max-width\)/s);
    });

    test('should center body with auto margins', () => {
      expect(cssContent).toMatch(/body\s*{[^}]*margin:\s*[^;]*auto/s);
    });

    test('should have container padding', () => {
      expect(cssContent).toMatch(/body\s*{[^}]*padding:/s);
    });
  });

  describe('Section spacing and padding', () => {
    test('should define section padding', () => {
      expect(cssContent).toMatch(/section\s*{[^}]*padding:/s);
    });

    test('should define section margin-bottom', () => {
      expect(cssContent).toMatch(/section\s*{[^}]*margin-bottom:/s);
    });

    test('should define header padding', () => {
      expect(cssContent).toMatch(/header\s*{[^}]*padding:/s);
    });

    test('should define header margin-bottom', () => {
      expect(cssContent).toMatch(/header\s*{[^}]*margin-bottom:/s);
    });

    test('should use spacing variables', () => {
      expect(cssContent).toMatch(/var\(--spacing-(xs|sm|md|lg|xl|xxl)\)/);
    });
  });

  describe('Flexbox/Grid for responsive layout', () => {
    test('should use flexbox for header', () => {
      expect(cssContent).toMatch(/header\s*{[^}]*display:\s*flex/s);
    });

    test('should use grid for skills container', () => {
      expect(cssContent).toMatch(/\.skills-container\s*{[^}]*display:\s*grid/s);
    });

    test('should define grid-template-columns for skills', () => {
      expect(cssContent).toMatch(/\.skills-container\s*{[^}]*grid-template-columns:/s);
    });

    test('should use flexbox for skill groups', () => {
      expect(cssContent).toMatch(/\.skill-group\s*{[^}]*display:\s*flex/s);
    });

    test('should use flex-wrap for skill groups', () => {
      expect(cssContent).toMatch(/\.skill-group\s*{[^}]*flex-wrap:\s*wrap/s);
    });

    test('should use flexbox for education entries', () => {
      expect(cssContent).toMatch(/#education\s*{[^}]*display:\s*flex/s);
    });

    test('should use flexbox for projects', () => {
      expect(cssContent).toMatch(/#projects\s*{[^}]*display:\s*flex/s);
    });

    test('should use flexbox for contact info', () => {
      expect(cssContent).toMatch(/\.contact-info\s*{[^}]*display:\s*flex/s);
    });
  });

  describe('Responsive breakpoints (Requirement 7.1, 7.2, 7.3)', () => {
    test('should have media query for 768px breakpoint', () => {
      expect(cssContent).toMatch(/@media\s+screen\s+and\s+\(min-width:\s*768px\)/);
    });

    test('should have media query for max-width 767px (vertical stacking)', () => {
      expect(cssContent).toMatch(/@media\s+screen\s+and\s+\(max-width:\s*767px\)/);
    });

    test('should have media query for 1024px breakpoint', () => {
      expect(cssContent).toMatch(/@media\s+screen\s+and\s+\(min-width:\s*1024px\)/);
    });

    test('should have media query for 1920px breakpoint', () => {
      expect(cssContent).toMatch(/@media\s+screen\s+and\s+\(min-width:\s*1920px\)/);
    });

    test('should have media query for 480px (small mobile)', () => {
      expect(cssContent).toMatch(/@media\s+screen\s+and\s+\(max-width:\s*480px\)/);
    });
  });

  describe('Vertical stacking below 768px (Requirement 7.3)', () => {
    test('should force single column for skills container on mobile', () => {
      const mobileMediaQuery = cssContent.match(/@media\s+screen\s+and\s+\(max-width:\s*767px\)\s*{[^}]*}/s);
      expect(mobileMediaQuery).toBeTruthy();
      expect(cssContent).toMatch(/@media\s+screen\s+and\s+\(max-width:\s*767px\)[^@]*\.skills-container\s*{[^}]*grid-template-columns:\s*1fr/s);
    });

    test('should use column direction for contact info on mobile', () => {
      expect(cssContent).toMatch(/@media\s+screen\s+and\s+\(max-width:\s*767px\)[^@]*\.contact-info\s*{[^}]*flex-direction:\s*column/s);
    });
  });

  describe('Gap spacing', () => {
    test('should define gap for header', () => {
      expect(cssContent).toMatch(/header\s*{[^}]*gap:/s);
    });

    test('should define gap for skills container', () => {
      expect(cssContent).toMatch(/\.skills-container\s*{[^}]*gap:/s);
    });

    test('should define gap for skill groups', () => {
      expect(cssContent).toMatch(/\.skill-group\s*{[^}]*gap:/s);
    });

    test('should define gap for education', () => {
      expect(cssContent).toMatch(/#education\s*{[^}]*gap:/s);
    });

    test('should define gap for projects', () => {
      expect(cssContent).toMatch(/#projects\s*{[^}]*gap:/s);
    });

    test('should define gap for contact info', () => {
      expect(cssContent).toMatch(/\.contact-info\s*{[^}]*gap:/s);
    });
  });
});
