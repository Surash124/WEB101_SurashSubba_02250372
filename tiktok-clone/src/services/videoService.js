import api from '@/lib/api-config';

export const videoService = {
  getAllVideos: async () => {
    const response = await api.get('/videos');
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

  getFollowingVideos: async (userId) => {
    const response = await api.get(`/users/${userId}/following-videos`);
    return response.data;
  },
};