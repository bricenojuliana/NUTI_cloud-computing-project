# Design Document: Professional CV Website

## Overview

The Professional CV Website is a static single-page application (SPA) that presents professional profile information in a clean, responsive format. The system consists of pure HTML, CSS, and JavaScript without any frameworks or server-side processing, designed for deployment to Azure App Service and version control through GitHub.

The architecture follows a simple client-side rendering approach where all content is embedded in the HTML structure, styled with CSS, and enhanced with minimal JavaScript for responsive behavior and interactions. The design prioritizes performance, accessibility, and cross-browser compatibility while maintaining a professional aesthetic.

### Key Design Goals

- **Simplicity**: Pure HTML/CSS/JavaScript without build tools or frameworks
- **Performance**: Fast load times with optimized assets (Lighthouse score 85+)
- **Responsiveness**: Fluid layout adapting from 320px to 1920px viewports
- **Maintainability**: Clear structure with semantic HTML and organized CSS
- **Deployability**: Static files ready for Azure App Service deployment

## Architecture

### System Structure

The application follows a traditional static website architecture with three core layers:

```
┌─────────────────────────────────────────┐
│         Browser (Client)                │
│  ┌───────────────────────────────────┐  │
│  │  HTML Structure (index.html)      │  │
│  │  - Semantic sections              │  │
│  │  - Content embedded               │  │
│  └───────────────────────────────────┘  │
│  ┌───────────────────────────────────┐  │
│  │  CSS Styling (styles.css)         │  │
│  │  - Responsive layout              │  │
│  │  - Visual design                  │  │
│  └───────────────────────────────────┘  │
│  ┌───────────────────────────────────┐  │
│  │  JavaScript (script.js)           │  │
│  │  - Minimal enhancements           │  │
│  │  - Smooth scrolling               │  │
│  └───────────────────────────────────┘  │
└─────────────────────────────────────────┘
           │
           ▼
┌─────────────────────────────────────────┐
│    Azure App Service (Static Host)      │
│  - Serves static files                  │
│  - HTTPS enabled                        │
│  - Default document: index.html         │
└─────────────────────────────────────────┘
           │
           ▼
┌─────────────────────────────────────────┐
│    GitHub Repository                    │
│  - Source code version control          │
│  - Deployment configuration             │
│  - Documentation                        │
└─────────────────────────────────────────┘
```

### File Structure

```
professional-cv-website/
├── index.html              # Main HTML document (entry point)
├── css/
│   └── styles.css         # All styling rules
├── js/
│   └── script.js          # Minimal JavaScript enhancements
├── images/
│   └── profile.jpg        # Professional photo (optimized)
├── .gitignore             # Git exclusions
├── README.md              # Documentation and deployment instructions
└── web.config             # Azure App Service configuration
```

### Technology Stack

- **HTML5**: Semantic markup for content structure
- **CSS3**: Styling with Flexbox/Grid for responsive layout
- **Vanilla JavaScript**: Minimal enhancements (no frameworks)
- **Azure App Service**: Static web hosting platform
- **GitHub**: Version control and source repository

## Components and Interfaces

### HTML Structure Components

The HTML document is organized into semantic sections that map directly to requirements:

#### 1. Header Section
- **Purpose**: Display personal information and photo (Requirement 1)
- **Elements**:
  - `<header>` container
  - `<img>` for professional photo (200x200 to 400x400px)
  - `<h1>` for full name
  - `<p>` for professional title/role
- **Styling**: Centered layout with prominent typography

#### 2. Professional Summary Section
- **Purpose**: Present career summary (Requirement 2)
- **Elements**:
  - `<section id="summary">`
  - `<h2>` section heading
  - `<p>` for summary text (50-500 characters)
- **Positioning**: Upper third of page, below header

#### 3. Education Section
- **Purpose**: Show academic background (Requirement 3)
- **Elements**:
  - `<section id="education">`
  - `<h2>` section heading
  - `<ul>` or `<div>` list of degrees
  - Each degree contains: institution, degree title, field, year
- **Ordering**: Reverse chronological (most recent first)

#### 4. Skills Section
- **Purpose**: List technical skills (Requirement 4)
- **Elements**:
  - `<section id="skills">`
  - `<h2>` section heading
  - Grouped by category when >5 skills
  - Visual tags or list items for each skill
