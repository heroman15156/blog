'use client';

import usePostView from '@/hooks/usePostView';
import { usePostCountView } from '@/app/posts/hooks/usePostView';

export default function PostViewCounter() {
  const { viewCount } = usePostCountView();

  usePostView();

  return (
    <span className="text-foreground dark:text-foreground text-sm md:text-base">
      조회수 {viewCount}
    </span>
  );
}
