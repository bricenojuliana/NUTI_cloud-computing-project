/**
 * Task 3.5 Verification Tests
 * 
 * Validates that content sections are properly styled:
 * - Summary section with positioning in upper third
 * - Education entries with clear hierarchy
 * - Skills with visual tags/badges and category grouping
 * - Project cards with clear separation
 * - Contact section with distinct visual treatment
 * 
 * Requirements: 2.2, 3.2, 4.2, 4.3, 5.1, 6.4
 */

const fs = require('fs');
const path = require('path');

describe('Task 3.5: Content Section Styling', () => {
  let cssContent;
  let htmlContent;

  beforeAll(() => {
    const cssPath = path.join(__dirname, '../css/styles.css');
    const htmlPath = path.join(__dirname, '../index.html');
    
    expect(fs.existsSync(cssPath)).toBe(true);
    expect(fs.existsSync(htmlPath)).toBe(true);
    
    cssContent = fs.readFileSync(cssPath, 'utf-8');
    htmlContent = fs.readFileSync(htmlPath, 'utf-8');
  });

  describe('Summary Section Styling (Requirement 2.2)', () => {
    test('should have #summary section in HTML', () => {
      expect(htmlContent).toMatch(/<section[^>]*id=["']summary["']/);
    });

    test('should have distinct background styling for summary', () => {
      expect(cssContent).toMatch(/#summary\s*{/);
      const summaryBlock = cssContent.match(/#summary\s*{[^}]*}/s);
      expect(summaryBlock).toBeTruthy();
      expect(summaryBlock[0]).toMatch(/background/);
    });

    test('should have padding for visual separation', () => {
      const summaryBlock = cssContent.match(/#summary\s*{[^}]*}/s);
      expect(summaryBlock).toBeTruthy();
      expect(summaryBlock[0]).toMatch(/padding/);
    });

    test('should have border radius for modern look', () => {
      const summaryBlock = cssContent.match(/#summary\s*{[^}]*}/s);
      expect(summaryBlock).toBeTruthy();
      expect(summaryBlock[0]).toMatch(/border-radius/);
    });

    test('should have box shadow or border for depth', () => {
      const summaryBlock = cssContent.match(/#summary\s*{[^}]*}/s);
      expect(summaryBlock).toBeTruthy();
      const hasBoxShadow = summaryBlock[0].includes('box-shadow');
      const hasBorder = summaryBlock[0].includes('border');
      expect(hasBoxShadow || hasBorder).toBe(true);
    });

    test('summary should be positioned after header in HTML', () => {
      const headerIndex = htmlContent.indexOf('<header');
      const summaryIndex = htmlContent.indexOf('id="summary"');
      expect(summaryIndex).toBeGreaterThan(headerIndex);
      expect(summaryIndex).toBeGreaterThan(0);
    });
  });

  describe('Education Section Styling (Requirement 3.2)', () => {
    test('should have education-entry class in HTML', () => {
      expect(htmlContent).toMatch(/class=["']education-entry["']/);
    });

    test('should have card-like styling for education entries', () => {
      expect(cssContent).toMatch(/\.education-entry\s*{/);
      const entryBlock = cssContent.match(/\.education-entry\s*{[^}]*}/s);
      expect(entryBlock).toBeTruthy();
      expect(entryBlock[0]).toMatch(/padding/);
    });

    test('should have border or background for education entries', () => {
      const entryBlock = cssContent.match(/\.education-entry\s*{[^}]*}/s);
      expect(entryBlock).toBeTruthy();
      const hasBorder = entryBlock[0].includes('border');
      const hasBackground = entryBlock[0].includes('background');
      expect(hasBorder || hasBackground).toBe(true);
    });

    test('should have hover effects for education entries', () => {
      expect(cssContent).toMatch(/\.education-entry:hover/);
    });

    test('should style institution class', () => {
      expect(cssContent).toMatch(/\.institution/);
      expect(htmlContent).toMatch(/class=["']institution["']/);
    });

    test('should style field class', () => {
      expect(cssContent).toMatch(/\.field/);
      expect(htmlContent).toMatch(/class=["']field["']/);
    });

    test('should style year class distinctly', () => {
      expect(cssContent).toMatch(/\.year/);
      expect(htmlContent).toMatch(/class=["']year["']/);
      const yearBlock = cssContent.match(/\.education-entry\s+\.year\s*{[^}]*}/s);
      expect(yearBlock).toBeTruthy();
    });

    test('should have clear hierarchy with h3 for degree titles', () => {
      expect(cssContent).toMatch(/\.education-entry\s+h3/);
    });
  });

  describe('Skills Section Styling (Requirements 4.2, 4.3)', () => {
    test('should have skill-category class in HTML', () => {
      expect(htmlContent).toMatch(/class=["']skill-category["']/);
    });

    test('should have skill-group class in HTML', () => {
      expect(htmlContent).toMatch(/class=["']skill-group["']/);
    });

    test('should style skill categories with card-like appearance', () => {
      expect(cssContent).toMatch(/\.skill-category\s*{/);
      const categoryBlock = cssContent.match(/\.skill-category\s*{[^}]*}/s);
      expect(categoryBlock).toBeTruthy();
      expect(categoryBlock[0]).toMatch(/padding/);
    });

    test('should have category headings styled', () => {
      expect(cssContent).toMatch(/\.skill-category\s+h3/);
    });

    test('should style skill tags as visual badges', () => {
      expect(cssContent).toMatch(/\.skill\s*{/);
      const skillBlock = cssContent.match(/\.skill\s*{[^}]*}/s);
      expect(skillBlock).toBeTruthy();
      
      // Should have padding
      expect(skillBlock[0]).toMatch(/padding/);
      
      // Should have background color
      expect(skillBlock[0]).toMatch(/background/);
      
      // Should have border radius for badge look
      expect(skillBlock[0]).toMatch(/border-radius/);
    });

    test('should have hover effects for skill tags', () => {
      expect(cssContent).toMatch(/\.skill:hover/);
    });

    test('should display skills inline', () => {
      const skillBlock = cssContent.match(/\.skill\s*{[^}]*}/s);
      expect(skillBlock).toBeTruthy();
      expect(skillBlock[0]).toMatch(/display:\s*inline-block/);
    });

    test('should have skills container with grid layout', () => {
      expect(cssContent).toMatch(/\.skills-container/);
      const containerBlock = cssContent.match(/\.skills-container\s*{[^}]*}/s);
      expect(containerBlock).toBeTruthy();
      expect(containerBlock[0]).toMatch(/display:\s*grid/);
    });
  });

  describe('Projects Section Styling (Requirement 5.1)', () => {
    test('should have project class in HTML', () => {
      expect(htmlContent).toMatch(/class=["']project["']/);
    });

    test('should have project cards with clear separation', () => {
      expect(cssContent).toMatch(/\.project\s*{/);
      const projectBlock = cssContent.match(/\.project\s*{[^}]*}/s);
      expect(projectBlock).toBeTruthy();
      
      // Should have padding
      expect(projectBlock[0]).toMatch(/padding/);
      
      // Should have border or box shadow for separation
      const hasBorder = projectBlock[0].includes('border');
      const hasBoxShadow = projectBlock[0].includes('box-shadow');
      expect(hasBorder || hasBoxShadow).toBe(true);
      
      // Should have background
      expect(projectBlock[0]).toMatch(/background/);
    });

    test('should have hover effects for project cards', () => {
      expect(cssContent).toMatch(/\.project:hover/);
    });

    test('should style project headings', () => {
      expect(cssContent).toMatch(/\.project\s+h3/);
    });

    test('should style project descriptions', () => {
      expect(cssContent).toMatch(/\.project-description/);
      expect(htmlContent).toMatch(/class=["']project-description["']/);
    });

    test('should style technologies distinctly', () => {
      expect(cssContent).toMatch(/\.technologies/);
      expect(htmlContent).toMatch(/class=["']technologies["']/);
      const techBlock = cssContent.match(/\.technologies\s*{[^}]*}/s);
      expect(techBlock).toBeTruthy();
    });

    test('should style project links as buttons', () => {
      const projectLinkBlock = cssContent.match(/\.project\s+a\s*{[^}]*}/s);
      expect(projectLinkBlock).toBeTruthy();
      expect(projectLinkBlock[0]).toMatch(/padding/);
      expect(projectLinkBlock[0]).toMatch(/background/);
    });

    test('should have hover effects for project links', () => {
      expect(cssContent).toMatch(/\.project\s+a:hover/);
    });
  });

  describe('Contact Section Styling (Requirement 6.4)', () => {
    test('should have contact section in HTML', () => {
      expect(htmlContent).toMatch(/<section[^>]*id=["']contact["']/);
    });

    test('should have distinct visual treatment', () => {
      expect(cssContent).toMatch(/#contact\s*{/);
      const contactBlock = cssContent.match(/#contact\s*{[^}]*}/s);
      expect(contactBlock).toBeTruthy();
      
      // Should have background color
      expect(contactBlock[0]).toMatch(/background/);
      
      // Should have padding
      expect(contactBlock[0]).toMatch(/padding/);
    });

    test('should have border radius for modern look', () => {
      const contactBlock = cssContent.match(/#contact\s*{[^}]*}/s);
      expect(contactBlock).toBeTruthy();
      expect(contactBlock[0]).toMatch(/border-radius/);
    });

    test('should center contact information', () => {
      const contactBlock = cssContent.match(/#contact\s*{[^}]*}/s);
      expect(contactBlock).toBeTruthy();
      expect(contactBlock[0]).toMatch(/text-align:\s*center/);
    });

    test('should style contact heading distinctly', () => {
      expect(cssContent).toMatch(/#contact\s+h2/);
    });

    test('should have contact-info container', () => {
      expect(cssContent).toMatch(/\.contact-info/);
      expect(htmlContent).toMatch(/class=["']contact-info["']/);
    });

    test('should use flexbox for contact-info layout', () => {
      const contactInfoBlock = cssContent.match(/\.contact-info\s*{[^}]*}/s);
      expect(contactInfoBlock).toBeTruthy();
      expect(contactInfoBlock[0]).toMatch(/display:\s*flex/);
    });

    test('should style contact links prominently', () => {
      const contactLinkBlock = cssContent.match(/\.contact-info\s+a\s*{[^}]*}/s);
      expect(contactLinkBlock).toBeTruthy();
      expect(contactLinkBlock[0]).toMatch(/padding/);
      expect(contactLinkBlock[0]).toMatch(/background/);
    });

    test('should have hover effects for contact links', () => {
      expect(cssContent).toMatch(/\.contact-info\s+a:hover/);
    });
  });

  describe('Overall Section Styling', () => {
    test('all main sections should have proper spacing', () => {
      expect(cssContent).toMatch(/section\s*{/);
      const sectionBlock = cssContent.match(/section\s*{[^}]*}/s);
      expect(sectionBlock).toBeTruthy();
      const hasPadding = sectionBlock[0].includes('padding');
      const hasMargin = sectionBlock[0].includes('margin');
      expect(hasPadding || hasMargin).toBe(true);
    });

    test('section headings should be styled consistently', () => {
      expect(cssContent).toMatch(/h2\s*{/);
    });

    test('should have responsive adjustments for mobile', () => {
      expect(cssContent).toMatch(/@media[^{]*max-width:\s*767px/);
    });

    test('should have responsive adjustments for tablet and desktop', () => {
      expect(cssContent).toMatch(/@media[^{]*min-width:\s*768px/);
    });
  });
});