- **Styling**: Visually distinct with clear labels

#### 5. Projects Section
- **Purpose**: Showcase projects (Requirement 5)
- **Elements**:
  - `<section id="projects">`
  - `<h2>` section heading
  - Each project contains:
    - Title
    - Description (minimum 50 characters)
    - Technologies used
    - Optional URL link (`target="_blank"`)

#### 6. Contact Section
- **Purpose**: Provide contact information (Requirement 6)
- **Elements**:
  - `<section id="contact">`
  - `<h2>` section heading
  - Email with `mailto:` link
  - Social media links (LinkedIn, GitHub) with `target="_blank"`
- **Styling**: Clearly identifiable section

### CSS Architecture

The CSS is organized into logical sections:

#### 1. Reset and Base Styles
```css
/* Normalize browser defaults */
/* Set base font size (minimum 14px) */
/* Define color palette variables */
/* Set box-sizing: border-box */
```

#### 2. Layout System
```css
/* Container max-width and centering */
/* Section spacing and padding */
/* Flexbox/Grid for responsive layout */
```

#### 3. Typography
```css
/* Font families and weights */
/* Heading hierarchy (h1, h2, h3) */
/* Paragraph and list styling */
/* Minimum 14px font size across viewports */
```

#### 4. Component Styles
```css
/* Header and profile photo */
/* Section-specific styling */
/* Skill tags/badges */
/* Project cards */
/* Contact links and icons */
```

#### 5. Responsive Design (Requirement 7)
```css
/* Mobile-first approach */
/* Breakpoints:
   - 320px: minimum mobile
   - 768px: tablet (switch to vertical stack)
   - 1024px: desktop
   - 1920px: maximum width
*/
/* Media queries for layout adjustments */
```

### JavaScript Functionality

Minimal JavaScript for enhancements only:

#### 1. Smooth Scrolling
- Enhance anchor link navigation
- Smooth scroll to sections

#### 2. Performance Monitoring
- Optional: Log load time metrics
- Validate performance requirements

#### 3. Responsive Image Loading
- Ensure profile photo loads efficiently
- Optional: lazy loading if multiple images

### Deployment Configuration

#### Azure App Service Configuration (web.config)
```xml
<?xml version="1.0" encoding="UTF-8"?>
<configuration>
  <system.webServer>
    <defaultDocument>
      <files>
        <add value="index.html" />
      </files>
    </defaultDocument>
    <staticContent>
      <mimeMap fileExtension=".json" mimeType="application/json" />
    </staticContent>
    <rewrite>
      <rules>
        <rule name="Force HTTPS" stopProcessing="true">
          <match url="(.*)" />
          <conditions>
            <add input="{HTTPS}" pattern="^OFF$" />
          </conditions>
          <action type="Redirect" url="https://{HTTP_HOST}/{R:1}" redirectType="Permanent" />
        </rule>
      </rules>
    </rewrite>
  </system.webServer>
</configuration>
```

#### Git Configuration (.gitignore)
```
# Build artifacts
*.log
.DS_Store
Thumbs.db

# IDE files
.vscode/
.idea/

# Temporary files
*.tmp
*.bak

# Azure deployment files (if auto-generated)
.deployment
deploy.sh
```

## Data Models

Since this is a static website with embedded content, there are no dynamic data models or databases. However, the content structure follows a consistent schema:

### Personal Information Schema
```javascript
{
  fullName: String,           // Required, displayed in <h1>
  professionalTitle: String,  // Required, current role
  photoUrl: String,           // Path to profile image
  photoAlt: String            // Accessibility text for image
}
```

### Professional Summary Schema
```javascript
{
  summaryText: String         // Required, 50-500 characters
}
```

### Education Entry Schema
```javascript
{
  institution: String,        // Required, university/school name
  degreeTitle: String,        // Required, e.g., "Bachelor of Science"
  fieldOfStudy: String,       // Required, e.g., "Computer Science"
  completionYear: Number,     // Required, graduation year
  startYear: Number           // Optional
}
```

### Skill Schema
```javascript
{
  category: String,           // Optional, e.g., "Programming Languages"
  skills: [String]            // Array of skill names, minimum 3
}
```

