import { signIn, signOut, useSession } from 'next-auth/react';

export default function Home() {
  const { data: session } = useSession();

  return (
    <div className="flex items-center justify-center h-screen bg-base-100">
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
