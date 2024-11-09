import { LoginDataRequest, LoginDataResponse } from '@/types/Auth.types';
import { fetchClient } from '@/lib/api/apiClient';

export const authService = {
  async login(data: LoginDataRequest): Promise<LoginDataResponse> {
    const result = await fetchClient<LoginDataResponse>('/api/auth/login', {
      method: 'POST',
      body: data,
    }).then((resp) => {
      return resp.body;
    });
    return result;
  },
};
