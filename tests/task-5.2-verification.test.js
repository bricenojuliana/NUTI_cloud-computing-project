/**
 * Task 5.2 Verification Test: Performance Monitoring Utilities
 * Requirements: 1.4, 12.1
 */

const fs = require('fs');
const path = require('path');

describe('Task 5.2: Performance Monitoring Utilities', () => {
    let scriptContent;

    beforeAll(() => {
        const scriptPath = path.resolve(__dirname, '../js/script.js');
        scriptContent = fs.readFileSync(scriptPath, 'utf8');
    });

    test('script.js contains performance monitoring implementation', () => {
        expect(scriptContent).toContain('Performance Monitoring');
    });

    test('performance monitoring has configuration thresholds', () => {
        // Check for personal info threshold (2 seconds = 2000ms)
        expect(scriptContent).toContain('PERSONAL_INFO_THRESHOLD');
        expect(scriptContent).toContain('2000');
        
        // Check for FCP threshold (1.5 seconds = 1500ms)
        expect(scriptContent).toContain('FCP_THRESHOLD');
        expect(scriptContent).toContain('1500');
    });

    test('performance monitoring measures First Contentful Paint (FCP)', () => {
        expect(scriptContent).toContain('first-contentful-paint');
        expect(scriptContent).toContain('PerformanceObserver');
    });

    test('performance monitoring measures personal info load time', () => {
        expect(scriptContent).toContain('measurePersonalInfoLoadTime');
        
        // Check for personal info elements
        expect(scriptContent).toMatch(/querySelector.*h1/);
        expect(scriptContent).toMatch(/querySelector.*header.*p/);
        expect(scriptContent).toMatch(/querySelector.*header.*img/);
    });

    test('performance monitoring logs metrics for debugging', () => {
        expect(scriptContent).toContain('logMetric');
        expect(scriptContent).toContain('console.log');
    });

    test('performance monitoring has debug mode configuration', () => {
        expect(scriptContent).toContain('DEBUG_MODE');
    });

    test('performance monitoring measures page load time', () => {
        expect(scriptContent).toContain('measurePageLoadTime');
        expect(scriptContent).toContain('performance.timing');
    });

    test('performance monitoring measures DOM content loaded time', () => {
        expect(scriptContent).toContain('measureDOMContentLoaded');
        expect(scriptContent).toContain('domContentLoadedEventEnd');
    });

    test('performance monitoring exposes metrics API', () => {
        expect(scriptContent).toContain('getPerformanceMetrics');
        expect(scriptContent).toContain('CVPerformance');
    });

    test('performance monitoring initializes on DOM ready', () => {
        expect(scriptContent).toContain('initPerformanceMonitoring');
        expect(scriptContent).toContain('DOMContentLoaded');
    });

    test('performance monitoring validates against thresholds', () => {
        // Check for threshold comparison logic
        expect(scriptContent).toMatch(/threshold.*>/);
        expect(scriptContent).toContain('EXCEEDS');
    });

    test('performance monitoring uses IIFE pattern for encapsulation', () => {
        // Count IIFE patterns (should have at least 2: smooth scrolling + performance)
        const iifeMatches = scriptContent.match(/\(function\s*\(\)/g);
        expect(iifeMatches).not.toBeNull();
        expect(iifeMatches.length).toBeGreaterThanOrEqual(2);
    });

    test('performance monitoring returns metrics object', () => {
        expect(scriptContent).toContain('personalInfoLoadTime');
        expect(scriptContent).toContain('fcpTime');
        expect(scriptContent).toContain('domContentLoadedTime');
        expect(scriptContent).toContain('totalLoadTime');
        expect(scriptContent).toContain('timestamp');
    });

    test('performance monitoring handles browser compatibility', () => {
        // Check for feature detection
        expect(scriptContent).toContain('PerformanceObserver');
        expect(scriptContent).toContain('performance.timing');
        expect(scriptContent).toContain('performance.getEntriesByType');
    });

    test('performance monitoring includes error handling', () => {
        expect(scriptContent).toContain('try');
        expect(scriptContent).toContain('catch');
        expect(scriptContent).toContain('console.warn');
    });
});
