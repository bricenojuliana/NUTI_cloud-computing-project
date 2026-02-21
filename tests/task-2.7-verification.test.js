/**
 * Task 2.7 Verification Test: Contact Section
 * 
 * Validates:
 * - Section element with id="contact" exists
 * - h2 heading is present
 * - Contact methods are included
 * - mailto: link for email
 * - target="_blank" for social media links
 * 
 * Requirements: 6.1, 6.2, 6.3, 6.4
 */

const fs = require('fs');
const path = require('path');

describe('Task 2.7: Contact Section Implementation', () => {
  let htmlContent;
  let contactSection;

  beforeAll(() => {
    htmlContent = fs.readFileSync(path.join(__dirname, '../index.html'), 'utf-8');
    const contactMatch = htmlContent.match(/<section\s+id=["']contact["'][^>]*>([\s\S]*?)<\/section>/);
    contactSection = contactMatch ? contactMatch[1] : null;
  });

  test('Contact section element with id="contact" exists', () => {
    const sectionRegex = /<section\s+id=["']contact["']/;
    expect(htmlContent).toMatch(sectionRegex);
  });

  test('Contact section has h2 heading', () => {
    expect(contactSection).toBeTruthy();
    expect(contactSection).toMatch(/<h2>/);
  });

  test('Contact section has at least one contact method (Requirement 6.1)', () => {
    expect(contactSection).toBeTruthy();
    const links = contactSection.match(/<a\s+[^>]*href=/g);
    expect(links).toBeTruthy();
    expect(links.length).toBeGreaterThanOrEqual(1);
  });

  test('Email link uses mailto: protocol (Requirement 6.2)', () => {
    expect(contactSection).toBeTruthy();
    const mailtoRegex = /<a\s+[^>]*href=["']mailto:/;
    expect(contactSection).toMatch(mailtoRegex);
  });

  test('Social media links have target="_blank" attribute (Requirement 6.3)', () => {
    expect(contactSection).toBeTruthy();
    
    // Find all links that are NOT mailto links
    const allLinks = contactSection.match(/<a\s+[^>]*>/g) || [];
    const externalLinks = allLinks.filter(link => !link.includes('mailto:'));
    
    expect(externalLinks.length).toBeGreaterThanOrEqual(1);
    
    // Each external link should have target="_blank"
    externalLinks.forEach(link => {
      expect(link).toMatch(/target=["']_blank["']/);
    });
  });

  test('Contact section is clearly identifiable (Requirement 6.4)', () => {
    expect(contactSection).toBeTruthy();
    
    // Verify it has heading
    expect(contactSection).toMatch(/<h2>/);
    
    // Verify it has contact-info container
    expect(contactSection).toMatch(/class=["']contact-info["']/);
  });

  test('External links have rel="noopener noreferrer" for security', () => {
    expect(contactSection).toBeTruthy();
    
    // Find all links with target="_blank"
    const externalLinkMatches = contactSection.match(/<a\s+[^>]*target=["']_blank["'][^>]*>/g) || [];
    
    expect(externalLinkMatches.length).toBeGreaterThanOrEqual(1);
    
    // Each should have rel with noopener and noreferrer
    externalLinkMatches.forEach(link => {
      expect(link).toMatch(/rel=["'][^"']*noopener[^"']*["']/);
      expect(link).toMatch(/rel=["'][^"']*noreferrer[^"']*["']/);
    });
  });

  test('Contact section contains expected contact methods', () => {
    expect(contactSection).toBeTruthy();
    
    // Check for email (mailto:)
    expect(contactSection).toMatch(/mailto:/);
    
    // Check for LinkedIn
    expect(contactSection.toLowerCase()).toMatch(/linkedin/);
    
    // Check for GitHub
    expect(contactSection.toLowerCase()).toMatch(/github/);
  });
});
