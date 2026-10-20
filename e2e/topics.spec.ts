import { expect, test } from "@playwright/test";
import { TOPIC_MANIFEST } from "../src/features/topics/topic-manifest";

for (const topic of TOPIC_MANIFEST) {
  test(`catalog lists ${topic.id} and opens its visualizer`, async ({
    page,
  }) => {
    await page.goto("/topics");
    await page.waitForLoadState("networkidle");
    await expect(
      page.getByRole("heading", { name: "Interview Topics" }),
    ).toBeVisible();

    const entry = page
      .locator("main")
      .getByRole("link", { name: topic.title, exact: false });
    await expect(entry).toBeVisible();
    await entry.click();
    await expect(page).toHaveURL(new RegExp(`/topics/${topic.id}$`));
    await expect(page.getByTestId("step-visualizer")).toBeVisible();
  });

  test(`${topic.id} playback advances, resets and quizzes`, async ({
    page,
  }) => {
    await page.goto(`/topics/${topic.id}`);
    await expect(page.getByTestId("step-visualizer")).toBeVisible();

    // first step
    await expect(page.getByTestId("step-counter")).toHaveText(/Step 1 of/);

    // step forward
    await page.getByRole("button", { name: "Next" }).click();
    await expect(page.getByTestId("step-counter")).toHaveText(/Step 2 of/);

    // scrubber seeks back to the first step
    const scrubber = page.locator('input[type="range"]');
    await scrubber.fill("0");
    await expect(page.getByTestId("step-counter")).toHaveText(/Step 1 of/);

    // reset
    await page.getByRole("button", { name: "Next" }).click();
    await page.getByRole("button", { name: "Reset" }).click();
    await expect(page.getByTestId("step-counter")).toHaveText(/Step 1 of/);

    // quiz mode asks a question
    await page.getByRole("button", { name: "Quiz mode" }).click();
    await expect(page.getByTestId("quiz-prompt")).toBeVisible();
  });
}
