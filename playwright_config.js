// @ts-check
import { defineConfig, devices } from '@playwright/test';

/**
 * Read environment variables from file.
 * https://github.com/motdotla/dotenv
 */
// import dotenv from 'dotenv';
// import path from 'path';
// dotenv.config({ path: path.resolve(__dirname, '.env') });

/**
 * @see https://playwright.dev/docs/test-configuration
 */
export default defineConfig({
    testDir: './tests',

    /* Run all spec files and inside tests in parallel when set true. Only runs spec files parallel and inside tests runs in serial when set true */
    fullyParallel: true,
    // fullyParallel: false, // Run only spec files parallel
    /**
     * Visual Represenataion of fullyParallel
     * 
     * LoginTest.spec.js:
     *      test A
     *      test B
     *      test C
     * CartTest.spec.js
     * CheckoutTest.spec.js
     * Based on no of workers configured (say 10)
     * 
     * a. fullyParallel: true
     * Worker 1 -> LoginTest.spec.js -> test A
     * Worker 2 -> LoginTest.spec.js -> test B
     * Worker 3 -> LoginTest.spec.js -> test C
     * Worker 4 -> CartTest.spec.js
     * Worker 5 -> CheckoutTest.spec.js
     * 
     * b. fullyParallel: false (default)
     * Worker 1 -> LoginTest.spec.js
     *                      test A
     *                      test B
     *                      test C
     * Worker 2 -> CartTest.spec.js
     * Worker 3 -> CheckoutTest.spec.js
     */

    /* Fail the build on CI if you accidentally left test.only in the source code. */
    forbidOnly: !!process.env.CI, // Used during CI/CD
    // forbidOnly: true, // Throws error when test.only declared for any tests in all the files
    // forbidOnly: false,

    /* Retry on CI only */
    // When test is getting failed at initial run based on reteries set it will re run again
    // retries: process.env.CI ? 2 : 0, // Used during CI/CD
    retries: 2, // Local running usage

    /* Opt out of parallel tests on CI. */
    // workers: process.env.CI ? 1 : 2, // Used during CI/CD
    workers: 4, // Local running usage 
    /**
     * If you are using fullyParallel with false value your files will go with multiple workers not tests
     * If you are using fullyParallel with true value your files and tests goes multiple workers
     */

    /* Reporter to use. See https://playwright.dev/docs/test-reporters */
    // reporter: 'html',
    reporter: [
        ['line'],
        ['html', { open: 'never' }],
        ['json', { outputFile: './reports/testjson.json' }]
    ],
    /**
     * Can declare multiple reporters in an Array of Arrays format
     * reporter: [
     *      ['reportType', { options }]
     *      ['reportType', { options }]
     *      ['reportType', { options }]
     * ]
     */

    timeout: 60 * 1000,
    /**
     * Timeout for each test in milliseconds. Default it was set to 30000 milliseconds (30 seconds).
     * Basically each test should complete within the specified timeout
     */

    expect: {
        timeout: 60 * 1000, // For assertions timeouts
    },
    
    /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
    use: {
        /* Base URL to use in actions like `await page.goto('')`. */
        // baseURL: 'http://localhost:3000',

        /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
        trace: 'on-first-retry',
        // trace: 'on',

        // Other options
        // Run tests in headed mode
        // headless: false, // Without declaring by default its true

        actionTimeout: 30 * 1000, // Used for click(), fill() etc action methods
        navigationTimeout: 30 * 1000 // Used for navigation methods. Ex: goto()
    },
    /**
     * Use is a global options objec for all the tests
     */

    globalTimeout: 60 * 1000, // Global Test Suite time out

    /* Configure projects for major browsers */
    projects: [
        {
            name: 'chromium',
            use: { ...devices['Desktop Chrome'] }, // Similar options will be available from global 'use' object
        },
        // {
        //     name: 'firefox',
        //     use: { ...devices['Desktop Firefox'] },
        // },

        // {
        //     name: 'webkit',
        //     use: { ...devices['Desktop Safari'] },
        // },

        /* Test against mobile viewports. */
        // {
        //   name: 'Mobile Chrome',
        //   use: { ...devices['Pixel 5'] },
        // },
        // {
        //   name: 'Mobile Safari',
        //   use: { ...devices['iPhone 12'] },
        // },

        /* Test against branded browsers. */
        // {
        //   name: 'Microsoft Edge',
        //   use: { ...devices['Desktop Edge'], channel: 'msedge' },
        // },
        // {
        //   name: 'Google Chrome',
        //   use: { ...devices['Desktop Chrome'], channel: 'chrome' },
        // },
    ],
    /**
     * Cross browser & cross device configurations
     */

    /* Run your local dev server before starting the tests */
    // webServer: {
    //   command: 'npm run start',
    //   url: 'http://localhost:3000',
    //   reuseExistingServer: !process.env.CI,
    // },
});

