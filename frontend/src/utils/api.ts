import axios from "axios";

const API_URL = "http://localhost:8080/api";

export const signup = (user: { email: string; password: string }) =>
  axios.post(`${API_URL}/users`, user);

export const login = (credentials: { email: string; password: string }) =>
  axios.post(`${API_URL}/auth/login`, credentials);

export const getUsers = (token: string) =>
  axios.get(`${API_URL}/users`, {
    headers: { Authorization: `Bearer ${token}` },
  });

export const getUser = (id: number, token: string) =>
  axios.get(`${API_URL}/users/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
  });

export const updateUser = (id: number, user: any, token: string) =>
  axios.put(`${API_URL}/users/${id}`, user, {
    headers: { Authorization: `Bearer ${token}` },
  });

export const deleteUser = (id: number, token: string) =>
  axios.delete(`${API_URL}/users/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
  });

export const submitFeedback = (feedback: { message: string }, token: string) =>
  axios.post(`${API_URL}/feedback`, feedback, {
    headers: { Authorization: `Bearer ${token}` },
  });

export const getFeedback = (id: number, token: string) =>
  axios.get(`${API_URL}/feedback/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
  });

export const getAllFeedback = (token?: string) =>
  axios.get(`${API_URL}/feedback`, {
    headers: token ? { Authorization: `Bearer ${token}` } : {},
  });

export const updateFeedback = (id: number, feedback: any, token: string) =>
  axios.put(`${API_URL}/feedback/${id}`, feedback, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });

export const deleteFeedback = (id: number, token: string) =>
  axios.delete(`${API_URL}/feedback/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
  });

export const getFeedbackByUserId = (userId: number, token: string) =>
  axios.get(`${API_URL}/feedback/user/${userId}`, {
    headers: { Authorization: `Bearer ${token}` },
  });

// Voting API functions
export const upvoteFeedback = (feedbackId: number, token: string) =>
  axios.post(`${API_URL}/votes/upvote/${feedbackId}`, {}, {
    headers: { Authorization: `Bearer ${token}` },
  });

export const downvoteFeedback = (feedbackId: number, token: string) =>
  axios.post(`${API_URL}/votes/downvote/${feedbackId}`, {}, {
    headers: { Authorization: `Bearer ${token}` },
  });

export const removeVote = (feedbackId: number, token: string) =>
  axios.delete(`${API_URL}/votes/${feedbackId}`, {
    headers: { Authorization: `Bearer ${token}` },
  });

export const getUserVote = (feedbackId: number, token: string) =>
  axios.get(`${API_URL}/votes/${feedbackId}/user-vote`, {
    headers: { Authorization: `Bearer ${token}` },
  });
