/* eslint-disable @next/next/no-img-element */
import useSWR from 'swr';
import fetcher from '../utils/fetcher';
import { useSession } from 'next-auth/react';

export default function TwitterProfileCard() {
  const { data: session } = useSession();
  const { data, error } = useSWR(`/api/twitter/${session.user.id}`, fetcher);

  if (error) return <TwitterProfileCardError />;
  if (!data) return <TwitterProfileCardLoading />;

  return (
    <div className="card card-compact bg-base-100">
      <figure>
        <img
          src={
            data.profile_banner_url
              ? data.profile_banner_url
              : 'https://images.unsplash.com/photo-1604147706283-d7119b5b822c?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80'
          }
          className="max-h-28 w-full"
          alt={data.screen_name}
        />
      </figure>
      <div className="card-body">
        <h2 className="card-title">
          {data.name} @{data.screen_name}
        </h2>
        <p>{data.description}</p>
        <div></div>
        <div className="card-actions justify-start">
          <div className="flex space-x-2">
            <span className="badge badge-primary text-base-100">
              following: {data.friends_count}
            </span>
            <span className="badge badge-primary text-base-100">
              followers: {data.followers_count}
            </span>
          </div>
        </div>
        <div className="card-actions justify-start mt-4">
          <button
            className="btn btn-sm btn-accent"
            onClick={() => {
              window.open(`https://twitter.com/${data.screen_name}`);
            }}
          >
            Ke Profile
          </button>
        </div>
      </div>
    </div>
  );
}

function TwitterProfileCardLoading() {
  return (
    <div className="card bg-base-100 animate-pulse">
      <figure>
        <div className="bg-gray-400 w-full h-24" />
      </figure>
      <div className="card-body p-4">
        <div className="bg-gray-400 h-8 rounded-md"></div>
        <div className="bg-gray-400 h-6 rounded-md"></div>
        <div className="card-actions justify-start">
          <div className="flex space-x-2">
            <div className="rounded-full h-4 bg-gray-400 w-24"></div>
            <div className="rounded-full h-4 bg-gray-400 w-24"></div>
          </div>
        </div>
        <div className="card-actions justify-end mt-4">
          <button className="rounded-md h-8 bg-gray-400 w-24"></button>
        </div>
      </div>
    </div>
  );
}

function TwitterProfileCardError() {
  return (
    <div className="card bg-base-100">
      <figure>
        <div className="bg-red-500 w-full h-24" />
      </figure>
      <div className="card-body p-4">
        <div className="bg-red-500 h-8 rounded-md"></div>
        <div className="bg-red-500 h-6 rounded-md"></div>
        <div></div>
        <div className="card-actions justify-start">
          <div className="flex space-x-2">
            <div className="rounded-full h-4 bg-red-500 w-24"></div>
            <div className="rounded-full h-4 bg-red-500 w-24"></div>
          </div>
        </div>
        <div className="card-actions justify-end mt-4">
          <button className="rounded-md h-8 bg-red-500 w-24"></button>
        </div>
      </div>
    </div>
  );
}
