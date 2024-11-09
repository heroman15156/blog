'use server';

import { auth, signOut, update } from '@/auth';
import { cookies } from 'next/headers';
import { REFRESH_TOKEN_COOKIE_NAME } from '@/constant/auth';
import { fetchClient } from '@/lib/api/apiClient';
import { Token } from '@/types/Auth.types';

export const getSession = async () => {
  const session = await auth();
  if (!session?.accessToken) {
    await signOut({
      redirectTo: '/',
    });
    return;
  }
  return session.accessToken;
};

export const signOutAction = async () => {
  await signOut();
};

export const updateSessionAccessToken = async (accessToken: string) => {
  await update({
    accessToken,
  });
};

export const getRefreshToken = async () => {
  const cookieStore = cookies();
  const refreshToken = cookieStore.get(REFRESH_TOKEN_COOKIE_NAME);
  return refreshToken?.value;
};

export const updateAccessToken = async () => {
  try {
    const cookieStore = cookies();
    const refreshToken = cookieStore.get(REFRESH_TOKEN_COOKIE_NAME);

    if (!refreshToken?.value) {
      throw new Error('No refresh token available');
    }

    const response = await fetchClient<Token>('/api/auth/refresh', {
      method: 'POST',
      credentials: 'include',
    }).then((resp) => resp.body);
    if (!response?.accessToken) {
      throw new Error('Token refresh failed');
    }
    return response.accessToken;
  } catch (error) {
    console.log(error);
    return null;
  }
};
