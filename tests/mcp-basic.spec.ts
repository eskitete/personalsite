import { test, expect } from '@playwright/test';
import { MCPHelper, MCP_CONFIG } from './mcp-setup';

test.describe('MCP Basic Tests', () => {
  let mcpHelper: MCPHelper;

  test.beforeEach(async ({ page }) => {
    mcpHelper = new MCPHelper(page);
  });

  test('should load home page with MCP', async ({ page }) => {
    await mcpHelper.navigateWithMCP('/');
    
    // Basic page load verification
    await expect(page).toHaveTitle(/Rafay Syed/);
    
    // Verify main content is visible
    await expect(page.locator('h1, span').filter({ hasText: 'Rafay Syed' }).first()).toBeVisible();
    
    // Capture MCP metrics
    const metrics = await mcpHelper.captureMCPMetrics();
    console.log('MCP Performance Metrics:', metrics);
    
    // Verify performance is within acceptable limits
    expect(metrics.loadTime).toBeLessThan(10000);
  });

  test('should navigate between pages with MCP', async ({ page }) => {
    // Test navigation with MCP context
    await mcpHelper.navigateWithMCP('/', { userType: 'visitor' });
    
    // Navigate to blog
    await page.click('a[href="/blog"]');
    await expect(page).toHaveURL(/blog/);
    
    // Navigate to contact
    await page.click('a[href="/contact"]');
    await expect(page).toHaveURL(/contact/);
    
    // Navigate back to home
    await page.click('a[href="/"]');
    await expect(page).toHaveURL(/\/$/);
  });

  test('should test MCP performance across pages', async ({ page }) => {
    const pages = ['/', '/blog', '/contact'];
    const results = [];

    for (const path of pages) {
      await mcpHelper.navigateWithMCP(path, { 
        performanceTracking: true,
        pageType: path.replace('/', '') || 'home'
      });
      
      const metrics = await mcpHelper.captureMCPMetrics();
      results.push({ path, metrics });
      
      // Basic performance assertion
      expect(metrics.loadTime).toBeLessThan(10000);
    }

    console.log('MCP Performance Results:', results);
  });

  test('should test MCP mobile responsiveness', async ({ page }) => {
    // Set mobile viewport
    await page.setViewportSize(MCP_CONFIG.browsers.mobile.viewport);
    
    // Test mobile navigation with MCP
    await mcpHelper.navigateWithMCP('/', { mobile: true });
    
    // Verify mobile layout
    await expect(page.locator('h1, span').filter({ hasText: 'Rafay Syed' }).first()).toBeVisible();
    
    // Test mobile navigation
    await page.click('a[href="/blog"]');
    await expect(page).toHaveURL(/blog/);
  });

  test('should test MCP error handling', async ({ page }) => {
    // Test MCP error scenarios
    await page.route('**/posts.json', route => route.abort());
    
    // Navigate to blog page with MCP context
    await mcpHelper.navigateWithMCP('/blog', { 
      errorHandling: true,
      fallbackMode: true 
    });
    
    // Should handle missing data gracefully
    await expect(page.locator('h1').filter({ hasText: 'Blog Posts' })).toBeVisible();
    
    // Test MCP recovery
    await page.unroute('**/posts.json');
    await page.reload();
    await expect(page.locator('h1').filter({ hasText: 'Blog Posts' })).toBeVisible();
  });
});
