'use client';

import React from 'react';
import { useSession } from 'next-auth/react';
// import { update } from '@/auth';

export default function ClientComponents() {
  const { data: session, update } = useSession();

  const handleUpdateUser = async () => {
    // await update({
    //   user: {
    //     name: 'kim',
    //   },
    // });
    await update();
  };

  return (
    <div>
      <button onClick={handleUpdateUser}>update{session?.user?.name}</button>
    </div>
  );
}
