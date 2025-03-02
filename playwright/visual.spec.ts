import { test, expect } from "@playwright/test";

test("Landing page visual regression test", async ({ page }) => {
  await page.goto("http://localhost:5173/");
  expect(await page.screenshot()).toMatchSnapshot("landing-page.png");
});
