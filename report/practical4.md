
# TikTok Clone – Practical 4 (Frontend + Backend Integration)

## 1. User Documentation

### Overview

This project is a continuation of **Practical 1 (Frontend Development)**.
In **Practical 4**, the TikTok clone is enhanced by connecting the **Next.js frontend** to a real **Express.js backend**.

Previously, the app used static/mock data. Now, it supports **real-time data, authentication, and user interactions**, making it closer to a real-world application.

---

###  What Was Added in Practical 4

* Connected frontend to backend API using Axios
* Implemented **JWT-based authentication**
* Replaced mock data with **real API data**
* Added **like, comment, and follow features**
* Created **personalized “Following” feed**
* Added **user discovery (Explore Users)**
* Implemented **dynamic profile pages**
* Enabled **real video upload functionality**

---

### Key Features (Updated)

* **Real Video Feed**: Fetch videos from backend API instead of static data
* **Authentication System**: Login/Signup with secure token handling
* **Like & Comment**: Interact with videos dynamically
* **Follow System**: Follow/unfollow users
* **Following Feed**: Personalized feed based on followed users
* **Explore Users**: Discover and follow new users
* **Dynamic Profiles**: View profiles based on user ID
* **Video Upload**: Upload videos with captions and thumbnails

---

## 2. Technical Documentation

### Technologies Used

* **Frontend**: Next.js, React, Tailwind CSS, React Icons
* **Backend**: Express.js (from previous practical)
* **Libraries Added**:

  * Axios (API requests)
  * JWT Decode (authentication)
  * React Hot Toast (notifications)
  * React Hook Form (forms)

---

### API Integration

The frontend communicates with the backend using a centralized API client.

#### Environment Variable

```env
NEXT_PUBLIC_API_URL=http://localhost:8000/api
```

---

### API Endpoints (Connected)

| Endpoint           | Method | Purpose              | Auth Required |
| ------------------ | ------ | -------------------- | ------------- |
| `/api/auth/login`  | POST   | User login           | No            |
| `/api/auth/signup` | POST   | User registration    | No            |
| `/api/videos`      | GET    | Fetch all videos     | No            |
| `/api/videos/:id`  | POST   | Like/Unlike video    | Yes           |
| `/api/users`       | GET    | Fetch users          | Yes           |
| `/api/follow/:id`  | POST   | Follow/Unfollow user | Yes           |
| `/api/upload`      | POST   | Upload video         | Yes           |

---

### Code Structure (Updated)

* `/src/lib/api-config.js` → Axios API configuration

* `/src/contexts/authContext.jsx` → Authentication state management

* `/src/services/videoService.js` → Video-related API calls

* `/src/services/userService.js` → User-related API calls

* `/src/components/auth/`

  * `AuthForms.jsx` → Login & Signup forms
  * `AuthModal.jsx` → Authentication popup

* `/src/components/ui/`

  * `Modal.jsx` → Reusable modal
  * `VideoCard.jsx` → Updated with real data & interactions
  * `VideoFeed.jsx` → Fetches API data

* `/src/app/`

  * `/following` → Personalized feed
  * `/explore-users` → User discovery
  * `/profile/[userId]` → Dynamic profile page
  * `/upload` → Real video upload

---

### Key Relationships

* `AuthProvider` wraps the entire app → manages login state
* `api-config.js` handles API requests + token injection
* `VideoFeed.jsx` fetches videos via `videoService`
* `VideoCard.jsx` handles likes, comments, and UI updates
* `userService.js` manages follow/unfollow logic

---

## 3. Deployment Guide

### Setup Instructions

1. Clone the frontend repository:

```bash
git clone <frontend-repo-url>
cd tiktok-clone
```

2. Install dependencies:

```bash
npm install
```

3. Setup environment variables:

```bash
touch .env.local
```

Add:

```env
NEXT_PUBLIC_API_URL=http://localhost:8000/api
```

4. Start the frontend:

```bash
npm run dev
```

---

### Backend Requirement

Make sure the backend server (Express.js) is running:

```bash
cd tiktok-server
npm install
npm start
```

---

### Run Application

Open:

```
http://localhost:3000
```

---

##  Testing Checklist

* Register multiple users
* Login/logout functionality
* Upload videos
* Like/unlike videos
* Follow/unfollow users
* Check Following feed
* View dynamic profiles

---

##  Notes

* This practical focuses on **frontend-backend integration**
* Demonstrates real-world concepts:

  * Authentication (JWT)
  * API communication
  * State management
  * Dynamic routing

---
