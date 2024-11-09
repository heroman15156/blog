import { cookies } from 'next/headers';
import { REFRESH_TOKEN_COOKIE_NAME } from '@/constant/auth';

export const tokenConfig = {
  refreshToken: {
    cookieName: REFRESH_TOKEN_COOKIE_NAME,
    options: {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax' as const,
      path: '/',
      maxAge: 60 * 60 * 24 * 30,
    },
  },
};

export const setRefreshTokenCookie = (token: string) => {
  cookies().set(tokenConfig.refreshToken.cookieName, token, tokenConfig.refreshToken.options);
};

export const removeRefreshTokenCookie = () => {
  cookies().delete(tokenConfig.refreshToken.cookieName);
};
