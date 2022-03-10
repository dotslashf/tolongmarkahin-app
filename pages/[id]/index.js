import TwitterProfileCard from '../../components/TwitterProfileCard';
import { useRouter } from 'next/router';

export default function UserHome() {
  const { query } = useRouter();

  return (
    <div className="flex h-screen bg-base-200 lg:px-6 px-4 lg:pt-6 pt-4">
      <div className="grid lg:gap-x-4 gap-x-2 lg:grid-cols-4 md:grid-cols-8 grid-cols-1 w-full">
        <div className="lg:col-span-1 md:col-span-3">
          <TwitterProfileCard userId={query.id} />
        </div>
        <div className="lg:col-span-3 md:col-span-5"></div>
      </div>
    </div>
  );
}
