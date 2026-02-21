/**
 * Professional CV Website - JavaScript Enhancements
 * Implements smooth scrolling for anchor links
 */

(function() {
    'use strict';

    /**
     * Initialize smooth scrolling for all anchor links
     */
    function initSmoothScrolling() {
        // Get all anchor links that point to sections on the page
        const anchorLinks = document.querySelectorAll('a[href^="#"]');
        
        anchorLinks.forEach(link => {
            link.addEventListener('click', function(e) {
                const href = this.getAttribute('href');
                
                // Skip empty hash or just "#"
                if (!href || href === '#') {
                    return;
                }
                
                // Get the target element
                const targetId = href.substring(1);
                const targetElement = document.getElementById(targetId);
                
                // If target exists, prevent default and smooth scroll
                if (targetElement) {
                    e.preventDefault();
                    
                    targetElement.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                    
                    // Update URL without triggering navigation
                    if (history.pushState) {
                        history.pushState(null, null, href);
                    }
                }
            });
        });
    }

    // Initialize when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initSmoothScrolling);
    } else {
        initSmoothScrolling();
    }
})();

/**
 * Performance Monitoring Utilities
 * Logs load time metrics for debugging and performance validation
 * Validates Requirements 1.4 (personal info load < 2s) and 12.1 (FCP < 1.5s)
 */
(function() {
    'use strict';

    /**
     * Performance monitoring configuration
     */
    const PERF_CONFIG = {
        PERSONAL_INFO_THRESHOLD: 2000, // 2 seconds (Requirement 1.4)
        FCP_THRESHOLD: 1500,            // 1.5 seconds (Requirement 12.1)
        DEBUG_MODE: true                // Set to false to disable console logging
    };

    /**
     * Log performance metric to console if debug mode is enabled
     */
    function logMetric(name, value, threshold, unit = 'ms') {
        if (!PERF_CONFIG.DEBUG_MODE) return;

        const status = threshold && value > threshold ? '⚠️ EXCEEDS' : '✓ OK';
        const thresholdInfo = threshold ? ` (threshold: ${threshold}${unit})` : '';
        
        console.log(`[Performance] ${name}: ${value.toFixed(2)}${unit}${thresholdInfo} ${status}`);
    }

    /**
     * Measure and log First Contentful Paint (FCP)
     */
    function measureFCP() {
        // Use Performance Observer API for FCP
        if ('PerformanceObserver' in window) {
            try {
                const observer = new PerformanceObserver((list) => {
                    for (const entry of list.getEntries()) {
                        if (entry.name === 'first-contentful-paint') {
                            logMetric(
                                'First Contentful Paint (FCP)',
                                entry.startTime,
                                PERF_CONFIG.FCP_THRESHOLD
                            );
                            observer.disconnect();
                        }
                    }
                });
                
                observer.observe({ entryTypes: ['paint'] });
            } catch (e) {
                console.warn('[Performance] PerformanceObserver not supported:', e);
            }
        } else {
            console.warn('[Performance] PerformanceObserver API not available');
        }
    }

    /**
     * Measure personal information load time
     * Checks when name, title, and photo are visible in the DOM
     */
    function measurePersonalInfoLoadTime() {
        const startTime = performance.timing.navigationStart;
        
        // Check if personal info elements are present
        const nameElement = document.querySelector('h1');
        const titleElement = document.querySelector('header p');
        const photoElement = document.querySelector('header img');
        
        if (nameElement && titleElement && photoElement) {
            const currentTime = performance.now();
            const loadTime = currentTime;
            
            logMetric(
                'Personal Information Load Time',
                loadTime,
                PERF_CONFIG.PERSONAL_INFO_THRESHOLD
            );
            
            return loadTime;
        }
        
        return null;
    }

    /**
     * Measure total page load time
     */
    function measurePageLoadTime() {
        if (performance.timing) {
            const loadTime = performance.timing.loadEventEnd - performance.timing.navigationStart;
            logMetric('Total Page Load Time', loadTime, null);
            return loadTime;
        }
        return null;
    }

    /**
     * Measure DOM content loaded time
     */
    function measureDOMContentLoaded() {
        if (performance.timing) {
            const domTime = performance.timing.domContentLoadedEventEnd - performance.timing.navigationStart;
            logMetric('DOM Content Loaded', domTime, null);
            return domTime;
        }
        return null;
    }

    /**
     * Get all performance metrics
     * Returns an object with all measured metrics
     */
    function getPerformanceMetrics() {
        const metrics = {
            personalInfoLoadTime: null,
            fcpTime: null,
            domContentLoadedTime: null,
            totalLoadTime: null,
            timestamp: new Date().toISOString()
        };

        // Measure personal info load time
        metrics.personalInfoLoadTime = measurePersonalInfoLoadTime();

        // Get FCP from performance entries
        if (performance.getEntriesByType) {
            const paintEntries = performance.getEntriesByType('paint');
            const fcpEntry = paintEntries.find(entry => entry.name === 'first-contentful-paint');
            if (fcpEntry) {
                metrics.fcpTime = fcpEntry.startTime;
            }
        }

        // Get DOM and load times
        metrics.domContentLoadedTime = measureDOMContentLoaded();
        metrics.totalLoadTime = measurePageLoadTime();

        return metrics;
    }

    /**
     * Initialize performance monitoring
     */
    function initPerformanceMonitoring() {
        // Measure FCP using PerformanceObserver
        measureFCP();

        // Measure personal info load time when DOM is ready
        measurePersonalInfoLoadTime();

        // Measure page load metrics when page is fully loaded
        window.addEventListener('load', function() {
            // Small delay to ensure all timing data is available
            setTimeout(function() {
                measureDOMContentLoaded();
                measurePageLoadTime();
                
                if (PERF_CONFIG.DEBUG_MODE) {
                    console.log('[Performance] All metrics:', getPerformanceMetrics());
                }
            }, 0);
        });
    }

    // Expose performance utilities to global scope for testing
    window.CVPerformance = {
        getMetrics: getPerformanceMetrics,
        config: PERF_CONFIG
    };

    // Initialize performance monitoring when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initPerformanceMonitoring);
    } else {
        initPerformanceMonitoring();
    }
})();
