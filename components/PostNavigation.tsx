import React from 'react';
import Link from 'next/link';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';
import { Post } from '@/services/postService';

interface PostNavigationProps {
  previousPost: Post | null;
  nextPost: Post | null;
}

export default function PostNavigation({ previousPost, nextPost }: PostNavigationProps) {
  const truncateTitle = (title: string, maxLength: number) => {
    return title.length > maxLength ? title.substring(0, maxLength) + '...' : title;
  };

  return (
    <div className="relative w-full h-20 ">
      {' '}
      {/* 컨테이너에 높이 지정 */}
      {previousPost && (
        <Link
          href={`/posts/${previousPost.category}/${previousPost.id}`}
          className="block  w-[45%] max-w-[300px]"
        >
          <div className="flex items-center p-3 bg-white dark:bg-gray-800 rounded-lg shadow-md transition duration-300 ease-in-out hover:bg-gray-50 dark:hover:bg-gray-700 w-full h-full">
            <FaArrowLeft className="mr-2 text-gray-600 dark:text-gray-400 flex-shrink-0" />
            <div className="overflow-hidden">
              <p className="text-xs text-gray-500 dark:text-gray-400">이전 포스트</p>
              <h3 className="text-sm font-semibold text-gray-800 dark:text-white truncate">
                {truncateTitle(previousPost.title, 30)}
              </h3>
            </div>
          </div>
        </Link>
      )}
      {nextPost && (
        <Link
          href={`/posts/${nextPost.category}/${nextPost.id}`}
          className="block absolute right-0 top-0 w-[45%] max-w-[300px]"
        >
          <div className="flex items-center justify-end p-3 bg-white dark:bg-gray-800 rounded-lg shadow-md transition duration-300 ease-in-out hover:bg-gray-50 dark:hover:bg-gray-700 w-full h-full">
            <div className="overflow-hidden text-right">
              <p className="text-xs text-gray-500 dark:text-gray-400">다음 포스트</p>
              <h3 className="text-sm font-semibold text-gray-800 dark:text-white truncate">
                {truncateTitle(nextPost.title, 30)}
              </h3>
            </div>
            <FaArrowRight className="ml-2 text-gray-600 dark:text-gray-400 flex-shrink-0" />
          </div>
        </Link>
      )}
    </div>
  );
}
