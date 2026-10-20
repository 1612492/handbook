import { expect, test } from "@playwright/test";

test("topics catalog lists event loop and navigates", async ({ page }) => {
  await page.goto("/topics");
  await page.waitForLoadState("networkidle");
  await expect(
    page.getByRole("heading", { name: "Interview Topics" }),
  ).toBeVisible();
  await expect(
    page.getByRole("heading", { name: "Event Loop", exact: true }),
  ).toBeVisible();

  await page
    .locator("main")
    .getByRole("link", { name: /event loop/i })
    .click();
  await expect(page).toHaveURL(/\/topics\/event-loop$/);
  await expect(
    page.getByRole("heading", { name: "Event Loop Visualizer" }),
  ).toBeVisible();
});

test("event loop playback advances and scrubs", async ({ page }) => {
  await page.goto("/topics/event-loop");
  await expect(
    page.getByRole("heading", { name: "Event Loop Visualizer" }),
  ).toBeVisible();

  // initial narration present
  await expect(
    page.getByText(/console.log\('1'\) runs synchronously/),
  ).toBeVisible();

  // step forward
  await page.getByRole("button", { name: "Next" }).click();
  await expect(
    page.getByText(/setTimeout registers a 0ms timer/),
  ).toBeVisible();

  // scrubber seeks
  const scrubber = page.locator('input[type="range"]');
  await scrubber.fill("0");
  await expect(
    page.getByText(/console.log\('1'\) runs synchronously/),
  ).toBeVisible();

  // reset
  await page.getByRole("button", { name: "Reset" }).click();
  await expect(
    page.getByText(/console.log\('1'\) runs synchronously/),
  ).toBeVisible();
});

test("quiz mode prompts for a prediction", async ({ page }) => {
  await page.goto("/topics/event-loop");
  await page.getByRole("button", { name: "Quiz mode" }).click();
  await expect(
    page.getByText("Predict: where does the next item go?"),
  ).toBeVisible();
  await page.getByRole("button", { name: "Web APIs" }).click();
  await expect(page.getByText(/Correct!|Incorrect\./)).toBeVisible();
});
