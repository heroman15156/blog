'use client';

import React from 'react';
import { useSession } from 'next-auth/react';
import { logout } from '@/app/actions/login-actions';
// import { update } from '@/auth';
function LogoutButton() {
  return (
    <form action={logout}>
      <button type="submit">Logout</button>
    </form>
  );
}
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
      <LogoutButton />
    </div>
  );
}
