/* eslint-disable @next/next/no-img-element */
export default function Tweets({ tweets }) {
  return (
    <div className="flex flex-col mt-4 space-y-2">
      {tweets.map(bookmark => {
        return (
          <div
            className="card card-compact bg-base-100 shadow-xl"
            key={bookmark.tweet.id}
          >
            <div className="card-body">
              <h2 className="card-title">@{bookmark.tweet.user.screen_name}</h2>
              <p>{bookmark.tweet.full_text}</p>
              {bookmark.tweet.entities.media ? (
                <div className="card-actions">
                  {bookmark.tweet.entities.media.map(media => {
                    return (
                      <a
                        key={media.media_url}
                        href={media.media_url}
                        target="_blank"
                        rel="noreferrer"
                      >
                        <img
                          className="w-36"
                          src={media.media_url}
                          alt={bookmark.tweet.user.screen_name}
                          tar
                        />
                      </a>
                    );
                  })}
                </div>
              ) : null}
              <div className="card-actions justify-end">
                <button className="btn btn-sm btn-secondary">Ke Tweet</button>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
