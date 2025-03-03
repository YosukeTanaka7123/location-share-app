import { expect, test } from "@playwright/test";

test("Landing page visual regression test", async ({ page }) => {
  await page.goto("http://localhost:5173/");
  await page.waitForLoadState("networkidle");
  expect(await page.screenshot()).toMatchSnapshot("landing-page.png");
});
