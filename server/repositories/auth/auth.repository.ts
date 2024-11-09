import { supabase } from '@/lib/supabase/client';

export class AuthRepository {
  async findUserByEmail(email: string) {
    const { data, error } = await supabase.from('users').select('*').eq('email', email).single();
    console.log(email, error, data);

    if (error) throw error;

    return data;
  }

  async updateRefreshToken(userId: string, token: string | null) {
    const { error } = await supabase
      .from('users')
      .update({ refresh_token: token })
      .eq('id', userId);

    if (error) throw error;
  }
  async findUserByRefreshToken(refreshToken: string) {
    const { data, error } = await supabase
      .from('users')
      .select('*')
      .eq('refresh_token', refreshToken)
      .single();

    if (error) throw error;
    return data;
  }
}
