/**
 * Test Utilities and Helpers
 * 
 * This module provides utility functions for property-based testing of the CV website.
 * It includes helpers for DOM manipulation, viewport simulation, and file size calculations.
 * 
 * Note: JSDOM is loaded lazily to avoid import issues with Jest.
 * Use getJSDOM() to access JSDOM when needed.
 */

const fs = require('fs');
const path = require('path');

let JSDOM = null;

/**
 * Lazy load JSDOM to avoid Jest import issues
 * @returns {Object} JSDOM class
 */
function getJSDOM() {
  if (!JSDOM) {
    JSDOM = require('jsdom').JSDOM;
  }
  return JSDOM;
}

/**
 * Text-Based HTML Parsing Utilities (No JSDOM required)
 */

/**
 * Load HTML file as text
 * @param {string} htmlPath - Path to HTML file (default: '../index.html')
 * @returns {string} HTML content as text
 */
function loadHTMLText(htmlPath = '../index.html') {
  const fullPath = path.join(__dirname, htmlPath);
  return fs.readFileSync(fullPath, 'utf-8');
}

/**
 * Load CSS file as text
 * @param {string} cssPath - Path to CSS file (default: '../css/styles.css')
 * @returns {string} CSS content as text
 */
function loadCSSText(cssPath = '../css/styles.css') {
  const fullPath = path.join(__dirname, cssPath);
  return fs.readFileSync(fullPath, 'utf-8');
}

/**
 * Extract text content from HTML element using regex
 * @param {string} html - HTML content
 * @param {string} selector - Simple selector (e.g., 'h1', '#summary p')
 * @returns {string|null} Text content or null
 */
function extractTextContent(html, selector) {
  // Handle ID selectors
  if (selector.startsWith('#')) {
    const id = selector.substring(1).split(' ')[0];
    const elementRegex = new RegExp(`<[^>]+id=["']${id}["'][^>]*>([\\s\\S]*?)<\\/[^>]+>`, 'i');
    const match = html.match(elementRegex);
    if (match) {
      // If there's a tag after the ID (e.g., '#summary p'), extract that
      const remainingSelector = selector.substring(id.length + 1).trim();
      if (remainingSelector) {
        return extractTextContent(match[1], remainingSelector);
      }
      // Remove HTML tags and return text
      return match[1].replace(/<[^>]+>/g, '').trim();
    }
  }
  
  // Handle simple tag selectors
  const tagRegex = new RegExp(`<${selector}[^>]*>([\\s\\S]*?)<\\/${selector}>`, 'i');
  const match = html.match(tagRegex);
  if (match) {
    return match[1].replace(/<[^>]+>/g, '').trim();
  }
  
  return null;
}

/**
 * Check if HTML contains an element with specific attributes
 * @param {string} html - HTML content
 * @param {string} tag - Tag name
 * @param {Object} attributes - Attributes to check
 * @returns {boolean} True if element exists with attributes
 */
function hasElementWithAttributes(html, tag, attributes) {
  let pattern = `<${tag}`;
  for (const [key, value] of Object.entries(attributes)) {
    pattern += `[^>]*${key}=["']${value}["']`;
  }
  pattern += '[^>]*>';
  const regex = new RegExp(pattern, 'i');
  return regex.test(html);
}

/**
 * DOM Manipulation and Measurement Utilities
 */

/**
 * Load and parse the HTML file into a JSDOM instance
 * @param {string} htmlPath - Path to the HTML file (default: '../index.html')
 * @returns {Object} Object containing { window, document, dom }
 */
function loadHTML(htmlPath = '../index.html') {
  const JSDOMClass = getJSDOM();
  const fullPath = path.join(__dirname, htmlPath);
  const html = fs.readFileSync(fullPath, 'utf-8');
  const dom = new JSDOMClass(html, {
    url: 'http://localhost',
    contentType: 'text/html',
    includeNodeLocations: true,
    runScripts: 'outside-only'
  });
  
  return {
    window: dom.window,
    document: dom.window.document,
    dom
  };
}

/**
 * Load HTML with CSS applied for accurate style calculations
 * @param {string} htmlPath - Path to the HTML file
 * @param {string} cssPath - Path to the CSS file
 * @returns {Object} Object containing { window, document, dom }
 */
