'use client';

import { useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Post } from '@/services/postService';

export default function BlogPostCard({
  post: { id, title, date, category, description, thumbnail },
}: {
  post: Post;
}) {
  const cardRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('opacity-100', 'translate-y-0');
          entry.target.classList.remove('opacity-0', 'translate-y-4');
        }
      },
      {
        threshold: 0.1,
      }
    );

    if (cardRef.current) {
      observer.observe(cardRef.current);
    }

    return () => {
      if (cardRef.current) {
        observer.unobserve(cardRef.current);
      }
    };
  }, []);
  const isVideo = thumbnail.toLowerCase().endsWith('.mov');

  return (
    <Link href={`/posts/${category}/${id}`} className="block group">
      <div
        ref={cardRef}
        className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden border border-transparent group-hover:border-blue-500 dark:group-hover:border-blue-400 transition-all duration-300 h-[20rem] opacity-0 translate-y-4 transform group-hover:shadow-lg flex flex-col"
      >
        <div className="relative w-full h-40 bg-gray-200 dark:bg-gray-700 flex-shrink-0">
          {isVideo ? (
            <video
              src={thumbnail}
              className="w-full h-full object-cover"
              muted
              loop
              playsInline
              autoPlay
            />
          ) : (
            <Image
              src={thumbnail}
              alt={title}
              objectFit="cover"
              layout="fill"
              className="transition-transform duration-300 ease-in-out group-hover:scale-105"
            />
          )}
        </div>
        <div className="p-3 flex flex-col flex-grow">
          <h3 className="text-base font-semibold mb-1 text-gray-800 dark:text-white truncate group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300">
            {title}
          </h3>
          <p className="text-xs text-gray-600 dark:text-gray-300 mb-2 truncate">{description}</p>
          <div className="flex justify-between items-center mt-auto text-xs">
            <span className="text-gray-500 dark:text-gray-400">{date}</span>
            <span className="inline-block bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 px-1.5 py-0.5 rounded-full">
              {category}
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}
