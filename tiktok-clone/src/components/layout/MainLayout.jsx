'use client';
import Link from 'next/link';
import { useState } from 'react';
import { useAuth } from '@/contexts/authContext';
import AuthModal from '@/components/auth/AuthModal';
import { useRouter } from 'next/navigation';
import {
  FaHome, FaUserFriends, FaCompass, FaVideo,
  FaInbox, FaRegUser, FaPlus, FaSearch,
} from 'react-icons/fa';

export default function MainLayout({ children }) {
  const { user, logout } = useAuth();
  const [authModal, setAuthModal] = useState({ open: false, view: 'login' });
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (e) => {
    if (e.key === 'Enter' && searchQuery.trim()) {
      router.push(`/explore-users?search=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  const openLogin = () => setAuthModal({ open: true, view: 'login' });
  const openSignup = () => setAuthModal({ open: true, view: 'signup' });
  const closeModal = () => setAuthModal({ open: false, view: 'login' });

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <div className="w-60 border-r fixed h-full overflow-y-auto">
        <div className="p-4">
          <Link href="/" className="text-xl font-bold flex items-center">
            <span className="text-red-500 mr-1">TikTok</span>
          </Link>
        </div>

        <nav className="mt-4">
          <ul className="space-y-1">
            <li>
              <Link href="/" className="flex items-center p-3 hover:bg-gray-100 rounded-md mx-2">
                <FaHome className="text-xl mr-3" />
                <span>For You</span>
              </Link>
            </li>
            <li>
              <Link href="/following" className="flex items-center p-3 hover:bg-gray-100 rounded-md mx-2">
                <FaUserFriends className="text-xl mr-3" />
                <span>Following</span>
              </Link>
            </li>
            <li>
              <Link href="/explore" className="flex items-center p-3 hover:bg-gray-100 rounded-md mx-2">
                <FaCompass className="text-xl mr-3" />
                <span>Explore</span>
              </Link>
            </li>
            <li>
              <Link href="/live" className="flex items-center p-3 hover:bg-gray-100 rounded-md mx-2">
                <FaVideo className="text-xl mr-3" />
                <span>LIVE</span>
              </Link>
            </li>
            {user && (
              <li>
                <Link href={`/profile/${user.id}`} className="flex items-center p-3 hover:bg-gray-100 rounded-md mx-2">
                  <FaRegUser className="text-xl mr-3" />
                  <span>Profile</span>
                </Link>
              </li>
            )}
          </ul>
        </nav>

        {/* Suggested accounts placeholder */}
        <div className="border-t mt-4 pt-4 px-4">
          <p className="text-gray-500 text-sm px-3 mb-2">Suggested accounts</p>
          {[1, 2, 3].map((_, index) => (
            <Link key={index} href="/explore-users" className="flex items-center p-2 hover:bg-gray-100 rounded-md">
              <div className="h-8 w-8 rounded-full bg-gray-300 mr-2"></div>
              <div>
                <p className="text-sm font-semibold">user_{index + 1}</p>
                <p className="text-xs text-gray-500">User {index + 1}</p>
              </div>
            </Link>
          ))}
        </div>

        {/* Auth section */}
        <div className="border-t px-3 py-4 mt-2">
          {user ? (
            <div>
              <p className="text-sm text-gray-500 mb-3">Logged in as <span className="font-semibold">{user.username}</span></p>
              <button
                onClick={logout}
                className="w-full py-2 px-4 border rounded-md font-medium hover:bg-gray-50"
              >
                Log out
              </button>
            </div>
          ) : (
            <div>
              <p className="text-sm text-gray-500 mb-4">
                Log in to follow creators, like videos, and view comments.
              </p>
              <button
                onClick={openLogin}
                className="w-full py-2 px-4 border rounded-md font-medium mb-2 hover:bg-gray-50"
              >
                Log in
              </button>
              <button
                onClick={openSignup}
                className="w-full py-2 px-4 bg-red-500 text-white rounded-md font-medium hover:bg-red-600"
              >
                Sign up
              </button>
            </div>
          )}
        </div>

        <div className="border-t px-3 py-4 text-xs text-gray-500">
          <p className="mb-2">© 2025 TikTok Clone</p>
        </div>
      </div>

      {/* Main content */}
      <div className="ml-60 flex-1">
        {/* Top header */}
        <header className="h-16 border-b flex items-center justify-between px-4 sticky top-0 bg-white z-40">
          <div className="w-1/3"></div>
          <div className="w-1/3">
            <div className="relative">
              <input
                type="text"
                placeholder="Search accounts and videos"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyDown={handleSearch}
                className="w-full bg-gray-100 py-2 pl-10 pr-4 rounded-full focus:outline-none focus:ring-1 focus:ring-gray-400"
              />
              <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
            </div>
          </div>
          <div className="w-1/3 flex justify-end space-x-4">
            <Link href="/upload">
              <button className="border px-3 py-1 rounded-md hover:bg-gray-50 flex items-center">
                <FaPlus className="mr-2" /> Upload
              </button>
            </Link>
            {user ? (
              <Link href={`/profile/${user.id}`}>
                <button className="flex items-center p-3 hover:bg-gray-100 rounded-md">
                  <FaRegUser className="text-xl mr-3" />
                  <span>Profile</span>
                </button>
              </Link>
            ) : (
              <button
                onClick={openLogin}
                className="bg-red-500 text-white px-6 py-1 rounded-md hover:bg-red-600"
              >
                Log in
              </button>
            )}
          </div>
        </header>

        <main>{children}</main>
      </div>

      <AuthModal
        isOpen={authModal.open}
        onClose={closeModal}
        defaultView={authModal.view}
      />
    </div>
  );
}