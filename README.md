

# Project Description: Dynamic Web Application using Next.js and Tailwind CSS
=====================================

## Project Overview:
    This project is a dynamic web application built using Next.js and Tailwind CSS. It is a Next.js 14 web application that fetches and displays data from the JSONPlaceholder API. It includes user management, post/comment filtering, authentication, interactive maps, and data visualization.

    The project demonstrates how to integrate React Query, Tailwind CSS, ShadCN UI, Mapbox, ApexCharts, and Zod in a modern full-stack React environment.

## Project Structure:


## ⚙️ Setup & Installation Instructions

### 1. Install Dependencies

Make sure you have **Node.js v18+** and **npm** installed. Then run:

```bash
npm install
```

### 2. Tailwind CSS Setup

Tailwind is already configured. Ensure `tailwind.config.js` includes:

```js
content: [
  './app/**/*.{js,ts,jsx,tsx}',
  './components/**/*.{js,ts,jsx,tsx}',
  './node_modules/@shadcn/ui/**/*.{js,ts,jsx,tsx}',
],
```

And add the following to `globals.css`:

```css
@tailwind base;
@tailwind components;
@tailwind utilities;
```

### 3. ShadCN UI Initialization

```bash
npx shadcn-ui@latest init
```

Choose `app` directory and your preferred theme.

### 4. Add Mapbox Token

Create a `.env.local` file:

```env
NEXT_PUBLIC_MAPBOX_TOKEN=your_mapbox_token_here
```

Update `Map.tsx` with:

```ts
mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_TOKEN!;
```

### 5. Run Development Server

```bash
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000) in your browser.
---

## 🌟 Features

## 🔐 Authentication
Users log in using their email and password.

Admin access: admin@admin.com / admin123.

Regular users: Email from JSONPlaceholder, password = their username.

## 👥 User Management
Fetch and display a list of users (/users endpoint).

View individual user profiles with detailed info and address on Mapbox map.

## 📰 Posts and Comments
View all posts (/posts endpoint).

Admins see all posts and comments.

Logged-in users see only their posts and related comments.

## 📊 Data Visualization
Use ApexCharts to show:

Total users

Total posts

Total comments

## 📝 Registration Form
Zod-validated form (non-functional demo).

Includes fields like name, email, phone, and address picker with Mapbox.

---

## 📁 Folder Structure

```
app/
  users/
    [id]/       -> User detail with Mapbox
    page.tsx    -> User list
  posts/        -> Post list and filtering
  login/        -> Authentication
  register/     -> Registration form
components/
  Map.tsx       -> Mapbox component
  Chart.tsx     -> ApexCharts reusable chart
```

---

## 📦 Packages Used

```npm
npm install tailwindcss postcss autoprefixer
npm install @tanstack/react-query
npm install react-hook-form zod @hookform/resolvers
npm install mapbox-gl
npm install apexcharts react-apexcharts
npm install @shadcn/ui
```


