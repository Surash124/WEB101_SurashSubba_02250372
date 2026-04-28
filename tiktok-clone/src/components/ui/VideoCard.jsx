'use client';
import { useState } from 'react';
import Link from 'next/link';
import { FaHeart, FaRegHeart, FaComment, FaShare, FaMusic } from 'react-icons/fa';
import { useAuth } from '@/contexts/authContext';
import { videoService } from '@/services/videoService';

export default function VideoCard({ post, onUpdate }) {
  const { user } = useAuth();
  const [liked, setLiked] = useState(
    user ? (post.likes || []).includes(user.id) : false
  );
  const [likeCount, setLikeCount] = useState(
    Array.isArray(post.likes) ? post.likes.length : (post.likes || 0)
  );
  const [showComments, setShowComments] = useState(false);
  const [comment, setComment] = useState('');
  const [comments, setComments] = useState([]);
  const [loadingComments, setLoadingComments] = useState(false);

  const { username, caption, audio, comments: commentCount, shares } = post;

  const handleLike = async () => {
    if (!user) return alert('Please log in to like videos');
    try {
      if (liked) {
        await videoService.unlikeVideo(post.id, user.id);
        setLikeCount((c) => c - 1);
      } else {
        await videoService.likeVideo(post.id, user.id);
        setLikeCount((c) => c + 1);
      }
      setLiked(!liked);
    } catch (err) {
      console.error('Like error:', err);
    }
  };

  const handleShowComments = async () => {
    if (!showComments && comments.length === 0) {
      setLoadingComments(true);
      try {
        const data = await videoService.getVideoComments(post.id);
        setComments(data);
      } catch (err) {
        console.error('Comments error:', err);
      } finally {
        setLoadingComments(false);
      }
    }
    setShowComments(!showComments);
  };

  const handleComment = async () => {
    if (!user) return alert('Please log in to comment');
    if (!comment.trim()) return;
    try {
      const newComment = await videoService.addComment(post.id, user.id, comment);
      setComments((prev) => [...prev, newComment]);
      setComment('');
    } catch (err) {
      console.error('Comment error:', err);
    }
  };

  return (
    <div className="flex py-6 border-b">
      {/* Avatar */}
      <div className="mr-3">
        <Link href={`/profile/${post.userId}`}>
          <div className="h-12 w-12 rounded-full bg-gray-300 flex items-center justify-center text-white font-bold cursor-pointer hover:opacity-80">
            {username?.[0]?.toUpperCase() || 'U'}
          </div>
        </Link>
      </div>

      <div className="flex-1">
        {/* User info */}
        <div className="mb-2">
          <Link href={`/profile/${post.userId}`}>
            <span className="font-bold hover:underline cursor-pointer">{username}</span>
          </Link>
          <span className="text-sm ml-1 text-gray-500">· 2d ago</span>
          <p className="text-sm mt-1">{caption}</p>
        </div>

        {/* Audio info */}
        {audio && (
          <div className="flex items-center text-sm mb-3">
            <FaMusic className="mr-2 text-xs" />
            <span className="truncate max-w-[250px]">{audio}</span>
          </div>
        )}

        <div className="flex">
          {/* Video container */}
          <div className="mr-5 w-[300px] h-[530px] bg-black rounded-md flex items-center justify-center relative overflow-hidden">
            {post.url ? (
              <video
                src={post.url ? `http://localhost:8000${post.url}` : ''}

                
                controls
                loop
                className="w-full h-full object-cover"
              />
            ) : (
              <>
                <p className="text-white">Video Placeholder</p>
                <div className="absolute bottom-4 left-4 text-white text-sm">
                  <p className="mb-1">0:30</p>
                </div>
              </>
            )}
          </div>

          {/* Interaction buttons */}
          <div className="flex flex-col justify-end space-y-3 py-2">
            {/* Like */}
            <button className="flex flex-col items-center" onClick={handleLike}>
              <div className="h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center">
                {liked ? (
                  <FaHeart className="text-red-500" />
                ) : (
                  <FaRegHeart />
                )}
              </div>
              <span className="text-xs mt-1">{likeCount}</span>
            </button>

            {/* Comment */}
            <button className="flex flex-col items-center" onClick={handleShowComments}>
              <div className="h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center">
                <FaComment />
              </div>
              <span className="text-xs mt-1">{commentCount || 0}</span>
            </button>

            {/* Share */}
            <button className="flex flex-col items-center">
              <div className="h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center">
                <FaShare />
              </div>
              <span className="text-xs mt-1">{shares || 0}</span>
            </button>
          </div>
        </div>

        {/* Comments section */}
        {showComments && (
          <div className="mt-3 max-w-[360px]">
            {loadingComments ? (
              <p className="text-sm text-gray-400">Loading comments...</p>
            ) : (
              <div className="space-y-2 mb-2 max-h-40 overflow-y-auto">
                {comments.length === 0 && (
                  <p className="text-sm text-gray-400">No comments yet.</p>
                )}
                {comments.map((c, i) => (
                  <div key={i} className="text-sm">
                    <span className="font-semibold mr-1">{c.username || 'user'}</span>
                    {c.text}
                  </div>
                ))}
              </div>
            )}
            {user && (
              <div className="flex gap-2">
                <input
                  type="text"
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  placeholder="Add a comment..."
                  className="flex-1 border rounded-full px-3 py-1 text-sm focus:outline-none focus:ring-1 focus:ring-gray-400"
                  onKeyDown={(e) => e.key === 'Enter' && handleComment()}
                />
                <button
                  onClick={handleComment}
                  className="text-sm text-red-500 font-medium"
                >
                  Post
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}