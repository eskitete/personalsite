# Playwright MCP (Model Context Protocol) Integration

This directory contains Playwright tests with MCP integration for the personal site project.

## What is MCP?

Model Context Protocol (MCP) is a framework for integrating AI models with external systems and data sources. In the context of Playwright testing, MCP provides:

- **Enhanced Context Management**: Better handling of test context and state
- **Performance Monitoring**: Detailed metrics and performance tracking
- **Error Handling**: Robust error recovery and fallback mechanisms
- **Accessibility Testing**: Built-in accessibility validation
- **Mobile Testing**: Comprehensive mobile device testing
- **Analytics Integration**: Test analytics and reporting

## Test Structure

### Core Files

- `mcp-setup.ts` - MCP configuration and helper functions
- `home.spec.ts` - Home page tests with MCP integration
- `blog.spec.ts` - Blog page tests with MCP integration
- `contact.spec.ts` - Contact page tests with MCP integration
- `mcp-integration.spec.ts` - Comprehensive MCP integration tests

### MCP Features

#### 1. Context Management
```typescript
await mcpHelper.navigateWithMCP('/', { 
  userType: 'visitor',
  tracking: true,
  performanceTracking: true 
});
```

#### 2. Performance Monitoring
```typescript
const metrics = await mcpHelper.captureMCPMetrics();
console.log('Load Time:', metrics.loadTime);
console.log('First Paint:', metrics.firstPaint);
```

#### 3. Error Handling
```typescript
await mcpHelper.navigateWithMCP('/blog', { 
  errorHandling: true,
  fallbackMode: true 
});
```

#### 4. Accessibility Testing
```typescript
await mcpHelper.assertMCPFunctionality('button', 'clickable');
```

## Running Tests

### Basic Test Commands

```bash
# Run all tests
npm run test

# Run tests with UI
npm run test:ui

# Run tests in headed mode (visible browser)
npm run test:headed

# Debug tests
npm run test:debug

# View test report
npm run test:report
```

### MCP-Specific Commands

```bash
# Run MCP integration tests only
npx playwright test tests/mcp-integration.spec.ts

# Run tests with MCP context
npx playwright test --grep "MCP"

# Run tests with specific MCP configuration
npx playwright test --config=playwright.config.ts
```

## MCP Configuration

The MCP configuration is defined in `mcp-setup.ts`:

```typescript
export const MCP_CONFIG = {
  baseURL: 'http://localhost:5175',
  timeouts: {
    navigation: 30000,
    action: 10000,
    assertion: 5000,
  },
  browsers: {
    desktop: { viewport: { width: 1920, height: 1080 } },
    mobile: { viewport: { width: 375, height: 667 } }
  }
};
```

## MCP Helper Functions

### Navigation with Context
```typescript
await mcpHelper.navigateWithMCP('/blog', { 
  userType: 'reader',
  tracking: true 
});
```

### Performance Metrics
```typescript
const metrics = await mcpHelper.captureMCPMetrics();
```

### Functionality Assertions
```typescript
await mcpHelper.assertMCPFunctionality('selector', 'expectedBehavior');
```

## Test Data

MCP tests use predefined test data:

```typescript
testData: {
  contactForm: {
    name: 'Test User',
    email: 'test@example.com',
    subject: 'Test Subject',
    message: 'Test message'
  }
}
```

## Best Practices

1. **Use MCP Context**: Always provide relevant context when navigating
2. **Monitor Performance**: Capture and assert performance metrics
3. **Handle Errors**: Implement proper error handling and recovery
4. **Test Accessibility**: Use MCP accessibility features
5. **Mobile Testing**: Test across different viewport sizes
6. **Analytics**: Track test analytics and performance

## Troubleshooting

### Common Issues

1. **Port Conflicts**: Ensure the dev server is running on the correct port
2. **Timeout Issues**: Adjust MCP timeout configurations
3. **Context Loss**: Verify MCP context is properly maintained
4. **Performance**: Monitor and optimize MCP performance metrics

### Debug Mode

Run tests in debug mode to step through MCP functionality:

```bash
npm run test:debug
```

## Integration with CI/CD

MCP tests can be integrated into CI/CD pipelines:

```yaml
# Example GitHub Actions
- name: Run MCP Tests
  run: npm run test
  env:
    CI: true
```

## Reporting

MCP tests generate detailed reports including:

- Performance metrics
- Error handling results
- Accessibility compliance
- Mobile responsiveness
- Analytics data

View reports with:

```bash
npm run test:report
```
