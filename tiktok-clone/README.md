# TikTok Clone 

## 1. User Documentation

### Overview
This project is a simplified TikTok clone built with **Next.js** and **React**. It replicates the core features of TikTok’s web interface, including video feeds, user profiles, live streams, and authentication pages. It is designed for academic practicals and exam-ready explanations.

### Key Features
- **Video Feed**: Browse and interact with videos using like, comment, and share buttons.
- **User Profiles**: View profile details, followers, likes, and uploaded videos.
- **Upload Page**: Upload new videos with captions, covers, and privacy settings.
- **Explore & Following**: Discover trending hashtags, popular videos, and follow accounts.
- **Live Page**: Watch live stream placeholders with viewer counts.
- **Authentication**: Login and Signup pages with form validation using `react-hook-form`.

---

## 2. Technical Documentation

### Technologies Used
- **Frontend**: Next.js, React, Tailwind CSS, React Icons
- **Backend**: None (frontend-only demo project)
- **Database**: Not implemented (static demo data used)

### API Endpoints
*(Demo project – no real backend API. Example structure if extended)*

| Endpoint       | Method | Purpose                  | Auth Required |
|----------------|--------|--------------------------|---------------|
| `/api/videos`  | GET    | Fetch video feed         | No            |
| `/api/upload`  | POST   | Upload new video         | Yes           |
| `/api/profile` | GET    | Fetch user profile data  | Yes           |

### Code Structure
- `/src/app`: Next.js App Router pages (home, profile, upload, explore, live, login, signup).
- `/src/components/layout`: Layout components (MainLayout with sidebar + header).
- `/src/components/ui`: UI components (VideoCard, VideoFeed, etc.).
- **Key relationships**:  
  - `MainLayout.jsx` wraps all pages with sidebar + header.  
  - `VideoFeed.jsx` renders multiple `VideoCard` components.  
  - Auth pages (`login`, `signup`) use `react-hook-form` for validation.

---

## 3. Deployment Guide

### Deployment Steps
1. Clone the repository:
   ```bash
   git clone <repo-url>
   cd tiktok-clone

2. Install dependencies:
  'npm install'

3. Run the development server:
' npm run dev'

The app will be available at http://localhost:3000.


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

##  Author

* Name: [Your Name]
* Course: WEB101 – Web Application Fundamentals
* Institution: College of Science and Technology

---
