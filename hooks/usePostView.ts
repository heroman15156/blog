import { usePathname } from 'next/navigation';
import { recordPostView } from '@/app/actions/post-actions';
import { useEffect, useRef } from 'react';

const usePostView = () => {
  const pathname = usePathname();
  const postId = pathname.split('/').pop();
  const isRecorded = useRef(false);

  useEffect(() => {
    const savePostView = async () => {
      if (process.env.NODE_ENV !== 'production') return;
      if (!postId || isRecorded.current) return;
      try {
        await recordPostView(postId, pathname);
        isRecorded.current = true;
      } catch (error) {
        console.error('Failed to record view:', error);
      }
    };

    savePostView();

    // 컴포넌트 언마운트 시 ref 초기화
    return () => {
      isRecorded.current = false;
    };
  }, [postId, pathname]);
};

export default usePostView;
