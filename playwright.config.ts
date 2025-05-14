import { defineConfig, devices } from '@playwright/test';
import { TestOptions } from './test-options';

/**
 * Read environment variables from file.
 * https://github.com/motdotla/dotenv
 */
// import dotenv from 'dotenv';
// import path from 'path';
//dotenv.config({ path: path.resolve(__dirname, '.env') });
require('dotenv').config();

/**
 * See https://playwright.dev/docs/test-configuration.
 */
export default defineConfig<TestOptions>({
//export default defineConfig({
  timeout: 100000,

  //The next intrucción was commented for implementation of Docker.
  globalTimeout: 100000,

  expect: {
    timeout: 100000,
    toMatchSnapshot: {maxDiffPixels: 50}
  },
  testDir: './tests',
  /* Run tests in files in parallel */
  fullyParallel: false,
  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: !!process.env.CI,
  /* Retry on CI only */
  retries: process.env.CI ? 2 : 1,
  /* Opt out of parallel tests on CI. */
  workers: process.env.CI ? 1 : undefined,
  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  //reporter: 'html',
  //reporter: 'list',
  reporter: [
    ['html'],
    //process.env.CI ? ["dot"] : ["list"],
    //[
    // "@argos-ci/playwright/reporter",
    // {
       // Upload to Argos on CI only.
    //   uploadToArgos: !!process.env.CI,
       // Set your Argos token (required if not using GitHub Actions).
       //We do not need the token because we are integrated with Argos by github.
       //token: "<YOUR-ARGOS-TOKEN>",
    // },
    //],
    //['json', {outputFile: 'test-results/jsonReport.json'}],
    //['junit', {outputFile: 'test-results/junitReport.xml'}],
    //['allure-playwright']
  ],
  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  use: {
    /* Base URL to use in actions like `await page.goto('/')`. */
    //baseURL: 'http://localhost:4200',
    globalsQaUrl: 'https://www.globalsqa.com/demo-site/draganddrop/',
    //Handel the baseURL without using the Project section.
    baseURL: process.env.DEV === '1' ? 'http://localhost:4200/'
           : process.env.STAGING === '1' ? 'http://localhost:4200/'
           : 'http://localhost:4200/',

    /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
    trace: 'on-first-retry',
    screenshot: "only-on-failure",
    actionTimeout: 100000,
    navigationTimeout: 100000,
    /* video: { 
      mode: 'on',
      size: {width: 1920, height: 1080}
    } */
  },

  /* Configure projects for major browsers */
  projects: [
    {
      name: 'dev',
      use: { 
        ...devices['Desktop Chrome'],
        baseURL: 'http://localhost:4200/',
        globalsQaUrl: 'https://www.globalsqa.com/demo-site/draganddrop/'
      }      
    },
    {
      name: 'staging',
      use: { 
        ...devices['Desktop Chrome'],
        baseURL: 'http://localhost:4200/',
        globalsQaUrl: 'https://www.globalsqa.com/demo-site/draganddrop/'
      },
    },
    {
      name: 'pageObjectFullScreen',
      testMatch: 'usePageObjects.spec.ts',
      use: { 
        ...devices['Desktop Chrome'],
        viewport: {width: 1920, height: 1080},
        baseURL: 'http://localhost:4200/',
        globalsQaUrl: 'https://www.globalsqa.com/demo-site/draganddrop/'
  
      },
    },
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] },
    },
    {
      name: 'webkit',
      use: { ...devices['Desktop Safari'] },
    },
    {
      name: 'mobile',      
      testMatch: 'testMobile.spec.ts',
      use: { 
        ...devices['iPhone 13 Pro'], 
        baseURL: 'http://localhost:4200/', 
      },
    },

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

  /* Run your local dev server before starting the tests */
  webServer: {
     command: 'npm run start',
     url: 'http://localhost:4200/',
     //reuseExistingServer: !process.env.CI,
  },
});
