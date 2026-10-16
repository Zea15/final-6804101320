# Software Testing Final Examination: Playwright Test Automation

**วิชา:** Software Testing  
**ระบบสำหรับทดสอบ:** SauceDemo (https://www.saucedemo.com/)  
**ผู้จัดทำ:** รหัสนักศึกษา 6804101320  
**GitHub Repository:** [final-6804101320](https://github.com/Zea15/final-6804101320.git)

---

## 📁 โครงสร้างโปรเจกต์ (Repository Structure)

```text
final-6804101320/
├── README.md
├── package.json
├── package-lock.json
├── playwright.config.ts
├── tests/
│   ├── unit/
│   │   ├── UT-01.spec.ts
│   │   └── UT-02.spec.ts
│   ├── integration/
│   │   ├── IT-01.spec.ts
│   │   └── IT-02.spec.ts
│   └── system/
│       ├── ST-01.spec.ts
│       └── ST-02.spec.ts
├── playwright-report/
│   └── index.html
└── reports/
    ├── results.json
    └── test-summary.md
```

---

## 📝 คำอธิบาย Integration Testing (บทที่ 2)

### 1. ข้อ IT-01: Top-Down Integration Testing ด้วย Stub
- **ส่วนที่เป็น Real (ส่วนจริง):** ขั้นตอนการ Login เข้าสู่ระบบ SauceDemo โดยใช้หน้าเว็บจริง ส่งค่า Username (`standard_user`) และ Password (`secret_sauce`) ผ่านฟอร์มจริง และตรวจสอบการเปลี่ยนผ่าน URL ไปยัง `inventory.html`
- **ส่วนที่เป็น Stub (ส่วนจำลอง):** หน้า Inventory จำลอง ซึ่งสร้างขึ้นโดยใช้ `page.setContent()` ในระดับ Browser DOM เพื่อจำลองการแสดงผลข้อความ `Mock Inventory Ready` และรายการสินค้าจำลอง 2 รายการคือ `Mock Backpack` และ `Mock Bike Light` แทนที่จะโหลดและพึ่งพาระบบ Backend/DOM หน้าจริงของ Inventory

### 2. ข้อ IT-02: Bottom-Up Integration Testing ด้วย Driver
- **บทบาทของ Driver:** ฟังก์ชัน `driverOpenInventory(browser)` ทำหน้าที่เป็น Test Driver โดยสร้าง `BrowserContext` ใหม่ และ inject คุกกี้ `session-username` = `standard_user` สำหรับโดเมน `www.saucedemo.com` เพื่อจำลองสถานะการผ่านการ Login มาแล้ว ทำให้สามารถเปิดหน้า `https://www.saucedemo.com/inventory.html` ได้โดยตรงโดยไม่ต้องผ่านหน้า Login Form
- **ส่วนที่เป็น Real (ส่วนจริง):** หน้าแสดงผลสินค้า Inventory จริง (ตรวจสอบสินค้าจริงครบ 6 รายการ) และระบบ Shopping Cart จริง รวมถึงการกดเพิ่มสินค้า Sauce Labs Backpack และ Sauce Labs Bike Light, การตรวจสอบ Shopping Cart Badge แสดงเลข `2`, และการเข้าสู่หน้า Cart เพื่อตรวจสอบชื่อสินค้าจริงในตะกร้า

---

## 🚀 วิธีการติดตั้งและการรันการทดสอบ (Getting Started)

### 1. ติดตั้ง Dependencies
```bash
npm install
npx playwright install chromium
```

### 2. รันการทดสอบทั้งหมด
```bash
npx playwright test
```

### 3. เปิดดู Playwright HTML Report
```bash
npx playwright show-report
```

---

## 📊 สรุปผลการทดสอบ (Test Results)

การทดสอบผ่านทั้งหมด **8/8 Tests (100% Passed)**
ดูรายละเอียดผลการทดสอบฉบับเต็มได้ที่ [reports/test-summary.md](reports/test-summary.md) และรายงาน JSON ที่ [reports/results.json](reports/results.json)
