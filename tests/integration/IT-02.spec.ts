import { test, expect, Browser, BrowserContext, Page } from '@playwright/test';

async function driverOpenInventory(browser: Browser): Promise<{ context: BrowserContext; page: Page }> {
  const context = await browser.newContext();
  await context.addCookies([
    {
      name: 'session-username',
      value: 'standard_user',
      domain: 'www.saucedemo.com',
      path: '/',
    },
  ]);
  const page = await context.newPage();
  await page.goto('https://www.saucedemo.com/inventory.html');
  return { context, page };
}

test('IT-02: DRIVER login state -> REAL Inventory and Cart', {
  annotation: {
    type: 'description',
    description: 'ใช้ Driver เตรียมสถานะ Login เพื่อทดสอบ Inventory และ Cart จริง'
  }
}, async ({ browser }) => {
  let customContext: BrowserContext | undefined;
  let page: Page;

  try {
    await test.step('สร้าง Driver และเปิด Inventory', async () => {
      // สร้าง BrowserContext และใช้ driverOpenInventory() ตั้งค่า Cookie
      const driverResult = await driverOpenInventory(browser);
      customContext = driverResult.context;
      page = driverResult.page;
      await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html');
    });

    await test.step('ตรวจสอบ Inventory จริง', async () => {
      // ตรวจสอบสินค้า 6 รายการ
      const inventoryItems = page.locator('.inventory_item');
      await expect(inventoryItems).toHaveCount(6);
    });

    await test.step('เพิ่มสินค้า 2 รายการ', async () => {
      // เพิ่ม Backpack และ Bike Light แล้วตรวจสอบ Cart Badge = 2
      await page.locator('[data-test="add-to-cart-sauce-labs-backpack"]').click();
      await page.locator('[data-test="add-to-cart-sauce-labs-bike-light"]').click();
      const cartBadge = page.locator('.shopping_cart_badge');
      await expect(cartBadge).toHaveText('2');
    });

    await test.step('ตรวจสอบสินค้าใน Cart', async () => {
      // เปิด Cart และตรวจสอบชื่อสินค้าทั้งสองรายการ
      await page.locator('.shopping_cart_link').click();
      await expect(page).toHaveURL(/.*cart\.html/);

      const cartItemNames = page.locator('.inventory_item_name');
      await expect(cartItemNames).toHaveCount(2);
      await expect(cartItemNames.nth(0)).toHaveText('Sauce Labs Backpack');
      await expect(cartItemNames.nth(1)).toHaveText('Sauce Labs Bike Light');
    });
  } finally {
    // ปิด BrowserContext ที่สร้างเองเมื่อสิ้นสุดการทดสอบ
    if (customContext) {
      await customContext.close();
    }
  }
});
