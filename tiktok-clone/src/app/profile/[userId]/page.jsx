'use client';
import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { useAuth } from '@/contexts/authContext';
import { userService } from '@/services/userService';
import { FaEdit } from 'react-icons/fa';

export default function UserProfilePage() {
  const { userId } = useParams();
  const { user: currentUser } = useAuth();
  const [profile, setProfile] = useState(null);
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [followLoading, setFollowLoading] = useState(false);
  const [activeTab, setActiveTab] = useState('videos');
  const [selectedVideo, setSelectedVideo] = useState(null);

  const isOwnProfile = currentUser && currentUser.id === parseInt(userId);
  const isFollowing =
    currentUser && profile
      ? (profile.followers || []).includes(currentUser.id)
      : false;

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const [userData, userVideos] = await Promise.all([
          userService.getUserById(userId),
          userService.getUserVideos(userId),
        ]);
        setProfile(userData);
        setVideos(userVideos);
      } catch (err) {
        console.error('Failed to load profile:', err);
      } finally {
        setLoading(false);
      }
    };
    if (userId) fetchProfile();
  }, [userId]);

  const handleFollow = async () => {
    if (!currentUser) return alert('Please log in to follow users');
    setFollowLoading(true);
    try {
      if (isFollowing) {
        await userService.unfollowUser(profile.id, currentUser.id);
        setProfile((prev) => ({
          ...prev,
          followers: prev.followers.filter((id) => id !== currentUser.id),
        }));
      } else {
        await userService.followUser(profile.id, currentUser.id);
        setProfile((prev) => ({
          ...prev,
          followers: [...(prev.followers || []), currentUser.id],
        }));
      }
    } catch (err) {
      console.error('Follow error:', err);
    } finally {
      setFollowLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto py-10 text-center text-gray-400">
        Loading profile...
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="max-w-4xl mx-auto py-10 text-center text-gray-400">
        User not found.
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto py-8 px-4">
      {/* Profile header */}
      <div className="flex items-start mb-8">
        <div className="h-24 w-24 rounded-full bg-gray-300 mr-6 flex items-center justify-center text-4xl font-bold text-white">
          {profile.username?.[0]?.toUpperCase() || 'U'}
        </div>

        <div className="flex-1">
          <h1 className="text-xl font-bold mb-1">@{profile.username}</h1>
          <h2 className="text-lg mb-4">{profile.name || profile.username}</h2>

          <div className="flex gap-3 mb-4">
            {isOwnProfile ? (
              <button className="px-6 py-1.5 rounded-md border border-gray-300 font-medium flex items-center hover:bg-gray-50">
                <FaEdit className="mr-2" /> Edit profile
              </button>
            ) : (
              currentUser && (
                <button
                  onClick={handleFollow}
                  disabled={followLoading}
                  className={`px-8 py-1.5 rounded-md font-medium transition disabled:opacity-60 ${
                    isFollowing
                      ? 'border border-gray-300 hover:bg-gray-50'
                      : 'bg-red-500 text-white hover:bg-red-600'
                  }`}
                >
                  {followLoading ? '...' : isFollowing ? 'Following' : 'Follow'}
                </button>
              )
            )}
          </div>

          <div className="flex items-center space-x-4">
            <p>
              <span className="font-bold">{(profile.following || []).length}</span>{' '}
              <span className="text-gray-500">Following</span>
            </p>
            <p>
              <span className="font-bold">{(profile.followers || []).length}</span>{' '}
              <span className="text-gray-500">Followers</span>
            </p>
            <p>
              <span className="font-bold">{videos.length}</span>{' '}
              <span className="text-gray-500">Videos</span>
            </p>
          </div>

          <p className="mt-4 text-sm text-gray-500">
            {profile.bio || 'No bio yet.'}
          </p>
        </div>
      </div>

      {/* Tabs */}
      <div className="border-b mb-4">
        <div className="flex">
          <button
            onClick={() => setActiveTab('videos')}
            className={`py-2 px-4 font-medium ${
              activeTab === 'videos' ? 'border-b-2 border-black' : 'text-gray-500'
            }`}
          >
            Videos
          </button>
          <button
            onClick={() => setActiveTab('liked')}
            className={`py-2 px-4 font-medium ${
              activeTab === 'liked' ? 'border-b-2 border-black' : 'text-gray-500'
            }`}
          >
            Liked
          </button>
        </div>
      </div>

      {/* Videos tab */}
      {activeTab === 'videos' && (
        <>
          {videos.length === 0 ? (
            <div className="py-20 text-center">
              <h3 className="text-xl font-bold mb-2">
                {isOwnProfile ? 'Upload your first video' : 'No videos yet'}
              </h3>
              <p className="text-gray-500 mb-6">
                {isOwnProfile
                  ? 'Your videos will appear here.'
                  : `${profile.username} hasn't posted any videos yet.`}
              </p>
              {isOwnProfile && (
                <Link href="/upload">
                  <button className="bg-red-500 text-white px-8 py-2 rounded-md font-medium hover:bg-red-600">
                    Upload now
                  </button>
                </Link>
              )}
            </div>
          ) : (
            <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-1">
              {videos.map((video) => (
                <div
                  key={video.id}
                  onClick={() => setSelectedVideo(video)}
                  className="aspect-[9/16] bg-gray-300 rounded-md flex items-center justify-center relative overflow-hidden cursor-pointer hover:opacity-90"
                >
                  {video.url ? (
                    <video
                      src={`http://localhost:8000${video.url}`}
                      className="w-full h-full object-cover"
                      muted
                    />
                  ) : (
                    <p className="text-sm text-gray-500 p-2 text-center">{video.title}</p>
                  )}
                  <div className="absolute bottom-1 left-1 text-white text-xs bg-black bg-opacity-40 px-1 rounded">
                    ♥ {Array.isArray(video.likes) ? video.likes.length : 0}
                  </div>
                </div>
              ))}
            </div>
          )}
        </>
      )}

      {/* Liked tab */}
      {activeTab === 'liked' && (
        <div className="py-20 text-center text-gray-400">
          Liked videos are private.
        </div>
      )}

      {/* Video Modal */}
      {selectedVideo && (
        <div
          className="fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center z-50"
          onClick={() => setSelectedVideo(null)}
        >
          <div
            className="relative bg-black rounded-xl overflow-hidden"
            style={{ width: '360px', height: '640px' }}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setSelectedVideo(null)}
              className="absolute top-3 right-3 text-white text-xl z-10 bg-black bg-opacity-50 rounded-full w-8 h-8 flex items-center justify-center hover:bg-opacity-80"
            >
              ✕
            </button>
            <video
              src={`http://localhost:8000${selectedVideo.url}`}
              className="w-full h-full object-cover"
              controls
              autoPlay
            />
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-4">
              <p className="text-white font-semibold text-sm">@{selectedVideo.username}</p>
              <p className="text-white text-xs mt-1 opacity-80">{selectedVideo.caption}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}