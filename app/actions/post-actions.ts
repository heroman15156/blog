'use server';

import { getOrCreatePostSession } from '@/app/actions/session-actions';
import { supabase } from '@/lib/supabase/client';

export async function recordPostView(postId: string, path: string) {
  try {
    const sessionId = await getOrCreatePostSession();

    const { data: recentViews } = await supabase
      .from('post_views')
      .select()
      .match({ post_id: postId, session_id: sessionId });
    // .gt('created_at', new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString())

    if (!recentViews || recentViews.length === 0) {
      await supabase.from('post_views').insert({
        post_id: postId,
        session_id: sessionId,
        path,
      });
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
