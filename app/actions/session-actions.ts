'use server';

import { auth, signOut, update } from '@/auth';
import { cookies } from 'next/headers';
import {
  POST_COOKIE_EXPIRES_DAYS,
  POST_COOKIE_NAME,
  REFRESH_TOKEN_COOKIE_NAME,
} from '@/constant/auth';
import { fetchClient } from '@/lib/api/apiClient';
import { Token } from '@/types/Auth.types';
import { nanoid } from 'nanoid';

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

export async function getOrCreatePostSession() {
  const cookieStore = cookies();
  let sessionId = cookieStore.get(POST_COOKIE_NAME)?.value;

  console.log(sessionId, 'sesssionId');

  if (!sessionId) {
    sessionId = nanoid();
    cookieStore.set(POST_COOKIE_NAME, sessionId, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 60 * 60 * 24 * POST_COOKIE_EXPIRES_DAYS,
    });
  }

  return sessionId;
}
