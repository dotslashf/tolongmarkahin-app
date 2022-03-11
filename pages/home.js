import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import Rightpane from '../components/Rightpane';
import TwitterProfileCard from '../components/TwitterProfileCard';

export default function UserHome() {
  const { data: session, status } = useSession();
  const router = useRouter();

  if (status === 'loading') {
    return <p>Loading...</p>;
  }

  if (status === 'unauthenticated') {
    return router.push('/api/auth/signin');
  }

  if (session?.user && status === 'authenticated') {
    return (
      <div className="flex h-screen bg-base-200 lg:px-6 px-4 lg:pt-6 pt-4">
        <div className="grid lg:gap-x-4 gap-x-2 lg:grid-cols-4 md:grid-cols-8 grid-cols-1 w-full">
          <div className="lg:col-span-1 md:col-span-3">
            <TwitterProfileCard />
          </div>
          <div className="lg:col-span-3 md:col-span-5">
            <Rightpane defaultFolder={session.user.defaultFolder} />
          </div>
        </div>
      </div>
    );
  }
}
