// useTokenRefresh.js
import { useEffect } from 'react';
import { handleTokenRefresh } from './auth';

const useTokenRefresh = () => {
  useEffect(() => {
    const refreshAccessToken = async () => {
      try {
        await handleTokenRefresh(localStorage.getItem('refresh_token'));
      } catch (error) {
        console.error('Error refreshing token:', error);
        // Handle the error, e.g., log out the user
      }
    };

    refreshAccessToken();
  }, []);
};

export default useTokenRefresh;
