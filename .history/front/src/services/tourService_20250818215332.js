import axios from 'axios';

const apiUrl = 'http://your-backend-url.com/api';

export const getTours = async () => {
  try {
    const response = await axios.get(`${apiUrl}/tours`);
    return response.data;
  } catch (error) {
    console.error('Error fetching tours:', error);
    throw error;
  }
};
