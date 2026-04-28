import api from '@/lib/api-config';

export const userService = {
  getAllUsers: async () => {
    const response = await api.get('/users');
    return response.data;
  },

  getUserById: async (id) => {
    const response = await api.get(`/users/${id}`);
    return response.data;
  },

  getUserVideos: async (id) => {
    const response = await api.get(`/users/${id}/videos`);
    return response.data;
  },

  getUserFollowers: async (id) => {
    const response = await api.get(`/users/${id}/followers`);
    return response.data;
  },

  getUserFollowing: async (id) => {
    const response = await api.get(`/users/${id}/following`);
    return response.data;
  },

  followUser: async (userToFollowId, followerId) => {
    const response = await api.post(`/users/${userToFollowId}/followers`, { followerId });
    return response.data;
  },

  unfollowUser: async (userToUnfollowId, followerId) => {
    const response = await api.delete(`/users/${userToUnfollowId}/followers`, {
      data: { followerId },
    });
    return response.data;
  },

  updateUser: async (id, data) => {
    const response = await api.put(`/users/${id}`, data);
    return response.data;
  },
};