const { chromium } = require('playwright');
const path = require('path');

async function captureScreenshots() {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  
  // Set viewport size for consistent screenshots
  await page.setViewportSize({ width: 1200, height: 800 });
  
  const documents = [
    {
      file: 'wordle-tpl-audit-v2-5.html',
      output: 'screenshots/v2-5-typography.png',
      title: 'Typography Analysis v2.5'
    },
    {
      file: 'wordle-tpl-audit-v2-4.html', 
      output: 'screenshots/v2-4-typography.png',
      title: 'Typography Analysis v2.4'
    },
    {
      file: 'wordle-tpl-audit-v2-3-colors.html',
      output: 'screenshots/v2-3-colors.png', 
      title: 'Color Analysis v2.3'
    },
    {
      file: 'wordle-tpl-audit-v2-1.html',
      output: 'screenshots/v2-1-consistency.png',
      title: 'Consistency Audit v2.1'
    },
    {
      file: 'wordle-tpl-audit-v2-0.html',
      output: 'screenshots/v2-0-adoption.png',
      title: 'Adoption Audit v2.0'  
    },
    {
      file: 'messaging-moments-audit.html',
      output: 'screenshots/messaging-moments.png',
      title: 'Messaging Moments'
    },
    {
      file: 'border-radius-audit.html', 
      output: 'screenshots/border-radius.png',
      title: 'Border Radius Audit'
    },
    {
      file: 'typography-comparison.html',
      output: 'screenshots/typography-comparison.png',
      title: 'Typography Comparison'
    },
    {
      file: 'messaging-tpl-stats.html',
      output: 'screenshots/messaging-stats.png', 
      title: 'Messaging Stats'
    }
  ];

  for (const doc of documents) {
    try {
      console.log(`📸 Capturing ${doc.title}...`);
      
      // Navigate to the document
      await page.goto(`file://${path.resolve(doc.file)}`);
      
      // Wait for fonts to load
      await page.waitForLoadState('networkidle');
      await page.waitForTimeout(2000); // Extra time for font rendering
      
      // Capture screenshot of the top portion (good for preview)
      await page.screenshot({
        path: doc.output,
        clip: { x: 0, y: 0, width: 1200, height: 600 }, // Top 600px
        type: 'png'
      });
      
      console.log(`✅ Saved ${doc.output}`);
      
    } catch (error) {
      console.error(`❌ Error capturing ${doc.file}:`, error.message);
    }
  }
  
  await browser.close();
  console.log('🎉 Screenshot capture complete!');
}

// Run the screenshot capture
captureScreenshots().catch(console.error);
