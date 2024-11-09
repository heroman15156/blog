import NextAuth from 'next-auth';

import { authConfig } from '@/config/auth-config';

export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut,
  unstable_update: update,
} = NextAuth(authConfig);
