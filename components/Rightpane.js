import useSWR from 'swr';
import fetcher from '../utils/fetcher';
import Folders from './Folders';
import { useState } from 'react';
import Tweets from './Bookmarks';

function RightpaneLoading() {
  return (
    <div className="flex flex-col animate-pulse">
      <div className="flex">
        <ul className="menu menu-horizontal space-x-2 p-2 bg-base-100 rounded-box">
          <li>
            <a className="h-12 w-36 bg-gray-400 cursor-default"></a>
          </li>
          <li>
            <a className="h-12 w-36 bg-gray-400 cursor-default"></a>
          </li>
          <li>
            <a className="h-12 w-36 bg-gray-400 cursor-default"></a>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default function Rightpane({ defaultFolder }) {
  const [selectedFolder, setSelectedFolder] = useState(defaultFolder);

  const { data, error } = useSWR(`/api/firebase/folders`, fetcher);

  const handlerOnClickFolder = folderName => {
    return () => {
      setSelectedFolder(folderName);
    };
  };

  const sortedFolders = data?.data
    .map(folder => {
      return {
        ...folder,
        isDefaultFolder: folder.id === defaultFolder,
      };
    })
    .sort(value => {
      return value.isDefaultFolder ? -1 : 1;
    })
    .sort((a, b) => {
      if (a.isDefaultFolder) {
        return -1;
      } else if (b.isDefaultFolder) {
        return 1;
      }
      return b.bookmarksCount - a.bookmarksCount;
    });

  return (
    <div className="flex flex-col relative">
      {!data && <RightpaneLoading />}
      {data?.data.length > 0 && (
        <>
          <Folders
            folders={sortedFolders}
            onClickFolder={handlerOnClickFolder}
            selected={selectedFolder}
          />

          <Tweets folder={selectedFolder} />
        </>
      )}
    </div>
  );
}
