# Changelog

## 2025-09-23
- created separate Wordle TPL audit documents: v2.0 (full adoption approach) and v2.1 (low-hanging fruit consistency approach)
- added both audit versions to index.html with today's date (9/23/2025) for easy navigation
- v2.1 focuses on incremental token swaps, color mapping, and styling consistency without architectural changes
- v2.0 focuses on comprehensive TPL component adoption including Typography, Button, Dialog, and full design system integration
- created comprehensive Wordle TPL consistency audit v2.1 focusing on low-hanging fruit opportunities rather than full component adoption
- analyzed Wordle codebase structure including 15+ custom components, 85+ color variables, and custom styling patterns 
- identified 12 specific token swap opportunities including color mapping, font weight standardization, spacing token adoption, and border radius consistency
- added direct GitHub repository links throughout audit document pointing to specific files and line numbers in games-phoenix repo
- structured opportunities by effort level (low/medium/high) with visual impact scoring and implementation timelines
- emphasized incremental improvements that maintain game functionality while improving TPL alignment
- included token mapping examples showing current Wordle patterns vs TPL-aligned alternatives
- provided 3-phase implementation strategy focusing on immediate wins, organization improvements, and validation
- updated README.md to align with new project name 'TPL Consistency Opportunities' and emphasize Template Pattern Library focus
- updated vercel.json to set project name to 'tpl-consistency-opportunities' for proper Vercel deployment identification
- fixed font loading issues by correcting all font directory paths in fonts.css and web-fonts.css
- removed incorrect /fonts/family/ path structure and replaced with proper /fonts/ directory structure 
- removed hash patterns from font filenames in web-fonts.css to match actual file structure
- converted absolute font paths (/fonts/) to relative paths (./), fixing compatibility with both local and hosted environments
- added missing font weight and style variants to fonts.css for Franklin, IBM Plex, and Imperial families
- ensured all NYT font families (Cheltenham, Franklin, Karnak, IBM Plex, Imperial, Karnak Condensed) load properly

## 2024-12-20

### Accurate TPL Data from ios-games
- verified messaging catalog accuracy against real ios-games repository source files  
- updated all GitHub links to point to actual source locations in github.com/nytimes/ios-games
- corrected TPL status based on actual implementation (import TPL statements vs Localizable.strings)
- found only 3 components with full TPL implementation (13% adoption rate)
- identified 5 components with partial TPL (SharedModels enums, 22%)
- confirmed 15 components using legacy Localizable.strings pattern (65%)
- updated statistics page with accurate insights from real codebase analysis

### TPL Usage Tracking & Statistics
- added TPL (Template Pattern Library) usage column to messaging catalog table
- expanded messaging data from 22 to 40 components with comprehensive TPL analysis
- created separate statistics page (messaging-tpl-stats.html) with bare-bones TPL usage analytics
- implemented color-coded TPL status indicators: Yes (green), No (red), Partial (yellow)
- added detailed breakdown by message type, game, and implementation patterns
- included actionable insights and recommendations for TPL adoption improvements
- linked messaging catalog and statistics pages with navigation

### Messaging Catalog Table Format
- converted messaging-moments-audit.html from card-based layout to clean, simple HTML table format
- implemented standard table with Type, Message, Context, Game, and Source columns
- added color-coded message types (Tooltip, Dialog, Toast, Badge, Error, Success, Loading)
- simplified styling for better readability and data scanning
- maintained all messaging data while improving presentation format

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
