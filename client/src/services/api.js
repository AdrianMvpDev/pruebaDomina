import axios from 'axios';

const API_URL = 'http://localhost:4000';

const login = async (email, password) => {
  try {
    const response = await axios.post(
      `${API_URL}/api/users/login`,
      { email, password },
      {
        headers: {
          'Content-Type': 'application/json'
        }
      }
    );
    localStorage.setItem('token', response.data.token);
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.msg);
  }
};

const register = async (name, email, password) => {
  try {
    const response = await axios.post(
      `${API_URL}/api/users/register`,
      { name, email, password },
      {
        headers: {
          'Content-Type': 'application/json'
        }
      }
    );
    localStorage.setItem('token', response.data.token);
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.msg);
  }
};

const logout = () => {
  localStorage.removeItem('token');
};

const getAuthHeader = () => {
  const token = localStorage.getItem('token');
  if (token) {
    return { 
      Authorization: `Bearer ${token}`
    };
  }
  return { 'Content-Type': 'application/json' };
};

export { login, register, logout, getAuthHeader };

