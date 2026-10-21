import { expect, test } from "@playwright/test";

test("intro page renders handbook heading", async ({ page }) => {
  await page.goto("/");

  await expect(page.getByRole("heading", { name: "Handbook" })).toBeVisible();

  await expect(page.locator("aside")).toBeVisible();
});
