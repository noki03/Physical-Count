import { test, expect } from "@playwright/test";

test.describe("Destructive User Journey", () => {
  test("should create data, delete an item, and delete a bay", async ({
    page,
  }) => {
    // 1. Open the App
    await page.goto("/");

    // 2. Create a Bay
    await page
      .getByRole("textbox", { name: "Enter or scan Bay code" })
      .fill("DELETE-BAY");
    await page
      .getByRole("textbox", { name: "Enter or scan Bay code" })
      .press("Enter");

    // 3. Add an Item
    await expect(
      page.getByRole("textbox", { name: "Enter or scan item code" }),
    ).toBeVisible();
    await page
      .getByRole("textbox", { name: "Enter or scan item code" })
      .fill("BAD-ITEM");
    await page
      .getByRole("textbox", { name: "Enter or scan item code" })
      .press("Enter");
    await page.getByPlaceholder("Quantity").fill("5");
    await page.getByPlaceholder("Quantity").press("Enter");

    // Verify it exists
    await expect(page.getByText("BAD-ITEM", { exact: true })).toBeVisible();

    // 4. Delete the Item
    // Click the delete button on the item card (trash icon button)
    // Use filter to find div containing item text AND a button element
    await page
      .locator("div")
      .filter({ hasText: "BAD-ITEM", has: page.getByRole("button") })
      .last()
      .getByRole("button")
      .click();

    // Confirm the item deletion dialog
    await page.getByRole("button", { name: "Delete" }).click();

    // Verify the item is gone from the UI
    await expect(page.getByText("BAD-ITEM", { exact: true })).not.toBeVisible();

    // 5. Finish Bay and Go to Review Screen
    // Wait for any overlapping toast notifications to disappear first
    await expect(page.locator("[data-sonner-toast]")).toHaveCount(0, {
      timeout: 10000,
    });

    await page
      .getByRole("button", { name: "Finish and Scan Another Bay" })
      .click();
    await page.getByRole("button", { name: "Bays" }).click();

    // Verify Bay exists
    await expect(page.getByText("DELETE-BAY")).toBeVisible();

    // 6. Delete the Bay
    // Click the delete button (trash icon) in the bay card
    // Use filter to find div containing bay text AND a button element, then target the last button (delete)
    await page
      .locator("div")
      .filter({ hasText: "DELETE-BAY", has: page.getByRole("button") })
      .last()
      .getByRole("button")
      .last() // Target the last button (delete button)
      .click();

    // Confirm the bay deletion dialog
    await page.getByRole("button", { name: "Delete Bay" }).click();

    // Verify the bay is gone
    await expect(page.getByText("DELETE-BAY")).not.toBeVisible();
  });
});