function loadHTMLWithCSS(htmlPath = '../index.html', cssPath = '../css/styles.css') {
  const { window, document, dom } = loadHTML(htmlPath);
  
  // Read and inject CSS
  const fullCssPath = path.join(__dirname, cssPath);
  const css = fs.readFileSync(fullCssPath, 'utf-8');
  
  const style = document.createElement('style');
  style.textContent = css;
  document.head.appendChild(style);
  
  return { window, document, dom };
}

/**
 * Get computed style for an element
 * @param {Element} element - DOM element
 * @param {Window} window - JSDOM window object
 * @returns {CSSStyleDeclaration} Computed style object
 */
function getComputedStyle(element, window) {
  return window.getComputedStyle(element);
}

/**
 * Get element dimensions (width, height)
 * @param {Element} element - DOM element
 * @returns {Object} Object with { width, height } in pixels
 */
function getElementDimensions(element) {
  const rect = element.getBoundingClientRect();
  return {
    width: rect.width,
    height: rect.height
  };
}

/**
 * Get element position relative to document
 * @param {Element} element - DOM element
 * @returns {Object} Object with { top, left, bottom, right } in pixels
 */
function getElementPosition(element) {
  const rect = element.getBoundingClientRect();
  return {
    top: rect.top,
    left: rect.left,
    bottom: rect.bottom,
    right: rect.right
  };
}

/**
 * Get all text nodes from an element
 * @param {Element} element - DOM element
 * @returns {string} Concatenated text content
 */
function getTextContent(element) {
  return element.textContent.trim();
}

/**
 * Get character count of text content
 * @param {Element} element - DOM element
 * @returns {number} Character count
 */
function getCharacterCount(element) {
  return getTextContent(element).length;
}

/**
 * Check if element is visible (not display:none or visibility:hidden)
 * @param {Element} element - DOM element
 * @param {Window} window - JSDOM window object
 * @returns {boolean} True if element is visible
 */
function isElementVisible(element, window) {
  const style = getComputedStyle(element, window);
  return style.display !== 'none' && style.visibility !== 'hidden';
}

/**
 * Get font size in pixels for an element
 * @param {Element} element - DOM element
 * @param {Window} window - JSDOM window object
 * @returns {number} Font size in pixels
 */
function getFontSize(element, window) {
  const style = getComputedStyle(element, window);
  const fontSize = style.fontSize;
  return parseFloat(fontSize);
}

/**
 * Get all elements matching a selector
 * @param {Document} document - JSDOM document
 * @param {string} selector - CSS selector
 * @returns {Array<Element>} Array of matching elements
 */
function getAllElements(document, selector) {
  return Array.from(document.querySelectorAll(selector));
}

/**
 * Viewport Simulation Utilities
 */

/**
 * Create a JSDOM instance with a specific viewport size
 * @param {number} width - Viewport width in pixels
 * @param {number} height - Viewport height in pixels (default: 800)
 * @param {string} htmlPath - Path to HTML file
 * @returns {Object} Object containing { window, document, dom }
 */
function createViewport(width, height = 800, htmlPath = '../index.html') {
  const JSDOMClass = getJSDOM();
  const fullPath = path.join(__dirname, htmlPath);
  const html = fs.readFileSync(fullPath, 'utf-8');
  
  const dom = new JSDOMClass(html, {
    url: 'http://localhost',
    contentType: 'text/html',
    pretendToBeVisual: true,
    resources: 'usable'
  });
  
  // Set viewport dimensions
  Object.defineProperty(dom.window, 'innerWidth', {
    writable: true,
    configurable: true,
    value: width
  });
  
  Object.defineProperty(dom.window, 'innerHeight', {
    writable: true,
    configurable: true,
    value: height
  });
  
  return {
    window: dom.window,
    document: dom.window.document,
    dom
  };
}

/**
 * Simulate viewport resize
 * @param {Window} window - JSDOM window object
 * @param {number} width - New viewport width
 * @param {number} height - New viewport height
 */
function resizeViewport(window, width, height) {
  Object.defineProperty(window, 'innerWidth', {
    writable: true,
    configurable: true,
    value: width
  });
  
  Object.defineProperty(window, 'innerHeight', {
    writable: true,
    configurable: true,
    value: height
  });
  
  // Trigger resize event
  const resizeEvent = new window.Event('resize');
  window.dispatchEvent(resizeEvent);
}

/**
 * Check if viewport matches a media query
 * @param {Window} window - JSDOM window object
 * @param {string} mediaQuery - Media query string (e.g., '(max-width: 768px)')
 * @returns {boolean} True if media query matches
 */
