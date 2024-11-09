import { auth } from '@/auth';
import { NextResponse } from 'next/server';
import { apiAuthMiddleware } from '@/middleware/api-auth.middleware';
export default auth((req) => {
  if (req.nextUrl.pathname.startsWith('/api')) {
    // auth 관련 공개 엔드포인트는 통과
    if (req.nextUrl.pathname.startsWith('/api/auth/')) {
      return NextResponse.next();
    }

    // 다른 API 요청은 apiAuthMiddleware로 처리
    return apiAuthMiddleware(req);
  }

  // 페이지 요청 처리
  if (!req.auth) {
    return Response.redirect(new URL('/login', req.nextUrl.origin));
  }

  return NextResponse.next(); // 인증된 페이지 요청은 통과
});

export const config = {
  matcher: [
    '/api/:path*',
    '/((?!api|_next/static|favicon.ico|login|signup|about|posts|projects|project|$).*)',
  ],
};
