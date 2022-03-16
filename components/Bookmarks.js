import Bookmark from './Bookmark';

export default function Bookmarks({ tweets }) {
  return (
    <div className="flex-1 flex-col overflow-y-scroll space-y-3 bg-base-100 mt-4 p-2 lg:p-3 rounded-box">
      {tweets.map(bookmark => {
        return <Bookmark key={bookmark.tweet.id} bookmark={bookmark} />;
      })}
    </div>
  );
}
