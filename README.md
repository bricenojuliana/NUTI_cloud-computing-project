# Professional CV Website

A static single-page CV website built with pure HTML, CSS, and JavaScript. This project showcases professional profile information in a clean, responsive format.

## Features

- **Responsive Design**: Adapts seamlessly from mobile (320px) to desktop (1920px) viewports
- **Single Page Application**: All content loads without page navigation
- **Performance Optimized**: Fast load times with optimized assets
- **Cross-Browser Compatible**: Works on modern browsers (Chrome, Firefox, Safari, Edge)
- **Clean Code**: Pure HTML, CSS, and JavaScript with no dependencies

## Project Structure

```
professional-cv-website/
├── index.html              # Main HTML document
├── css/
│   ├── styles.css         # Main stylesheet
│   └── styles.min.css     # Minified stylesheet
├── js/
│   ├── script.js          # JavaScript enhancements
│   └── script.min.js      # Minified JavaScript
├── images/
│   └── profile.jpg        # Professional photo
├── tests/                 # Test files
├── docs/                  # Documentation
├── .gitignore             # Git exclusions
└── README.md              # This file
```

## Local Development

1. Clone this repository:
   ```bash
   git clone <repository-url>
   cd professional-cv-website
   ```

2. Open `index.html` in your browser:
   ```bash
   # On macOS
   open index.html
   
   # On Linux
   xdg-open index.html
   
   # On Windows
   start index.html
   ```

3. Or use a local web server:
   ```bash
   # Using Python 3
   python -m http.server 8000
   
   # Using Node.js http-server
   npx http-server
   ```

4. Navigate to `http://localhost:8000` in your browser

## License

This project is open source and available for personal use.
