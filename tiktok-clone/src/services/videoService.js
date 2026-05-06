import api from '@/lib/api-config';

export const videoService = {
  getAllVideos: async ({ pageParam = null } = {}) => {
    const params = new URLSearchParams({ limit: 10 });
    if (pageParam) params.append('cursor', pageParam);
    const response = await api.get(`/videos?${params}`);
    return response.data;
  },
  
  getVideoById: async (id) => {
    const response = await api.get(`/videos/${id}`);
    return response.data;
  },

  createVideo: async (videoData) => {
    const response = await api.post('/videos', videoData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    return response.data;
  },

  deleteVideo: async (id) => {
    const response = await api.delete(`/videos/${id}`);
    return response.data;
  },

  likeVideo: async (videoId, userId) => {
    const response = await api.post(`/videos/${videoId}/likes`, { userId });
    return response.data;
  },

  unlikeVideo: async (videoId, userId) => {
    const response = await api.delete(`/videos/${videoId}/likes`, { data: { userId } });
    return response.data;
  },

  getVideoComments: async (videoId) => {
    const response = await api.get(`/videos/${videoId}/comments`);
    return response.data;
  },

  addComment: async (videoId, userId, text) => {
    const response = await api.post('/comments', { videoId, userId, text });
    return response.data;
  },

  getFollowingVideos: async ({ pageParam = null, userId } = {}) => {  // updated
    const params = new URLSearchParams({ limit: 10 });
    if (pageParam) params.append('cursor', pageParam);
    const response = await api.get(`/users/${userId}/following-videos?${params}`);
    return response.data;
  },
};