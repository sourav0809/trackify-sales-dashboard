# 📊 Trackify Sales Dashboard

A fully responsive and dynamic analytics dashboard built with **Next.js**, **Tailwind CSS**, **ShadCN**, and **Redux Toolkit**, featuring real-time charts, user authentication, and layout customization.  
The backend is powered by **Express**, **TypeScript**, and **PostgreSQL**, with CI/CD pipelines deployed on **AWS** using **GitHub Actions**.

---

## 🚀 Live Demo

- **Frontend:** [https://trackify.devsourav.online](https://trackify.devsourav.online)  
- **Backend API:** [https://api.devsourav.online/api](https://api.devsourav.online/api)

---

## 📂 Repositories

- **Frontend Repo:** [https://github.com/sourav0809/trackify-sales-dashboard](https://github.com/sourav0809/trackify-sales-dashboard)  
- **Backend Repo:** [https://github.com/sourav0809/trackify-server](https://github.com/sourav0809/trackify-server)

> You can create a new account or use the demo credentials below:

```
Email:    demoaccount@gmail.com  
Password: Test@1234
```

---

## 🔍 Project Highlights

- ✅ 10+ charts displaying data fetched from the backend API
- 📱 Fully responsive layout across desktop, tablet, and mobile
- 🔐 Authentication system with login and signup functionality
- 🧩 **Dynamic card layout:**  
  Go to the **"Layout"** tab to resize and arrange the charts as per your needs. You can **save** your custom layout for future visits or use the **reset** button to restore the default layout.
- 🧼 Clean and modular codebase using:
  - **Frontend:** Next.js, Tailwind CSS, ShadCN, Redux Toolkit  
  - **Backend:** Express, TypeScript, PostgreSQL, Sequelize
- ☁️ Deployed on AWS with CI/CD pipelines using GitHub Actions

---

## 🛠️ Getting Started

### 🔗 Clone the Repositories

```bash
# Frontend
git clone https://github.com/sourav0809/trackify-sales-dashboard

# Backend
git clone https://github.com/sourav0809/trackify-server
```

---

## ⚙️ Environment Variables

### 🔧 Frontend

Create a `.env` file in the root directory of the frontend project and add:

```env
NEXT_PUBLIC_API_URL=https://api.devsourav.online/api
NEXT_APP_ENV=production
```

✅ You can use the live API URL above to test the frontend locally.

---

### 🛠️ Backend

Create a `.env` file in the root directory of the backend project and add:

```env
# Node Environment
NODE_ENV=development

# Application Port
PORT=8001

# Database Configuration
DB_NAME=sales_dashboard_db
DB_USER=postgres
DB_PASSWORD=your_strong_password
DB_HOST=localhost
DB_PORT=5432

# JWT Configuration
JWT_SECRET=your_jwt_secret_key_min_32_chars
JWT_ACCESS_EXPIRATION_MINUTES=30
JWT_REFRESH_EXPIRATION_DAYS=30

# Rate Limiting
RATE_LIMIT_WINDOW_MS=1200000  # 20 minutes in milliseconds
RATE_LIMIT_MAX=500            # maximum 500 requests per window

# CORS Configuration (optional)
CORS_ORIGIN=*                 # Use a specific domain in production

# Optional Configurations
NODE_OPTIONS=--max-old-space-size=4096  # Increase memory limit if needed
```

---

## 📦 Install Dependencies

Run the following command inside both the frontend and backend folders:

```bash
npm install
```

---

## ▶️ Start Development Servers

### Backend

```bash
npm run dev
```

### Frontend

```bash
npm run dev
```

---
