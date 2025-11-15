# Chatterly - Client

![React](https://img.shields.io/badge/React-18.x-blue)
![Vite](https://img.shields.io/badge/Vite-5.x-purple)
![Firebase](https://img.shields.io/badge/Firebase-Auth-orange)

[🚀 Live Demo](https://chatterly-ddcd5.web.app)

Chatterly is a modern social networking platform designed to connect people, share thoughts, and chat in real-time. Users can interact freely, post images and videos, see online friends, and engage through stories and posts—all with a clean and intuitive interface.

### Demo Accounts (No signup required):
- **User 1:** eren@gmail.com / 123456
- **User 2:** mikasa@gmail.com / 123456

---

## ✨ Features

- 🔐 User authentication via Firebase
- 📝 Create, edit, delete posts with images/videos
- ❤️ Like and comment on posts
- 🔔 Real-time notifications for post interactions
- 🔍 Search and connect with new users
- 💬 Real-time chatting with typing indicators
- 🟢 See online/offline status of friends
- 📖 Share ephemeral stories like Instagram/Facebook

---

## 🛠️ Tech Stack

- **Frontend:** React.js, Redux, Vite, Tailwind CSS, DaisyUI, React Router DOM
- **Real-time:** Socket.io
- **Media Upload:** Cloudinary
- **Authentication:** Firebase

---

## 🚀 Installation & Setup

### 1. Clone the repository

```bash
git clone https://github.com/yourusername/Chatterly_Client.git
cd Chatterly_Client
```

### 2. Install dependencies

```bash
npm install
```

### 3. Set environment variables

Create a `.env` file in the root directory and add the following:

```env
VITE_FIREBASE_API_KEY=<your_api_key>
VITE_FIREBASE_AUTH_DOMAIN=<your_project>.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=<your_project_id>
VITE_FIREBASE_STORAGE_BUCKET=<your_bucket>
VITE_FIREBASE_MESSAGING_SENDER_ID=<your_sender_id>
VITE_FIREBASE_APP_ID=<your_app_id>
VITE_API_BASE_URL=https://chatterly-server-nizy.onrender.com
```

### 4. Run locally

```bash
npm run dev
```

### 5. Build for production

```bash
npm run build
```

---

## 📝 Notes

- Ensure the backend server is running and accessible via `VITE_API_BASE_URL`.
- The app uses Socket.io for real-time features like messaging and notifications.

---

## 🤝 Contributing

Contributions are welcome! Feel free to open issues or submit pull requests.

---

## 📄 License

This project is licensed under the MIT License.
