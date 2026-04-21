import { test, expect } from "@playwright/test";

test.describe("Advanced Deletion Journey", () => {
  test("should open a bay, delete all its items, and perform a global reset", async ({
    page,
  }) => {
    // 1. Open App
    await page.goto("/");

    // 2. Create BAY-01
    await page
      .getByRole("textbox", { name: "Enter or scan Bay code" })
      .fill("BAY-01");
    await page
      .getByRole("textbox", { name: "Enter or scan Bay code" })
      .press("Enter");

    // 3. Add Items
    await expect(
      page.getByRole("textbox", { name: "Enter or scan item code" }),
    ).toBeVisible();

    // Scan ITEM-001
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

    // Scan ITEM-002
    await page
      .getByRole("textbox", { name: "Enter or scan item code" })
      .fill("ITEM-002");
    await page
      .getByRole("textbox", { name: "Enter or scan item code" })
      .press("Enter");

    // Add Quantity
    await page.getByPlaceholder("Quantity").fill("30");
    await page.getByPlaceholder("Quantity").press("Enter");

    // Verify the item was added to the list below
    await expect(page.getByText("ITEM-002", { exact: true })).toBeVisible();

    // 4. Finish Bay
    await page
      .getByRole("button", { name: "Finish and Scan Another Bay" })
      .click();

    // 5. Review Screen Check
    await page.getByRole("button", { name: "Bays" }).click();
    await expect(page.getByText("BAY-01")).toBeVisible();

    // 5. Open the Bay Dialog
    await page.getByRole("button").nth(1).click();

    // Delete the first item
    await page.getByRole("button").first().click();

    // 6. Delete All Items inside the Bay Dialog
    await page.getByRole("button", { name: "Delete All Items" }).click();
    await page.getByRole("button", { name: "Yes, Delete All" }).click();

    // 7. Close Dialog
    // Use force here too, as the 'Items Deleted' toast might pop up
    await page.getByRole("button", { name: "Close" }).click({ force: true });

    // 8. Perform Global Reset
    await page.getByRole("button", { name: "Reset All Data" }).click();
    await page.getByRole("button", { name: "Reset Data" }).click();

    // 9. Verify Final State
    await expect(page.getByText("BAY01")).not.toBeVisible();
  });
});
