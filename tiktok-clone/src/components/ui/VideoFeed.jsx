'use client';
import { useState, useEffect } from 'react';
import VideoCard from './VideoCard';
import { videoService } from '@/services/videoService';

export default function VideoFeed() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const data = await videoService.getAllVideos();
        setPosts(data);
      } catch (err) {
        console.error('Failed to fetch videos:', err);
        setError('Failed to load videos. Make sure the backend is running.');
      } finally {
        setLoading(false);
      }
    };
    fetchVideos();
  }, []);

  if (loading) {
    return (
      <div className="max-w-[550px] mx-auto py-10 text-center text-gray-400">
        Loading videos...
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-[550px] mx-auto py-10 text-center text-red-400">
        {error}
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
    </div>
  );
}