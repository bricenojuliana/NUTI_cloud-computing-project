# Professional CV Website

A static single-page CV website built with pure HTML, CSS, and JavaScript. This project showcases professional profile information in a clean, responsive format optimized for deployment to Azure App Service.

## Features

- **Responsive Design**: Adapts seamlessly from mobile (320px) to desktop (1920px) viewports
- **Single Page Application**: All content loads without page navigation
- **Performance Optimized**: Lighthouse score 85+ with fast load times
- **Cross-Browser Compatible**: Works on Chrome 90+, Firefox 88+, Safari 14+, Edge 90+
- **Azure Ready**: Configured for Azure App Service deployment with HTTPS

## Project Structure

```
professional-cv-website/
├── index.html              # Main HTML document
├── css/
│   └── styles.css         # All styling rules
├── js/
│   └── script.js          # JavaScript enhancements
├── images/
│   └── profile.jpg        # Professional photo
├── .gitignore             # Git exclusions
├── README.md              # This file
└── web.config             # Azure App Service configuration
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

## Deployment to Azure App Service

### Prerequisites

- Azure account with active subscription
- Azure CLI installed ([Installation guide](https://docs.microsoft.com/en-us/cli/azure/install-azure-cli))
- Git installed

### Deployment Steps

1. **Login to Azure**:
   ```bash
   az login
   ```

2. **Create a Resource Group** (if you don't have one):
   ```bash
   az group create --name myResourceGroup --location eastus
   ```

3. **Create an App Service Plan**:
   ```bash
   az appservice plan create --name myAppServicePlan --resource-group myResourceGroup --sku FREE
   ```

4. **Create a Web App**:
   ```bash
   az webapp create --name my-cv-website --resource-group myResourceGroup --plan myAppServicePlan
   ```

5. **Configure Deployment from Local Git**:
   ```bash
   az webapp deployment source config-local-git --name my-cv-website --resource-group myResourceGroup
   ```

6. **Get Deployment Credentials**:
   ```bash
   az webapp deployment list-publishing-credentials --name my-cv-website --resource-group myResourceGroup --query scmUri --output tsv
   ```

7. **Deploy Your Code**:
   ```bash
   # Initialize git repository (if not already done)
   git init
   git add .
   git commit -m "Initial commit"
   
   # Add Azure remote
   git remote add azure <deployment-url-from-step-6>
   
   # Push to Azure
   git push azure main
   ```

8. **Access Your Website**:
   ```bash
   az webapp browse --name my-cv-website --resource-group myResourceGroup
   ```

### Alternative: Deploy via ZIP

1. **Create a ZIP file** of your project (excluding .git, node_modules, etc.)

2. **Deploy using Azure CLI**:
   ```bash
   az webapp deployment source config-zip --resource-group myResourceGroup --name my-cv-website --src <path-to-zip-file>
   ```

### Alternative: Deploy via Azure Portal (GUI)

For users who prefer a graphical interface:

1. **Login to Azure Portal**: Navigate to https://portal.azure.com

2. **Create a Web App**:
   - Click "Create a resource" > "Web App"
   - Fill in the details:
     - Subscription: Select your subscription
     - Resource Group: Create new or use existing
     - Name: Choose a unique name (e.g., my-cv-website)
     - Publish: Code
     - Runtime stack: Select any (we're using static files)
     - Region: Choose closest to your users
     - App Service Plan: Create new or select existing (Free tier works)
   - Click "Review + Create" then "Create"

3. **Deploy Your Files**:
   - Option A: Using Deployment Center
     - Go to your Web App in Azure Portal
     - Select "Deployment Center" from the left menu
     - Choose "Local Git" or "GitHub" as source
     - Follow the wizard to connect your repository
   
   - Option B: Using FTP
     - Go to your Web App > "Deployment Center"
     - Select "FTP" and note the credentials
     - Use an FTP client (FileZilla, WinSCP) to upload files to `/site/wwwroot/`
   
   - Option C: Using ZIP Deploy
     - Go to your Web App > "Advanced Tools" (Kudu)
     - Click "Go" to open Kudu console
     - Navigate to "Tools" > "Zip Push Deploy"
     - Drag and drop your ZIP file

4. **Verify Deployment**:
   - Go to your Web App overview page
   - Click the URL to open your site

### Verify HTTPS Configuration

The `web.config` file automatically redirects all HTTP traffic to HTTPS. After deployment:

1. Visit your site using HTTP: `http://my-cv-website.azurewebsites.net`
2. Verify it redirects to HTTPS: `https://my-cv-website.azurewebsites.net`

## Updating Your Deployed Site

After making changes to your website, redeploy using Git:

```bash
# Make your changes to HTML, CSS, or JS files
git add .
git commit -m "Description of your changes"
git push azure main
```

The site will automatically rebuild and deploy. Changes typically appear within 1-2 minutes.

### Quick Update Checklist

Before deploying updates:
- [ ] Test changes locally in a browser
- [ ] Verify responsive design at different screen sizes
- [ ] Check browser console for errors
- [ ] Run Lighthouse audit if performance-related changes
- [ ] Commit changes with descriptive message
- [ ] Push to Azure

