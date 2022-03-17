/* eslint-disable @next/next/no-img-element */
import useSWR from 'swr';
import fetcher from '../utils/fetcher';
import { useSession, signOut } from 'next-auth/react';

export default function TwitterProfileCard() {
  const { data: session } = useSession();
  const { data, error } = useSWR(`/api/twitter/${session.user.id}`, fetcher);
  const { data: dataBookmarks } = useSWR(`/api/firebase/bookmarks`, fetcher);

  return (
    <>
      {error && <TwitterProfileCardError />}
      {!data && !dataBookmarks && <TwitterProfileCardLoading />}
      {data && dataBookmarks && (
        <div className="card card-compact bg-base-100 shadow-sm">
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
              <div className="avatar">
                <div className="w-16 rounded-box">
                  <img
                    src={`${data.profile_image_url.replace('_normal', '')}`}
                    alt={`${data.screen_name}`}
                  />
                </div>
              </div>
              {data.name} @{data.screen_name}
            </h2>
            <p>{data.description}</p>
            <div className="card-actions justify-start mt-4">
              <button
                className="btn btn-sm btn-accent gap-2"
                onClick={() => {
                  window.open(`https://twitter.com/${data.screen_name}`);
                }}
              >
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                  ></path>
                </svg>
                Ke Profile
              </button>
              <button
                className="btn btn-sm btn-secondary gap-2"
                onClick={e => {
                  e.preventDefault();
                  signOut();
                }}
              >
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                  ></path>
                </svg>
                Sign Out
              </button>
            </div>
          </div>
          <div className="stats stats-vertical shadow-md">
            <div className="stat">
              <div className="stat-figure text-primary">
                <svg
                  className="w-8"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                  ></path>
                </svg>
              </div>
              <div className="stat-title">Followers</div>
              <div className="stat-value text-primary">
                {data.followers_count}
              </div>
            </div>
            <div className="stat">
              <div className="stat-figure text-secondary">
                <svg
                  className="w-8"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
                  ></path>
                </svg>
              </div>
              <div className="stat-title">Following</div>
              <div className="stat-value text-secondary">
                {data.friends_count}
              </div>
            </div>
            <div className="stat">
              <div className="stat-figure text-accent">
                <svg
                  className="w-8"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z"
                  ></path>
                </svg>
              </div>
              <div className="stat-title">Total Bookmarks</div>
              <div className="stat-value text-accent">
                {dataBookmarks.totalCounts}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
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
        <div className="card-actions mt-4">
          <button className="rounded-md h-6 bg-gray-400 w-24"></button>
          <button className="rounded-md h-6 bg-gray-400 w-24"></button>
        </div>
      </div>
      <div className="stats stats-vertical shadow-md">
        {[...Array(3)].map((_, i) => (
          <div className="stat px-4" key={i}>
            <div className="stat-figure text-gray-400">
              <div className="w-10 h-10 rounded-full bg-gray-400"></div>
            </div>
            <div className="stat-value bg-gray-400 h-10 w-36 rounded-md"></div>
          </div>
        ))}
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
