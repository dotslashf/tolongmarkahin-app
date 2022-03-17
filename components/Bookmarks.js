import Bookmark from './Bookmark';
import useSWR from 'swr';
import fetcher from '../utils/fetcher';
import { useState } from 'react';

export default function Bookmarks({ folder }) {
  const { data, error } = useSWR(`/api/firebase/folder/${folder}`, fetcher);
  const [query, setQuery] = useState('');

  const filteredBookmarks = data?.data
    .filter(bookmark => {
      if (query === '') {
        return bookmark;
      } else if (
        bookmark.tweet.full_text.toLowerCase().includes(query.toLowerCase())
      ) {
        return bookmark;
      }
    })
    .map(bookmark => {
      return (
        <Bookmark
          key={bookmark.tweet.id_str}
          bookmark={bookmark}
          folder={folder}
        />
      );
    });

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
          className="pl-10 input border-base-200 bg-base-100 pr-4 rounded-xl focus:outline-none w-full placeholder:text-base-300 h-16"
          autoComplete="off"
          type="search"
          name="search"
          placeholder="Cari bookmark"
          onChange={e => setQuery(e.target.value)}
        />
      </div>
      <div className="flex-1 flex-col overflow-y-scroll space-y-3 bg-base-100 mt-4 p-2 lg:p-3 rounded-box">
        {!data && <BookmarksLoading />}
        {data?.data.length === 0 && (
          <BookmarksEmpty
            msg={'Belum ada bookmark, silahkan tambahkan bookmark'}
          />
        )}
        {data?.data.length > 0 && filteredBookmarks}
        {filteredBookmarks?.length === 0 &&
          query !== '' &&
          data?.data.length !== 0 && (
            <BookmarksEmpty
              msg={`Tidak ditemukan bookmark dengan keyword ${query}`}
            />
          )}
      </div>
    </>
  );
}

function BookmarksLoading() {
  return (
    <div className="flex flex-col h-auto space-y-2 animate-pulse">
      <div className="card bg-base-200">
        <div className="card-body p-4">
          <div className="flex w-full items-center space-x-4">
            <div className="bg-gray-400 w-16 h-16 rounded-md"></div>
            <div className="bg-gray-400 w-32 h-6 rounded-md"></div>
          </div>
          <div className="flex space-x-2">
            <div className="bg-gray-400 w-32 h-4 rounded-md"></div>
            <div className="bg-gray-400 w-32 h-4 rounded-md"></div>
          </div>
          <div className="bg-gray-400 h-8 rounded-md"></div>

          <div className="card-actions justify-end mt-4">
            <button className="rounded-md h-8 bg-gray-400 w-24"></button>
            <button className="rounded-md h-8 bg-gray-400 w-24"></button>
          </div>
        </div>
      </div>
      <div className="card bg-base-200">
        <div className="card-body p-4">
          <div className="flex w-full items-center space-x-4">
            <div className="bg-gray-400 w-16 h-16 rounded-md"></div>
            <div className="bg-gray-400 w-32 h-6 rounded-md"></div>
          </div>
          <div className="flex space-x-2">
            <div className="bg-gray-400 w-32 h-4 rounded-md"></div>
            <div className="bg-gray-400 w-32 h-4 rounded-md"></div>
          </div>
          <div className="bg-gray-400 h-8 rounded-md"></div>

          <div className="card-actions justify-end mt-4">
            <button className="rounded-md h-8 bg-gray-400 w-24"></button>
            <button className="rounded-md h-8 bg-gray-400 w-24"></button>
          </div>
        </div>
      </div>
    </div>
  );
}

function BookmarksEmpty({ msg }) {
  return (
    <div className="flex flex-col h-32 space-y-2 items-center justify-center text-center text-primary cursor-not-allowed">
      <div className="card bg-base-100">
        <div className="card-body p-4">
          <p className="card-title rounded-md flex flex-col md:flex-row">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-6 h-6"
              viewBox="0 0 24 24"
              strokeWidth="2"
              stroke="currentColor"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path stroke="none" d="M0 0h24v24H0z" fill="none" />
              <line x1="3" y1="3" x2="21" y2="21" />
              <path d="M17 17v3l-5 -3l-5 3v-13m1.178 -2.818c.252 -.113 .53 -.176 .822 -.176h6a2 2 0 0 1 2 2v7" />
            </svg>
            {msg}
          </p>
        </div>
      </div>
    </div>
  );
}
