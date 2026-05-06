'use client';
import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/authContext';
import VideoCard from '@/components/ui/VideoCard';
import { videoService } from '@/services/videoService';
import Link from 'next/link';

export default function FollowingPage() {
  const { user } = useAuth();
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!user) {
      setLoading(false);
      return;
    }
    const fetch = async () => {
      try {
        const data = await videoService.getFollowingVideos({ userId: user.id });
        setVideos(data);
      } catch (err) {
        setError('Failed to load following feed.');
      } finally {
        setLoading(false);
      }
    };
    fetch();
  }, [user]);

  if (!user) {
    return (
      <div className="max-w-[550px] mx-auto py-10 text-center">
        <h2 className="text-2xl font-bold mb-3">Follow accounts to see their videos</h2>
        <p className="text-gray-500 mb-6">Log in to see videos from accounts you follow.</p>
        <Link href="/login">
          <button className="bg-red-500 text-white px-8 py-2 rounded-md font-medium hover:bg-red-600">
            Log in
          </button>
        </Link>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="max-w-[550px] mx-auto py-10 text-center text-gray-400">
        Loading following feed...
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

  if (videos.length === 0) {
    return (
      <div className="max-w-[550px] mx-auto py-10 text-center">
        <h2 className="text-2xl font-bold mb-3">Follow accounts</h2>
        <p className="text-gray-500 mb-6">
          When you follow accounts, their videos will appear here.
        </p>
        <Link href="/explore-users">
          <button className="bg-red-500 text-white px-8 py-2 rounded-md font-medium hover:bg-red-600">
            Find people to follow
          </button>
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-[550px] mx-auto">
      {videos.map((post) => (
        <VideoCard key={post.id} post={post} />
      ))}
    </div>
  );
}