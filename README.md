<div align="center">

<img src="public/img/logo.png" alt="Premium Hub" width="80" height="80" />

# Premium Hub

เว็บแดชบอร์ดจัดการบัญชี Premium (สมัครสมาชิกแอป / สตรีมมิ่ง)

รวบรวมข้อมูลแพ็กเกจราคา จำนวนจอ และบัญชีประจำสัปดาห์ไว้ในที่เดียว — คัดลอกข้อมูลเข้าสู่ระบบได้ทันทีจากหน้าเว็บ

[![Next.js](https://img.shields.io/badge/Next.js-16-black?logo=next.js&logoColor=white)](https://nextjs.org)
[![React](https://img.shields.io/badge/React-19-149eca?logo=react&logoColor=white)](https://react.dev)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-3178c6?logo=typescript&logoColor=white)](https://www.typescriptlang.org)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4-38bdf8?logo=tailwindcss&logoColor=white)](https://tailwindcss.com)
[![License](https://img.shields.io/badge/©-2025_THXNXKXT-red)](https://github.com/THXNXKXT)

**เว็บไซต์** · [app-premium-hub.online](https://www.app-premium-hub.online/)

</div>

---

## ✨ ฟีเจอร์

| | ฟีเจอร์ | รายละเอียด |
|---|---------|-----------|
| 🏠 | **หน้าแรก** | แสดงแอปทั้งหมดเป็นการ์ด พร้อมจำนวนบัญชีและราคาเริ่มต้น แยก "เปิดให้บริการ" กับ "ปิดการใช้งาน" |
| 📦 | **รายละเอียดแอป** | แพ็กเกจราคา (ขาย / ทุน / ตัวแทน / กำไร) พร้อมบัญชีประจำสัปดาห์แยก "ใช้งานได้" และ "หมดอายุ" พร้อมนับวัน |
| 📋 | **บัญชีทั้งหมด** | ค้นหาและเรียกดูบัญชีทุกแพลตฟอร์มในหน้าเดียว |
| 📋 | **คัดลอกข้อมูล** | ปุ่มคัดลอกอีเมล / รหัสผ่าน / ลิงก์ คลิกเดียว |
| 🌓 | **Dark / Light Mode** | สลับธีมตามระบบหรือเลือกเอง |
| 📱 | **Responsive** | มือถือใช้ Bottom Navigation · เดสก์ท็อปใช้ Sidebar |

## 🛠 เทคโนโลยี

| หมวด | เครื่องมือ |
|------|-----------|
| **Framework** | [Next.js 16](https://nextjs.org) · App Router · React 19 |
| **ภาษา** | TypeScript |
| **Styling** | Tailwind CSS v4 |
| **Animation** | Framer Motion |
| **Icons** | lucide-react |
| **Theme** | next-themes |
| **Font** | Prompt (รองรับไทย) |

## 📁 โครงสร้างโปรเจกต์

โปรเจกต์ใช้ Next.js App Router โดยแยกส่วน UI ออกเป็น components และดึงข้อมูลจาก REST API ภายนอกผ่าน `src/lib/api.ts`

```
src/
├── app/
│   ├── page.tsx                 # หน้าแรก — แสดงแอปทั้งหมด
│   ├── layout.tsx               # Root layout (font, theme, nav)
│   ├── actions.ts               # Server Actions
│   ├── products/[id]/page.tsx   # รายละเอียดแอป + แพ็กเกจ + บัญชี
│   ├── accounts/page.tsx        # รายการบัญชีทั้งหมด
│   └── accounts/[id]/page.tsx   # รายละเอียดบัญชีรายตัว
├── components/                  # UI components (ProductCard, AccountCard, ...)
├── lib/api.ts                   # ดึงข้อมูลจาก REST API
└── types/index.ts               # TypeScript interfaces (Product, Account)
```

## 🚀 เริ่มต้นใช้งาน

### สิ่งที่ต้องมี

ติดตั้ง Node.js 18+ (แนะนำ 20+) และตัวจัดการแพ็กเกจ `npm` / `bun` / `pnpm` / `yarn`

### ติดตั้ง

โคลน repository และติดตั้ง dependencies:

```bash
git clone https://github.com/THXNXKXT/premium-hub.git
cd premium-hub
npm install
```

### ตั้งค่า Environment Variables

สร้างไฟล์ `.env.local` ที่ระดับรูทแล้วกำหนดค่า API URL:

```env [.env.local]
NEXT_PUBLIC_API_URL=https://your-api-url.com
```

API ต้องเปิดให้บริการ endpoints ต่อไปนี้ โดยคืนค่าในรูปแบบ `{ success: boolean, data: T }`:

| Endpoint | คำอธิบาย |
|----------|---------|
| `GET /products` | รายการแอป/แพ็กเกจทั้งหมด |
| `GET /accounts/week` | บัญชีทั้งหมดในสัปดาห์ปัจจุบัน |

### รันในโหมดพัฒนา

```bash
npm run dev
```

เปิด [http://localhost:3000](http://localhost:3000) ในเบราว์เซอร์เพื่อดูผลลัพธ์

### Build สำหรับ Production

```bash
npm run build
npm run start
```

## 📝 License

© THXNXKXT. All rights reserved.
