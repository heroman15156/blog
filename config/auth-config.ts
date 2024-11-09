import { NextAuthConfig } from 'next-auth';
import Credentials from '@auth/core/providers/credentials';
import { LoginDataRequest } from '@/types/Auth.types';
import { authService } from '@/services/authService';
import { ApiError } from '@/lib/error';
import { setRefreshTokenCookie } from '@/lib/tokens';

export const authConfig: NextAuthConfig = {
  providers: [
    Credentials({
      async authorize(credentials: Partial<Record<string, unknown>>) {
        const creds = credentials as LoginDataRequest;

        const { email, password } = creds;
        try {
          console.log(email, password, '123123123');
          const data = await authService.login({ email, password });
          console.log('authorized', data);
          setRefreshTokenCookie(data.tokens.refreshToken);
          return {
            id: data?.user.id,
            email: data?.user.email,
            name: data?.user?.name,
            accessToken: data?.tokens.accessToken,
          };
        } catch (error) {
          console.log(error, 'error');

          if (error instanceof ApiError) {
            throw new ApiError(error.status, error.message);
          }
          throw new ApiError(400, '요청에 문제가 생겼습니다.');
        }
      },
    }),
  ],
  pages: {
    signIn: '/login',
  },
  secret: process.env.AUTH_SECRET,
  trustHost: true,
  // debug: true,
  session: {
    strategy: 'jwt',
  },
  // events: {
  //   async signIn(message) {
  //     console.log('signIn event', message);
  //   },
  //   async signOut(message) {
  //     console.log('signOut event', message);
  //   },
  //   async session(message) {
  //     console.log('session event', message);
  //   },
  // },
  callbacks: {
    async authorized({ auth }) {
      return !!auth;
    },
    async jwt({ token, user, trigger, session }) {
      if (!user && token.accessToken) {
        return token;
      }

      console.log(`-----------_${trigger} ${user} ${token} ${session} JWT`);

      console.log(`JWT Callback [${new Date().toISOString()}]`, {
        trigger,
        tokenExp: token?.exp,
      });

      if (user) {
        return {
          ...token,
          accessToken: user.accessToken,
        };
      }

      return token;
    },

    async session({ session, token }) {
      if (token?.accessToken) {
        session.accessToken = token.accessToken;
      }

      return session;
    },
  },
};
