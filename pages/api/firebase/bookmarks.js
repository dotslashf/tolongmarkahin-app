import db from '../../../services/firebase';
import { getToken } from 'next-auth/jwt';

const secret = process.env.NEXT_AUTH_SECRET;

export default async function handler(req, res) {
  const token = await getToken({ req, secret });

  if (!token) {
    return res.status(401).json({ message: 'No token' });
  }
  try {
    const foldersRef = await db
      .collection('bookmarks')
      .doc(token.id)
      .listCollections();

    const folders = await Promise.all(
      foldersRef.map(async folder => {
        const bookmarksCount = await folder
          .where('tweet.full_text', '!=', '')
          .get();

        return bookmarksCount.size;
      })
    );

    return res.status(200).json({
      totalCounts: folders.reduce((acc, curr) => acc + curr, 0),
    });
  } catch (err) {
    return res.status(404).json({ error: err.message });
  }
}
