'use server';

import { getOrCreatePostSession } from '@/app/actions/session-actions';
import { supabase } from '@/lib/supabase/client';
type PostViewData = {
  postId: string;
  path: string;
  userAgent: string;
  deviceType: string;
  referrer: string | null;
  pageLoadTime: number;
};
export async function recordPostView(data: PostViewData) {
  try {
    const sessionId = await getOrCreatePostSession();

    const { postId, path, userAgent, pageLoadTime: page_load_time, deviceType, referrer } = data;

    const { data: recentViews } = await supabase
      .from('post_views')
      .select()
      .match({ post_id: postId, session_id: sessionId });
    // .gt('created_at', new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString())

    console.log(recentViews, 'recent views', data);

    if (!recentViews || recentViews.length === 0) {
      const result = await supabase.from('post_views').insert({
        post_id: postId,
        session_id: sessionId,
        path,
        user_agent: userAgent,
        device_type: deviceType,
        referrer,
        page_load_time,
      });

      console.log(result, 'result');
    }
  } catch (error) {
    console.error('Failed to record view:', error);
  }
}

export async function getPostViewCount(postId: string) {
  const { count } = await supabase
    .from('post_views')
    .select('*', { count: 'exact' })
    .eq('post_id', postId);

  return count || 0;
}
