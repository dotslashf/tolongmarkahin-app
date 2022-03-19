export default function Folders({ selected, folders, onClickFolder }) {
  return (
    <div className="flex overflow-x-scroll w-full sticky top-0 z-50 rounded-box shadow-sm mb-4">
      <ul className="menu menu-horizontal space-x-2 p-2 lg:p-3 bg-base-100 min-w-max w-full rounded-box">
        {folders.map(folder => {
          return (
            <li key={folder.id}>
              <button
                className={
                  'hover:text-base-100 hover:bg-primary-focus ' +
                  (selected === folder.id
                    ? 'bg-primary text-base-100'
                    : 'text-primary')
                }
                onClick={onClickFolder(folder.id)}
              >
                <div
                  className={
                    'px-2.5 text-sm ' +
                    (selected === folder.id
                      ? 'bg-base-100 text-primary'
                      : 'bg-primary text-base-100')
                  }
                >
                  {folder.bookmarksCount}
                </div>
                {selected === folder.id ? (
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M5 19a2 2 0 01-2-2V7a2 2 0 012-2h4l2 2h4a2 2 0 012 2v1M5 19h14a2 2 0 002-2v-5a2 2 0 00-2-2H9a2 2 0 00-2 2v5a2 2 0 01-2 2z"
                    ></path>
                  </svg>
                ) : (
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"
                    ></path>
                  </svg>
                )}
                {folder.id}
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
