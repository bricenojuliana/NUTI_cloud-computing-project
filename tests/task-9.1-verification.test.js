/**
 * Task 9.1 Verification: Azure App Service Configuration
 * 
 * This test verifies that the web.config file is properly configured for Azure App Service:
 * - Confirms web.config exists and is valid XML
 * - Verifies default document is set to index.html
 * - Verifies HTTPS redirect rule is configured
 * 
 * Requirements: 9.1, 9.2, 9.3, 9.4
 */

const fs = require('fs');
const path = require('path');

describe('Task 9.1: Azure App Service Configuration', () => {
  let webConfigContent;
  const webConfigPath = path.join(__dirname, '..', 'web.config');

  beforeAll(() => {
    // Read web.config file
    if (fs.existsSync(webConfigPath)) {
      webConfigContent = fs.readFileSync(webConfigPath, 'utf-8');
    }
  });

  test('web.config file exists', () => {
    expect(fs.existsSync(webConfigPath)).toBe(true);
  });

  test('web.config is valid XML with configuration root', () => {
    expect(webConfigContent).toContain('<?xml version="1.0" encoding="UTF-8"?>');
    expect(webConfigContent).toContain('<configuration>');
    expect(webConfigContent).toContain('</configuration>');
  });

  test('web.config has system.webServer section', () => {
    expect(webConfigContent).toContain('<system.webServer>');
    expect(webConfigContent).toContain('</system.webServer>');
  });

  test('default document is set to index.html', () => {
    // Verify defaultDocument section exists
    expect(webConfigContent).toContain('<defaultDocument>');
    expect(webConfigContent).toContain('</defaultDocument>');
    
    // Verify files section exists
    expect(webConfigContent).toContain('<files>');
    expect(webConfigContent).toContain('</files>');
    
    // Verify index.html is added as default document
    expect(webConfigContent).toContain('<add value="index.html" />');
  });

  test('HTTPS redirect rule is configured', () => {
    // Verify rewrite section exists
    expect(webConfigContent).toContain('<rewrite>');
    expect(webConfigContent).toContain('</rewrite>');
    
    // Verify rules section exists
    expect(webConfigContent).toContain('<rules>');
    expect(webConfigContent).toContain('</rules>');
    
    // Verify Force HTTPS rule exists
    expect(webConfigContent).toContain('name="Force HTTPS"');
    expect(webConfigContent).toContain('stopProcessing="true"');
    
    // Verify rule matches all URLs
    expect(webConfigContent).toContain('<match url="(.*)" />');
    
    // Verify condition checks for non-HTTPS
    expect(webConfigContent).toContain('<conditions>');
    expect(webConfigContent).toContain('<add input="{HTTPS}" pattern="^OFF$" />');
    expect(webConfigContent).toContain('</conditions>');
    
    // Verify redirect action to HTTPS
    expect(webConfigContent).toContain('<action type="Redirect"');
    expect(webConfigContent).toContain('url="https://{HTTP_HOST}/{R:1}"');
    expect(webConfigContent).toContain('redirectType="Permanent"');
  });

  test('staticContent section is configured', () => {
    // Verify staticContent section exists (for proper MIME types)
    expect(webConfigContent).toContain('<staticContent>');
    expect(webConfigContent).toContain('</staticContent>');
  });

  test('web.config structure is complete and well-formed', () => {
    // Verify all major sections are present and properly nested
    const hasConfiguration = webConfigContent.includes('<configuration>') && 
                            webConfigContent.includes('</configuration>');
    const hasWebServer = webConfigContent.includes('<system.webServer>') && 
                        webConfigContent.includes('</system.webServer>');
    const hasDefaultDoc = webConfigContent.includes('<defaultDocument>') && 
                         webConfigContent.includes('</defaultDocument>');
    const hasRewrite = webConfigContent.includes('<rewrite>') && 
                      webConfigContent.includes('</rewrite>');
    
    expect(hasConfiguration).toBe(true);
    expect(hasWebServer).toBe(true);
    expect(hasDefaultDoc).toBe(true);
    expect(hasRewrite).toBe(true);
  });
});
