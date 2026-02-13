# 🚀 Quick Start Guide - Playwright Framework

## ⚡ 5-Minute Setup

### Step 1: Clone & Install (2 minutes)
```bash
# Navigate to project
cd PlaywrightProject

# Install dependencies
npm install

# Install browsers
npx playwright install --with-deps
```

### Step 2: Configure Environment (1 minute)
```bash
# Copy environment template
cp .env.example .env

# Edit .env file with your credentials
# (The file is already configured with default credentials)
```

### Step 3: Run Your First Test (2 minutes)
```bash
# Run a single test file
npm test tests/programs/program.spec.ts

# Or run with visible browser
npm run test:headed tests/programs/program.spec.ts
```

**That's it! You're ready to go!** 🎉

---

## 📝 Common Commands Cheat Sheet

### Running Tests
```bash
# Run all tests
npm test

# Run with visible browser (headless = false)
npm run test:headed

# Run in debug mode (pause on each step)
npm run test:debug

# Run in UI mode (interactive)
npm run test:ui

# Run specific test file
npm test tests/programs/program.spec.ts

# Run tests with specific tag
npm run test:tag @smoke
```

### Viewing Reports
```bash
# View Playwright HTML report
npm run report

# Generate and view Allure report
npm run allure:serve

# Just generate Allure report
npm run allure:generate

# Open existing Allure report
npm run allure:open
```

### Cleanup
```bash
# Clean test results
npm run clean

# Clean auth files (force re-login)
npm run clean:auth

# Clean everything
npm run clean:all
```

---

## 🎯 Your First Custom Test

### 1. Create New Test File
```bash
# Create file: tests/programs/my-test.spec.ts
```

### 2. Copy This Template
```typescript
import { test, expect } from '@fixtures/authFixtures';
import { ProgramsPage } from '@pages/programs/ProgramsPage';
import { Logger } from '@utils/logger';

test.describe('My First Test Suite', () => {
  
  test('TC-001: My First Test', async ({ staffPage }) => {
    Logger.testStart('TC-001: My First Test');
    
    const programsPage = new ProgramsPage(staffPage);
    
    await test.step('Navigate to Programs', async () => {
      await programsPage.navigateToProgramsPage();
    });
    
    await test.step('Verify page loaded', async () => {
      const url = await programsPage.getCurrentUrl();
      expect(url).toContain('program');
      Logger.success('Test passed!');
    });
    
    Logger.testEnd('TC-001: My First Test');
  });
});
```

### 3. Run Your Test
```bash
npm test tests/programs/my-test.spec.ts
```

---

## 🔧 Common Issues & Solutions

### Issue 1: "Cannot find module '@pages/...'"
**Solution:**
```bash
# Restart VS Code or run:
npm install
```

### Issue 2: "Authentication failed"
**Solution:**
```bash
# Check your .env file has correct credentials
# Delete auth cache and try again:
npm run clean:auth
npm test
```

### Issue 3: "Browser not found"
**Solution:**
```bash
# Reinstall browsers:
npx playwright install --with-deps
```

### Issue 4: Tests are slow
**Solution:**
```bash
# Enable headless mode in .env:
HEADLESS=true

# Or run with headless flag:
npm test -- --headed=false
```

---

## 📊 Understanding Test Results

### Test Passed ✅
```
[SUCCESS] 2026-02-13T10:30:45.123Z - ✓ Test Completed: TC-001
```

### Test Failed ❌
```
[ERROR] 2026-02-13T10:30:45.123Z - Test failed: Element not found
Check: playwright-report/index.html for screenshot
```

### Where to Find Details
1. **Console Output** - Immediate feedback
2. **playwright-report/** - HTML report with screenshots
3. **allure-report/** - Detailed Allure report with history
4. **test-results/** - Raw test data

---

## 🎓 Next Steps

### Week 1: Learn the Basics
- ✅ Run existing tests
- ✅ Understand folder structure
- ✅ Read page objects
- ✅ Understand fixtures

### Week 2: Create Tests
- ✅ Copy templates
- ✅ Modify for your scenarios
- ✅ Use test data factories
- ✅ Add logging

### Week 3: Master the Framework
- ✅ Create new page objects
- ✅ Add custom utilities
- ✅ Optimize tests
- ✅ Generate reports

---

## 💡 Pro Tips

### Tip 1: Use Fixtures for Reusability
```typescript
// ✅ Good - Use fixture
test('My test', async ({ programsPage }) => {
  await programsPage.navigateToProgramsPage();
});

// ❌ Bad - Repeat code
test('My test', async ({ staffPage }) => {
  const programsPage = new ProgramsPage(staffPage);
  await programsPage.openMenu('Programs');
  await programsPage.waitForPageLoad();
});
```

### Tip 2: Use Factories for Test Data
```typescript
// ✅ Good - Unique every time
const data = ProgramFactory.generateBasicInfo();

// ❌ Bad - Hard-coded
const code = 'PROG001'; // Fails if run twice!
```

### Tip 3: Use test.step() for Clarity
```typescript
// ✅ Good - Clear steps
await test.step('Login', async () => { ... });
await test.step('Create Program', async () => { ... });
await test.step('Verify Success', async () => { ... });

// ❌ Bad - No structure
await loginPage.login();
await programsPage.create();
expect(success).toBeTruthy();
```

### Tip 4: Always Add Logging
```typescript
// ✅ Good - Trackable
Logger.info('Starting program creation');
await programsPage.create(data);
Logger.success('Program created');

// ❌ Bad - Silent
await programsPage.create(data);
```

---

## 📱 Need Help?

### Resources
1. **Framework README** - Complete documentation
2. **Code Comments** - Every file is documented
3. **Playwright Docs** - https://playwright.dev
4. **Skills in `/mnt/skills`** - Advanced patterns

### Before Asking for Help
1. ✅ Check this guide
2. ✅ Check README.md
3. ✅ Check error message
4. ✅ Check test reports
5. ✅ Try clean and re-run

---

## 🎉 Success Checklist

You're ready when:
- ✅ Tests run without errors
- ✅ You understand folder structure
- ✅ You can create a simple test
- ✅ You can view reports
- ✅ You know where to find help

---

**Happy Testing!** 🚀

Last Updated: February 2026
