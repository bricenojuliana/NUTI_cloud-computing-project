/**
 * Task 2.6 Verification Tests: Projects Section
 * Validates Requirements 5.1, 5.2, 5.3, 5.4
 */

const fs = require('fs');
const path = require('path');

describe('Task 2.6: Projects Section', () => {
  let htmlContent;
  let projectsSection;

  beforeAll(() => {
    htmlContent = fs.readFileSync(path.join(__dirname, '../index.html'), 'utf-8');
    const sectionMatch = htmlContent.match(/<section\s+id=["']projects["'][^>]*>([\s\S]*?)<\/section>/);
    projectsSection = sectionMatch ? sectionMatch[1] : '';
  });

  describe('Requirement 5.1: Display at least one project with title and description', () => {
    test('should have a section element with id="projects"', () => {
      const sectionRegex = /<section\s+id=["']projects["']/;
      expect(htmlContent).toMatch(sectionRegex);
    });

    test('should have an h2 heading', () => {
      expect(projectsSection).toMatch(/<h2>/);
    });

    test('should have at least one project entry', () => {
      const projectMatches = projectsSection.match(/<div\s+class=["']project["']/g);
      expect(projectMatches).toBeTruthy();
      expect(projectMatches.length).toBeGreaterThanOrEqual(1);
    });

    test('each project should have a title (h3)', () => {
      const h3Matches = projectsSection.match(/<h3>/g);
      expect(h3Matches).toBeTruthy();
      expect(h3Matches.length).toBeGreaterThanOrEqual(1);
    });

    test('each project should have a description', () => {
      const descriptionMatches = projectsSection.match(/<p\s+class=["']project-description["']/g);
      expect(descriptionMatches).toBeTruthy();
      expect(descriptionMatches.length).toBeGreaterThanOrEqual(1);
    });
  });

  describe('Requirement 5.2: Clickable link that opens in a new tab', () => {
    test('project links should have target="_blank"', () => {
      const linkMatches = projectsSection.match(/<a\s+[^>]*href=["'][^"']+["'][^>]*>/g);
      if (linkMatches) {
        linkMatches.forEach(link => {
          expect(link).toMatch(/target=["']_blank["']/);
        });
      }
    });

    test('project links should have rel attribute for security', () => {
      const linkMatches = projectsSection.match(/<a\s+[^>]*href=["'][^"']+["'][^>]*>/g);
      if (linkMatches) {
        linkMatches.forEach(link => {
          expect(link).toMatch(/rel=["'][^"']*(?:noopener|noreferrer)[^"']*["']/);
        });
      }
    });
  });

  describe('Requirement 5.3: Include technologies used', () => {
    test('each project should list technologies', () => {
      const technologiesMatches = projectsSection.match(/<p\s+class=["']technologies["']/g);
      expect(technologiesMatches).toBeTruthy();
      expect(technologiesMatches.length).toBeGreaterThanOrEqual(1);
    });

    test('technologies should contain at least one technology name', () => {
      const techMatch = projectsSection.match(/<p\s+class=["']technologies["'][^>]*>(.*?)<\/p>/);
      expect(techMatch).toBeTruthy();
      const techText = techMatch[1].trim();
      // Should have content beyond just the label "Tecnologías:"
      expect(techText.length).toBeGreaterThan(10);
    });
  });

  describe('Requirement 5.4: Minimum description length of 50 characters', () => {
    test('each project description should have at least 50 characters', () => {
      const descriptionMatch = projectsSection.match(/<p\s+class=["']project-description["'][^>]*>(.*?)<\/p>/);
      expect(descriptionMatch).toBeTruthy();
      
      const descText = descriptionMatch[1].trim();
      expect(descText.length).toBeGreaterThanOrEqual(50);
    });
  });

  describe('Structure and Semantic HTML', () => {
    test('projects section should be properly structured', () => {
      expect(projectsSection).toBeTruthy();
      expect(projectsSection).toMatch(/<h2>/);
      expect(projectsSection).toMatch(/<div\s+class=["']project["']/);
    });

    test('project entries should have consistent structure', () => {
      // Each project should have: title (h3), description, technologies
      const h3Count = (projectsSection.match(/<h3>/g) || []).length;
      const descCount = (projectsSection.match(/<p\s+class=["']project-description["']/g) || []).length;
      const techCount = (projectsSection.match(/<p\s+class=["']technologies["']/g) || []).length;
      
      // All counts should match (one of each per project)
      expect(h3Count).toBeGreaterThan(0);
      expect(descCount).toBe(h3Count);
      expect(techCount).toBe(h3Count);
    });
  });
});
