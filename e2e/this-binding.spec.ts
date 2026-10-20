import { expect, test } from "@playwright/test";

test("topics catalog lists this binding and navigates", async ({ page }) => {
  await page.goto("/topics");
  await page.waitForLoadState("networkidle");
  await expect(
    page.getByRole("heading", { name: "Interview Topics" }),
  ).toBeVisible();
  await expect(
    page.getByRole("heading", { name: "How `this` Works", exact: true }),
  ).toBeVisible();

  await page
    .locator("main")
    .getByRole("link", { name: /how `this` works/i })
    .click();
  await expect(page).toHaveURL(/\/topics\/this-binding$/);
  await expect(
    page.getByRole("heading", { name: /how `this` works visualizer/i }),
  ).toBeVisible();
});

test("this binding playback advances and scrubs", async ({ page }) => {
  await page.goto("/topics/this-binding");
  await expect(
    page.getByRole("heading", { name: /how `this` works visualizer/i }),
  ).toBeVisible();

  // initial narration present
  await expect(
    page.getByText(/show\(\) is invoked as a standalone function/),
  ).toBeVisible();

  // step forward
  await page.getByRole("button", { name: "Next" }).click();
  await expect(
    page.getByText(/Default binding: `this` is the global object/),
  ).toBeVisible();

  // scrubber seeks
  const scrubber = page.locator('input[type="range"]');
  await scrubber.fill("0");
  await expect(
    page.getByText(/show\(\) is invoked as a standalone function/),
  ).toBeVisible();

  // reset
  await page.getByRole("button", { name: "Reset" }).click();
  await expect(
    page.getByText(/show\(\) is invoked as a standalone function/),
  ).toBeVisible();
});

test("quiz mode prompts for a prediction", async ({ page }) => {
  await page.goto("/topics/this-binding");
  // use a multi-step example so the quiz panel stays visible after a guess
  await page.getByRole("button", { name: "new binding" }).click();
  await page.getByRole("button", { name: "Quiz mode" }).click();
  await expect(
    page.getByText("Predict: which binding target resolves the next `this`?"),
  ).toBeVisible();
  await page.getByRole("button", { name: "new instance" }).click();
  await expect(page.getByText(/Correct!|Incorrect\./)).toBeVisible();
});
