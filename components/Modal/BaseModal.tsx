'use client';

import React, { ReactNode, useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { useRouter } from 'next/navigation';

type Props = {
  children: ReactNode;
};

export default function BaseModal({ children }: Props) {
  const router = useRouter();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    return () => setMounted(false);
  }, []);

  const onClose = () => {
    router.back();
  };

  const modalContent = (
    <div className="fixed inset-0 z-50 overflow-auto bg-black bg-opacity-50 flex items-center justify-center p-4">
      <div className="relative w-full max-w-md sm:max-w-lg md:max-w-2xl lg:max-w-4xl xl:max-w-6xl mx-auto bg-white dark:bg-gray-800 rounded-lg shadow-xl">
        <div className="absolute top-2 right-2 sm:-right-12">
          <button
            onClick={onClose}
            className="bg-white dark:bg-gray-700 rounded-full p-2 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors shadow-md"
            aria-label="Close modal"
          >
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
        <div className="p-6 overflow-y-auto md:max-h-[80vh]">{children}</div>
      </div>
    </div>
  );

  if (!mounted) return null;

  if (typeof window !== 'undefined' && document.getElementById('modal-root')) {
    return createPortal(modalContent, document.getElementById('modal-root') as HTMLElement);
  }

  return modalContent;
}
