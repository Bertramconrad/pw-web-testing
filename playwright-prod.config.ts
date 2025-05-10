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
  timeout: 50000,
  globalTimeout: 60000,
  expect: {
    timeout: 50000
  },
  use: {
    /* Base URL to use in actions like `await page.goto('/')`. */
    //baseURL: 'http://localhost:4200',
    globalsQaUrl: 'https://www.globalsqa.com/demo-site/draganddrop/',
    //Handel the baseURL without using the Project section.
    baseURL: 'http://localhost:4200/',
  },

  /* Configure projects for major browsers */
  projects: [
    {
      name: 'dev',
      use: { 
        ...devices['Desktop Chrome'],       
      }      
    },
  ]
});
