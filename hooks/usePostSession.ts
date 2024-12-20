import { useEffect, useState } from 'react';
import { getOrCreatePostSession } from '@/app/actions/session-actions';

export function usePostSession() {
  const [sessionId, setSessionId] = useState<string>('');

  useEffect(() => {
    getOrCreatePostSession().then(setSessionId);
  }, []);

  return sessionId;
}
