import { userType } from '@/type/user';
import { signIn, signOut, useSession } from 'next-auth/react';

const CreateUser = async (data: userType) => {
  const { data: session } = useSession();
  const response = await fetch('/api/user', {
    method: 'POST',
    cache: 'no-store',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });

  if(session) {
    signOut()
  }

  if(!response) return null

  await signIn('credentials', {
    Username: data.Username,
    Password: data.Password,
    redirect: true,
    callbackUrl: '/',
  });
  return response.json();
};

export { CreateUser };