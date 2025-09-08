# Changelog

## 2024-12-20

### UI Simplification
- removed all "Filter by game" dropdown functionality from border-radius-audit.html to simplify interface
- removed card/shadow treatments throughout the page for cleaner, flatter design
- simplified container styling by removing background cards and box shadows
- updated example boxes to use subtle background color instead of raised card appearance
- removed complex filter JavaScript functionality and section header styling

### Font Loading Fix
- fixed font loading issue where @font-face declarations were using incorrect paths (./src/public/fonts/) instead of proper relative paths
- replaced inline font definitions in border-radius-audit.html, wordle-tpl-audit.html, and typography-comparison.html with correct CSS import
- corrected font family name from 'nyt-karnakcondensed' to 'nyt-karnak-cond' across all HTML files to match actual font definitions
- updated fonts/fonts.css to use relative paths (./fontname/) instead of absolute paths (/fonts/fontname/) for local development compatibility
- added missing nyt-karnak-cond font family definitions to fonts.css (weights 400 and 700)
- removed non-existent franklin-normal-400 font-face declaration that was causing loading errors
- updated fonts.css to use absolute paths (/fonts/fontname/) for proper Vercel deployment compatibility
- successfully pushed font loading fixes to GitHub and triggered Vercel redeployment

## 2024-12-20

### Project Setup and Deployment
- renamed project directory from nyt-games-audits-1 to genai-tpl-demos-games-web-style-audit to align with generative tooling naming conventions
- pulled comprehensive font files from nytimes/gen-design-context repository including Cheltenham, Franklin, Karnak, IBM Plex, Imperial, and other NYT font families
- created simplified fonts.css with proper relative paths for Vercel deployment, avoiding hash-based filenames
- configured vercel.json for static site deployment with optimized font caching headers (max-age=31536000)
- added package.json with project metadata and deployment scripts
- created professional index.html landing page showcasing all four audits with NYT typography and responsive design
- pushed project to GitHub repository at luis-nyt/genai-tpl-demos-games-web-style-audit
- successfully deployed to Vercel under nytimes organization at https://genai-tpl-demos-games-web-style-audit-7e8nabjm7.vercel.app
- fixed vercel.json configuration by removing deprecated name property and conflicting routes to enable proper deployment

### Design System Integration
- integrated NYT font families (nyt-cheltenham, nyt-franklin, nyt-karnak, nyt-ibm-plex, nyt-imperial) with proper fallbacks
- implemented consistent typography hierarchy using Cheltenham for headings and Franklin for body text
- added font-display: swap for improved loading performance
- configured proper WOFF2 and WOFF format support with fallbacks

### Infrastructure Improvements
- established proper git workflow with meaningful commit messages
- configured Vercel deployment pipeline with production-ready settings
- optimized asset delivery with long-term caching for font files
- ensured responsive design compatibility across devices
