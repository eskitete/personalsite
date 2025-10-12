import { test, expect } from '@playwright/test';
import { MCPHelper, MCPTestBase, MCP_CONFIG } from './mcp-setup';

test.describe('Contact Page - MCP Integration', () => {
  let mcpHelper: MCPHelper;

  test.beforeEach(async ({ page }) => {
    mcpHelper = new MCPHelper(page);
    await mcpHelper.navigateWithMCP('/contact');
  });

  test('should load contact page with MCP context', async ({ page }) => {
    // Verify contact page loads
    await expect(page.locator('h1:has-text("Get in Touch")')).toBeVisible();
    await expect(page.locator('p:has-text("Have a question or want to work together?")')).toBeVisible();
    
    // Test MCP navigation
    await expect(page.locator('text=Back to Home')).toBeVisible();
  });

  test('should display contact information with MCP', async ({ page }) => {
    // Verify contact information section
    await expect(page.locator('text=Contact Information')).toBeVisible();
    
    // Test contact details with MCP context
    await expect(page.locator('h3:has-text("Email")')).toBeVisible();
    await expect(page.locator('h3:has-text("Phone")')).toBeVisible();
    await expect(page.locator('h3:has-text("Location")')).toBeVisible();
    
    // Test MCP functionality for contact links
    await mcpHelper.assertMCPFunctionality('a[href="mailto:contact@example.com"]', 'clickable');
    await mcpHelper.assertMCPFunctionality('a[href="tel:+1234567890"]', 'clickable');
  });

  test('should display social media links with MCP', async ({ page }) => {
    // Verify social media section
    await expect(page.locator('text=Social Media')).toBeVisible();
    
    // Test social links with MCP context
    await expect(page.locator('a[href="https://github.com"]')).toBeVisible();
    await expect(page.locator('a[href="https://twitter.com"]')).toBeVisible();
    
    // Test MCP functionality for social links
    await mcpHelper.assertMCPFunctionality('a[href="https://github.com"]', 'clickable');
  });

  test('should fill and submit contact form with MCP', async ({ page }) => {
    // Test form with MCP context
    const formData = MCP_CONFIG.testData.contactForm;
    
    // Fill form fields
    await page.fill('input[name="name"]', formData.name);
    await page.fill('input[name="email"]', formData.email);
    await page.fill('input[name="subject"]', formData.subject);
    await page.fill('textarea[name="message"]', formData.message);
    
    // Verify form data
    await expect(page.locator('input[name="name"]')).toHaveValue(formData.name);
    await expect(page.locator('input[name="email"]')).toHaveValue(formData.email);
    await expect(page.locator('input[name="subject"]')).toHaveValue(formData.subject);
    await expect(page.locator('textarea[name="message"]')).toHaveValue(formData.message);
    
    // Test form submission with MCP context
    await mcpHelper.assertMCPFunctionality('button[type="submit"]', 'clickable');
    
    // Submit form (note: this will just log to console in current implementation)
    await page.click('button[type="submit"]');
  });

  test('should validate form fields with MCP', async ({ page }) => {
    // Test form validation with MCP context
    const submitButton = page.locator('button[type="submit"]');
    
    // Try to submit empty form
    await submitButton.click();
    
    // Verify required field validation
    await expect(page.locator('input[name="name"]')).toBeFocused();
    
    // Fill required fields
    await page.fill('input[name="name"]', 'Test User');
    await page.fill('input[name="email"]', 'test@example.com');
    await page.fill('input[name="subject"]', 'Test Subject');
    await page.fill('textarea[name="message"]', 'Test message');
    
    // Verify form is now valid
    await mcpHelper.assertMCPFunctionality('button[type="submit"]', 'clickable');
  });

  test('should handle mobile viewport with MCP', async ({ page }) => {
    // Set mobile viewport
    await page.setViewportSize(MCP_CONFIG.browsers.mobile.viewport);
    
    // Verify mobile layout
    await expect(page.locator('h1:has-text("Get in Touch")')).toBeVisible();
    
    // Test mobile form interaction
    await page.fill('input[name="name"]', 'Mobile Test');
    await expect(page.locator('input[name="name"]')).toHaveValue('Mobile Test');
  });

  test('should test MCP performance on contact page', async ({ page }) => {
    // Navigate with MCP context
    await mcpHelper.navigateWithMCP('/contact', { 
      performanceTracking: true,
      pageType: 'contact' 
    });
    
    // Capture metrics
    const metrics = await mcpHelper.captureMCPMetrics();
    
    // Assert performance
    expect(metrics.loadTime).toBeLessThan(3000);
    
    console.log('Contact Page MCP Performance:', metrics);
  });

  test('should test MCP accessibility features', async ({ page }) => {
    // Test keyboard navigation with MCP
    await page.keyboard.press('Tab');
    await page.keyboard.press('Tab');
    await page.keyboard.press('Tab');
    
    // Verify focus management
    const focusedElement = page.locator(':focus');
    await expect(focusedElement).toBeVisible();
    
    // Test MCP accessibility assertions
    await mcpHelper.assertMCPFunctionality(':focus', 'visible');
  });

  test('should test MCP error handling for form', async ({ page }) => {
    // Test form with invalid data
    await page.fill('input[name="email"]', 'invalid-email');
    await page.fill('input[name="name"]', '');
    
    // Submit form
    await page.click('button[type="submit"]');
    
    // Verify form validation works
    await expect(page.locator('input[name="name"]')).toBeFocused();
  });
});
