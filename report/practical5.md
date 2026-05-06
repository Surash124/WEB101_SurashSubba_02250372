# Practical 5: Implementing Infinite Scroll with TanStack Query

**Name:** Surash Subba  
**Student No:** 02250372  
**Programme:** BE 1SWE  
**Date:** 06/05/2026  

---

## Overview

This practical adds infinite scroll to the TikTok clone using cursor-based pagination on the backend and TanStack Query on the frontend.

---

## Tech Stack

- **Frontend:** Next.js, TanStack Query, Intersection Observer API
- **Backend:** Express.js, Prisma ORM, PostgreSQL

---

## Implementation

| Part | File | Description |
|------|------|-------------|
| Backend cursor pagination | `src/controllers/videoController.js` | Updated `getAllVideos` to accept `cursor` and `limit`. Applied n+1 pattern to check if next page exists. |
| QueryClientProvider setup | `src/app/layout.js` | Wrapped app with `QueryClientProvider` and initialized `QueryClient` with default options. |
| Video service cursor support | `src/services/videoService.js` | Updated `getAllVideos` and `getFollowingVideos` to accept `pageParam` and append cursor to API requests. |
| Intersection Observer hook | `src/hooks/useIntersectionObserver.js` | Reusable hook that returns a ref setter and `isIntersecting` boolean to detect scroll position. |
| VideoFeed infinite scroll | `src/components/ui/VideoFeed.jsx` | Replaced `useState/useEffect` with `useInfiniteQuery`. Triggers `fetchNextPage()` when bottom div is visible. |

---

## How to Run

**Backend:**
```bash
cd server
npm run dev
```

**Frontend:**
```bash
cd tiktok-clone
npm run dev
```

Access the app at `http://localhost:3000`

---

## References

- [TanStack Query Docs](https://tanstack.com/query/latest)
- [Intersection Observer API](https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API)
- [Prisma Cursor Pagination](https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination)
- [TikTok Frontend](https://github.com/syangche/TikTok_Frontend.git)
- [TikTok Server](https://github.com/syangche/TikTok_Server.git)
