/**
 * Task 2.4 Verification Tests: Education Section
 * 
 * Validates:
 * - Section element with id="education" exists
 * - h2 heading is present
 * - Each degree entry includes: institution, degree title, field of study, and year
 * - Multiple entries are ordered in reverse chronological order
 * 
 * Requirements: 3.1, 3.2, 3.3
 */

const fs = require('fs');
const path = require('path');

describe('Task 2.4: Education Section Implementation', () => {
  let htmlContent;

  beforeAll(() => {
    htmlContent = fs.readFileSync(path.join(__dirname, '../index.html'), 'utf8');
  });

  describe('Section Structure', () => {
    test('should have section element with id="education"', () => {
      expect(htmlContent).toMatch(/<section[^>]*id="education"/);
    });

    test('should have h2 heading in education section', () => {
      const educationSectionMatch = htmlContent.match(/<section[^>]*id="education"[^>]*>([\s\S]*?)<\/section>/);
      expect(educationSectionMatch).toBeTruthy();
      expect(educationSectionMatch[1]).toMatch(/<h2>/);
    });

    test('should have at least one education entry', () => {
      const educationSectionMatch = htmlContent.match(/<section[^>]*id="education"[^>]*>([\s\S]*?)<\/section>/);
      expect(educationSectionMatch).toBeTruthy();
      const entryMatches = educationSectionMatch[1].match(/class="education-entry"/g);
      expect(entryMatches).toBeTruthy();
      expect(entryMatches.length).toBeGreaterThanOrEqual(1);
    });
  });

  describe('Degree Entry Completeness (Requirement 3.1, 3.3)', () => {
    test('each entry should have institution name', () => {
      const educationSectionMatch = htmlContent.match(/<section[^>]*id="education"[^>]*>([\s\S]*?)<\/section>/);
      expect(educationSectionMatch).toBeTruthy();
      
      const entryMatches = educationSectionMatch[1].match(/<div class="education-entry">([\s\S]*?)<\/div>/g);
      expect(entryMatches).toBeTruthy();
      
      entryMatches.forEach(entry => {
        expect(entry).toMatch(/class="institution"/);
      });
    });

    test('each entry should have degree title (h3)', () => {
      const educationSectionMatch = htmlContent.match(/<section[^>]*id="education"[^>]*>([\s\S]*?)<\/section>/);
      expect(educationSectionMatch).toBeTruthy();
      
      const entryMatches = educationSectionMatch[1].match(/<div class="education-entry">([\s\S]*?)<\/div>/g);
      expect(entryMatches).toBeTruthy();
      
      entryMatches.forEach(entry => {
        expect(entry).toMatch(/<h3>/);
      });
    });

    test('each entry should have field of study (Requirement 3.3)', () => {
      const educationSectionMatch = htmlContent.match(/<section[^>]*id="education"[^>]*>([\s\S]*?)<\/section>/);
      expect(educationSectionMatch).toBeTruthy();
      
      const entryMatches = educationSectionMatch[1].match(/<div class="education-entry">([\s\S]*?)<\/div>/g);
      expect(entryMatches).toBeTruthy();
      
      entryMatches.forEach(entry => {
        expect(entry).toMatch(/class="field"/);
      });
    });

    test('each entry should have year', () => {
      const educationSectionMatch = htmlContent.match(/<section[^>]*id="education"[^>]*>([\s\S]*?)<\/section>/);
      expect(educationSectionMatch).toBeTruthy();
      
      const entryMatches = educationSectionMatch[1].match(/<div class="education-entry">([\s\S]*?)<\/div>/g);
      expect(entryMatches).toBeTruthy();
      
      entryMatches.forEach(entry => {
        expect(entry).toMatch(/class="year"/);
      });
    });
  });

  describe('Reverse Chronological Order (Requirement 3.2)', () => {
    test('multiple degrees should be ordered in reverse chronological order', () => {
      const educationSectionMatch = htmlContent.match(/<section[^>]*id="education"[^>]*>([\s\S]*?)<\/section>/);
      expect(educationSectionMatch).toBeTruthy();
      
      const entryMatches = educationSectionMatch[1].match(/<div class="education-entry">([\s\S]*?)<\/div>/g);
      
      if (entryMatches && entryMatches.length > 1) {
        const years = entryMatches.map(entry => {
          const yearMatch = entry.match(/class="year"[^>]*>(\d{4})/);
          return yearMatch ? parseInt(yearMatch[1]) : 0;
        });

        // Verify years are in descending order (most recent first)
        for (let i = 0; i < years.length - 1; i++) {
          expect(years[i]).toBeGreaterThanOrEqual(years[i + 1]);
        }
      }
    });
  });

  describe('HTML Structure Quality', () => {
    test('should use semantic HTML section element', () => {
      expect(htmlContent).toMatch(/<section[^>]*id="education"/);
    });

    test('should have structured entries with education-entry class', () => {
      const educationSectionMatch = htmlContent.match(/<section[^>]*id="education"[^>]*>([\s\S]*?)<\/section>/);
      expect(educationSectionMatch).toBeTruthy();
      
      const entryMatches = educationSectionMatch[1].match(/class="education-entry"/g);
      expect(entryMatches).toBeTruthy();
      expect(entryMatches.length).toBeGreaterThanOrEqual(1);
    });
  });
});
