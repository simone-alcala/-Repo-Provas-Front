import React from 'react';
import { axiosConfig } from './Api';

type Authentication = {
  email: string;
  password: string;
}

export async function signUp(data: Authentication) {
  return await axiosConfig.post('/sign-up', data);
}

export async function signIn(data: Authentication) {
  return await axiosConfig.post('/sign-in', data);
}
