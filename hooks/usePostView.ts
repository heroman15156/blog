import { usePathname } from 'next/navigation';
import { recordPostView } from '@/app/actions/post-actions';
import { useEffect, useRef } from 'react';
import { getDeviceInfo } from '@/utils/getDeviceInfo';

const usePostView = () => {
  const pathname = usePathname();
  const postId = pathname.split('/').pop();
  const isRecorded = useRef(false);

  useEffect(() => {
    const savePostView = async () => {
      if (process.env.NODE_ENV !== 'production') return;
      if (!postId || isRecorded.current) return;
      const pageLoadTime = Math.round(performance.now());
      const { userAgent, deviceType } = getDeviceInfo();

      const postMetadata = {
        postId,
        userAgent,
        path: pathname,
        deviceType,
        referrer: document.referrer || null,
        pageLoadTime,
      };

      try {
        await recordPostView(postMetadata);
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
