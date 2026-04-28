'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/authContext';
import { videoService } from '@/services/videoService';
import Link from 'next/link';

export default function UploadPage() {
  const { user } = useAuth();
  const router = useRouter();
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState('');
  const [caption, setCaption] = useState('');
  const [privacy, setPrivacy] = useState('Public');
  const [allowComment, setAllowComment] = useState(true);
  const [allowDuet, setAllowDuet] = useState(true);
  const [allowStitch, setAllowStitch] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  if (!user) {
    return (
      <div className="max-w-4xl mx-auto p-8 text-center">
        <h1 className="text-2xl font-bold mb-4">Upload Video</h1>
        <p className="text-gray-500 mb-6">You need to be logged in to upload videos.</p>
        <Link href="/login">
          <button className="bg-red-500 text-white px-8 py-2 rounded-md font-medium hover:bg-red-600">
            Log in
          </button>
        </Link>
      </div>
    );
  }

  const handleFileChange = (e) => {
    const selected = e.target.files[0];
    if (!selected) return;
    if (!selected.type.startsWith('video/')) {
      setError('Please select a video file.');
      return;
    }
    setFile(selected);
    setPreview(URL.createObjectURL(selected));
    setError('');
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const dropped = e.dataTransfer.files[0];
    if (dropped && dropped.type.startsWith('video/')) {
      setFile(dropped);
      setPreview(URL.createObjectURL(dropped));
      setError('');
    }
  };

  const handleSubmit = async () => {
    if (!file) { setError('Please select a video file.'); return; }
    if (!caption.trim()) { setError('Please add a caption.'); return; }
    setIsLoading(true);
    setError('');
    try {
      const formData = new FormData();
      formData.append('video', file);
      formData.append('title', caption);
      formData.append('description', caption);
      formData.append('userId', user.id);
      formData.append('privacy', privacy);
      await videoService.createVideo(formData);
      router.push(`/profile/${user.id}`);
    } catch (err) {
      setError(err.response?.data?.error || 'Upload failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-8">
      <h1 className="text-2xl font-bold mb-6">Upload video</h1>

      {error && (
        <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-600 text-sm rounded-md">
          {error}
        </div>
      )}

      <div className="flex gap-6">
        {/* Drop zone */}
        <div
          className="w-[360px] border-2 border-dashed border-gray-300 rounded-lg p-8 flex flex-col items-center justify-center text-center cursor-pointer hover:border-red-400 transition"
          onDrop={handleDrop}
          onDragOver={(e) => e.preventDefault()}
          onClick={() => !preview && document.getElementById('video-input').click()}
        >
          {preview ? (
            <div className="w-full">
              <video
                src={preview}
                controls
                className="w-full rounded-md max-h-[400px] object-contain"
              />
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setFile(null);
                  setPreview('');
                }}
                className="mt-3 text-sm text-red-500 hover:underline"
              >
                Remove video
              </button>
            </div>
          ) : (
            <>
              <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center mb-4">
                <span className="text-4xl text-gray-400">↑</span>
              </div>
              <h3 className="text-lg font-semibold mb-2">Select video to upload</h3>
              <p className="text-sm text-gray-500">Or drag and drop a file</p>
              <p className="text-xs text-gray-400 mt-4">MP4 or WebM</p>
              <p className="text-xs text-gray-400">720x1280 resolution or higher</p>
              <p className="text-xs text-gray-400">Up to 10 minutes</p>
              <p className="text-xs text-gray-400">Less than 2 GB</p>
              <button
                className="mt-8 bg-red-500 text-white py-2 px-8 rounded-md hover:bg-red-600"
                onClick={(e) => {
                  e.stopPropagation();
                  document.getElementById('video-input').click();
                }}
              >
                Select file
              </button>
            </>
          )}
          <input
            id="video-input"
            type="file"
            accept="video/*"
            className="hidden"
            onChange={handleFileChange}
          />
        </div>

        {/* Form fields */}
        <div className="flex-1">
          <div className="mb-4">
            <label className="block text-sm font-medium mb-2">Caption</label>
            <input
              type="text"
              value={caption}
              onChange={(e) => setCaption(e.target.value)}
              className="w-full p-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-gray-400"
              placeholder="Add a caption..."
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium mb-2">Cover</label>
            <div className="h-20 bg-gray-200 rounded-md flex items-center justify-center text-gray-400 text-sm">
              {preview ? 'Video thumbnail' : 'No video selected'}
            </div>
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium mb-2">Who can view this video</label>
            <select
              value={privacy}
              onChange={(e) => setPrivacy(e.target.value)}
              className="w-full p-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-gray-400"
            >
              <option>Public</option>
              <option>Friends</option>
              <option>Private</option>
            </select>
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium mb-2">Allow users to:</label>
            <div className="space-y-2">
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="comments"
                  checked={allowComment}
                  onChange={(e) => setAllowComment(e.target.checked)}
                  className="mr-2 h-4 w-4"
                />
                <label htmlFor="comments">Comment</label>
              </div>
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="duet"
                  checked={allowDuet}
                  onChange={(e) => setAllowDuet(e.target.checked)}
                  className="mr-2 h-4 w-4"
                />
                <label htmlFor="duet">Duet</label>
              </div>
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="stitch"
                  checked={allowStitch}
                  onChange={(e) => setAllowStitch(e.target.checked)}
                  className="mr-2 h-4 w-4"
                />
                <label htmlFor="stitch">Stitch</label>
              </div>
            </div>
          </div>

          <div className="flex space-x-3 mt-6">
            <button
              onClick={() => router.back()}
              className="px-6 py-2 border rounded-md hover:bg-gray-50"
            >
              Discard
            </button>
            <button
              onClick={handleSubmit}
              disabled={isLoading || !file}
              className="px-6 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 disabled:opacity-60"
            >
              {isLoading ? 'Uploading...' : 'Post'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}