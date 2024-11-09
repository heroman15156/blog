import { NextRequest, NextResponse } from 'next/server';

import { REFRESH_TOKEN_COOKIE_NAME } from '@/constant/auth';
import { authService } from '@/server/services/auth.service';
import { ApiError } from '@/lib/error';
import { removeRefreshTokenCookie, setRefreshTokenCookie } from '@/lib/tokens';

export async function POST(request: NextRequest) {
  try {
    const cookieHeader = request.headers.get('cookie');

    const cookieRefreshToken = cookieHeader
      ?.split(';')
      .find((c) => c.trim().startsWith(`${REFRESH_TOKEN_COOKIE_NAME}=`))
      ?.split('=')[1];

    console.log(cookieRefreshToken, 'cookieRefreshToken');

    if (!cookieRefreshToken) {
      throw ApiError.unauthorized('No Refresh Token found');
    }

    const result = await authService.refreshToken(cookieRefreshToken);
    const response = NextResponse.json({
      success: true,
      tokens: result.tokens,
    });

    setRefreshTokenCookie(result.tokens.refreshToken!);

    return response;
  } catch (error) {
    if (error instanceof ApiError) {
      if (error.status === 409) {
        removeRefreshTokenCookie();
      }

      return NextResponse.json(
        {
          success: false,
          error: error.message,
        },
        {
          status: error.status,
        }
      );
    }
  }
}
