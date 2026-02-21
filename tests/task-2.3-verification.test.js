/**
 * Verification tests for Task 2.3: Professional Summary Section
 * Requirements: 2.1, 2.2
 */

const fs = require('fs');
const path = require('path');

describe('Task 2.3: Professional Summary Section', () => {
  let htmlContent;

  beforeAll(() => {
    htmlContent = fs.readFileSync(path.join(__dirname, '../index.html'), 'utf-8');
  });

  test('should have a section element with id="summary"', () => {
    const sectionRegex = /<section\s+id=["']summary["']/;
    expect(htmlContent).toMatch(sectionRegex);
  });

  test('should have an h2 heading in the summary section', () => {
    const summarySection = htmlContent.match(/<section\s+id=["']summary["'][^>]*>([\s\S]*?)<\/section>/);
    expect(summarySection).toBeTruthy();
    expect(summarySection[1]).toMatch(/<h2>/);
  });

  test('should have a paragraph with summary text', () => {
    const summarySection = htmlContent.match(/<section\s+id=["']summary["'][^>]*>([\s\S]*?)<\/section>/);
    expect(summarySection).toBeTruthy();
    expect(summarySection[1]).toMatch(/<p>/);
  });

  test('summary text should be between 50 and 500 characters (Requirement 2.1)', () => {
    const summarySection = htmlContent.match(/<section\s+id=["']summary["'][^>]*>([\s\S]*?)<\/section>/);
    const paragraphMatch = summarySection[1].match(/<p[^>]*>(.*?)<\/p>/);
    expect(paragraphMatch).toBeTruthy();
    
    const summaryText = paragraphMatch[1].trim();
    expect(summaryText.length).toBeGreaterThanOrEqual(50);
    expect(summaryText.length).toBeLessThanOrEqual(500);
  });

  test('summary section should be positioned in upper third of page structure (Requirement 2.2)', () => {
    // Verify summary section comes after header and before other major sections
    const headerIndex = htmlContent.indexOf('<header');
    const summaryIndex = htmlContent.indexOf('<section id="summary"');
    const educationIndex = htmlContent.indexOf('<section id="education"');
    
    expect(summaryIndex).toBeGreaterThan(headerIndex);
    expect(summaryIndex).toBeLessThan(educationIndex);
    
    // Verify it's one of the first sections (upper third positioning)
    const allSections = htmlContent.match(/<section/g);
    const summaryPosition = htmlContent.substring(0, summaryIndex).match(/<section/g);
    
    // Summary should be the first section (position 0 in sections array)
    expect(summaryPosition).toBeNull(); // No sections before summary
  });
});
