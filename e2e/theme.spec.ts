import { expect, test } from "@playwright/test";

test("theme toggle switches to dark", async ({ page }) => {
  await page.goto("/");
  await page.waitForLoadState("networkidle");

  const select = page.getByLabel("Theme");
  await select.click();
  await page.getByRole("option", { name: /dark/i }).click();

  await expect(page.locator("html")).toHaveClass(/dark/);
});

test("theme toggle persists after reload", async ({ page }) => {
  await page.goto("/");
  await page.waitForLoadState("networkidle");

  await page.getByLabel("Theme").click();
  await page.getByRole("option", { name: /dark/i }).click();
  await expect(page.locator("html")).toHaveClass(/dark/);

  await page.reload();
  await page.waitForLoadState("networkidle");
  await expect(page.locator("html")).toHaveClass(/dark/);
});
