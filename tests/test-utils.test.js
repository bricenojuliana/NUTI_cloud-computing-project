/**
 * Test Utilities Verification Tests
 * 
 * This test suite verifies that the test utilities are working correctly.
 * It tests the helper functions for DOM manipulation, viewport simulation,
 * and file size calculations.
 */

const {
  loadHTMLText,
  loadCSSText,
  extractTextContent,
  hasElementWithAttributes,
  getFileSize,
  getFileSizeKB,
  getFileSizeMB,
  calculateWebsiteSize,
  extractYear,
  isReverseChronological,
  getBreakpointName
} = require('./test-utils');

describe('Test Utilities Verification', () => {
  describe('Text-Based HTML Parsing Utilities', () => {
    test('loadHTMLText should load HTML file as text', () => {
      const html = loadHTMLText();
      
      expect(typeof html).toBe('string');
      expect(html.length).toBeGreaterThan(0);
      expect(html).toContain('<!DOCTYPE html>');
    });

    test('loadCSSText should load CSS file as text', () => {
      const css = loadCSSText();
      
      expect(typeof css).toBe('string');
      expect(css.length).toBeGreaterThan(0);
    });

    test('extractTextContent should extract text from HTML elements', () => {
      const html = loadHTMLText();
      const h1Text = extractTextContent(html, 'h1');
      
      expect(h1Text).toBeTruthy();
      expect(typeof h1Text).toBe('string');
      expect(h1Text.length).toBeGreaterThan(0);
    });

    test('extractTextContent should extract text from elements with ID', () => {
      const html = loadHTMLText();
      const summaryText = extractTextContent(html, '#summary');
      
      expect(summaryText).toBeTruthy();
      expect(typeof summaryText).toBe('string');
    });

    test('hasElementWithAttributes should find elements with specific attributes', () => {
      const html = loadHTMLText();
      const hasSummarySection = hasElementWithAttributes(html, 'section', { id: 'summary' });
      
      expect(hasSummarySection).toBe(true);
    });

    test('hasElementWithAttributes should find links with target="_blank"', () => {
      const html = loadHTMLText();
      const hasExternalLink = hasElementWithAttributes(html, 'a', { target: '_blank' });
      
      expect(hasExternalLink).toBe(true);
    });
  });

  describe('File Size Calculation Utilities', () => {
    test('getFileSize should return file size in bytes', () => {
      const size = getFileSize('../index.html');
      
      expect(typeof size).toBe('number');
      expect(size).toBeGreaterThan(0);
    });

    test('getFileSizeKB should return file size in kilobytes', () => {
      const sizeKB = getFileSizeKB('../index.html');
      
      expect(typeof sizeKB).toBe('number');
      expect(sizeKB).toBeGreaterThan(0);
    });

    test('getFileSizeMB should return file size in megabytes', () => {
      const sizeMB = getFileSizeMB('../index.html');
      
      expect(typeof sizeMB).toBe('number');
      expect(sizeMB).toBeGreaterThan(0);
    });

    test('calculateWebsiteSize should calculate total website size', () => {
      const result = calculateWebsiteSize();
      
      expect(result).toHaveProperty('totalBytes');
      expect(result).toHaveProperty('totalKB');
      expect(result).toHaveProperty('totalMB');
      expect(result).toHaveProperty('files');
      expect(Array.isArray(result.files)).toBe(true);
      expect(result.totalBytes).toBeGreaterThan(0);
      expect(result.totalMB).toBeLessThan(5); // Should be under 5MB
    });

    test('calculateWebsiteSize should exclude specified patterns', () => {
      const result = calculateWebsiteSize(['node_modules', 'tests', '.git']);
      
      // Check that no excluded files are in the list
      const hasNodeModules = result.files.some(f => f.path.includes('node_modules'));
      const hasTests = result.files.some(f => f.path.includes('tests'));
      
      expect(hasNodeModules).toBe(false);
      expect(hasTests).toBe(false);
    });
  });

  describe('Chronological Utilities', () => {
    test('extractYear should extract year from text', () => {
      expect(extractYear('Graduated in 2020')).toBe(2020);
      expect(extractYear('2019 - 2023')).toBe(2019);
      expect(extractYear('No year here')).toBeNull();
    });

    test('isReverseChronological should check chronological order', () => {
      expect(isReverseChronological([2023, 2020, 2018])).toBe(true);
      expect(isReverseChronological([2023, 2023, 2020])).toBe(true);
      expect(isReverseChronological([2018, 2020, 2023])).toBe(false);
      expect(isReverseChronological([2020])).toBe(true);
      expect(isReverseChronological([])).toBe(true);
    });
  });

  describe('Viewport Utilities', () => {
    test('getBreakpointName should identify correct breakpoint', () => {
      expect(getBreakpointName(320)).toBe('mobile');
      expect(getBreakpointName(767)).toBe('mobile');
      expect(getBreakpointName(768)).toBe('tablet');
      expect(getBreakpointName(1023)).toBe('tablet');
      expect(getBreakpointName(1024)).toBe('desktop');
      expect(getBreakpointName(1919)).toBe('desktop');
      expect(getBreakpointName(1920)).toBe('large');
    });
  });

  describe('Integration Tests', () => {
    test('utilities should work together for comprehensive testing', () => {
      // Load HTML
      const html = loadHTMLText();
      expect(html).toBeTruthy();
      
      // Extract content
      const h1Text = extractTextContent(html, 'h1');
      expect(h1Text).toBeTruthy();
      
      // Check attributes
      const hasSummary = hasElementWithAttributes(html, 'section', { id: 'summary' });
      expect(hasSummary).toBe(true);
      
      // Check file sizes
      const websiteSize = calculateWebsiteSize();
      expect(websiteSize.totalMB).toBeLessThan(5);
      
      // Check breakpoints
      const breakpoint = getBreakpointName(768);
      expect(breakpoint).toBe('tablet');
    });
  });
});
