import { defineConfig, devices } from '@playwright/test';
import dotenv from 'dotenv';
import path from 'path';

// Load environment variables
dotenv.config({ path: path.resolve(__dirname, '.env') });

/**
 * See https://playwright.dev/docs/test-configuration.
 */
export default defineConfig({
  testDir: './tests',
  
  /* Run tests in files in parallel */
  fullyParallel: true,
  
  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: !!process.env.CI,
  
  /* Retry on CI only */
  retries: process.env.CI ? 2 : 0,
  
  /* Opt out of parallel tests on CI. */
  workers: process.env.CI ? 1 : 1,
  
  /* Overall test timeout */
  timeout: 60000,
  
  /* Expect timeout */
  expect: {
    timeout: 10000
  },
  
  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  reporter: [
    ['html', { 
      open: 'never',
      outputFolder: 'playwright-report' 
    }],
    ['json', { 
      outputFile: 'test-results/results.json' 
    }],
    ['junit', { 
      outputFile: 'test-results/junit.xml' 
    }],
    ['allure-playwright', {
      detail: true,
      outputFolder: 'allure-results',
      suiteTitle: false,
      environmentInfo: {
        framework: 'Playwright',
        language: 'TypeScript',
        application: 'ISSI GMS'
      }
    }],
    ['list']
  ],
  
  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  use: {
    /* Base URL to use in actions like `await page.goto('/')`. */
    baseURL: process.env.ISSI_GMS_URL,

    /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
    trace: process.env.CI ? 'retain-on-failure' : 'on-first-retry',
    
    /* Take screenshot only on failure */
    screenshot: 'only-on-failure',
    
    /* Record video only on failure */
    video: 'retain-on-failure',
    
    /* Browser mode */
    headless: process.env.HEADLESS === 'true' || process.env.CI === 'true',
    
    /* Viewport */
    viewport: { width: 1920, height: 1080 },
    
    /* Action timeout */
    actionTimeout: 15000,
    
    /* Navigation timeout */
    navigationTimeout: 30000,
    
    /* Ignore HTTPS errors */
    ignoreHTTPSErrors: true,
  },

  /* Configure projects for major browsers */
  projects: [
  {
    name: 'chromium',
    use: { 
      ...devices['Desktop Chrome'],
      launchOptions: {
        args: ['--start-maximized']
      }
    },
  },

  {
    name: 'firefox',
    use: { 
      ...devices['Desktop Firefox'] 
    },
  },

  {
    name: 'webkit',
    use: { 
      ...devices['Desktop Safari'] 
    },
  },
],
    // /* Test against mobile viewports. */
    // {
    //   name: 'Mobile Chrome',
    //   use: { 
    //     ...devices['Pixel 5'] 
    //   },
    // },
    
    // {
    //   name: 'Mobile Safari',
    //   use: { 
    //     ...devices['iPhone 12'] 
    //   },
    // },

    // /* Test against branded browsers. */
    // {
    //   name: 'Microsoft Edge',
    //   use: { 
    //     ...devices['Desktop Edge'], 
    //     channel: 'msedge' 
    //   },
    // },
    
    // {
    //   name: 'Google Chrome',
    //   use: { 
    //     ...devices['Desktop Chrome'], 
    //     channel: 'chrome' 
    //   },
    
    // },
  //],

  /* Run your local dev server before starting the tests */
  // webServer: {
  //   command: 'npm run start',
  //   url: 'http://localhost:3000',
  //   reuseExistingServer: !process.env.CI,
  // },
});
