# ✨ AI Blogging Platform

An AI-powered blogging application that enables users to generate blog content using Google's **Gemini Pro** (via `@google/generative-ai`), upload thumbnails, and manage blogs efficiently through a clean React + Node.js interface.

## 🚀 Features

- ✍️ Generate blogs using AI (Gemini)
- 📤 Upload and preview blog thumbnails
- 🧠 Store and manage blog posts (MongoDB)
- 🔐 Secure login and JWT-based authentication
- 📦 Built with **Vite + React**, **Node.js + Express**, and **MongoDB**
- 📁 API integration with Postman tested

## 🖥️ Tech Stack

- **Frontend**: Vite + React + TailwindCSS
- **Backend**: Node.js + Express
- **Database**: MongoDB (Mongoose)
- **Authentication**: JWT (Token + Refresh)
- **AI API**: Google Gemini (`@google/generative-ai`)
- **Others**: Cloudinary (image upload), Toastify (notifications)

---

## 🛠️ Setup Instructions

### Prerequisites

- Node.js >= 18.x
- MongoDB (local or Atlas)
- Google Gemini API Key
- Cloudinary Account (for image uploads)

---

## 📦 Clone and Install

```bash
git clone https://github.com/anuragpande549/Ai_Blogging
cd Ai_Blogging


cd backend
npm install


PORT=5000
MONGO_URL=mongodb://localhost:27017/ai_blogging
JWT_SECRET=your_jwt_secret
REFRESH_SECRET=your_refresh_secret
CLOUD_NAME=your_cloudinary_name
API_KEY=your_cloudinary_api_key
API_SECRET=your_cloudinary_api_secret
GEMINI_API_KEY=your_google_gemini_api_key


npm run dev


cd ../frontend
npm install
npm run dev


📸 Image Upload
Blog images are uploaded using Cloudinary. The file is sent as a base64 string from the frontend to the backend which uploads it and returns a secure URL.

📬 Contact
Created by Anurag Pandey
Feel free to contribute or raise issues! ⭐

