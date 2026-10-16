# Test Summary Report

## ข้อมูลการทดสอบ

- **วิชา:** Software Testing
- **ระบบเป้าหมาย:** SauceDemo (https://www.saucedemo.com/)
- **เครื่องมือ:** Playwright Test (TypeScript)
- **วันที่ทดสอบ:** 16 ตุลาคม 2026

---

## สรุปผลการทดสอบทั้งหมด (Summary)

- **Total Tests:** 8 tests (ครอบคลุม 6 ข้อสอบ)
- **Passed:** 8
- **Failed:** 0
- **Flaky / Skipped:** 0
- **สถานะรวม:** ผ่านทั้งหมด 100% (All Passed)

---

## รายละเอียดผลการทดสอบแต่ละข้อ

### บทที่ 1: Unit Testing / UI Component Testing

| Test Case | รายละเอียดการทดสอบ | ผลลัพธ์ | ระยะเวลา |
|---|---|:---:|:---:|
| `UT-01.1: empty username and password` | ตรวจสอบการแจ้งเตือน `Epic sadface: Username is required` เมื่อไม่กรอก Username และ Password และตรวจสอบว่าไม่เข้าหน้า Inventory | **Passed** | 789ms |
| `UT-01.2: missing password` | ตรวจสอบการแจ้งเตือน `Epic sadface: Password is required` เมื่อกรอกเพียง Username และตรวจสอบว่าไม่เข้าหน้า Inventory | **Passed** | 1.1s |
| `UT-01.3: invalid login details` | ตรวจสอบการแจ้งเตือน `Epic sadface: Username and password do not match any user in this service` เมื่อกรอกข้อมูลไม่ถูกต้อง และตรวจสอบว่าไม่เข้าหน้า Inventory | **Passed** | 1.0s |
| `UT-02: product button state Add to cart -> Remove -> Add to cart` | ตรวจสอบการเปลี่ยนแปลงสถานะปุ่มของสินค้า Sauce Labs Backpack จาก `Add to cart` -> `Remove` -> `Add to cart` พร้อมตรวจสอบ Cart Badge | **Passed** | 859ms |

---

### บทที่ 2: Integration Testing

| Test Case | รายละเอียดการทดสอบ | ผลลัพธ์ | ระยะเวลา |
|---|---|:---:|:---:|
| `IT-01: top-down REAL Login -> browser-level Inventory STUB` | ทำการ Login จริงผ่านหน้าเว็บ SauceDemo แล้วใช้ Browser-level Stub (`page.setContent()`) จำลองหน้า Inventory แสดง `Mock Inventory Ready` และสินค้าจำลอง 2 รายการ | **Passed** | 4.0s |
| `IT-02: DRIVER login state -> REAL Inventory and Cart` | ใช้ Driver (`driverOpenInventory()`) ตั้งค่า Cookie `session-username` เพื่อบายพาสหน้า Login แล้วเข้าทดสอบ Inventory จริง (สินค้า 6 ชิ้น) และ Cart จริง | **Passed** | 1.5s |

---

### บทที่ 3: System Testing

| Test Case | รายละเอียดการทดสอบ | ผลลัพธ์ | ระยะเวลา |
|---|---|:---:|:---:|
| `ST-01: complete purchase of two products` | ทดสอบ End-to-End flow: Login -> เพิ่มสินค้า 2 รายการ -> ตรวจสอบ Cart -> กรอก Checkout -> ตรวจสอบ Overview -> สั่งซื้อสำเร็จ (`Thank you for your order!`) | **Passed** | 1.3s |
| `ST-02: checkout validation and recovery` | ทดสอบ Flow การตรวจสอบ Validation Error ของฟอร์ม Checkout (First Name, Last Name, Postal Code) และกรอกข้อมูลแก้ไขจนสั่งซื้อเสร็จสมบูรณ์ | **Passed** | 1.7s |

---

## รายงานผลการทดสอบ
- **HTML Report:** `playwright-report/index.html` (เปิดดูได้ด้วย `npx playwright show-report`)
- **JSON Report:** `reports/results.json`
