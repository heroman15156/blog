'use server';

import { signInSchema } from '@/lib/validation/auth';
import { signIn } from '@/auth';

export async function loginAction(_: any, formData: FormData) {
  try {
    const rowFormData = {
      email: formData.get('email')?.toString(),
      password: formData.get('password'),
    };

    const validationFields = signInSchema.safeParse(rowFormData);
    if (!validationFields.success) {
      return {
        errors: validationFields.error.flatten().fieldErrors as any,
        message: '입력 정보를 확인해주세요.',
      };
    }

    await signIn('credentials', {
      email: rowFormData.email,
      password: rowFormData.password,
      redirect: false,
    });

    return {
      success: true,
      message: '로그인이 완료되었습니다.',
    };
  } catch (error: any) {
    return {
      errors: true,
      message: error?.cause?.err?.message || '요청에 실패했습니다.',
    };
  }
}
