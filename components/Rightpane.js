import useSWR from 'swr';
import fetcher from '../utils/fetcher';
import Folders from './Folders';
import { useState } from 'react';
import Tweets from './Tweets';

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

  if (!data) return <div>Loading...</div>;

  return (
    <div className="flex flex-col">
      <Folders
        folders={folders}
        onClickFolder={handlerOnClickFolder}
        selected={selectedFolder}
      />
      <Tweets tweets={tweets} />
    </div>
  );
}
