import { AuthRepository } from '@/server/repositories/auth/auth.repository';
import { LoginDataRequest, Token } from '@/types/Auth.types';
import { supabase } from '@/lib/supabase/client';
import { ApiError } from '@/lib/error';

export class AuthService {
  constructor(private readonly authRepository: AuthRepository) {}

  private validateTokens(tokens: Partial<Token>) {
    if (!tokens.accessToken || !tokens.refreshToken) {
      throw ApiError.badRequest('요청이 잘못되었습니다');
    }
  }

  private isTokenExpired(token: string): boolean {
    try {
      console.log(token, 'tokenData');
      const payload = JSON.parse(atob(token.split('.')[1]));

      console.log(payload, 'payload');

      return Date.now() >= payload.exp * 1000;
    } catch {
      return true;
    }
  }

  async refreshToken(refreshToken: string) {
    try {
      console.log('start');
      if (!refreshToken) {
        throw ApiError.badRequest('Refresh Token is Missing');
      }

      const user = await this.authRepository.findUserByRefreshToken(refreshToken);
      if (!user) {
        throw ApiError.unauthorized('Invalid refresh token');
      }
      const {
        data: { session },
        error,
      } = await supabase.auth.refreshSession({
        refresh_token: refreshToken,
      });

      if (error) {
        await this.authRepository.updateRefreshToken(user.id, null);
        throw ApiError.expiredRefresh();
      }

      if (!session?.access_token || !session?.refresh_token) {
        throw ApiError.expiredRefresh();
      }

      await this.authRepository.updateRefreshToken(user.id, session?.refresh_token);

      return {
        tokens: {
          accessToken: session?.access_token,
          refreshToken: session?.refresh_token,
        },
      };
    } catch (error) {
      console.error('[Token Refresh Error]', {
        timestamp: new Date().toISOString(),
        error: error instanceof Error ? error.message : 'Unknown error',
      });
      throw error;
    }
  }

  async login(loginData: LoginDataRequest) {
    try {
      const user = await this.authRepository.findUserByEmail(loginData.email);

      if (!user) throw ApiError.notFound('사용자를 찾을 수 없습니다.');

      const { data: authData, error: authError } = await supabase.auth.signInWithPassword({
        email: loginData.email,
        password: loginData.password,
      });

      if (authError) {
        throw ApiError.badRequest('비밀번호가 일치하지 않습니다.');
      }

      await this.authRepository.updateRefreshToken(user.id, authData.session?.refresh_token || '');

      return {
        user: {
          id: user.id,
          email: user.email,
          name: user.name,
          role: user.role,
        },
        tokens: {
          accessToken: authData.session?.access_token,
          refreshToken: authData.session?.refresh_token,
        },
      };
    } catch (error) {
      throw error;
    }
  }

  async logout(userId: string) {
    try {
      await this.authRepository.updateRefreshToken(userId, null);
      await supabase.auth.signOut();
    } catch (error) {
      throw error;
    }
  }
}
export const authService = new AuthService(new AuthRepository());
