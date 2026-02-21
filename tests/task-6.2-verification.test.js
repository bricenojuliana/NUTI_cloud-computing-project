/**
 * Task 6.2 Verification Tests
 * Validates minified CSS and JavaScript files
 * Requirements: 8.4, 12.3
 */

const fs = require('fs');
const path = require('path');

describe('Task 6.2: Minify CSS and JavaScript', () => {
  describe('Minified CSS File', () => {
    test('styles.min.css should exist', () => {
      const minCssPath = path.join(__dirname, '..', 'css', 'styles.min.css');
      expect(fs.existsSync(minCssPath)).toBe(true);
    });

    test('styles.min.css should be smaller than original', () => {
      const cssPath = path.join(__dirname, '..', 'css', 'styles.css');
      const minCssPath = path.join(__dirname, '..', 'css', 'styles.min.css');
      
      const cssSize = fs.statSync(cssPath).size;
      const minCssSize = fs.statSync(minCssPath).size;
      
      expect(minCssSize).toBeLessThan(cssSize);
    });

    test('styles.min.css should contain CSS content', () => {
      const minCssPath = path.join(__dirname, '..', 'css', 'styles.min.css');
      const content = fs.readFileSync(minCssPath, 'utf8');
      
      // Check for key CSS selectors and properties
      expect(content).toContain('box-sizing');
      expect(content).toContain('--color-primary');
      expect(content).toContain('.profile-photo');
      expect(content).toContain('#summary');
      expect(content).toContain('@media');
    });

    test('styles.min.css should have minimal whitespace', () => {
      const minCssPath = path.join(__dirname, '..', 'css', 'styles.min.css');
      const content = fs.readFileSync(minCssPath, 'utf8');
      
      // Minified CSS should have very few newlines
      const newlineCount = (content.match(/\n/g) || []).length;
      expect(newlineCount).toBeLessThan(10);
    });
  });

  describe('Minified JavaScript File', () => {
    test('script.min.js should exist', () => {
      const minJsPath = path.join(__dirname, '..', 'js', 'script.min.js');
      expect(fs.existsSync(minJsPath)).toBe(true);
    });

    test('script.min.js should be smaller than original', () => {
      const jsPath = path.join(__dirname, '..', 'js', 'script.js');
      const minJsPath = path.join(__dirname, '..', 'js', 'script.min.js');
      
      const jsSize = fs.statSync(jsPath).size;
      const minJsSize = fs.statSync(minJsPath).size;
      
      expect(minJsSize).toBeLessThan(jsSize);
    });

    test('script.min.js should contain JavaScript content', () => {
      const minJsPath = path.join(__dirname, '..', 'js', 'script.min.js');
      const content = fs.readFileSync(minJsPath, 'utf8');
      
      // Check for key JavaScript functions and variables
      expect(content).toContain('initSmoothScrolling');
      expect(content).toContain('measureFCP');
      expect(content).toContain('CVPerformance');
      expect(content).toContain('PERF_CONFIG');
    });

    test('script.min.js should have minimal whitespace', () => {
      const minJsPath = path.join(__dirname, '..', 'js', 'script.min.js');
      const content = fs.readFileSync(minJsPath, 'utf8');
      
      // Minified JS should have very few newlines
      const newlineCount = (content.match(/\n/g) || []).length;
      expect(newlineCount).toBeLessThan(5);
    });
  });

  describe('Total Asset Size (Requirement 8.4)', () => {
    test('total production file size should be under 5MB', () => {
      const indexPath = path.join(__dirname, '..', 'index.html');
      const minCssPath = path.join(__dirname, '..', 'css', 'styles.min.css');
      const minJsPath = path.join(__dirname, '..', 'js', 'script.min.js');
      const profilePath = path.join(__dirname, '..', 'images', 'profile.jpg');
      
      const indexSize = fs.statSync(indexPath).size;
      const minCssSize = fs.statSync(minCssPath).size;
      const minJsSize = fs.statSync(minJsPath).size;
      const profileSize = fs.statSync(profilePath).size;
      
      const totalSize = indexSize + minCssSize + minJsSize + profileSize;
      const totalSizeMB = totalSize / (1024 * 1024);
      
      expect(totalSizeMB).toBeLessThan(5);
    });

    test('minified files should provide significant size reduction', () => {
      const cssPath = path.join(__dirname, '..', 'css', 'styles.css');
      const minCssPath = path.join(__dirname, '..', 'css', 'styles.min.css');
      const jsPath = path.join(__dirname, '..', 'js', 'script.js');
      const minJsPath = path.join(__dirname, '..', 'js', 'script.min.js');
      
      const cssSize = fs.statSync(cssPath).size;
      const minCssSize = fs.statSync(minCssPath).size;
      const jsSize = fs.statSync(jsPath).size;
      const minJsSize = fs.statSync(minJsPath).size;
      
      const cssReduction = ((cssSize - minCssSize) / cssSize) * 100;
      const jsReduction = ((jsSize - minJsSize) / jsSize) * 100;
      
      // Expect at least 20% reduction for CSS
      expect(cssReduction).toBeGreaterThan(20);
      
      // Expect at least 30% reduction for JavaScript
      expect(jsReduction).toBeGreaterThan(30);
    });
  });

  describe('File Integrity', () => {
    test('minified CSS should be valid CSS syntax', () => {
      const minCssPath = path.join(__dirname, '..', 'css', 'styles.min.css');
      const content = fs.readFileSync(minCssPath, 'utf8');
      
      // Check for balanced braces
      const openBraces = (content.match(/{/g) || []).length;
      const closeBraces = (content.match(/}/g) || []).length;
      expect(openBraces).toBe(closeBraces);
    });

    test('minified JavaScript should be valid JS syntax', () => {
      const minJsPath = path.join(__dirname, '..', 'js', 'script.min.js');
      const content = fs.readFileSync(minJsPath, 'utf8');
      
      // Check for balanced parentheses
      const openParens = (content.match(/\(/g) || []).length;
      const closeParens = (content.match(/\)/g) || []).length;
      expect(openParens).toBe(closeParens);
      
      // Check for balanced braces
      const openBraces = (content.match(/{/g) || []).length;
      const closeBraces = (content.match(/}/g) || []).length;
      expect(openBraces).toBe(closeBraces);
    });
  });
});
