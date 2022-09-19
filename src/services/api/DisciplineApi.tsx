import React from 'react';
import { axiosConfig } from './Api';
import { getBearerToken } from './Api';

export async function getDisciplines(data: string) {
  const token = getBearerToken(data);
  return await axiosConfig.get('/disciplines', token);
}
