'use client';
import { useFormState } from 'react-dom';

import { Eye, EyeOff } from 'lucide-react';
import { loginAction } from '@/app/actions/login-actions';
import { useEffect, useState } from 'react';
import { redirect, useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';

type ActionProps = {
  errors: any;
  message: string;
  success?: boolean;
};

const initialState: ActionProps = {
  errors: null,
  message: '',
  success: false,
};

export default function LoginForm() {
  const [state, loginFormAction, isPending] = useFormState(loginAction, initialState);
  const [isPasswordVisible, setIsPasswrodVisible] = useState(false);
  const router = useRouter();
  const { update } = useSession();

  const onToggle = () => {
    setIsPasswrodVisible(!isPasswordVisible);
  };

  const renderFieldError = (fieldErrors: string[]) => {
    return fieldErrors.map((error, index) => (
      <p key={index} className="text-red-500 text-sm mt-1 ml-1">
        {error}
      </p>
    ));
  };
  const renderServerError = () => {
    if (typeof state.errors === 'boolean' && state.message) {
      return (
        <div className="bg-red-50 dark:bg-red-900/30 border border-red-200 dark:border-red-800 rounded-lg p-4 mb-4">
          <p className="text-red-600 dark:text-red-400 text-sm font-medium">{state.message}</p>
        </div>
      );
    }
    return null;
  };

  const onSuccessHandler = async () => {
    await update();
    alert('로그인에 성공했습니다.');
    router.replace('/dashboard');
  };

  // useEffect(() => {
  //   redirect('/');
  // }, []);

  useEffect(() => {
    console.log(state.errors, 'errors');
    if (state?.success) {
      onSuccessHandler();
    }
  }, [state]);

  return (
    <div
      className="bg-white dark:bg-darkBgSecondary rounded-2xl shadow-lg p-8
                      border border-gray-200 dark:border-gray-800"
    >
      {renderServerError()}
      <form className="space-y-5" action={loginFormAction}>
        <div className="space-y-1">
          <label
            htmlFor="email"
            className="text-sm font-medium text-gray-700 dark:text-gray-300 font-scdream"
          >
            이메일
          </label>
          <input
            id="email"
            name="email"
            className="w-full px-4 py-3 rounded-lg bg-gray-50 dark:bg-darkBackground
                         border border-gray-300 dark:border-gray-700
                         text-gray-900 dark:text-white
                         focus:ring-2 focus:ring-blue-500 focus:border-transparent
                         transition duration-200"
            placeholder="admin@example.com"
          />
          {typeof state.errors === 'object' &&
            state.errors?.email &&
            renderFieldError(state.errors.email)}
        </div>

        <div className="space-y-1">
          <label
            htmlFor="password"
            className="text-sm font-medium text-gray-700 dark:text-gray-300 font-scdream"
          >
            비밀번호
          </label>
          <div className="relative">
            <input
              id="password"
              name="password"
              type={isPasswordVisible ? 'text' : 'password'}
              className="w-full px-4 py-3 rounded-lg bg-gray-50 dark:bg-darkBackground
                           border border-gray-300 dark:border-gray-700
                           text-gray-900 dark:text-white
                           focus:ring-2 focus:ring-blue-500 focus:border-transparent
                           transition duration-200"
              placeholder="••••••••"
            />
            <button
              type="button"
              className="absolute right-3 top-1/2 transform -translate-y-1/2
                           text-gray-500 dark:text-gray-400
                           hover:text-gray-700 dark:hover:text-gray-200
                           transition-colors"
            >
              <span onClick={onToggle}>
                {isPasswordVisible ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </span>
            </button>
          </div>
          {typeof state.errors === 'object' &&
            state.errors?.password &&
            renderFieldError(state.errors.password)}
        </div>

        <button
          disabled={isPending}
          type="submit"
          className="w-full py-3 px-4 bg-blue-600 hover:bg-blue-700
                       text-white font-medium rounded-lg
                       transition duration-200 transform hover:translate-y-[-1px]
                       focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2
                       dark:focus:ring-offset-darkBackground"
        >
          {isPending ? '로그인 중' : '로그인'}
        </button>

        <div className="relative py-3">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-300 dark:border-gray-700"></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-2 bg-white dark:bg-darkBgSecondary text-gray-500 dark:text-gray-400">
              또는
            </span>
          </div>
        </div>

        <button
          type="button"
          className="w-full py-3 px-4 bg-white dark:bg-darkBackground
                       border border-gray-300 dark:border-gray-700 rounded-lg
                       text-gray-700 dark:text-gray-300 font-medium
                       hover:bg-gray-50 dark:hover:bg-gray-900
                       transition duration-200 transform hover:translate-y-[-1px]
                       focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2
                       dark:focus:ring-offset-darkBackground"
        >
          <div className="flex items-center justify-center space-x-3">
            <svg className="w-5 h-5" viewBox="0 0 24 24">
              <path
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                fill="#4285F4"
              />
              <path
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                fill="#34A853"
              />
              <path
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                fill="#FBBC05"
              />
              <path
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                fill="#EA4335"
              />
            </svg>
            <span>Google로 계속하기</span>
          </div>
        </button>
      </form>
    </div>
  );
}
