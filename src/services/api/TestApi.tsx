import React from 'react';
import { axiosConfig } from './Api';
import { getBearerToken } from './Api';

export async function addTest(token: string, data: any) {
  const bearer = getBearerToken(token);
  return await axiosConfig.post('/tests', data, bearer);
}
