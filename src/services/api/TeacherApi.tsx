import React from 'react';
import { axiosConfig } from './Api';
import { getBearerToken } from './Api';

export async function getTeachers(data: string) {
  const token = getBearerToken(data);
  return await axiosConfig.get('/teachers', token);
}
