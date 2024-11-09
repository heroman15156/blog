import { User } from '@/types/User.types';
import { NextRequest } from 'next/server';

export type Token = {
  accessToken: string;
  refreshToken: string;
};

export type LoginDataRequest = {
  email: string;
  password: string;
};

export type LoginDataResponse = {
  tokens: Token;
  user: User;
};

export type ApiResponse<T> = {
  success: boolean;
  data?: T;
  error?: string;
};

export interface AuthRequest extends NextRequest {
  user?: Omit<User, 'name'>;
}
