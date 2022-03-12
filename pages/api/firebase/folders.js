import db from '../../../services/firebase';
import { getToken } from 'next-auth/jwt';

const secret = process.env.NEXT_AUTH_SECRET;

export default async function handler(req, res) {
  const token = await getToken({ req, secret });

  if (!token) {
    return res.status(401).json({ message: 'No token' });
  }
  try {
    const folders = await db
      .collection('bookmarks')
      .doc(token.id)
      .listCollections();

    const bookmarks = await Promise.all(
      folders.map(async folder => {
        const bookmarks = await folder.listDocuments();
        const b = (
          await Promise.all(
            bookmarks.map(async bookmark => {
              return (await bookmark.get()).data();
            })
          )
        ).filter(b => {
          return b.tweet.text !== 'dummy text';
        });

        return {
          folderName: folder.id,
          bookmarks: b.sort((a, b) => {
            return b.createdAt.toDate() - a.createdAt.toDate();
          }),
        };
      })
    );

    return res.status(200).json({
      data: bookmarks,
    });
  } catch (err) {
    return res.status(404).json({ error: err.message });
  }
}
