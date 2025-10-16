import { test, expect } from '@playwright/test';
import { MCPHelper, MCPTestBase, MCP_CONFIG } from './mcp-setup';

test.describe('MCP Integration Tests', () => {
  let mcpHelper: MCPHelper;

  test.beforeEach(async ({ page }) => {
    mcpHelper = new MCPHelper(page);
  });

  test('should demonstrate MCP context switching', async ({ page }) => {
    // Test MCP context switching between pages
    const contexts = [
      { page: '/', context: { userType: 'visitor', tracking: true } },
      { page: '/blog', context: { userType: 'reader', tracking: true } },
      { page: '/contact', context: { userType: 'potential-client', tracking: true } }
    ];

    for (const { page: path, context } of contexts) {
      await mcpHelper.navigateWithMCP(path, context);
      
      // Verify page loads with MCP context
      await expect(page).toHaveURL(new RegExp(path.replace('/', '')));
      
      // Capture MCP metrics for each context
      const metrics = await mcpHelper.captureMCPMetrics();
      console.log(`MCP Metrics for ${path}:`, metrics);
    }
  });

  test('should test MCP performance across all pages', async ({ page }) => {
    const pages = ['/', '/blog', '/contact'];
    const performanceResults = [];

    for (const path of pages) {
      await mcpHelper.navigateWithMCP(path, { 
        performanceTracking: true,
        pageType: path.replace('/', '') || 'home'
      });
      
      const metrics = await mcpHelper.captureMCPMetrics();
      performanceResults.push({ path, metrics });
    }

    // Assert performance across all pages
    performanceResults.forEach(({ path, metrics }) => {
      expect(metrics.loadTime).toBeLessThan(5000);
      console.log(`${path} - Load Time: ${metrics.loadTime}ms`);
    });
  });

  test('should verify blog data availability in MCP fallback mode', async ({ page }) => {
    let intercepted = false;
    await page.route('**/posts.json', route => {
      intercepted = true;
      return route.continue();
    });
    
    await mcpHelper.navigateWithMCP('/blog', { 
      errorHandling: true,
      fallbackMode: true 
    });
    
    await expect(page.locator('h1:has-text("Blog Posts")')).toBeVisible();
    expect(await page.locator('[data-testid="blog-post"]').count()).toBeGreaterThan(0);
    expect(intercepted).toBe(false);

    await page.unroute('**/posts.json');
  });

  test('should test MCP accessibility integration', async ({ page }) => {
    // Test MCP accessibility features across pages
    const pages = ['/', '/blog', '/contact'];
    
    for (const path of pages) {
      await mcpHelper.navigateWithMCP(path, { 
        accessibility: true,
        screenReader: true 
      });
      
      // Test keyboard navigation
      await page.keyboard.press('Tab');
      await page.keyboard.press('Tab');
      
      // Verify focus management
      const focusedElement = page.locator(':focus');
      await expect(focusedElement).toBeVisible();
    }
  });

  test('should test MCP mobile responsiveness', async ({ page }) => {
    // Test MCP mobile features
    await page.setViewportSize(MCP_CONFIG.browsers.mobile.viewport);
    
    const pages = ['/', '/blog', '/contact'];
    
    for (const path of pages) {
      await mcpHelper.navigateWithMCP(path, { 
        mobile: true,
        touchEvents: true 
      });
      
      // Verify mobile layout
      await expect(page.locator('body')).toBeVisible();
      
      // Test touch interactions
      await page.tap('text=Blog');
      await expect(page).toHaveURL(/blog/);
    }
  });

  test('should test MCP data persistence', async ({ page }) => {
    // Test MCP data persistence across navigation
    await mcpHelper.navigateWithMCP('/', { 
      persistData: true,
      userSession: 'test-session' 
    });
    
    // Navigate to contact page
    await page.click('text=Get in Touch');
    await expect(page).toHaveURL(/contact/);
    
    // Verify MCP context is maintained
    const context = await page.evaluate(() => (window as any).mcpContext);
    expect(context).toBeDefined();
  });

  test('should test MCP analytics integration', async ({ page }) => {
    // Test MCP analytics tracking
    await mcpHelper.navigateWithMCP('/', { 
      analytics: true,
      tracking: true 
    });
    
    // Simulate user interactions
    await page.click('text=Read My Blog');
    await page.click('text=Back to Home');
    await page.click('text=Get in Touch');
    
    // Verify analytics data is captured
    const analyticsData = await page.evaluate(() => 
      (window as any).mcpAnalytics || {}
    );
    
    expect(analyticsData).toBeDefined();
  });

  test('should test MCP security features', async ({ page }) => {
    // Test MCP security context
    await mcpHelper.navigateWithMCP('/', { 
      security: true,
      csp: true 
    });
    
    // Verify security headers and context
    const securityContext = await page.evaluate(() => 
      (window as any).mcpSecurity || {}
    );
    
    expect(securityContext).toBeDefined();
  });

  test('should test MCP internationalization', async ({ page }) => {
    // Test MCP i18n features
    await mcpHelper.navigateWithMCP('/', { 
      locale: 'en-US',
      i18n: true 
    });
    
    // Verify content is in correct locale
    await expect(page.locator('h1:has-text("Rafay Syed"), span:has-text("Rafay Syed")').first()).toBeVisible();
    
    // Test MCP locale switching
    await mcpHelper.navigateWithMCP('/', { 
      locale: 'en-GB',
      i18n: true 
    });
    
    // Content should still be visible
    await expect(page.locator('h1:has-text("Rafay Syed"), span:has-text("Rafay Syed")').first()).toBeVisible();
  });
});