### Project Schema
```javascript
{
  title: String,              // Required
  description: String,        // Required, minimum 50 characters
  technologies: [String],     // Required, array of tech used
  url: String,                // Optional, project link
  urlText: String             // Optional, link display text
}
```

### Contact Information Schema
```javascript
{
  email: String,              // Optional, creates mailto: link
  linkedIn: String,           // Optional, full URL
  github: String,             // Optional, full URL
  otherLinks: [{              // Optional additional contacts
    platform: String,
    url: String
  }]
}
```

### Asset Constraints

- **Profile Photo**: 200x200 to 400x400 pixels, optimized (JPEG/WebP)
- **Total Site Size**: < 5MB including all assets
- **Image Optimization**: Compressed while maintaining visual quality

### Browser Compatibility Requirements

The HTML/CSS/JavaScript must be compatible with:
- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

This constrains the use of cutting-edge CSS features and requires fallbacks for older browser versions within the specified range.


## Correctness Properties

*A property is a characteristic or behavior that should hold true across all valid executions of a system—essentially, a formal statement about what the system should do. Properties serve as the bridge between human-readable specifications and machine-verifiable correctness guarantees.*

### Property 1: Profile Photo Dimensions

*For any* rendered CV website, the professional photo element should have dimensions between 200x200 and 400x400 pixels (inclusive).

**Validates: Requirements 1.1**

### Property 2: Personal Information Load Time

*For any* page load, all personal information (name, title, photo) should be rendered and visible within 2 seconds of the page load start.

**Validates: Requirements 1.4**

### Property 3: Summary Text Length Bounds

*For any* professional summary text content, the character count should be at least 50 characters and at most 500 characters.

**Validates: Requirements 2.1**

### Property 4: Summary Positioning

*For any* viewport height, the professional summary section should be positioned within the upper third of the page (vertical position ≤ 33% of total page height).

**Validates: Requirements 2.2**

### Property 5: Minimum Font Size

*For any* text element on the page and any viewport size between 320px and 1920px width, the computed font size should be at least 14px.

**Validates: Requirements 2.3, 7.4**

### Property 6: Degree Chronological Ordering

*For any* set of multiple academic degrees displayed on the page, they should be ordered in reverse chronological order by completion year (most recent first).

**Validates: Requirements 3.2**

### Property 7: Degree Field Completeness

*For any* academic degree entry displayed on the page, it should include a field of study value.

**Validates: Requirements 3.3**

### Property 8: Skill Grouping Threshold

*For any* skills section, when the total number of skills exceeds 5, the skills should be organized into category groups.

**Validates: Requirements 4.2**

### Property 9: Project Technologies Presence

*For any* project entry displayed on the page, it should include at least one technology in the technologies list.

**Validates: Requirements 5.3**

### Property 10: Project Description Length

*For any* project entry displayed on the page, the description text should contain at least 50 characters.

**Validates: Requirements 5.4**

### Property 11: Link Attributes

*For any* link element on the page:
- If it's an email contact, it should use the `mailto:` protocol
- If it's an external link (project URL, social media), it should have `target="_blank"` attribute to open in a new tab

**Validates: Requirements 5.2, 6.2, 6.3**

### Property 12: Responsive Vertical Stacking

*For any* viewport width less than 768px, the content sections should be stacked vertically (single column layout).

**Validates: Requirements 7.3**

### Property 13: Single Page Content

*For any* user interaction with the website, all content should remain accessible without triggering page navigation or reloads (no navigation events should occur).

**Validates: Requirements 8.3**

### Property 14: Total Asset Size

*For any* deployment of the website, the total size of all files (HTML, CSS, JavaScript, images, and other assets) should be less than 5MB.

**Validates: Requirements 8.4**

### Property 15: First Contentful Paint Performance

*For any* page load on a simulated 3G connection, the First Contentful Paint (FCP) metric should occur within 1.5 seconds.

**Validates: Requirements 12.1**

### Property 16: Lighthouse Performance Score

*For any* Lighthouse performance audit run on the deployed website, the performance score should be at least 85.

**Validates: Requirements 12.4**

## Error Handling

Since this is a static website with no dynamic functionality or user input processing, traditional error handling is minimal. However, the following error scenarios must be addressed:

### 1. Missing Assets

**Scenario**: Profile photo or other assets fail to load

