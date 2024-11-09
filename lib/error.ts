import { AUTH_ERROR_MESSAGES } from '@/constant/auth';

export class ApiError extends Error {
  constructor(
    public status: number,
    message?: string,
    public code?: string
  ) {
    super(message);
    this.name = 'ApiError';
  }

  static expiredAccess(message = AUTH_ERROR_MESSAGES.EXPIRED_ACCESS_TOKEN) {
    return new ApiError(401, message);
  }

  static expiredRefresh(message = AUTH_ERROR_MESSAGES.EXPIRED_REFRESH_TOKEN) {
    return new ApiError(409, message);
  }

  static unauthorized(defaultMessage?: string) {
    const message = defaultMessage ?? AUTH_ERROR_MESSAGES.UNAUTHORIZED;
    return new ApiError(401, message);
  }

  static notFound(message: string) {
    return new ApiError(404, message);
  }

  static badRequest(message: string) {
    return new ApiError(400, message);
  }
}
