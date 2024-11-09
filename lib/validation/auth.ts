import { z } from 'zod';

export const signInSchema = z.object({
  email: z.string().min(1, '이메일은 필수 입력사항입니다.').email('이메일 형식이어야 합니다.'),
  password: z.string().min(1, '비밀번호는 필수 입력사항입니다.'),
});

export type SignInFormData = z.infer<typeof signInSchema>;
