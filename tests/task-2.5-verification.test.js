/**
 * Task 2.5 Verification Tests: Skills Section
 * 
 * Validates:
 * - Section element with id="skills" exists
 * - h2 heading is present
 * - Minimum 3 skills are displayed
 * - Skills are grouped by category when more than 5 skills are present
 * 
 * Requirements: 4.1, 4.2, 4.3
 */

const fs = require('fs');
const path = require('path');

describe('Task 2.5: Skills Section Implementation', () => {
  let htmlContent;

  beforeAll(() => {
    htmlContent = fs.readFileSync(path.join(__dirname, '../index.html'), 'utf8');
  });

  describe('Section Structure (Requirement 4.3)', () => {
    test('should have section element with id="skills"', () => {
      expect(htmlContent).toMatch(/<section[^>]*id="skills"/);
    });

    test('should have h2 heading in skills section', () => {
      const skillsSectionMatch = htmlContent.match(/<section[^>]*id="skills"[^>]*>([\s\S]*?)<\/section>/);
      expect(skillsSectionMatch).toBeTruthy();
      expect(skillsSectionMatch[1]).toMatch(/<h2>/);
    });

    test('should have skills-container element', () => {
      const skillsSectionMatch = htmlContent.match(/<section[^>]*id="skills"[^>]*>([\s\S]*?)<\/section>/);
      expect(skillsSectionMatch).toBeTruthy();
      expect(skillsSectionMatch[1]).toMatch(/class="skills-container"/);
    });
  });

  describe('Minimum Skills Requirement (Requirement 4.1)', () => {
    test('should display at least 3 skills', () => {
      const skillsSectionMatch = htmlContent.match(/<section[^>]*id="skills"[^>]*>([\s\S]*?)<\/section>/);
      expect(skillsSectionMatch).toBeTruthy();
      
      const skillMatches = skillsSectionMatch[1].match(/class="skill"/g);
      expect(skillMatches).toBeTruthy();
      expect(skillMatches.length).toBeGreaterThanOrEqual(3);
    });
  });

  describe('Skill Grouping (Requirement 4.2)', () => {
    test('should group skills by category when more than 5 skills are present', () => {
      const skillsSectionMatch = htmlContent.match(/<section[^>]*id="skills"[^>]*>([\s\S]*?)<\/section>/);
      expect(skillsSectionMatch).toBeTruthy();
      
      const skillMatches = skillsSectionMatch[1].match(/class="skill"/g);
      const skillCount = skillMatches ? skillMatches.length : 0;
      
      if (skillCount > 5) {
        // When more than 5 skills, should have category grouping
        const categoryMatches = skillsSectionMatch[1].match(/class="skill-category"/g);
        expect(categoryMatches).toBeTruthy();
        expect(categoryMatches.length).toBeGreaterThanOrEqual(1);
        
        // Each category should have a heading (h3)
        const categoryHeadings = skillsSectionMatch[1].match(/<div class="skill-category">([\s\S]*?)<\/div>\s*<\/div>/g);
        if (categoryHeadings) {
          categoryHeadings.forEach(category => {
            expect(category).toMatch(/<h3>/);
          });
        }
      }
    });

    test('should have skill-group elements when categories are present', () => {
      const skillsSectionMatch = htmlContent.match(/<section[^>]*id="skills"[^>]*>([\s\S]*?)<\/section>/);
      expect(skillsSectionMatch).toBeTruthy();
      
      const categoryMatches = skillsSectionMatch[1].match(/class="skill-category"/g);
      
      if (categoryMatches && categoryMatches.length > 0) {
        // When categories exist, should have skill-group elements
        const skillGroupMatches = skillsSectionMatch[1].match(/class="skill-group"/g);
        expect(skillGroupMatches).toBeTruthy();
        expect(skillGroupMatches.length).toBeGreaterThanOrEqual(1);
      }
    });
  });

  describe('Visual Distinction (Requirement 4.3)', () => {
    test('should use visually distinct section with clear labels', () => {
      const skillsSectionMatch = htmlContent.match(/<section[^>]*id="skills"[^>]*>([\s\S]*?)<\/section>/);
      expect(skillsSectionMatch).toBeTruthy();
      
      // Should have clear section heading
      expect(skillsSectionMatch[1]).toMatch(/<h2>/);
      
      // Skills should have distinct class for styling
      expect(skillsSectionMatch[1]).toMatch(/class="skill"/);
    });

    test('each skill should be wrapped in a span with skill class', () => {
      const skillsSectionMatch = htmlContent.match(/<section[^>]*id="skills"[^>]*>([\s\S]*?)<\/section>/);
      expect(skillsSectionMatch).toBeTruthy();
      
      const skillMatches = skillsSectionMatch[1].match(/<span class="skill">[^<]+<\/span>/g);
      expect(skillMatches).toBeTruthy();
      expect(skillMatches.length).toBeGreaterThanOrEqual(3);
    });
  });

  describe('HTML Structure Quality', () => {
    test('should use semantic HTML section element', () => {
      expect(htmlContent).toMatch(/<section[^>]*id="skills"/);
    });

    test('should have proper nesting structure', () => {
      const skillsSectionMatch = htmlContent.match(/<section[^>]*id="skills"[^>]*>([\s\S]*?)<\/section>/);
      expect(skillsSectionMatch).toBeTruthy();
      
      // Should have container
      expect(skillsSectionMatch[1]).toMatch(/class="skills-container"/);
      
      // Should have skills
      expect(skillsSectionMatch[1]).toMatch(/class="skill"/);
    });
  });
});
