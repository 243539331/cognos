import { defineConfig, devices } from "@playwright/test";

// Requiere PostgreSQL migrado y sembrado antes de correr (ver README.md
// "Desarrollo local"): npx prisma migrate deploy && npm run db:seed.
export default defineConfig({
  testDir: "./e2e",
  fullyParallel: false,
  workers: 1,
  retries: 0,
  reporter: [["list"]],
  use: {
    baseURL: "http://localhost:3000",
    viewport: { width: 420, height: 900 },
    screenshot: "only-on-failure",
    // Entorno de este sandbox: Chromium viene preinstalado fuera del árbol
    // habitual de Playwright; en otros entornos, omitir para usar el default.
    launchOptions: process.env.PLAYWRIGHT_BROWSERS_PATH
      ? { executablePath: `${process.env.PLAYWRIGHT_BROWSERS_PATH}/chromium` }
      : undefined,
  },
  projects: [
    {
      name: "chromium",
      use: { ...devices["Desktop Chrome"] },
    },
  ],
  webServer: {
    command: "npm run dev",
    url: "http://localhost:3000",
    reuseExistingServer: true,
    timeout: 60_000,
  },
});