## Customization

### Update Personal Information

Edit `index.html` to update:
- Name and professional title
- Professional summary
- Education history
- Technical skills
- Projects
- Contact information

### Modify Styling

Edit `css/styles.css` to customize:
- Color scheme (CSS variables at the top)
- Typography and fonts
- Layout and spacing
- Responsive breakpoints

### Add Profile Photo

1. Place your professional photo in the `images/` folder
2. Optimize the image (recommended: 300x300px, JPEG format, compressed)
3. Update the `src` attribute in `index.html`

## Performance Optimization

- **Images**: Compress images using tools like TinyPNG or ImageOptim
- **CSS/JS**: Minify files for production using online tools or build scripts
- **Testing**: Run Lighthouse audits to maintain 85+ performance score

## Monitoring and Maintenance

### View Application Logs

Monitor your deployed site using Azure CLI:

```bash
# Stream live logs
az webapp log tail --name my-cv-website --resource-group myResourceGroup

# Download logs
az webapp log download --name my-cv-website --resource-group myResourceGroup --log-file logs.zip
```

### Monitor Performance

1. **Using Azure Portal**:
   - Navigate to your Web App
   - Select "Metrics" to view performance data
   - Monitor response times, request counts, and errors

2. **Using Application Insights** (optional):
   - Enable Application Insights in Azure Portal
   - Get detailed performance analytics and user behavior data

### Check Site Health

```bash
# Check if site is running
az webapp show --name my-cv-website --resource-group myResourceGroup --query state

# Restart the app if needed
az webapp restart --name my-cv-website --resource-group myResourceGroup
```

### Cost Management

The Free tier (F1) App Service Plan includes:
- 1 GB disk space
- 165 MB/day outbound data transfer
- 60 CPU minutes/day

Monitor usage to avoid unexpected charges:
```bash
az consumption usage list --subscription <subscription-id>
```

## Browser Testing

Test your site in:
- Chrome 90+
- Firefox 88+
- Safari 14+
- Microsoft Edge 90+

## Troubleshooting

### Site Not Loading After Deployment

**Symptoms**: Blank page or 404 error after deployment

**Solutions**:
- Check that `web.config` is present in the root directory
- Verify `index.html` is in the root directory
- Check Azure App Service logs: 
  ```bash
  az webapp log tail --name my-cv-website --resource-group myResourceGroup
  ```
- Verify deployment completed successfully:
  ```bash
  az webapp deployment list --name my-cv-website --resource-group myResourceGroup
  ```

### HTTPS Redirect Not Working

**Symptoms**: Site loads on HTTP but doesn't redirect to HTTPS

**Solutions**:
- Ensure `web.config` contains the HTTPS redirect rule
- Verify the App Service has HTTPS enabled (it should be by default)
- Clear browser cache and try again
- Check the rewrite rules in Azure Portal under Configuration > General settings

### Git Push Fails

**Symptoms**: Authentication errors or push rejected

**Solutions**:
- Verify deployment credentials:
  ```bash
  az webapp deployment user show
  ```
- Reset deployment credentials if needed:
  ```bash
  az webapp deployment user set --user-name <username> --password <password>
  ```
- Ensure you're pushing to the correct branch (usually `main` or `master`)

### Performance Issues

**Symptoms**: Slow load times or low Lighthouse scores

**Solutions**:
- Run Lighthouse audit to identify bottlenecks:
  ```bash
  # Using Chrome DevTools or
  npm install -g lighthouse
  lighthouse https://my-cv-website.azurewebsites.net
  ```
- Compress images further (target: <100KB per image)
- Minify CSS and JavaScript files
- Check total asset size is under 5MB
- Enable Azure CDN for faster content delivery (optional)

### Images Not Displaying

**Symptoms**: Broken image icons or missing profile photo

**Solutions**:
- Verify image files are in the `images/` folder
- Check file paths in `index.html` are correct (case-sensitive)
- Ensure images were included in the deployment
- Verify image file formats are supported (JPEG, PNG, WebP)

### Responsive Layout Issues

**Symptoms**: Layout breaks on mobile or specific screen sizes

**Solutions**:
- Test at key breakpoints: 320px, 768px, 1024px, 1920px
- Check browser console for CSS errors
- Verify viewport meta tag is present in `index.html`
- Test in multiple browsers (Chrome, Firefox, Safari, Edge)

### App Service Plan Quota Exceeded

**Symptoms**: Deployment fails with quota error

**Solutions**:
- Check your App Service Plan limits:
  ```bash
  az appservice plan show --name myAppServicePlan --resource-group myResourceGroup
  ```
- Upgrade to a higher tier if needed:
  ```bash
  az appservice plan update --name myAppServicePlan --resource-group myResourceGroup --sku B1
  ```

### Need Help?

If you encounter issues not covered here:
1. Check Azure App Service documentation: https://docs.microsoft.com/en-us/azure/app-service/
2. Review deployment logs in Azure Portal
3. Verify all files are committed to Git
4. Test the site locally before deploying

## License

This project is open source and available for personal use.

## Contact

For questions or feedback, please refer to the contact information on the website.
