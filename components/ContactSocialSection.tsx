'use client';

import React, { useState } from 'react';
import Link from 'next/link';

const ContactSocialSection: React.FC = () => {
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');

  const copyToClipboard = (text: string, type: string) => {
    navigator.clipboard.writeText(text).then(() => {
      setToastMessage(`${type}이(가) 클립보드에 복사되었습니다!`);
      setShowToast(true);
      setTimeout(() => setShowToast(false), 3000);
    });
  };

  return (
    <div className="bg-gray-100 dark:bg-gray-700 rounded-lg shadow-md p-6 relative">
      <h3 className="text-xl font-semibold mb-4">연락처 및 소셜 미디어</h3>
      <ul className="space-y-2">
        <li>
          <strong>이메일:</strong>{' '}
          <button
            onClick={() => copyToClipboard('wmc151567@gmail.com', '이메일')}
            className="text-blue-600 dark:text-blue-400 hover:underline cursor-pointer"
          >
            wmc151567@gmail.com
          </button>
        </li>
        <li>
          <strong>연락처: </strong>
          <button
            onClick={() => copyToClipboard('010-2810-0744', '연락처')}
            className="text-blue-600 dark:text-blue-400 hover:underline cursor-pointer"
          >
            010-2810-0744
          </button>
        </li>
        <li>
          <strong>벨로그:</strong>{' '}
          <Link
            href="https://velog.io/@wmc1415/posts"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 dark:text-blue-400 hover:underline"
          >
            https://velog.io/@wmc1415/posts
          </Link>
        </li>
        <li>
          <strong>GitHub:</strong>{' '}
          <Link
            href="https://github.com/wmc15156"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 dark:text-blue-400 hover:underline"
          >
            github.com/wmc15156 &nbsp;
          </Link>
          <Link
            href="https://github.com/heroman15156"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 dark:text-blue-400 hover:underline"
          >
            github/heroman15156
          </Link>
        </li>

        <li>
          <strong>이력서:</strong>{' '}
          <Link
            href="/resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 dark:text-blue-400 hover:underline"
          >
            PDF 이력서 다운로드
          </Link>
        </li>
      </ul>
      {showToast && (
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-green-500 text-white px-4 py-2 rounded-md shadow-lg transition-opacity duration-300">
          {toastMessage}
        </div>
      )}
    </div>
  );
};

export default ContactSocialSection;
