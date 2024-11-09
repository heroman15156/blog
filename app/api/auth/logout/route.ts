import { AuthRequest } from '@/types/Auth.types';
import { NextResponse } from 'next/server';
import { authService } from '@/server/services/auth.service';
import { removeRefreshTokenCookie } from '@/lib/tokens';

export async function POST(request: AuthRequest) {
  try {
    const userId = request.user?.id;
    if (!userId) {
      return NextResponse.json({ success: false, error: '인증 정보가 없습니다.' }, { status: 401 });
    }
    await authService.logout(userId);

    const response = NextResponse.json({ success: true });
    removeRefreshTokenCookie();

    return response;
  } catch (error: any) {
    console.log(error);
    return NextResponse.json(
      { success: false, error: '로그아웃 처리 중 오류가 발생했습니다.' },
      { status: 500 }
    );
  }
}
