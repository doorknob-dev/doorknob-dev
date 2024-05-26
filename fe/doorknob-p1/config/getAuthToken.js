import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const authAxios = axios.create();

authAxios.interceptors.request.use(
  async config => {
    const token = await AsyncStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  error => Promise.reject(error)
);

export default authAxios;
