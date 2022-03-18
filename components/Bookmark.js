import Modal from './Modal';
import { useState } from 'react';
import useSWR, { useSWRConfig } from 'swr';
import { formatDate } from '../utils/common';

/* eslint-disable @next/next/no-img-element */
export default function Bookmark({ bookmark, folderName }) {
  let [isOpen, setIsOpen] = useState(false);
  const { mutate } = useSWRConfig();

  function openModal() {
    setIsOpen(true);
  }

  async function onDeleteBookmark(bookmarkId) {
    const res = await fetch(`/api/firebase/delete`, {
      method: 'POST',
      body: JSON.stringify({ folder: folderName, bookmarkId }),
    });
    if (res.ok) {
      mutate(`/api/firebase/folder/${folderName}`);
      mutate(`/api/firebase/folders`);
      mutate(`/api/firebase/bookmarks`);
      setIsOpen(false);
    }
  }

  return (
    <div className="card card-compact hover:bg-primary-focus bg-primary text-base-100 transition-colors">
      <div className="card-body">
        <h2 className="card-title">
          <div className="avatar">
            <div className="w-16 rounded-box">
              <img
                src={`${bookmark.tweet.user.profile_image_url.replace(
                  '_normal',
                  ''
                )}`}
                alt={`${bookmark.tweet.user.screen_name}`}
              />
            </div>
          </div>
          {bookmark.tweet.user.name}
        </h2>
        <div className="flex space-x-0 md:space-x-2 flex-col md:flex-row space-y-2 md:space-y-0">
          <a
            href={`https://www.twitter.com/${bookmark.tweet.user.screen_name}`}
            target="_blank"
            className="badge badge-secondary font-bold"
            rel="noreferrer"
          >
            <svg
              className="w-4 h-4"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M14.243 5.757a6 6 0 10-.986 9.284 1 1 0 111.087 1.678A8 8 0 1118 10a3 3 0 01-4.8 2.401A4 4 0 1114 10a1 1 0 102 0c0-1.537-.586-3.07-1.757-4.243zM12 10a2 2 0 10-4 0 2 2 0 004 0z"
                clipRule="evenodd"
              ></path>
            </svg>
            {bookmark.tweet.user.screen_name}
          </a>
          <a
            href={`https://www.twitter.com/${bookmark.tweet.user.screen_name}`}
            target="_blank"
            className="badge badge-accent font-bold gap-2"
            rel="noreferrer"
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
                d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
              ></path>
            </svg>
            ditambahkan {formatDate(bookmark.createdAt)}
          </a>
        </div>
        <p>{bookmark.tweet.full_text}</p>
        <div
          className={
            (bookmark.tweet.extended_entities
              ? 'justify-between'
              : 'justify-end') + ' card-actions'
          }
        >
          {bookmark.tweet.extended_entities ? (
            <div className="carousel carousel-center max-w-sm p-2 space-x-2 bg-base-100 rounded-box mt-4">
              {bookmark.tweet.extended_entities.media.map(media => {
                return (
                  <div className="carousel-item" key={media.media_url}>
                    <a href={media.media_url} target="_blank" rel="noreferrer">
                      <img
                        className="w-28 h-28 md:h-36 md:w-36 object-top object-cover rounded-box"
                        src={media.media_url}
                        alt={bookmark.tweet.user.screen_name}
                      />
                    </a>
                  </div>
                );
              })}
            </div>
          ) : null}

          <div className="flex flex-col md:flex-row md:space-x-2 md:space-y-0 space-y-2 self-end">
            <button
              className="btn btn-sm btn-accent gap-2"
              onClick={() => {
                window.open(
                  `https://twitter.com/${bookmark.tweet.user.screen_name}/status/${bookmark.tweet.id_str}`
                );
              }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-4 h-4"
                viewBox="0 0 24 24"
                strokeWidth="2"
                stroke="currentColor"
                fill="none"
              >
                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                <path d="M22 4.01c-1 .49 -1.98 .689 -3 .99c-1.121 -1.265 -2.783 -1.335 -4.38 -.737s-2.643 2.06 -2.62 3.737v1c-3.245 .083 -6.135 -1.395 -8 -4c0 0 -4.182 7.433 4 11c-1.872 1.247 -3.739 2.088 -6 2c3.308 1.803 6.913 2.423 10.034 1.517c3.58 -1.04 6.522 -3.723 7.651 -7.742a13.84 13.84 0 0 0 .497 -3.753c-.002 -.249 1.51 -2.772 1.818 -4.013z" />
              </svg>
              Tweet
            </button>
            <button
              type="button"
              onClick={openModal}
              className="btn btn-sm btn-secondary gap-2"
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
                  d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                ></path>
              </svg>
              Delete
            </button>
            <Modal
              isOpen={isOpen}
              setIsOpen={setIsOpen}
              bookmarkId={bookmark.id}
              onDeleteBookmark={onDeleteBookmark}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
