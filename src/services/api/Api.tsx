import React from 'react';
import axios from 'axios';
import { useAuth } from '../../contexts/AuthProvider';

const DEV = 'http://localhost:5000';
const PROD = 'https://repo-provas.onrender.com';

export const axiosConfig = axios.create({
  baseURL: DEV,
  timeout: 3000,  
});

export function getBearerToken() {
  const { getToken } = useAuth();
  const token = getToken();
  return {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  }
}
