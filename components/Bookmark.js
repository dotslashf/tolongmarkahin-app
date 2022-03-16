/* eslint-disable @next/next/no-img-element */
export default function Bookmark({ bookmark }) {
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
          {bookmark.tweet.user.name}{' '}
        </h2>
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
                        className="w-28 h-28 md:h-36 md:w-36 object-cover rounded-box"
                        src={media.media_url}
                        alt={bookmark.tweet.user.screen_name}
                      />
                    </a>
                  </div>
                );
              })}
            </div>
          ) : null}
          <button
            className="btn btn-sm btn-accent self-end gap-2"
            onClick={() => {
              window.open(
                `https://twitter.com/${bookmark.tweet.user.screen_name}/status/${bookmark.tweet.id_str}`
              );
            }}
          >
            <svg
              className="w-4"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M6.672 1.911a1 1 0 10-1.932.518l.259.966a1 1 0 001.932-.518l-.26-.966zM2.429 4.74a1 1 0 10-.517 1.932l.966.259a1 1 0 00.517-1.932l-.966-.26zm8.814-.569a1 1 0 00-1.415-1.414l-.707.707a1 1 0 101.415 1.415l.707-.708zm-7.071 7.072l.707-.707A1 1 0 003.465 9.12l-.708.707a1 1 0 001.415 1.415zm3.2-5.171a1 1 0 00-1.3 1.3l4 10a1 1 0 001.823.075l1.38-2.759 3.018 3.02a1 1 0 001.414-1.415l-3.019-3.02 2.76-1.379a1 1 0 00-.076-1.822l-10-4z"
                clipRule="evenodd"
              ></path>
            </svg>
            Tweet
          </button>
        </div>
      </div>
    </div>
  );
}
