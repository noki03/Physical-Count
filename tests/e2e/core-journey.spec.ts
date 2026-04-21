import { test, expect } from "@playwright/test";

test.describe("Core User Journey", () => {
  test("should create a bay, add an item, and upload successfully", async ({
    page,
  }) => {
    // 1. Open the App
    // (Playwright config uses baseURL, so we just go to the root)
    await page.goto("/");

    // 2. Create a Bay
    await page
      .getByRole("textbox", { name: "Enter or scan Bay code" })
      .fill("BAY-01");
    await page
      .getByRole("textbox", { name: "Enter or scan Bay code" })
      .press("Enter");

    // 3. Add an Item
    // Wait for the item screen to be ready
    await expect(
      page.getByRole("textbox", { name: "Enter or scan item code" }),
    ).toBeVisible();

    // Scan Item
    await page
      .getByRole("textbox", { name: "Enter or scan item code" })
      .fill("ITEM-001");
    await page
      .getByRole("textbox", { name: "Enter or scan item code" })
      .press("Enter");

    // Add Quantity
    await page.getByPlaceholder("Quantity").fill("20");
    await page.getByPlaceholder("Quantity").press("Enter");

    // Verify the item was added to the list below
    await expect(page.getByText("ITEM-001", { exact: true })).toBeVisible();

    // 4. Finish Bay
    await page
      .getByRole("button", { name: "Finish and Scan Another Bay" })
      .click();

    // 5. Review Screen Check
    await page.getByRole("button", { name: "Bays" }).click();
    await expect(page.getByText("BAY-01")).toBeVisible();

    // 6. Navigate to Upload
    await page.getByRole("button", { name: "Upload" }).click();

    // 7. Execute Upload
    await page
      .getByRole("textbox", { name: "Enter your name or ID" })
      .fill("Automation Bot");
    await page.getByRole("button", { name: "Upload to Cloud" }).click();

    // Confirm dialog
    await page.getByRole("button", { name: "Upload Now" }).click();

    // 8. Verify Success State
    // Wait for the success UI to appear
    await expect(
      page.getByText(/All Caught Up|Data uploaded successfully/i).first(),
    ).toBeVisible({ timeout: 10000 });
  });
});
