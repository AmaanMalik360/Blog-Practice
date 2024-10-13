import axios from 'axios';
import { BACKEND_URL } from '../BackendLink';

export const signin = async (username, password) => {
    try {
      // Make an HTTP request to your backend
      const response = await axios.post(`${BACKEND_URL}/users/signin`, {
        username,
        password
      });

      // Assuming your backend returns a success message on successful signin
      if (response.status === 200) {
        const { user, token } = response.data;
        localStorage.setItem('user', JSON.stringify(user));
        localStorage.setItem('token', token);

        return { success: true, message: response.data.message };
      } else {
        return { success: false, message: response.data.message };
      }
    } catch (error) {
      console.error('Error during signin:', error);
      return { success: false, message: 'Error during signin' };
    }
  };

export const signout = () => {
  localStorage.removeItem('user');
  localStorage.removeItem('token');

  return { success: true, message: 'User signed out' };
};
