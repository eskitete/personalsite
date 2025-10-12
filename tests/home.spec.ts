import { test, expect } from '@playwright/test';
import { MCPHelper, MCPTestBase, MCP_CONFIG } from './mcp-setup';

test.describe('Home Page - MCP Integration', () => {
  let mcpHelper: MCPHelper;

  test.beforeEach(async ({ page }) => {
    mcpHelper = new MCPHelper(page);
    await mcpHelper.navigateWithMCP('/');
  });

  test('should load home page with MCP context', async ({ page }) => {
    // Test basic page load with MCP
    await expect(page).toHaveTitle(/Rafay Syed/);
    
    // Verify main navigation elements
    await expect(page.locator('nav a[href="/"]')).toBeVisible();
    await expect(page.locator('nav a[href="/blog"]')).toBeVisible();
    await expect(page.locator('nav a[href="/contact"]')).toBeVisible();
    
    // Capture MCP metrics
    const metrics = await mcpHelper.captureMCPMetrics();
    console.log('MCP Performance Metrics:', metrics);
    
    // Verify performance is within acceptable limits
    expect(metrics.loadTime).toBeLessThan(5000);
  });

  test('should display hero section with typewriter effect', async ({ page }) => {
    // Wait for typewriter animation to complete
    await page.waitForSelector('text=Rafay Syed', { timeout: 10000 });
    
    // Verify hero content
    await expect(page.locator('text=Securing the Digital Future')).toBeVisible();
    
    // Test CTA buttons
    await expect(page.locator('a[href="/blog"]:has-text("Read My Blog")')).toBeVisible();
    await expect(page.locator('a[href="/contact"]:has-text("Get in Touch")').first()).toBeVisible();
  });

  test('should display expertise section with icons', async ({ page }) => {
    // Scroll to expertise section
    await page.locator('text=My Expertise').scrollIntoViewIfNeeded();
    
    // Verify expertise cards are visible
    await expect(page.locator('h3:has-text("Cybersecurity Expert")')).toBeVisible();
    await expect(page.locator('h3:has-text("Full-Stack Developer")')).toBeVisible();
    await expect(page.locator('h3:has-text("Security Consultant")')).toBeVisible();
    await expect(page.locator('h3:has-text("System Architect")')).toBeVisible();
    
    // Test MCP functionality for each card
    await mcpHelper.assertMCPFunctionality('text=Cybersecurity Expert', 'visible');
  });

  test('should display blog preview section', async ({ page }) => {
    // Scroll to blog section
    await page.locator('text=Latest Blog Posts').scrollIntoViewIfNeeded();
    
    // Wait for blog posts to load
    await page.waitForSelector('[data-testid="blog-post"], .group', { timeout: 10000 });
    
    // Verify blog section is visible
    await expect(page.locator('text=Latest Blog Posts')).toBeVisible();
    await expect(page.locator('text=See All Posts')).toBeVisible();
  });

  test('should navigate to contact page', async ({ page }) => {
    // Test navigation with MCP context
    await page.click('text=Get in Touch');
    await expect(page).toHaveURL(/contact/);
    
    // Verify contact page loads
    await expect(page.locator('text=Get in Touch')).toBeVisible();
  });

  test('should navigate to blog page', async ({ page }) => {
    // Test navigation with MCP context
    await page.click('text=Read My Blog');
    await expect(page).toHaveURL(/blog/);
    
    // Verify blog page loads
    await expect(page.locator('text=Blog Posts')).toBeVisible();
  });

  test('should handle mobile viewport with MCP', async ({ page }) => {
    // Set mobile viewport
    await page.setViewportSize(MCP_CONFIG.browsers.mobile.viewport);
    
    // Verify mobile layout
    await expect(page.locator('h1:has-text("Rafay Syed"), span:has-text("Rafay Syed")').first()).toBeVisible();
    
    // Test mobile navigation
    await page.click('text=Blog');
    await expect(page).toHaveURL(/blog/);
  });

  test('should test MCP performance metrics', async ({ page }) => {
    // Navigate with MCP context
    await mcpHelper.navigateWithMCP('/', { 
      performanceTracking: true,
      userContext: 'test-user' 
    });
    
    // Capture detailed metrics
    const metrics = await mcpHelper.captureMCPMetrics();
    
    // Assert performance thresholds
    expect(metrics.firstContentfulPaint).toBeLessThan(2000);
    expect(metrics.loadTime).toBeLessThan(3000);
    
    console.log('MCP Performance Report:', {
      loadTime: `${metrics.loadTime}ms`,
      firstPaint: `${metrics.firstPaint}ms`,
      firstContentfulPaint: `${metrics.firstContentfulPaint}ms`
    });
  });
});
