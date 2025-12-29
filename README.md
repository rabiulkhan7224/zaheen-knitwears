# Zaheen Knitwears 🧶

**E-commerce storefront and admin dashboard built with Next.js**

- **Live demo:** https://zaheen-knitwears.vercel.app/ ✅
- **Backend (API):** https://zaheen-knitwears-backend.vercel.app/ 🔗
- **Test Credentials
Admin Account (full product/category management): Email: admin@gmail.com Password: Admin@123

---

## 🚀 Project overview

Zaheen Knitwears is an e-commerce project showcasing a modern Next.js application with an administrative dashboard for managing products, categories and orders. It demonstrates file uploads (Cloudinary), authentication (email + Google OAuth), client-side data fetching with SWR, form validation with Zod + react-hook-form, and a responsive UI built with Tailwind CSS and shadcn components.

## ✨ Features

- Admin dashboard (products, categories, orders)
- Products CRUD with image upload (Cloudinary)
- Category management
- Orders list and basic filtering
- Authentication (regular + Google OAuth)
- Responsive UI and accessible components (shadcn/ui + Radix)
- Client-side data fetching using SWR
- Form validation with Zod and react-hook-form

## 🧰 Tech stack

- **Framework:** Next.js (App Router)
- **UI:** Tailwind CSS, shadcn/ui, Radix UI
- **Data fetching:** axios, SWR
- **Forms & validation:** react-hook-form, Zod
- **Auth:** Google OAuth + backend auth endpoints
- **Storage:** Cloudinary (image uploads)
- **Icons:** lucide-react
- **Notifications:** sonner

## 🔧 Local development

1. Clone the repo

```bash
git clone https://github.com/yourusername/zaheen-knitwears.git
cd zaheen-knitwears
npm install
```

2. Create a `.env.local` file (see example below)
3. Run the dev server

```bash
npm run dev
```

Open http://localhost:3000 to view the app.

> Note: The admin actions (creating/updating/deleting products and categories) require authentication. The frontend sends an `Authorization: Bearer <token>` header using the token saved in `localStorage` for some admin API calls. Ensure you log in (admin user) first.

## .env example

Create a `.env.local` in the project root and add these values (replace placeholders):

```env
# API base used by the frontend
NEXT_PUBLIC_BASE_API=https://zaheen-knitwears-backend.vercel.app/api/v1

# Google OAuth client id (for sign-in)
NEXT_PUBLIC_GOOGLE_CLIENT_ID=your-google-client-id

# Cloudinary (used for image uploads)
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=your-cloud-name
NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET=your-upload-preset
```

## 📦 Deployment

This project is configured to deploy on Vercel. Push to your GitHub repo and connect it to Vercel for automatic deployments.

## 📝 Notes

- Backend API is hosted at: `https://zaheen-knitwears-backend.vercel.app/` — see that project for server-side details, database, and authentication flows.
- If you'd like, I can add more documentation (API contract, environment secrets guide, or a contributor guide).

---

If you want any changes to the README layout, extra badges, or additional developer documentation, tell me what you'd like and I can update it. ✨