function matchesMediaQuery(window, mediaQuery) {
  return window.matchMedia(mediaQuery).matches;
}

/**
 * Get viewport dimensions
 * @param {Window} window - JSDOM window object
 * @returns {Object} Object with { width, height }
 */
function getViewportDimensions(window) {
  return {
    width: window.innerWidth,
    height: window.innerHeight
  };
}

/**
 * Test responsive breakpoints
 * @param {number} width - Viewport width
 * @returns {string} Breakpoint name ('mobile', 'tablet', 'desktop', 'large')
 */
function getBreakpointName(width) {
  if (width < 768) return 'mobile';
  if (width < 1024) return 'tablet';
  if (width < 1920) return 'desktop';
  return 'large';
}

/**
 * File Size Calculation Utilities
 */

/**
 * Get file size in bytes
 * @param {string} filePath - Path to file
 * @returns {number} File size in bytes
 */
function getFileSize(filePath) {
  const fullPath = path.join(__dirname, filePath);
  const stats = fs.statSync(fullPath);
  return stats.size;
}

/**
 * Get file size in kilobytes
 * @param {string} filePath - Path to file
 * @returns {number} File size in KB
 */
function getFileSizeKB(filePath) {
  return getFileSize(filePath) / 1024;
}

/**
 * Get file size in megabytes
 * @param {string} filePath - Path to file
 * @returns {number} File size in MB
 */
function getFileSizeMB(filePath) {
  return getFileSize(filePath) / (1024 * 1024);
}

/**
 * Calculate total size of multiple files
 * @param {Array<string>} filePaths - Array of file paths
 * @returns {number} Total size in bytes
 */
function getTotalFileSize(filePaths) {
  return filePaths.reduce((total, filePath) => {
    try {
      return total + getFileSize(filePath);
    } catch (error) {
      console.warn(`Warning: Could not read file ${filePath}`);
      return total;
    }
  }, 0);
}

/**
 * Get all files in a directory recursively
 * @param {string} dirPath - Directory path
 * @param {Array<string>} fileList - Accumulator for file paths
 * @returns {Array<string>} Array of file paths
 */
function getAllFiles(dirPath, fileList = []) {
  const fullPath = path.join(__dirname, dirPath);
  
  if (!fs.existsSync(fullPath)) {
    return fileList;
  }
  
  const files = fs.readdirSync(fullPath);
  
  files.forEach(file => {
    const filePath = path.join(dirPath, file);
    const fullFilePath = path.join(__dirname, filePath);
    
    if (fs.statSync(fullFilePath).isDirectory()) {
      getAllFiles(filePath, fileList);
    } else {
      fileList.push(filePath);
    }
  });
  
  return fileList;
}

/**
 * Calculate total website size (all assets)
 * @param {Array<string>} excludePatterns - Patterns to exclude (e.g., ['node_modules', 'tests'])
 * @returns {Object} Object with { totalBytes, totalKB, totalMB, files }
 */
function calculateWebsiteSize(excludePatterns = ['node_modules', 'tests', '.git', '.kiro']) {
  const rootPath = path.join(__dirname, '..');
  const allFiles = [];
  
  function scanDirectory(dirPath) {
    const files = fs.readdirSync(dirPath);
    
    files.forEach(file => {
      const filePath = path.join(dirPath, file);
      const relativePath = path.relative(rootPath, filePath);
      
      // Check if path should be excluded
      const shouldExclude = excludePatterns.some(pattern => 
        relativePath.includes(pattern)
      );
      
      if (shouldExclude) return;
      
      const stats = fs.statSync(filePath);
      
      if (stats.isDirectory()) {
        scanDirectory(filePath);
      } else {
        allFiles.push({
          path: relativePath,
          size: stats.size
        });
      }
    });
  }
  
  scanDirectory(rootPath);
  
  const totalBytes = allFiles.reduce((sum, file) => sum + file.size, 0);
  
  return {
    totalBytes,
    totalKB: totalBytes / 1024,
    totalMB: totalBytes / (1024 * 1024),
    files: allFiles
  };
}

/**
 * Layout and Positioning Utilities
 */

/**
 * Check if element is in the upper third of the page
 * @param {Element} element - DOM element
 * @param {Document} document - JSDOM document
 * @returns {boolean} True if element is in upper third
 */
