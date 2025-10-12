import { test, expect } from '@playwright/test';
import { writeFileSync } from 'fs';

test.describe('Analyze Reference Website', () => {
  test('should capture reference website structure and styling', async ({ page }) => {
    // Navigate to the reference website
    await page.goto('https://nguyenvu-personal-site.netlify.app/');
    
    // Wait for the page to load completely
    await page.waitForLoadState('networkidle');
    
    // Take a screenshot for reference
    await page.screenshot({ path: 'reference-site-screenshot.png', fullPage: true });
    
    // Capture the HTML structure
    const htmlContent = await page.content();
    
    // Save the HTML for analysis
    writeFileSync('reference-site.html', htmlContent);
    
    // Capture CSS styles
    const styles = await page.evaluate(() => {
      const styleSheets = Array.from(document.styleSheets);
      let allStyles = '';
      
      styleSheets.forEach(sheet => {
        try {
          const rules = Array.from(sheet.cssRules || []);
          rules.forEach(rule => {
            allStyles += rule.cssText + '\n';
          });
        } catch (e) {
          // Handle cross-origin stylesheets
          console.log('Cannot access stylesheet:', e);
        }
      });
      
      return allStyles;
    });
    
    writeFileSync('reference-site-styles.css', styles);
    
    // Analyze the page structure
    const pageStructure = await page.evaluate(() => {
      const sections = [];
      const elements = document.querySelectorAll('section, div[class*="section"], main, header, footer');
      
      elements.forEach((el, index) => {
        const rect = el.getBoundingClientRect();
        if (rect.width > 0 && rect.height > 0) {
          sections.push({
            index,
            tagName: el.tagName,
            className: el.className,
            id: el.id,
            text: el.textContent?.substring(0, 100) || '',
            styles: {
              backgroundColor: getComputedStyle(el).backgroundColor,
              color: getComputedStyle(el).color,
              fontSize: getComputedStyle(el).fontSize,
              fontFamily: getComputedStyle(el).fontFamily,
              padding: getComputedStyle(el).padding,
              margin: getComputedStyle(el).margin,
              display: getComputedStyle(el).display,
              position: getComputedStyle(el).position,
              width: getComputedStyle(el).width,
              height: getComputedStyle(el).height,
            }
          });
        }
      });
      
      return sections;
    });
    
    writeFileSync('reference-site-structure.json', JSON.stringify(pageStructure, null, 2));
    
    // Capture specific elements and their styling
    const heroSection = await page.locator('section').first();
    const heroStyles = await heroSection.evaluate((el) => {
      const computed = getComputedStyle(el);
      return {
        backgroundColor: computed.backgroundColor,
        color: computed.color,
        fontSize: computed.fontSize,
        fontFamily: computed.fontFamily,
        padding: computed.padding,
        margin: computed.margin,
        display: computed.display,
        position: computed.position,
        width: computed.width,
        height: computed.height,
        backgroundImage: computed.backgroundImage,
        backgroundSize: computed.backgroundSize,
        backgroundPosition: computed.backgroundPosition,
        backgroundRepeat: computed.backgroundRepeat,
      };
    });
    
    console.log('Hero Section Styles:', heroStyles);
    
    // Capture navigation structure
    const navElements = await page.locator('nav, header').all();
    const navStructure = [];
    
    for (const nav of navElements) {
      const navInfo = await nav.evaluate((el) => ({
        tagName: el.tagName,
        className: el.className,
        id: el.id,
        text: el.textContent,
        links: Array.from(el.querySelectorAll('a')).map(a => ({
          text: a.textContent,
          href: a.href,
          className: a.className
        }))
      }));
      navStructure.push(navInfo);
    }
    
    writeFileSync('reference-nav-structure.json', JSON.stringify(navStructure, null, 2));
    
    // Capture color scheme
    const colorScheme = await page.evaluate(() => {
      const body = document.body;
      const computed = getComputedStyle(body);
      return {
        backgroundColor: computed.backgroundColor,
        color: computed.color,
        primaryColor: computed.getPropertyValue('--primary-color') || 'not set',
        secondaryColor: computed.getPropertyValue('--secondary-color') || 'not set',
        accentColor: computed.getPropertyValue('--accent-color') || 'not set',
      };
    });
    
    console.log('Color Scheme:', colorScheme);
    
    // Capture typography
    const typography = await page.evaluate(() => {
      const headings = document.querySelectorAll('h1, h2, h3, h4, h5, h6');
      const typographyInfo = [];
      
      headings.forEach((heading, index) => {
        const computed = getComputedStyle(heading);
        typographyInfo.push({
          tag: heading.tagName,
          text: heading.textContent?.substring(0, 50),
          fontSize: computed.fontSize,
          fontFamily: computed.fontFamily,
          fontWeight: computed.fontWeight,
          color: computed.color,
          lineHeight: computed.lineHeight,
          margin: computed.margin,
        });
      });
      
      return typographyInfo;
    });
    
    writeFileSync('reference-typography.json', JSON.stringify(typography, null, 2));
    
    console.log('Reference website analysis complete!');
    console.log('Files created:');
    console.log('- reference-site-screenshot.png');
    console.log('- reference-site.html');
    console.log('- reference-site-styles.css');
    console.log('- reference-site-structure.json');
    console.log('- reference-nav-structure.json');
    console.log('- reference-typography.json');
  });
});
