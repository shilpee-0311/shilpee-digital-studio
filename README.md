# Shilpee Digital Studio

> **Tagline:** *Turning Ideas into Powerful Digital Experiences.*
> **Official GitHub:** [github.com/shilpee-0311](https://github.com/shilpee-0311)

A full-stack freelance digital solutions website and private enquiry management dashboard. Built for businesses, professionals, and creators seeking high-conversion websites, custom applications, automated data pipelines, branding kits, digital invitations, and social media campaigns.

---

## 🌟 Core Features

### 1. Public Agency Web Experience
* **Modern Agency Visual Identity:** Deep Navy (`#070B16`), Electric Purple (`#7C3AED`), Soft Lavender (`#DDD6FE`), and Crisp White with glassmorphism and subtle glow accents.
* **Six Dedicated Service Practices:**
  1. **Website Development:** High-conversion business sites, landing pages, and portfolios.
  2. **Software & Web Applications:** Custom business tools, portals, and management dashboards.
  3. **Data Analytics & Automation:** Python workflows (Pandas, NumPy), MySQL databases, Excel models, and Power BI dashboards.
  4. **Graphic Design & Canva:** Social media creatives, pitch decks, brochures, menu cards, and reusable Canva kits.
  5. **Digital Invitations:** Responsive wedding, engagement, and event invitation websites with interactive itineraries and RSVP.
  6. **Social Media Management:** Monthly retainer packages (Starter, Growth, Studio) with content calendars, caption sets, and performance reports.
* **Demo Projects & Concept Showcases:** Filterable portfolio with live counters. In accordance with strict ethical standards, every sample is explicitly labelled as a **Demo Project** or **Concept Showcase** — zero fabricated client case studies or inflated metrics.
* **Downloadable Portfolio PDF:** Dedicated `/portfolio/print` route with a 1-click **Save as PDF** action for offline presentations.
* **Pricing & Custom Quotation:** Transparent packages linked directly to pre-filled enquiry briefs.
* **Direct Connect:** Quick links to WhatsApp, Email, and the official GitHub profile (`@shilpee-0311`).

### 2. Enquiry Pipeline & Spam Defense
* **Secure API (`POST /api/enquiries`):** Type-safe validation using Zod.
* **Honeypot Spam Trap:** Invisible field traps automated bots without polluting database records.
* **Sliding-Window Rate Limiting:** Prevents spam floods by capping submissions per IP.
* **Private SQLite Storage:** Stores incoming briefs securely in SQLite via Prisma ORM.

### 3. Private Admin Dashboard (`/admin`)
* **Secure Authentication:** Server-side bcrypt password verification and signed HTTP-only secure cookie sessions (`shilpee_admin_session`).
* **KPI Metrics:** Total Enquiries, New, In Review (`REVIEWING`), Quoted, and Completed counters.
* **Search & Filters:** Search by client name, email, or message; filter by status tab; filter by starred or archived.
* **Status Transitions:** Instant inline dropdown updates (`NEW`, `REVIEWING`, `QUOTED`, `IN_PROGRESS`, `COMPLETED`, `ARCHIVED`).
* **Internal Follow-up Notes:** Threaded private notes linked to each client dossier with author name and timestamp.
* **Sanitized CSV Export:** 1-click CSV export with sanitization against formula injection (`=`, `+`, `-`, `@`).

---

## 🛠️ Technology Stack

| Layer | Technologies |
| :--- | :--- |
| **Framework** | Next.js 16 (App Router, Turbopack, TypeScript) |
| **Styling & Design** | Tailwind CSS v4, custom brand tokens, Responsive & Accessible |
| **Icons** | Lucide React + custom official brand icons |
| **Database & ORM** | Prisma 6.4.1 with SQLite (Local) — 100% PostgreSQL-Ready |
| **Auth & Security** | `jose` (JWT), `bcryptjs`, HTTP-only secure cookies, sliding-window rate limiter |
| **Validation** | Zod (Client & Server schemas) |

---

## 🚀 Safe Local Setup Instructions

### Prerequisites
* **Node.js** v20.x or v24.x
* **npm** v10+ or v11+

### 1. Clone the Repository
```bash
git clone https://github.com/shilpee-0311/shilpee-digital-studio.git
cd shilpee-digital-studio
```

### 2. Configure Environment Variables
Copy the template to create your local `.env`:
```bash
cp .env.example .env
```
Open `.env` and configure:
* `DATABASE_URL="file:./dev.db"`
* `ADMIN_SESSION_SECRET`: A secure random string of 32+ characters (e.g. run `node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"`)
* `ADMIN_USERNAME`: Admin login username (e.g. `admin`)
* `ADMIN_INITIAL_PASSWORD`: Strong password for the admin account (never commit this)

### 3. Install Dependencies & Generate Prisma Client
```bash
npm install
```

### 4. Initialize Database & Seed Demo Data
```bash
npx prisma db push
npm run db:seed
```
*This synchronizes the SQLite schema and seeds default demo showcases and your admin account.*

### 5. Run Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.
Sign in to the admin portal at [http://localhost:3000/admin/login](http://localhost:3000/admin/login).

### 6. Run Automated Test Suite
```bash
npm run test:phase3
```
*Executes all 24 automated tests verifying form validation, honeypot traps, rate limiting, admin authentication, status updates, notes, and CSV export.*

---

## 🌐 Production Deployment (Vercel & PostgreSQL)

The project is structured for 1-click deployment on **Vercel** with **PostgreSQL** (e.g. Supabase, Neon, Railway, or AWS RDS):

1. **Switch Prisma Provider to PostgreSQL:**
   In `prisma/schema.prisma`, update the datasource:
   ```prisma
   datasource db {
     provider = "postgresql"
     url      = env("DATABASE_URL")
   }
   ```
2. **Push Code to GitHub:**
   Commit your clean repository and push to your private/public GitHub repo:
   ```bash
   git remote add origin https://github.com/shilpee-0311/shilpee-digital-studio.git
   git branch -M main
   git push -u origin main
   ```
3. **Import Project to Vercel:**
   Link your GitHub repository in the Vercel dashboard.
4. **Set Production Environment Variables on Vercel:**
   * `DATABASE_URL`: Your PostgreSQL connection string (`postgresql://user:pass@host:5432/dbname?sslmode=require`)
   * `ADMIN_SESSION_SECRET`: Your 32+ byte random hex secret
   * `ADMIN_USERNAME`: Admin username
   * `ADMIN_INITIAL_PASSWORD`: Secure initial password
   * `NEXT_PUBLIC_SITE_URL`: Your production domain (e.g. `https://shilpeedigitalstudio.com`)
   * `NEXT_PUBLIC_STUDIO_NAME`, `NEXT_PUBLIC_STUDIO_EMAIL`, etc.
5. **Run Database Migration & Seed on Production:**
   ```bash
   npx prisma db push
   npm run db:seed
   ```

---

## 📜 Available NPM Scripts

| Command | Description |
| :--- | :--- |
| `npm run dev` | Starts local Next.js development server |
| `npm run build` | Runs full production build and type checking |
| `npm run start` | Starts Next.js production server |
| `npm run test:phase3` | Runs 24-test integration and security suite |
| `npm run db:push` | Synchronizes Prisma schema with database |
| `npm run db:seed` | Seeds default demo projects and admin account |
| `npm run db:studio` | Opens Prisma Studio visual database inspector |

---

## 🔒 Security & Privacy Policy

* **No Leaked Credentials:** `.env` and database files are strictly excluded from version control via `.gitignore`.
* **Zero Fabrication Policy:** All showcase items are original demonstration prototypes built to illustrate craftsmanship. No client contracts, awards, or metrics are fabricated.
* **Customer Data Privacy:** Client submissions are restricted to the authenticated admin dashboard and are never shared or indexed by search engines.

---

© 2026 **Shilpee Digital Studio**. All rights reserved.
