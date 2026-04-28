'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useAuth } from '@/contexts/authContext';
import { userService } from '@/services/userService';

export default function ExploreUsersPage() {
  const { user } = useAuth();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [followLoading, setFollowLoading] = useState({});

  useEffect(() => {
    const fetch = async () => {
      try {
        const data = await userService.getAllUsers();
        setUsers(data);
      } catch (err) {
        console.error('Failed to load users:', err);
      } finally {
        setLoading(false);
      }
    };
    fetch();
  }, []);

  const isFollowing = (targetUser) => {
    if (!user) return false;
    return (targetUser.followers || []).includes(user.id);
  };

  const handleFollow = async (targetUser) => {
    if (!user) return alert('Please log in to follow users');
    setFollowLoading((prev) => ({ ...prev, [targetUser.id]: true }));
    try {
      if (isFollowing(targetUser)) {
        await userService.unfollowUser(targetUser.id, user.id);
        setUsers((prev) =>
          prev.map((u) =>
            u.id === targetUser.id
              ? { ...u, followers: u.followers.filter((id) => id !== user.id) }
              : u
          )
        );
      } else {
        await userService.followUser(targetUser.id, user.id);
        setUsers((prev) =>
          prev.map((u) =>
            u.id === targetUser.id
              ? { ...u, followers: [...(u.followers || []), user.id] }
              : u
          )
        );
      }
    } catch (err) {
      console.error('Follow error:', err);
    } finally {
      setFollowLoading((prev) => ({ ...prev, [targetUser.id]: false }));
    }
  };

  if (loading) {
    return (
      <div className="p-4 text-center text-gray-400">Loading users...</div>
    );
  }

  const displayUsers = user ? users.filter((u) => u.id !== user.id) : users;

  return (
    <div className="p-4 max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold mb-6">Discover People</h2>

      {displayUsers.length === 0 ? (
        <p className="text-gray-500">No other users found.</p>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {displayUsers.map((u) => (
            <div key={u.id} className="border rounded-lg p-4 text-center hover:shadow-md transition">
              <Link href={`/profile/${u.id}`}>
                <div className="h-16 w-16 rounded-full bg-gray-300 mx-auto mb-2 flex items-center justify-center text-2xl font-bold text-white hover:opacity-80 cursor-pointer">
                  {u.username?.[0]?.toUpperCase() || 'U'}
                </div>
                <p className="font-semibold text-sm truncate">{u.username}</p>
                <p className="text-xs text-gray-500 truncate">{u.name || u.username}</p>
              </Link>
              <p className="text-xs text-gray-400 mt-1">
                {(u.followers || []).length} followers
              </p>
              {user && u.id !== user.id && (
                <button
                  onClick={() => handleFollow(u)}
                  disabled={followLoading[u.id]}
                  className={`mt-2 text-xs px-4 py-1 rounded-full font-medium transition ${
                    isFollowing(u)
                      ? 'border border-gray-300 hover:bg-gray-50'
                      : 'bg-red-500 text-white hover:bg-red-600'
                  } disabled:opacity-60`}
                >
                  {followLoading[u.id] ? '...' : isFollowing(u) ? 'Following' : 'Follow'}
                </button>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}