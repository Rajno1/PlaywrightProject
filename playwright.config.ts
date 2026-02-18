import { defineConfig, devices } from '@playwright/test';
import dotenv from 'dotenv';
import path from 'path';

// Load environment variables
dotenv.config({ path: path.resolve(__dirname, '.env') });

/**
 * Playwright Configuration
 * @see https://playwright.dev/docs/test-configuration
 */
export default defineConfig({
  testDir: './tests',

  /* Run tests in files in parallel */
  fullyParallel: true,

  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: !!process.env.CI,

  /* Retry on CI only */
  retries: process.env.CI ? 2 : 0,

  /* Workers: 1 for consistency (sessions), more for speed */
  workers: process.env.CI ? 1 : 1,

  /* Overall test timeout */
  timeout: 60000,

  /* Expect timeout */
  expect: {
    timeout: 10000
  },

  /* Reporter to use. */
  reporter: process.env.CI 
    ? [
        // CI: Minimal output + artifacts
        ['list'],
        ['html', { open: 'never', outputFolder: 'playwright-report' }],
        ['json', { outputFile: 'test-results/results.json' }],
        ['junit', { outputFile: 'test-results/junit.xml' }],
        ['allure-playwright', {
          detail: true,
          outputFolder: 'allure-results',
          suiteTitle: false,
          environmentInfo: {
            framework: 'Playwright',
            language: 'TypeScript',
            application: 'ISSI GMS',
            environment: process.env.CI ? 'CI' : 'Local'
          }
        }]
      ]
    : [
        // Local: Detailed output
        ['list'],
        ['html', { open: 'never', outputFolder: 'playwright-report' }],
        ['allure-playwright', {
          detail: true,
          outputFolder: 'allure-results',
          suiteTitle: false,
          environmentInfo: {
            framework: 'Playwright',
            language: 'TypeScript',
            application: 'ISSI GMS',
            environment: 'Local'
          }
        }]
      ],

  /* Shared settings for all the projects below. */
  use: {
    /* Base URL */
    baseURL: process.env.ISSI_GMS_URL,

    /* Collect trace when retrying the failed test. */
    trace: process.env.CI ? 'retain-on-failure' : 'on-first-retry',

    /* Screenshot only on failure */
    screenshot: 'only-on-failure',

    /* Video only on failure */
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

    /* Locale */
    locale: 'en-US',
    
    /* Timezone */
    timezoneId: 'America/New_York',
  },

  /* Configure projects for major browsers */
  projects: process.env.CI 
    ? [
        // ✅ CI: Run all browsers for maximum coverage
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
      ]
    : [
        // ✅ LOCAL: Chromium only for speed
        {
          name: 'chromium',
          use: { 
            ...devices['Desktop Chrome'],
            launchOptions: {
              args: ['--start-maximized']
            }
          },
        },
      ],

  /* Folder for test artifacts such as screenshots, videos, traces, etc. */
  outputDir: 'test-results/',
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
