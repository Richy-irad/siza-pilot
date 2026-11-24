import { defineConfig, devices } from "@playwright/test";

/** Smoke tests on a mobile viewport against a production build on :3123. */
export default defineConfig({
  testDir: "tests",
  use: { baseURL: "http://localhost:3123", ...devices["iPhone 13"], browserName: "chromium" },
  webServer: {
    command: "npm run build && npx next start -p 3123",
    url: "http://localhost:3123",
    reuseExistingServer: !process.env.CI,
    timeout: 180_000,
  },
});
