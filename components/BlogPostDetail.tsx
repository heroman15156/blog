import React from 'react';
import { getAdjacentPosts } from '@/services/postService';

import MarkdownViewer from '@/components/MarkdownViewer';
import Comments from '@/components/Comments';
import PostNavigation from '@/components/PostNavigation';
import TableOfContents from '@/components/TableOfContents';

type BlogPostDetailProps = {
  title: string;
  date: string;
  category: string;
  content: string;
  id: string;
  thumbnail: string;
};

export default function BlogPostDetail({
  title,
  date,
  category,
  content,
  id,
  thumbnail,
}: BlogPostDetailProps) {
  const { previousPost, nextPost } = getAdjacentPosts(id);
  return (
    <div className="flex flex-col lg:flex-row justify-center min-h-screen w-full bg-background dark:bg-background">
      <div className="w-full lg:w-3/4 max-w-4xl px-4 lg:px-8 py-[50px]">
        <article className="bg-background dark:bg-background rounded-lg overflow-hidden">
          {/* Post header */}
          <header className="p-4 md:p-6 border-b border-gray-200 dark:border-gray-700">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground dark:text-foreground mb-4 leading-[500px] inline-block">
              {title}
            </h1>
            <div className="flex flex-col md:flex-row md:items-center md:justify-between">
              <div className="flex items-center space-x-4 mb-2 md:mb-0">
                <span className="text-foreground dark:text-foreground text-sm md:text-base">
                  {/*{author}*/}
                </span>
                <span className="text-foreground dark:text-foreground text-sm md:text-base">
                  {date}
                </span>
              </div>
              {/*<div className="space-x-2">*/}
              {/*  <button className="text-blue-500 hover:text-blue-600 dark:text-blue-400 dark:hover:text-blue-300">*/}
              {/*    <FaEdit size={18} />*/}
              {/*  </button>*/}
              {/*  <button className="text-red-500 hover:text-red-600 dark:text-red-400 dark:hover:text-red-300">*/}
              {/*    <FaTrash size={18} />*/}
              {/*  </button>*/}
              {/*</div>*/}
            </div>
          </header>

          {/* Categories */}
          <div className="px-4 md:px-6 py-3 md:py-4 bg-background dark:bg-background">
            <div className="flex flex-wrap gap-2">
              <span className="px-2 md:px-3 py-1 bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200 rounded-full text-xs md:text-sm font-medium">
                {category}
              </span>
            </div>
          </div>

          <div className="w-full flex justify-center bg-background mt-20 dark:bg-background">
            <div className="w-full max-w-[700px] aspect-[7/4]">
              <img src={thumbnail} alt="Post thumbnail" className="w-full h-full object-cover" />
            </div>
          </div>

          <div className="mt-8 px-4">
            <MarkdownViewer content={content} />
          </div>
          <Comments />
          <div className="px-4 md:px-6 lg:px-8">
            <PostNavigation previousPost={previousPost} nextPost={nextPost} />
          </div>
        </article>
      </div>
      <div className="hidden lg:block lg:w-1/4 p-4">
        <TableOfContents content={content} />
      </div>
    </div>
  );
}
