export const REFRESH_TOKEN_COOKIE_NAME = 'refresh_token';

export const AUTH_ERROR_MESSAGES = {
  EXPIRED_ACCESS_TOKEN: '액세스 토큰이 만료되었습니다.',
  EXPIRED_REFRESH_TOKEN: '리프레시 토큰이 만료되었습니다. 다시 로그인해주세요.',
  INVALID_TOKEN: '유효하지 않은 토큰입니다.',
  UNAUTHORIZED: '인증되지 않은 사용자입니다.',
  SERVER_ERROR: '서버 에러가 발생했습니다.',
} as const;

export const publicPages = ['/api/auth/login', '/signup', '/', '/about', '/posts'];
