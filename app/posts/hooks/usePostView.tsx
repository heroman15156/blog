import { useEffect, useState } from 'react';
import { getPostViewCount } from '@/app/actions/post-actions';
import { usePathname } from 'next/navigation';

export const usePostCountView = () => {
  const [viewCount, setViewCount] = useState(0);

  const pathname = usePathname();
  const postId = pathname.split('/').pop();
  useEffect(() => {
    if (!postId) return;
    getPostViewCount(postId).then(setViewCount);
  }, [postId]);

  return { viewCount };
};
