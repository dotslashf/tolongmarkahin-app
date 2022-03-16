import Bookmark from './Bookmark';
import useSWR from 'swr';
import fetcher from '../utils/fetcher';

export default function Bookmarks({ folder }) {
  const { data, error } = useSWR(`/api/firebase/${folder}`, fetcher);

  return (
    <div className="flex-1 flex-col overflow-y-scroll space-y-3 bg-base-100 mt-4 p-2 lg:p-3 rounded-box">
      {!data && <BookmarksLoading />}
      {data?.data.length === 0 && <BookmarksEmpty />}
      {data?.data.length > 0 &&
        data.data.map(bookmark => {
          return (
            <Bookmark
              key={bookmark.tweet.id}
              bookmark={bookmark}
              folderName={folder}
            />
          );
        })}
    </div>
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
