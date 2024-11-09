import React from 'react';
import LoginForm from '@/app/login/components/LoginForm';

export default function Page() {
  return (
    <div className="pt-[20px] md:pt-[100px] h-full w-full flex items-center justify-center bg-whiteBg dark:bg-darkBackground p-4">
      <div className="w-full max-w-[400px]">
        <LoginForm />
      </div>
    </div>
  );
}
