import { defineConfig, devices } from '@playwright/test';
import dotenv from 'dotenv';
import path from 'path';

// Load environment variables
dotenv.config({ path: path.resolve(__dirname, '.env') });

/**
 * Playwright Test Configuration
 * @see https://playwright.dev/docs/test-configuration
 */
export default defineConfig({
  testDir: './tests',

  /* Run tests in files in parallel */
  fullyParallel: true,

  /* Fail the build on CI if you accidentally left test.only in the source code */
  forbidOnly: !!process.env.CI,

  /* Retry on CI only */
  retries: process.env.CI ? 2 : 0,

  /* 
   * Workers Configuration:
   * - Local: 1 worker (sequential, easier debugging)
   * - CI: 3 workers (parallel across browsers for speed)
   */
  workers: process.env.CI ? 3 : 1,

  /* Overall test timeout */
  timeout: 60000,

  /* Expect timeout */
  expect: {
    timeout: 10000
  },

  /* 
   * Reporter Configuration:
   * - CI: Full reporting with all formats
   * - Local: Lighter reporting for faster feedback
   */
  reporter: process.env.CI 
    ? [
        // CI: Comprehensive reporting
        ['list'],
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
            application: 'ISSI GMS',
            environment: 'CI',
            nodeVersion: process.version
          }
        }]
      ]
    : [
        // Local: Lightweight reporting
        ['list'],
        ['html', { 
          open: 'never', 
          outputFolder: 'playwright-report' 
        }],
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

  /* Shared settings for all projects */
  use: {
    /* Base URL to use in actions like `await page.goto('/')` */
    baseURL: process.env.ISSI_GMS_URL,

    /* Collect trace when retrying the failed test */
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

  /* 
   * Browser Projects Configuration:
   * 
   * LOCAL: Only Chromium (fast iterations)
   * - Single browser for speed
   * - Can manually enable others with --project flag
   * 
   * CI: All browsers (comprehensive testing)
   * - Chromium, Firefox, WebKit
   * - Parallel execution with 3 workers
   */
  projects: process.env.CI 
    ? [
        // ============================================
        // CI: All Browsers (Parallel)
        // ============================================
        {
          name: 'chromium',
          use: { 
            ...devices['Desktop Chrome'],
            launchOptions: {
              args: [
                '--start-maximized',
                '--disable-dev-shm-usage', // Prevent crashes in CI
                '--no-sandbox'             // Required for some CI environments
              ]
            }
          },
        },
        {
          name: 'firefox',
          use: { 
            ...devices['Desktop Firefox'],
            launchOptions: {
              firefoxUserPrefs: {
                'browser.cache.disk.enable': false,
                'browser.cache.memory.enable': false
              }
            }
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
        // ============================================
        // LOCAL: Chromium Only (Fast)
        // ============================================
        {
          name: 'chromium',
          use: { 
            ...devices['Desktop Chrome'],
            launchOptions: {
              args: ['--start-maximized']
            }
          },
        },
        
        // Firefox and WebKit commented out for local
        // Uncomment to enable:
        // 
        // {
        //   name: 'firefox',
        //   use: { 
        //     ...devices['Desktop Firefox'] 
        //   },
        // },
        // {
        //   name: 'webkit',
        //   use: { 
        //     ...devices['Desktop Safari'] 
        //   },
        // },
      ],

  /* Folder for test artifacts */
  outputDir: 'test-results/',

  /* Global setup/teardown */
  // globalSetup: require.resolve('./global-setup.ts'),
  // globalTeardown: require.resolve('./global-teardown.ts'),

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
