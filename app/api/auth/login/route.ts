import { NextRequest, NextResponse } from 'next/server';
import { setRefreshTokenCookie } from '@/lib/tokens';
import { authService } from '@/server/services/auth.service';

export async function GET() {
  return NextResponse.json(
    {
      success: false,
    },
    {
      status: 200,
    }
  );
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const result = await authService.login(body);

    const response = NextResponse.json({
      success: true,

      user: result.user,
      tokens: result.tokens,
    });
    setRefreshTokenCookie(result.tokens.refreshToken);
    return response;
  } catch (error) {
    console.log(error, 'error');
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : '로그인 실패',
      },
      { status: 401 }
    );
  }
}
