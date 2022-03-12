import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import Rightpane from '../components/Rightpane';
import TwitterProfileCard from '../components/TwitterProfileCard';
import Head from 'next/head';

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
      <div className="flex h-full md:h-screen bg-base-200 px-3 py-3 lg:px-4 lg:py-4">
        <Head>
          <title>Tolongmarkahin - Home</title>
          <meta property="og:title" content="My page title" key="title" />
        </Head>
        <div className="grid lg:gap-x-4 gap-x-2 gap-y-4 lg:grid-cols-4 md:grid-cols-8 grid-cols-1 w-full">
          <div className="lg:col-span-1 md:col-span-3">
            <TwitterProfileCard />
          </div>
          <div className="lg:col-span-3 md:col-span-5 rounded-b-box overflow-y-scroll">
            <Rightpane defaultFolder={session.user.defaultFolder} />
          </div>
        </div>
      </div>
    );
  }
}
