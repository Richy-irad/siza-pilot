import { defineConfig, devices } from "@playwright/test";

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
