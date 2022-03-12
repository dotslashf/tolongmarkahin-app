import useSWR from 'swr';
import fetcher from '../utils/fetcher';
import Folders from './Folders';
import { useState } from 'react';
import Tweets from './Tweets';

function RightPaneEmpty() {
  return (
    <div className="flex flex-col h-96 space-y-2">
      <div className="card bg-base-100">
        <div className="card-body p-4">
          <p className="card-title h-8 rounded-md">Belum ada data</p>
        </div>
      </div>
    </div>
  );
}

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
    </div>
  );
}

export default function Rightpane({ defaultFolder }) {
  const [selectedFolder, setSelectedFolder] = useState(defaultFolder);

  const { data, error } = useSWR(`/api/firebase/folders`, fetcher);

  const folders = data?.data.map(data => {
    return data.folderName;
  });

  const hashBookmarks = {};
  data?.data.map(data => {
    hashBookmarks[data.folderName] = data.bookmarks;
  });

  let tweets = hashBookmarks[selectedFolder];

  const handlerOnClickFolder = folderName => {
    return () => {
      setSelectedFolder(folderName);
    };
  };

  return (
    <div className="flex flex-col relative">
      {data?.data.length === 0 && <RightPaneEmpty />}
      {!data && <RightpaneLoading />}
      {data?.data.length > 0 && (
        <>
          <Folders
            folders={folders}
            onClickFolder={handlerOnClickFolder}
            selected={selectedFolder}
          />

          <Tweets tweets={tweets} />
        </>
      )}
    </div>
  );
}