**Handling**:
- Use `alt` attributes on all images for accessibility
- Provide fallback styling if image fails to load
- CSS can detect broken images and apply alternative styling

```css
img {
  background-color: #f0f0f0;
}
img::before {
  content: "Image not available";
  display: block;
  text-align: center;
}
```

### 2. Browser Compatibility Issues

**Scenario**: User accesses site with unsupported browser version

**Handling**:
- Use progressive enhancement approach
- Provide fallbacks for modern CSS features (Grid/Flexbox)
- Test with specified browser versions (Chrome 90+, Firefox 88+, Safari 14+, Edge 90+)
- Use CSS feature queries (`@supports`) for graceful degradation

```css
/* Fallback for older browsers */
.container {
  display: block;
}

/* Modern layout for supported browsers */
@supports (display: grid) {
  .container {
    display: grid;
  }
}
```

### 3. Viewport Size Edge Cases

**Scenario**: Extremely narrow or wide viewports outside tested range

**Handling**:
- Set minimum width of 320px (standard mobile minimum)
- Set maximum content width to prevent excessive line lengths
- Use `min()`, `max()`, `clamp()` CSS functions for fluid sizing
- Test at boundary conditions (320px, 768px, 1920px)

### 4. Performance Degradation

**Scenario**: Slow network or device causes poor performance

**Handling**:
- Optimize all images (compression, appropriate formats)
- Minify CSS and JavaScript for production
- Use efficient CSS selectors
- Minimize DOM complexity
- Inline critical CSS if needed for faster initial render
- Monitor with Lighthouse and address performance warnings

### 5. Deployment Issues

**Scenario**: Azure App Service misconfiguration or deployment failure

**Handling**:
- Include `web.config` with proper settings
- Document deployment steps in README.md
- Verify HTTPS redirect configuration
- Test default document serving (index.html)
- Provide troubleshooting guide in documentation

### 6. Content Overflow

**Scenario**: Long text content breaks layout

**Handling**:
- Use `overflow-wrap: break-word` for long words
- Set `max-width` on containers
- Test with maximum length content (500 char summary, long project descriptions)
- Use `text-overflow: ellipsis` where appropriate

```css
.summary {
  overflow-wrap: break-word;
  word-wrap: break-word;
  hyphens: auto;
}
```

## Testing Strategy

The testing strategy employs a dual approach combining unit tests for specific examples and edge cases with property-based tests for universal properties across all inputs.

### Unit Testing

Unit tests focus on specific examples, edge cases, and integration points:

#### 1. Content Presence Tests
- Verify all required sections exist (header, summary, education, skills, projects, contact)
- Check that minimum content requirements are met (at least 1 degree, 3 skills, 1 project, 1 contact method)
- Validate specific DOM elements are present with correct structure

#### 2. Edge Case Tests
- Test minimum viewport width (320px) renders without horizontal scroll
- Test maximum viewport width (1920px) maintains centered layout
- Test summary text at exactly 50 characters (minimum boundary)
- Test summary text at exactly 500 characters (maximum boundary)
- Test single degree vs. multiple degrees display
- Test exactly 5 skills (boundary for grouping requirement)

#### 3. Browser Compatibility Tests
- Manual testing in Chrome 90+, Firefox 88+, Safari 14+, Edge 90+
- Verify consistent rendering across browsers
- Test CSS feature support and fallbacks

#### 4. Deployment Tests
- Verify Azure App Service deployment succeeds
- Test HTTPS accessibility
- Confirm index.html serves as default document
- Validate web.config configuration

#### 5. Integration Tests
- Test complete page load sequence
- Verify all assets load successfully
- Check link functionality (mailto, external links with target="_blank")

### Property-Based Testing

Property-based tests verify universal properties across randomized inputs. Each test should run a minimum of 100 iterations to ensure comprehensive coverage.

#### Test Configuration

**Framework**: Use a property-based testing library appropriate for the testing environment:
- **JavaScript/Node.js**: fast-check
- **Browser testing**: fast-check with test runner (Jest, Mocha)

**Iteration Count**: Minimum 100 iterations per property test

**Tagging**: Each property test must reference its design document property using the format:
```javascript
// Feature: professional-cv-website, Property 1: Profile Photo Dimensions
```

#### Property Test Implementations

