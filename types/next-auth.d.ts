import 'next-auth';
import { DefaultSession, DefaultUser } from 'next-auth';

import { JWT as DefaultJWT } from 'next-auth/jwt';

declare module 'next-auth' {
  interface Session {
    user: {
      id: string;
      email: string;
      name: string;
      accessToken: string;
    };
    accessToken: string;
    accessTokenExpires?: number;
    error?: string;
  }

  interface User extends DefaultUser {
    id: string;
    email: string;
    name: string;
    accessToken: string;
  }
}

declare module 'next-auth/jwt' {
  interface JWT extends DefaultJWT {
    accessToken?: string;
    accessTokenExpires?: number;
    error?: string;
    id?: string;
    email?: string;
    name?: string;
  }
}
