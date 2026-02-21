/**
 * Task 5.1 Verification Test: Smooth Scrolling for Anchor Links
 * Requirements: 8.3
 */

const fs = require('fs');
const path = require('path');

describe('Task 5.1: Smooth Scrolling for Anchor Links', () => {
    test('script.js file exists', () => {
        const scriptPath = path.resolve(__dirname, '../js/script.js');
        expect(fs.existsSync(scriptPath)).toBe(true);
    });

    test('script.js contains smooth scrolling implementation', () => {
        const scriptPath = path.resolve(__dirname, '../js/script.js');
        const scriptContent = fs.readFileSync(scriptPath, 'utf8');
        
        // Check for key smooth scrolling features
        expect(scriptContent).toContain('scrollIntoView');
        expect(scriptContent).toContain('behavior');
        expect(scriptContent).toContain('smooth');
    });

    test('script.js is linked in index.html', () => {
        const htmlPath = path.resolve(__dirname, '../index.html');
        const htmlContent = fs.readFileSync(htmlPath, 'utf8');
        
        // Accept either minified or non-minified version
        const hasScript = htmlContent.includes('src="js/script.js"') || htmlContent.includes('src="js/script.min.js"');
        expect(hasScript).toBe(true);
    });

    test('script.js handles anchor links with hash', () => {
        const scriptPath = path.resolve(__dirname, '../js/script.js');
        const scriptContent = fs.readFileSync(scriptPath, 'utf8');
        
        // Check for anchor link handling
        expect(scriptContent).toContain('a[href^="#"]');
        expect(scriptContent).toContain('addEventListener');
        expect(scriptContent).toContain('click');
    });

    test('script.js prevents default navigation', () => {
        const scriptPath = path.resolve(__dirname, '../js/script.js');
        const scriptContent = fs.readFileSync(scriptPath, 'utf8');
        
        // Check for preventDefault to avoid page reload
        expect(scriptContent).toContain('preventDefault');
    });

    test('script.js updates URL without reload', () => {
        const scriptPath = path.resolve(__dirname, '../js/script.js');
        const scriptContent = fs.readFileSync(scriptPath, 'utf8');
        
        // Check for history API usage
        expect(scriptContent).toContain('history.pushState');
    });

    test('index.html has sections with IDs for navigation', () => {
        const htmlPath = path.resolve(__dirname, '../index.html');
        const htmlContent = fs.readFileSync(htmlPath, 'utf8');
        
        const sections = ['summary', 'education', 'skills', 'projects', 'contact'];
        
        sections.forEach(sectionId => {
            expect(htmlContent).toContain(`id="${sectionId}"`);
        });
    });

    test('script.js uses IIFE pattern for encapsulation', () => {
        const scriptPath = path.resolve(__dirname, '../js/script.js');
        const scriptContent = fs.readFileSync(scriptPath, 'utf8');
        
        // Check for IIFE pattern
        expect(scriptContent).toMatch(/\(function\s*\(\)/);
        expect(scriptContent).toContain('use strict');
    });

    test('script.js handles DOM ready state', () => {
        const scriptPath = path.resolve(__dirname, '../js/script.js');
        const scriptContent = fs.readFileSync(scriptPath, 'utf8');
        
        // Check for DOM ready handling
        expect(scriptContent).toContain('DOMContentLoaded');
        expect(scriptContent).toContain('readyState');
    });

    test('script.js validates target element exists', () => {
        const scriptPath = path.resolve(__dirname, '../js/script.js');
        const scriptContent = fs.readFileSync(scriptPath, 'utf8');
        
        // Check for target validation
        expect(scriptContent).toContain('getElementById');
        expect(scriptContent).toMatch(/if\s*\(/);
    });
});