function isInUpperThird(element, document) {
  const elementTop = element.getBoundingClientRect().top;
  const pageHeight = document.documentElement.scrollHeight;
  const upperThirdLimit = pageHeight / 3;
  
  return elementTop <= upperThirdLimit;
}

/**
 * Check if layout is single column (vertical stacking)
 * @param {Document} document - JSDOM document
 * @param {string} containerSelector - Selector for container element
 * @returns {boolean} True if layout is single column
 */
function isSingleColumnLayout(document, containerSelector = 'body') {
  const container = document.querySelector(containerSelector);
  if (!container) return false;
  
  const children = Array.from(container.children).filter(child => 
    child.tagName !== 'SCRIPT' && child.tagName !== 'STYLE'
  );
  
  if (children.length < 2) return true;
  
  // Check if elements are stacked vertically (no horizontal overlap)
  for (let i = 0; i < children.length - 1; i++) {
    const current = children[i].getBoundingClientRect();
    const next = children[i + 1].getBoundingClientRect();
    
    // If next element starts below current element, they're stacked
    if (next.top >= current.bottom - 1) {
      continue;
    } else {
      return false; // Elements are side by side
    }
  }
  
  return true;
}

/**
 * Link and Attribute Utilities
 */

/**
 * Check if link has correct attributes
 * @param {Element} link - Link element
 * @returns {Object} Object with { isMailto, hasTargetBlank, isExternal }
 */
function checkLinkAttributes(link) {
  const href = link.getAttribute('href') || '';
  const target = link.getAttribute('target');
  
  return {
    isMailto: href.startsWith('mailto:'),
    hasTargetBlank: target === '_blank',
    isExternal: href.startsWith('http://') || href.startsWith('https://'),
    href
  };
}

/**
 * Get all links from document
 * @param {Document} document - JSDOM document
 * @returns {Array<Element>} Array of link elements
 */
function getAllLinks(document) {
  return Array.from(document.querySelectorAll('a[href]'));
}

/**
 * Chronological Ordering Utilities
 */

/**
 * Extract year from text content
 * @param {string} text - Text containing year
 * @returns {number|null} Extracted year or null
 */
function extractYear(text) {
  const yearMatch = text.match(/\b(19|20)\d{2}\b/);
  return yearMatch ? parseInt(yearMatch[0]) : null;
}

/**
 * Check if array is in reverse chronological order
 * @param {Array<number>} years - Array of years
 * @returns {boolean} True if in reverse chronological order
 */
function isReverseChronological(years) {
  for (let i = 0; i < years.length - 1; i++) {
    if (years[i] < years[i + 1]) {
      return false;
    }
  }
  return true;
}

/**
 * Performance Measurement Utilities
 */

/**
 * Measure page load time (simulated)
 * @param {Function} loadFunction - Function that loads the page
 * @returns {number} Load time in milliseconds
 */
async function measureLoadTime(loadFunction) {
  const startTime = Date.now();
  await loadFunction();
  const endTime = Date.now();
  return endTime - startTime;
}

/**
 * Check if all required elements are present
 * @param {Document} document - JSDOM document
 * @param {Array<string>} selectors - Array of CSS selectors
 * @returns {boolean} True if all elements are present
 */
function allElementsPresent(document, selectors) {
  return selectors.every(selector => document.querySelector(selector) !== null);
}

module.exports = {
  // Text-based utilities (no JSDOM)
  loadHTMLText,
  loadCSSText,
  extractTextContent,
  hasElementWithAttributes,
  
  // DOM utilities
  loadHTML,
  loadHTMLWithCSS,
  getComputedStyle,
  getElementDimensions,
  getElementPosition,
  getTextContent,
  getCharacterCount,
  isElementVisible,
  getFontSize,
  getAllElements,
  
  // Viewport utilities
  createViewport,
  resizeViewport,
  matchesMediaQuery,
  getViewportDimensions,
  getBreakpointName,
  
  // File size utilities
  getFileSize,
  getFileSizeKB,
  getFileSizeMB,
  getTotalFileSize,
  getAllFiles,
  calculateWebsiteSize,
  
  // Layout utilities
  isInUpperThird,
  isSingleColumnLayout,
  
  // Link utilities
  checkLinkAttributes,
  getAllLinks,
  
  // Chronological utilities
  extractYear,
  isReverseChronological,
  
  // Performance utilities
  measureLoadTime,
  allElementsPresent
};