**Property 1: Profile Photo Dimensions**
```javascript
// Feature: professional-cv-website, Property 1: Profile Photo Dimensions
// Generate random photo dimensions, render page, verify dimensions are 200-400px
```

**Property 2: Personal Information Load Time**
```javascript
// Feature: professional-cv-website, Property 2: Personal Information Load Time
// For multiple page loads, measure time until personal info visible, verify < 2s
```

**Property 3: Summary Text Length Bounds**
```javascript
// Feature: professional-cv-website, Property 3: Summary Text Length Bounds
// Generate random summary text of varying lengths, verify 50-500 character constraint
```

**Property 4: Summary Positioning**
```javascript
// Feature: professional-cv-website, Property 4: Summary Positioning
// For random viewport heights, verify summary position is in upper third
```

**Property 5: Minimum Font Size**
```javascript
// Feature: professional-cv-website, Property 5: Minimum Font Size
// For random viewport widths (320-1920px), verify all text elements >= 14px
```

**Property 6: Degree Chronological Ordering**
```javascript
// Feature: professional-cv-website, Property 6: Degree Chronological Ordering
// Generate random sets of degrees with different years, verify reverse chronological order
```

**Property 7: Degree Field Completeness**
```javascript
// Feature: professional-cv-website, Property 7: Degree Field Completeness
// For all degree entries in DOM, verify field of study is present
```

**Property 8: Skill Grouping Threshold**
```javascript
// Feature: professional-cv-website, Property 8: Skill Grouping Threshold
// Generate random skill counts, verify grouping occurs when count > 5
```

**Property 9: Project Technologies Presence**
```javascript
// Feature: professional-cv-website, Property 9: Project Technologies Presence
// For all project entries in DOM, verify at least one technology is listed
```

**Property 10: Project Description Length**
```javascript
// Feature: professional-cv-website, Property 10: Project Description Length
// For all project entries in DOM, verify description >= 50 characters
```

**Property 11: Link Attributes**
```javascript
// Feature: professional-cv-website, Property 11: Link Attributes
// For all links in DOM, verify mailto: for emails and target="_blank" for external links
```

**Property 12: Responsive Vertical Stacking**
```javascript
// Feature: professional-cv-website, Property 12: Responsive Vertical Stacking
// For random viewport widths < 768px, verify single column layout
```

**Property 13: Single Page Content**
```javascript
// Feature: professional-cv-website, Property 13: Single Page Content
// Monitor navigation events during interactions, verify no navigation occurs
```

**Property 14: Total Asset Size**
```javascript
// Feature: professional-cv-website, Property 14: Total Asset Size
// Calculate sum of all file sizes, verify total < 5MB
```

**Property 15: First Contentful Paint Performance**
```javascript
// Feature: professional-cv-website, Property 15: First Contentful Paint Performance
// For multiple page loads on simulated 3G, verify FCP < 1.5s
```

**Property 16: Lighthouse Performance Score**
```javascript
// Feature: professional-cv-website, Property 16: Lighthouse Performance Score
// Run Lighthouse audit multiple times, verify performance score >= 85
```

### Testing Tools

- **Unit Testing**: Jest or Mocha for JavaScript tests
- **Property Testing**: fast-check library for property-based tests
- **DOM Testing**: jsdom or Puppeteer for headless browser testing
- **Performance Testing**: Lighthouse CI for automated performance audits
- **Visual Testing**: Manual cross-browser testing with BrowserStack or similar
- **File Size Analysis**: Custom scripts to calculate total asset size

### Test Execution

1. **Development**: Run unit tests and property tests locally before commits
2. **CI/CD**: Automate tests in GitHub Actions on pull requests
3. **Pre-deployment**: Run full test suite including Lighthouse audits
4. **Post-deployment**: Verify deployed site with smoke tests and performance checks

### Coverage Goals

- **Unit Test Coverage**: 100% of critical functionality (content presence, edge cases)
- **Property Test Coverage**: All 16 correctness properties implemented and passing
- **Browser Coverage**: All 4 specified browsers tested (Chrome, Firefox, Safari, Edge)
- **Viewport Coverage**: Test at minimum (320px), breakpoint (768px), and maximum (1920px) widths
- **Performance Coverage**: Lighthouse score >= 85 maintained across deployments
