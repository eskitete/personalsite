import { test, expect } from '@playwright/test';
import { MCPHelper, MCPTestBase, MCP_CONFIG } from './mcp-setup';

test.describe('Blog Page - MCP Integration', () => {
  let mcpHelper: MCPHelper;

  test.beforeEach(async ({ page }) => {
    mcpHelper = new MCPHelper(page);
    await mcpHelper.navigateWithMCP('/blog');
  });

  test('should load blog page with MCP context', async ({ page }) => {
    // Verify blog page loads
    await expect(page.locator('h1:has-text("Blog Posts")')).toBeVisible();
    await expect(page.locator('p:has-text("Insights on Cybersecurity, Development, and Technology")')).toBeVisible();
    
    // Test MCP navigation
    await expect(page.locator('text=Back to Home')).toBeVisible();
  });

  test('should display sidebar with MCP functionality', async ({ page }) => {
    // Verify sidebar elements
    await expect(page.locator('aside h2:has-text("Blog"), aside span:has-text("Blog")').first()).toBeVisible();
    
    // Test social media links with MCP context
    await expect(page.locator('a[href="https://github.com"]')).toBeVisible();
    await expect(page.locator('a[href="https://twitter.com"]')).toBeVisible();
    
    // Test theme toggle
    await expect(page.locator('button').filter({ hasText: /Sun|Moon/ })).toBeVisible();
  });

  test('should filter posts by category with MCP', async ({ page }) => {
    // Wait for posts to load
    await page.waitForSelector('[data-testid="blog-post"], .group', { timeout: 10000 });
    
    // Test category filtering
    const categoryButtons = page.locator('button').filter({ hasText: /All Posts|Cybersecurity|Development|Technology/ });
    await expect(categoryButtons.first()).toBeVisible();
    
    // Test MCP functionality for category selection
    await mcpHelper.assertMCPFunctionality('button:has-text("All Posts")', 'clickable');
  });

  test('should search posts with MCP integration', async ({ page }) => {
    // Test search functionality
    const searchInput = page.locator('input[placeholder="Search posts..."]');
    await expect(searchInput).toBeVisible();
    
    // Test search with MCP context
    await searchInput.fill('cybersecurity');
    await page.waitForTimeout(500); // Wait for search results
    
    // Verify search is working
    await expect(searchInput).toHaveValue('cybersecurity');
  });

  test('should open post modal with MCP context', async ({ page }) => {
    // Wait for posts to load
    await page.waitForSelector('[data-testid="blog-post"], .group', { timeout: 10000 });
    
    // Click on first post
    const firstPost = page.locator('article').first();
    await firstPost.click();
    
    // Verify modal opens
    await expect(page.locator('[role="dialog"], .fixed')).toBeVisible();
    
    // Test MCP functionality for modal
    await mcpHelper.assertMCPFunctionality('button:has-text("×")', 'clickable');
  });

  test('should handle responsive design with MCP', async ({ page }) => {
    // Test mobile viewport
    await page.setViewportSize(MCP_CONFIG.browsers.mobile.viewport);
    
    // Verify mobile layout
    await expect(page.locator('h1:has-text("Blog Posts")')).toBeVisible();
    
    // Test mobile navigation
    const menuButton = page.locator('button').filter({ hasText: /Menu/ });
    if (await menuButton.isVisible()) {
      await menuButton.click();
    }
  });

  test('should test MCP performance on blog page', async ({ page }) => {
    // Navigate with MCP context
    await mcpHelper.navigateWithMCP('/blog', { 
      performanceTracking: true,
      pageType: 'blog' 
    });
    
    // Capture metrics
    const metrics = await mcpHelper.captureMCPMetrics();
    
    // Assert performance
    expect(metrics.loadTime).toBeLessThan(4000);
    
    console.log('Blog Page MCP Performance:', metrics);
  });

  test('should test MCP error handling', async ({ page }) => {
    // Test MCP error scenarios
    await page.route('**/posts.json', route => route.abort());
    
    // Navigate and verify error handling
    await mcpHelper.navigateWithMCP('/blog');
    
    // Should handle missing data gracefully
    await expect(page.locator('h1:has-text("Blog Posts")')).toBeVisible();
  });
});
