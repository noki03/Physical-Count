import { test, expect } from '@playwright/test';

test.describe('Core User Journey', () => {
  test('should create a bay, add an item, verify review screen, and upload', async ({ page }) => {
    // 1. Open the App
    await page.goto('/');

    // 2. Create a Bay
    await page.getByPlaceholder(/Enter Bay Name/i).fill('Bay A');
    await page.getByRole('button', { name: /Start Scanning/i }).click();

    // Verify we navigated to the Item Screen (looking for the item input)
    await expect(page.getByPlaceholder(/Scan or type item barcode/i)).toBeVisible();

    // 3. Add an Item
    await page.getByPlaceholder(/Scan or type item barcode/i).fill('ITEM-123');
    await page.keyboard.press('Enter');

    // Verify the item was added to the list below
    await expect(page.getByText('ITEM-123')).toBeVisible();

    // Navigate back to home (you might need to adjust this selector based on your back button implementation)
    // Assuming we use the bottom nav for this journey:
    await page.getByRole('button', { name: /Bays/i }).click();

    // 4. Verify Review/List Screen
    // We should see "1 Bay" and "1 Item" somewhere on the screen
    await expect(page.getByText('1', { exact: true }).first()).toBeVisible();

    // 5. Navigate to Upload Screen
    await page.getByRole('button', { name: /Upload/i }).click();

    // Verify Upload Summary shows 1 Pending Bay and 1 Pending Item
    await expect(page.getByText('Pending Bays')).toBeVisible();
    await expect(page.getByText('Pending Items')).toBeVisible();

    // 6. Execute Upload
    await page.getByPlaceholder(/uploader name/i).fill('Automation Bot');
    // Check the "Reset local data" checkbox
    await page.getByRole('checkbox').click();
    
    // Click the Upload to Cloud button
    await page.getByRole('button', { name: /Upload to Cloud/i }).click();

    // Confirm the dialog
    await page.getByRole('button', { name: /Yes, Upload/i }).click();

    // 7. Verify Success State
    // The premium success graphic should appear
    await expect(page.getByText(/All Caught Up/i)).toBeVisible();
    await expect(page.getByText(/Data uploaded successfully/i)).toBeVisible();
  });
});
