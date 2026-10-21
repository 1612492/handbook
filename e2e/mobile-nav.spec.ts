import { expect, test } from "@playwright/test";

test.skip(({ viewport }) => (viewport?.width ?? 0) >= 768, "mobile only");

test("mobile topics drawer opens and navigates", async ({ page }) => {
  await page.goto("/");
  await page.waitForLoadState("networkidle");

  await page.getByRole("button", { name: "Topics" }).click();
  await expect(page.getByRole("dialog")).toBeVisible();

  await page
    .getByRole("dialog")
    .getByRole("link", { name: /event loop/i })
    .click();

  await expect(page).toHaveURL(/\/event-loop$/);
  await expect(page.getByRole("dialog")).not.toBeVisible();
});
