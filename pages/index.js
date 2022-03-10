import { signIn, signOut, useSession } from 'next-auth/react';
import Hero from '../components/Hero';

export default function Home() {
  const { data: session, status } = useSession();

  return (
    <div className="flex items-center justify-center h-screen bg-blue-400">
      {!session && (
        <>
          <span>You are not signed in</span>
          <a
            href={`/api/auth/signin`}
            onClick={e => {
              e.preventDefault();
              signIn();
            }}
          >
            Sign in
          </a>
        </>
      )}
      {session?.user && (
        <>
          <span>You are signed in</span>
          <p>
            {session.user.username} {session.expires}
          </p>
          <a
            href={`/api/auth/signout`}
            onClick={e => {
              e.preventDefault();
              signOut();
            }}
          >
            Sign out
          </a>
        </>
      )}
    </div>
  );
}
