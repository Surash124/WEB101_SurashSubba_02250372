'use client';
import { useEffect, useCallback } from 'react';
import { useInfiniteQuery } from '@tanstack/react-query';
import VideoCard from './VideoCard';
import { videoService } from '@/services/videoService';
import useIntersectionObserver from '@/hooks/useIntersectionObserver';

export default function VideoFeed() {
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    isError,
  } = useInfiniteQuery({
    queryKey: ['videos'],
    queryFn: videoService.getAllVideos,
    getNextPageParam: (lastPage) => lastPage.nextCursor ?? undefined,
  });

  const [loaderRef, isIntersecting] = useIntersectionObserver({
    threshold: 0.1,
    freezeOnceVisible: false,
  });

  // trigger fetch when loader div is visible
  useEffect(() => {
    if (isIntersecting && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [isIntersecting, hasNextPage, isFetchingNextPage, fetchNextPage]);

  const posts = data?.pages.flatMap((page) => page.videos) ?? [];

  if (isLoading) {
    return (
      <div className="max-w-[550px] mx-auto py-10 text-center text-gray-400">
        Loading videos...
      </div>
    );
  }

  if (isError) {
    return (
      <div className="max-w-[550px] mx-auto py-10 text-center text-red-400">
        Failed to load videos. Make sure the backend is running.
      </div>
    );
  }

  if (posts.length === 0) {
    return (
      <div className="max-w-[550px] mx-auto py-10 text-center text-gray-400">
        No videos yet. Be the first to upload!
      </div>
    );
  }

  return (
    <div className="max-w-[550px] mx-auto">
      {posts.map((post) => (
        <VideoCard key={post.id} post={post} />
      ))}

      <div ref={loaderRef} className="py-4 text-center text-gray-400">
        {isFetchingNextPage ? 'Loading more...' : hasNextPage ? '' : 'No more videos'}
      </div>
    </div>
  );
}