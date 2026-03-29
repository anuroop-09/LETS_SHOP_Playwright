// @ts-check
import { defineConfig, devices } from '@playwright/test';
import dotenv from "dotenv";
dotenv.config()

export default defineConfig({
    testDir: './tests',
    fullyParallel: true,
    forbidOnly: !!process.env.CI,
    retries: process.env.CI ? 1 : 1,
    workers: process.env.CI ? 4 : 1,
    reporter: [
        ['html', { open: 'never' }],
        ['allure-playwright']
    ],
    timeout: 2 * 60 * 1000, // timeout for each test is set to 2 mins
    // globalTimeout: 60 * 1000,
    expect: {
        timeout: 20 * 1000, // timeouts of assertion
    },
    use: {
        baseURL: process.env.APP_URL || "https://rahulshettyacademy.com",
        browserName: 'chromium',
        channel: 'chrome', // optional
        launchOptions: {
            args: ['--start-maximized']
        },
        viewport: null,
        trace: 'retain-on-failure',
        screenshot: 'only-on-failure',
        video: 'retain-on-failure',
        actionTimeout: 20 * 1000,
    },
    snapshotPathTemplate: 'snapshots/{arg}{ext}',
    
    // Multiple browser configuration
    // projects: [
    //     {
    //         name: 'chromium',
    //         use: { ...devices['Desktop Chrome'] },
    //     },
    //     {
    //         name: 'firefox',
    //         use: { ...devices['Desktop Firefox'] },
    //     },
    //     {
    //         name: 'edge',
    //         use: { ...devices['Desktop Edge'] },
    //     },
    //     {
    //         name: 'webkit',
    //         use: { ...devices['Desktop Safari'] },
    //     },
    // ],
});

