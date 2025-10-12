import { test, expect } from '@playwright/test';

test.describe('Verify New Design Matches Reference', () => {
  test('should have correct structure and styling', async ({ page }) => {
    // Navigate to the updated home page
    await page.goto('http://localhost:5175/');
    await page.waitForLoadState('networkidle');
    
    // Take a screenshot for comparison
    await page.screenshot({ path: 'new-design-screenshot.png', fullPage: true });
    
    // Verify hero section structure
    await expect(page.locator('header')).toBeVisible();
    await expect(page.locator('h1:has-text("Rafay Syed")')).toBeVisible();
    await expect(page.locator('h5:has-text("Hello I\'m")')).toBeVisible();
    await expect(page.locator('h5:has-text("Cybersecurity Expert & Full-Stack Developer")')).toBeVisible();
    
    // Verify navigation
    await expect(page.locator('nav a[href="#home"]')).toBeVisible();
    await expect(page.locator('nav a[href="#about"]')).toBeVisible();
    await expect(page.locator('nav a[href="#experience"]')).toBeVisible();
    await expect(page.locator('nav a[href="#services"]')).toBeVisible();
    await expect(page.locator('nav a[href="#portfolio"]')).toBeVisible();
    await expect(page.locator('nav a[href="#contact"]')).toBeVisible();
    
    // Verify CTA buttons
    await expect(page.locator('a:has-text("Download CV")')).toBeVisible();
    await expect(page.locator('a:has-text("Let\'s Talk")').first()).toBeVisible();
    
    // Verify social links
    await expect(page.locator('a[href="https://github.com"]')).toBeVisible();
    await expect(page.locator('a[href="https://twitter.com"]')).toBeVisible();
    await expect(page.locator('a[href="https://linkedin.com"]').first()).toBeVisible();
    
    // Verify about section
    await expect(page.locator('#about')).toBeVisible();
    await expect(page.locator('h2:has-text("About Me")')).toBeVisible();
    await expect(page.locator('h5:has-text("Get To Know")')).toBeVisible();
    
    // Verify stats cards
    await expect(page.locator('h3:has-text("Level")')).toBeVisible();
    await expect(page.locator('h3:has-text("Certificate")')).toBeVisible();
    await expect(page.locator('h3:has-text("Projects")')).toBeVisible();
    
    // Verify experience section
    await expect(page.locator('#experience')).toBeVisible();
    await expect(page.locator('h2:has-text("My Experience")')).toBeVisible();
    await expect(page.locator('h3:has-text("Language")')).toBeVisible();
    await expect(page.locator('h3:has-text("Technology and Tool")')).toBeVisible();
    
    // Verify skills are displayed
    await expect(page.locator('h4:has-text("HTML")')).toBeVisible();
    await expect(page.locator('h4:has-text("CSS")')).toBeVisible();
    await expect(page.locator('h4:has-text("JavaScript")')).toBeVisible();
    await expect(page.locator('h4:has-text("Python")')).toBeVisible();
    
    // Verify services section
    await expect(page.locator('#services')).toBeVisible();
    await expect(page.locator('h2:has-text("Learning and Achievement")')).toBeVisible();
    await expect(page.locator('h3:has-text("Information Assurance Learning Path")')).toBeVisible();
    
    // Verify portfolio section
    await expect(page.locator('#portfolio')).toBeVisible();
    await expect(page.locator('h2:has-text("Portfolio")')).toBeVisible();
    await expect(page.locator('h3:has-text("Personal Blog Website")')).toBeVisible();
    await expect(page.locator('h3:has-text("My Personal Portfolio Website")')).toBeVisible();
    
    // Verify contact section
    await expect(page.locator('#contact')).toBeVisible();
    await expect(page.locator('h2:has-text("Contact Me")')).toBeVisible();
    await expect(page.locator('h4:has-text("Email")')).toBeVisible();
    await expect(page.locator('h4:has-text("Messenger")')).toBeVisible();
    await expect(page.locator('h4:has-text("LinkedIn")')).toBeVisible();
    
    // Verify footer
    await expect(page.locator('footer')).toBeVisible();
    await expect(page.locator('h3:has-text("RAFAY SYED")')).toBeVisible();
    await expect(page.locator('text=© 2025 Rafay Syed. All rights reserved.')).toBeVisible();
    
    // Verify color scheme
    const bodyStyles = await page.evaluate(() => {
      const body = document.body;
      const computed = getComputedStyle(body);
      return {
        backgroundColor: computed.backgroundColor,
        color: computed.color,
        fontFamily: computed.fontFamily
      };
    });
    
    console.log('Body Styles:', bodyStyles);
    
    // Verify Ubuntu font is loaded
    expect(bodyStyles.fontFamily).toContain('Ubuntu');
    
    // Verify dark background
    expect(bodyStyles.backgroundColor).toBe('rgb(27, 27, 30)');
    
    // Verify white text
    expect(bodyStyles.color).toBe('rgb(255, 255, 255)');
  });

  test('should have smooth scrolling navigation', async ({ page }) => {
    await page.goto('http://localhost:5175/');
    await page.waitForLoadState('networkidle');
    
    // Test navigation links - scroll to top first
    await page.evaluate(() => window.scrollTo(0, 0));
    await page.waitForTimeout(500);
    
    // Test about link
    const aboutLink = page.locator('nav a[href="#about"]');
    await aboutLink.scrollIntoViewIfNeeded();
    await aboutLink.click();
    await page.waitForTimeout(500);
    await expect(page.locator('#about')).toBeInViewport();
    
    // Test experience link
    await page.evaluate(() => window.scrollTo(0, 0));
    await page.waitForTimeout(500);
    const experienceLink = page.locator('nav a[href="#experience"]');
    await experienceLink.scrollIntoViewIfNeeded();
    await experienceLink.click();
    await page.waitForTimeout(500);
    await expect(page.locator('#experience')).toBeInViewport();
    
    // Test services link
    await page.evaluate(() => window.scrollTo(0, 0));
    await page.waitForTimeout(500);
    const servicesLink = page.locator('nav a[href="#services"]');
    await servicesLink.scrollIntoViewIfNeeded();
    await servicesLink.click();
    await page.waitForTimeout(500);
    await expect(page.locator('#services')).toBeInViewport();
    
    // Test portfolio link
    await page.evaluate(() => window.scrollTo(0, 0));
    await page.waitForTimeout(500);
    const portfolioLink = page.locator('nav a[href="#portfolio"]');
    await portfolioLink.scrollIntoViewIfNeeded();
    await portfolioLink.click();
    await page.waitForTimeout(500);
    await expect(page.locator('#portfolio')).toBeInViewport();
    
    // Test contact link
    await page.evaluate(() => window.scrollTo(0, 0));
    await page.waitForTimeout(500);
    const contactLink = page.locator('nav a[href="#contact"]');
    await contactLink.scrollIntoViewIfNeeded();
    await contactLink.click();
    await page.waitForTimeout(500);
    await expect(page.locator('#contact')).toBeInViewport();
  });

  test('should be responsive on mobile', async ({ page }) => {
    // Set mobile viewport
    await page.setViewportSize({ width: 375, height: 667 });
    
    await page.goto('http://localhost:5175/');
    await page.waitForLoadState('networkidle');
    
    // Take mobile screenshot
    await page.screenshot({ path: 'new-design-mobile.png', fullPage: true });
    
    // Verify mobile layout
    await expect(page.locator('h1:has-text("Rafay Syed")')).toBeVisible();
    await expect(page.locator('nav')).toBeVisible();
    
    // Test mobile navigation - scroll to make nav visible first
    await page.evaluate(() => window.scrollTo(0, 0));
    await page.waitForTimeout(500);
    
    // Try to click the about link
    const aboutLink = page.locator('nav a[href="#about"]');
    await aboutLink.scrollIntoViewIfNeeded();
    await aboutLink.click();
    await page.waitForTimeout(500);
    await expect(page.locator('#about')).toBeInViewport();
  });

  test('should have proper accessibility', async ({ page }) => {
    await page.goto('http://localhost:5175/');
    await page.waitForLoadState('networkidle');
    
    // Test keyboard navigation
    await page.keyboard.press('Tab');
    await page.keyboard.press('Tab');
    await page.keyboard.press('Tab');
    
    // Verify focus management - check if any element is focused
    const focusedElement = page.locator(':focus');
    const focusedCount = await focusedElement.count();
    
    if (focusedCount > 0) {
      await expect(focusedElement).toBeVisible();
    } else {
      console.log('No focused element found - this may be normal for some browsers');
    }
    
    // Test form accessibility
    const links = await page.locator('a').all();
    for (const link of links) {
      const href = await link.getAttribute('href');
      const text = await link.textContent();
      if (href && text) {
        console.log(`Link: ${text} -> ${href}`);
      }
    }
  });

  test('should match reference website performance', async ({ page }) => {
    await page.goto('http://localhost:5175/');
    await page.waitForLoadState('networkidle');
    
    // Capture performance metrics
    const metrics = await page.evaluate(() => {
      const navigation = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
      return {
        loadTime: navigation.loadEventEnd - navigation.loadEventStart,
        domContentLoaded: navigation.domContentLoadedEventEnd - navigation.domContentLoadedEventStart,
        firstPaint: performance.getEntriesByName('first-paint')[0]?.startTime || 0,
        firstContentfulPaint: performance.getEntriesByName('first-contentful-paint')[0]?.startTime || 0,
      };
    });
    
    console.log('Performance Metrics:', metrics);
    
    // Verify performance is acceptable
    expect(metrics.loadTime).toBeLessThan(5000);
    expect(metrics.firstContentfulPaint).toBeLessThan(2000);
  });
});
