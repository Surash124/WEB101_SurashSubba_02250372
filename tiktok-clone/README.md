# TikTok Clone 🎬

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

