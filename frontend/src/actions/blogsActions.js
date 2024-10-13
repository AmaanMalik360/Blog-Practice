import axios from 'axios';
import { BACKEND_URL } from '../BackendLink';

const getToken = () => {
  return localStorage.getItem('token');
};

export const singleBlogData = async (id) => {
  try {
    const token = getToken();
    const response = await axios.get(`${BACKEND_URL}/posts/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data;
  } catch (error) {
    console.error("Error fetching single blog data:", error.message);
    return { error: error.message };
  }
};

export const BlogData = async () => {
  try {
    const token = getToken();
    const response = await axios.get(`${BACKEND_URL}/posts`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response;
  } catch (error) {
    console.error("Error fetching blog data:", error.message);
    return { error: error.message };
  }
};

export const deleteBlogData = async (id) => {
  try {
    const token = getToken();
    const response  = await axios.delete(`${BACKEND_URL}/posts/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response;
  } catch (error) {
    console.error("Error deleting blog data:", error.message);
    return { error: error.message };
  }
};

export const createBlogData = async (data) => {
  try {
    const token = getToken();
    const response = await axios.post(`${BACKEND_URL}/posts`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-type": "application/json",
      },
    });

    return response;
  } catch (error) {
    console.error("Error creating blog data:", error.message);
    return { error: error.message };
  }
};

export const updateBlogData = async (id, data) => {
  try {
    const token = getToken();
    const response = await axios.put(`${BACKEND_URL}/posts/${id}`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-type": "application/json",
      },
    });

    return response
  } catch (error) {
    console.error("Error updating blog data:", error.message);
    return { error: error.message };
  }
};
