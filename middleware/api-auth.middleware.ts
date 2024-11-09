import { AuthRequest } from '@/types/Auth.types';
import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase/client';

const publicUrl = ['/api/auth/login', '/api/auth/signup'];

export async function apiAuthMiddleware(request: AuthRequest) {
  if (publicUrl.includes(request.nextUrl.pathname)) {
    return NextResponse.next();
  }

  const authHeader = request.headers.get('Authorization');

  if (!authHeader?.startsWith('Bearer ')) {
    return NextResponse.json(
      {
        success: false,
        error: '인증이 필요합니다.',
      },
      {
        status: 401,
      }
    );
  }

  try {
    const accessToken = authHeader?.split(' ')[1];
    const {
      data: { user },
      error,
    } = await supabase.auth.getUser(accessToken);

    if (error || !user) {
      return NextResponse.json(
        { success: false, error: '유효하지 않은 토큰입니다.' },
        { status: 401 }
      );
    }

    request.user = {
      id: user.id,
      email: user.email!,

      role: user.user_metadata.role || 'user',
    };
    return NextResponse.next();
  } catch (error) {
    return NextResponse.json(
      { success: false, error: '인증 처리 중 오류가 발생했습니다.' },
      { status: 401 }
    );
  }
}
