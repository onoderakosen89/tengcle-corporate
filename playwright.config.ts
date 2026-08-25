import { defineConfig, devices } from "@playwright/test";

const externalBaseURL = process.env.PLAYWRIGHT_BASE_URL;

export default defineConfig({
  testDir: "./tests",
  timeout: 30_000,
  expect: { timeout: 8_000 },
  reporter: process.env.CI ? "github" : "list",
  use: {
    baseURL: externalBaseURL || "http://127.0.0.1:4173",
    trace: "retain-on-failure",
  },
  webServer: externalBaseURL
    ? undefined
    : {
        command: "pnpm start:test",
        url: "http://127.0.0.1:4173/hk/en",
        reuseExistingServer: !process.env.CI,
        timeout: 30_000,
      },
  projects: [{ name: "chromium", use: { ...devices["Desktop Chrome"] } }],
});
