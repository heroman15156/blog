'use client';

import ClientComponents from '@/components/ClientComponents';
import { useSession } from 'next-auth/react';

export default function Page() {
  const { data: session } = useSession();

  return (
    <h1>
      <ClientComponents />
      <button>Dashboard Page {JSON.stringify(session)}</button>
    </h1>
  );
}
