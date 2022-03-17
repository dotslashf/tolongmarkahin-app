import Bookmark from './Bookmark';
import useSWR from 'swr';
import fetcher from '../utils/fetcher';
import { useState } from 'react';

export default function Bookmarks({ folder }) {
  const { data, error } = useSWR(`/api/firebase/${folder}`, fetcher);
  const [query, setQuery] = useState('');

  return (
    <>
      <div className="w-full relative mx-auto text-primary">
        <svg
          className="w-4 h-4 absolute left-2 top-1/2 -translate-y-1/2 translate-x-1/2"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          ></path>
        </svg>
        <input
          className="pl-10 input border-base-200 bg-white pr-4 rounded-box focus:outline-none w-full placeholder:text-base-300 "
          type="search"
          name="search"
          placeholder="Cari bookmark"
          onChange={e => setQuery(e.target.value)}
        />
      </div>
      <div className="flex-1 flex-col overflow-y-scroll space-y-3 bg-base-100 mt-4 p-2 lg:p-3 rounded-box">
        {!data && <BookmarksLoading />}
        {data?.data.length === 0 && <BookmarksEmpty />}
        {data?.data.length > 0 &&
          data.data
            .filter(bookmark => {
              if (query === '') {
                return bookmark;
              } else if (
                bookmark.tweet.full_text
                  .toLowerCase()
                  .includes(query.toLowerCase())
              ) {
                return bookmark;
              }
            })
            .map(bookmark => {
              return (
                <Bookmark
                  key={bookmark.tweet.id}
                  bookmark={bookmark}
                  folderName={folder}
                />
              );
            })}
      </div>
    </>
  );
}

function BookmarksLoading() {
  return (
    <div className="flex flex-col h-96 mt-4 space-y-2">
      <div className="card bg-base-100">
        <div className="card-body p-4">
          <div className="bg-gray-400 h-8 rounded-md"></div>
          <div className="bg-gray-400 h-6 rounded-md"></div>

          <div className="card-actions justify-end mt-4">
            <button className="rounded-md h-8 bg-gray-400 w-24"></button>
          </div>
        </div>
      </div>
    </div>
  );
}

function BookmarksEmpty() {
  return (
    <div className="flex flex-col h-48 space-y-2">
      <div className="card bg-base-100">
        <div className="card-body p-4">
          <p className="card-title h-8 rounded-md">
            Belum ada data, silahkan tambahkan bookmark
          </p>
        </div>
      </div>
    </div>
  );
}
