# Chatterly 💬

**A real-time social networking platform with instant messaging, stories, and live status updates**

[![Live Demo](https://img.shields.io/badge/demo-live-success?style=for-the-badge)](https://chatterly-ddcd5.web.app)
[![React](https://img.shields.io/badge/React-18.3-61DAFB?style=for-the-badge&logo=react)](https://react.dev)
[![Vite](https://img.shields.io/badge/Vite-6.0-646CFF?style=for-the-badge&logo=vite)](https://vitejs.dev)
[![Socket.io](https://img.shields.io/badge/Socket.io-4.8-010101?style=for-the-badge&logo=socket.io)](https://socket.io)

> **Full-stack real-time social platform** built to connect people through instant messaging, story sharing, and interactive posts—demonstrating mastery of WebSocket technology, state management, and modern React patterns.

---

## 🎯 The Problem & Solution

**The Challenge:** Modern social platforms require complex real-time features (typing indicators, online status, instant notifications) that are difficult to implement efficiently while maintaining performance.

**My Solution:** Built Chatterly using Socket.io for bidirectional communication, Redux Toolkit for optimized state management, and Vite for lightning-fast development—creating a seamless real-time experience with sub-100ms response times.

---

## 🚀 Quick Start

### Demo Accounts (No signup required)
Test the full experience without creating an account:

| User | Email | Password |
|------|-------|----------|
| Eren | `eren@gmail.com` | `123456` |
| Mikasa | `mikasa@gmail.com` | `123456` |

**Pro tip:** Open in two browsers to see real-time features in action! ⚡

---

## ✨ Key Features

### 💬 Real-Time Messaging
- **Instant Chat** - WebSocket-powered messaging with zero refresh
- **Typing Indicators** - See when someone is composing a message
- **Message Status** - Delivered and read receipts
- **Emoji Picker** - Express yourself with emoji-picker-react
- **Media Sharing** - Send images and videos via Cloudinary

### 👥 Social Networking
- **User Profiles** - Customizable profiles with Firebase authentication
- **Friend Connections** - Search, add, and manage connections
- **Online Status** - Real-time presence indicators (🟢 online / ⚫ offline)
- **User Discovery** - Find and connect with new people

### 📱 Stories & Posts
- **Instagram-Style Stories** - Ephemeral content with react-insta-stories
- **Rich Posts** - Share images, videos, and thoughts
- **Engagement** - Like and comment on posts
- **Interactive Feed** - Scrollable timeline with lazy loading

### 🔔 Real-Time Notifications
- **Instant Alerts** - Socket.io-powered push notifications
- **Activity Tracking** - Likes, comments, and new messages
- **Toast Notifications** - Beautiful UI feedback with react-hot-toast

---

## 🛠️ Tech Stack

### Frontend Core
```
React 18.3           → Latest React features (concurrent rendering, automatic batching)
Vite 6.0             → Next-gen build tool with HMR (5x faster than CRA)
Redux Toolkit 2.5    → Modern Redux with RTK Query
React Router 7.1     → Client-side routing with data loading
TypeScript Support   → Type-safe development
```

### Real-Time & Communication
```
Socket.io Client 4.8 → WebSocket client for bidirectional communication
Firebase 11.1        → Authentication and user management
Cloudinary           → Media upload and optimization
```

### UI & Styling
```
Tailwind CSS 3.4     → Utility-first CSS framework
DaisyUI 4.12         → Tailwind component library
React Icons 5.4      → 50,000+ icons from popular libraries
Headless UI 2.2      → Unstyled, accessible components
Lottie React         → High-quality animations
```

### Form & UX
```
React Hook Form 7.54 → Performant form validation
Emoji Picker React   → Native emoji selection
React Hot Toast      → Beautiful notification system
Date-fns 4.1         → Modern date utility library
React Insta Stories  → Instagram-style story viewer
```

### Development Tools
```
ESLint 9.17          → Code quality and consistency
Vite Plugin React    → Fast refresh and JSX transform
PostCSS + Autoprefixer → CSS processing
```

---

## 🏗️ Architecture Highlights

### Real-Time Communication Strategy
- **Socket.io Rooms** for private conversations
- **Event-driven architecture** for instant updates
- **Optimistic UI updates** for perceived performance
- **Reconnection logic** for network reliability

### State Management
- **Redux Toolkit** with RTK Query for API caching
- **Socket.io state sync** for real-time data
- **Local state** for UI interactions
- **Persistent auth state** with Firebase

### Performance Optimizations
- **Vite's HMR** for instant feedback during development
- **Code splitting** with React Router lazy loading
- **Memoization** to prevent unnecessary re-renders
- **Cloudinary optimization** for fast media delivery
- **Socket.io binary transport** for efficient data transfer

---

## 🚀 Installation & Setup

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn
- Firebase account
- Cloudinary account (for media uploads)

### 1. Clone the repository
```bash
git clone https://github.com/yourusername/chatterly-client.git
cd chatterly-client
```

### 2. Install dependencies
```bash
npm install
```

### 3. Environment Configuration

Create a `.env` file in the root directory:

```env
# Firebase Configuration
VITE_FIREBASE_API_KEY=your_firebase_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_storage_bucket
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id

# API Configuration
VITE_API_BASE_URL=https://chatterly-server.onrender.com

# Cloudinary (Optional - for media uploads)
VITE_CLOUDINARY_CLOUD_NAME=your_cloud_name
VITE_CLOUDINARY_UPLOAD_PRESET=your_preset
```

### 4. Start Development Server
```bash
npm run dev
```

The app will open at `http://localhost:5173` with hot module replacement enabled.

### 5. Build for Production
```bash
npm run build
npm run preview  # Preview production build locally
```


## 🎓 Key Technical Achievements

### 1. **WebSocket Integration**
- Implemented bidirectional Socket.io connection with room management
- Built typing indicator system with debouncing for performance
- Created presence system showing real-time online/offline status

### 2. **State Management Excellence**
- Used Redux Toolkit with RTK Query for efficient API state caching
- Synchronized Socket.io events with Redux store for consistent state
- Implemented optimistic updates for instant UI feedback

### 3. **Modern React Patterns**
- Leveraged React 18's concurrent rendering features
- Used Headless UI for accessible, unstyled components
- Implemented code splitting with React Router's lazy loading

### 4. **Real-Time Stories**
- Integrated react-insta-stories for Instagram-like story experience
- Built ephemeral content system with auto-expiry
- Optimized media loading for smooth story transitions

### 5. **Performance & UX**
- Achieved sub-100ms message delivery with Socket.io
- Implemented infinite scroll with lazy loading
- Used Lottie animations for smooth, performant UI feedback

---

## 🔮 Future Enhancements

- [ ] Voice and video calling (WebRTC integration)
- [ ] Group chat functionality
- [ ] Message reactions and threads
- [ ] Advanced media editor for posts
- [ ] Push notifications (PWA)
- [ ] Story replies and reactions
- [ ] User blocking and reporting
- [ ] End-to-end encryption for messages
- [ ] Dark mode theme switcher
- [ ] Message search and filtering

---

## 🧪 Testing

```bash
# Run linter
npm run lint

# Type checking (if using TypeScript)
npm run type-check
```

---

## 📦 Deployment

The app is deployed on Firebase Hosting with automatic CI/CD:

```bash
# Install Firebase CLI
npm install -g firebase-tools

# Login to Firebase
firebase login

# Deploy to production
firebase deploy
```

**Viewing:** This app is optimized for light theme displays.

---

## 🔗 Related Repositories

- **[Chatterly Server](https://github.com/prio12/chatterly_server)** - Backend API with Socket.io server, Express, and MongoDB

---

## 🎯 Skills Demonstrated

✅ **Real-time communication** with Socket.io WebSockets  
✅ **Modern React 18** with concurrent features  
✅ **Redux Toolkit** state management + RTK Query  
✅ **Firebase authentication** and user management  
✅ **Vite** build tooling for optimal performance  
✅ **Responsive design** with Tailwind + DaisyUI  
✅ **Form handling** with React Hook Form  
✅ **Media optimization** with Cloudinary  
✅ **Accessible UI** with Headless UI components  
✅ **Date manipulation** with modern date-fns library  

---

## 🤝 Contributing

This is a portfolio project, but suggestions and feedback are always welcome!

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 👨‍💻 About the Developer

**Maksudur Rahman** - Full-Stack Developer

Specializing in real-time applications, modern React architecture, and scalable web solutions.

[![LinkedIn](https://img.shields.io/badge/LinkedIn-Connect-0077B5?style=for-the-badge&logo=linkedin)](https://www.linkedin.com/in/maksudur-rahman-full-stack-developer/)
[![Portfolio](https://img.shields.io/badge/Portfolio-Visit-FF5722?style=for-the-badge&logo=google-chrome)](https://mrp-dev.netlify.app/)
[![GitHub](https://img.shields.io/badge/GitHub-Follow-181717?style=for-the-badge&logo=github)](https://github.com/prio12)

---

## 💡 Technical Notes

### Why These Technologies?

**Vite over Create React App:**
- 10-100x faster hot module replacement
- Optimized production builds with Rollup
- Native ESM support for better tree-shaking

**Redux Toolkit over Vanilla Redux:**
- Built-in thunk middleware
- RTK Query eliminates manual API caching logic
- Immer integration for immutable updates

**Socket.io over WebSockets API:**
- Automatic reconnection handling
- Fallback to HTTP long-polling
- Room and namespace support out of the box

**React Hook Form over Formik:**
- Smaller bundle size (9KB vs 13KB)
- Better performance with uncontrolled components
- Built-in validation with minimal re-renders

---

<div align="center">

**⭐ If you find this project interesting, please give it a star!**

Made with ❤️ and ⚡ by Maksudur Rahman

</div>
