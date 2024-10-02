'use client';

import React, { useState } from 'react';
import CategoryButton from '@/components/Button/CategoryButton';
import BlogPostCard from '@/components/BlogPostCard';
import { Post } from '@/services/postService';
const categories = [
  { name: '전체', emoji: '🌐' }, // 전체 카테고리 추가
  { name: 'React', emoji: '⚛️' },
  { name: 'Status', emoji: '🔄' },
  { name: 'Next.Js', emoji: '🟢' },
  { name: 'NestJS', emoji: '🐈' },
  { name: 'MySQL', emoji: '🐬' },
  { name: 'AWS', emoji: '☁️' },
  { name: 'Web', emoji: '🐧' },
];
export default function PostItem({ initialPosts }: { initialPosts: Post[] }) {
  const [selectedCategory, setSelectedCategory] = useState<string>('전체');

  const filteredPosts =
    selectedCategory === '전체'
      ? initialPosts
      : initialPosts.filter((post) => post.category === selectedCategory);

  const handleCategoryClick = (categoryName: string) => {
    setSelectedCategory(categoryName);
  };

  return (
    <div className="w-full max-w-7xl mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-3xl font-bold text-gray-800 dark:text-white">블로그 포스트</h2>
        <span className="text-lg text-gray-600 dark:text-gray-300">
          총 {filteredPosts.length}개의 게시글
        </span>
      </div>

      <div className="flex flex-wrap gap-4 mb-8">
        {categories.map((category) => (
          <CategoryButton
            key={category.name}
            category={category}
            isSelected={selectedCategory === category.name}
            onClick={() => handleCategoryClick(category.name)}
          />
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 min-h-[400px]">
        {filteredPosts.length > 0 ? (
          filteredPosts.map((post) => <BlogPostCard key={post.id} post={post} />)
        ) : (
          <div className="col-span-full flex items-center justify-center text-gray-500 dark:text-gray-400">
            <p className="text-xl">이 카테고리에 해당하는 포스트가 없습니다.</p>
          </div>
        )}
      </div>
    </div>
  );
}
