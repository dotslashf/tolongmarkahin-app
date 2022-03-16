import db from '../../../services/firebase';
import { getToken } from 'next-auth/jwt';

const secret = process.env.NEXT_AUTH_SECRET;

export default async function handler(req, res) {
  const token = await getToken({ req, secret });

  if (!token) {
    return res.status(401).json({ message: 'No token' });
  }

  const { folder } = req.query;

  try {
    const bookmarksRef = await db
      .collection('bookmarks')
      .doc(token.id)
      .collection(folder)
      .get();

    const bookmarks = [];
    bookmarksRef.forEach(bookmark => {
      bookmarks.push({
        id: bookmark.id,
        ...bookmark.data(),
        createdAt: bookmark.data().createdAt.toDate(),
      });
    });

    return res.status(200).json({
      data: bookmarks
        .filter(b => {
          return b.tweet.text !== 'dummy text';
        })
        .sort((a, b) => {
          return b.createdAt - a.createdAt;
        }),
    });
  } catch (err) {
    return res.status(404).json({ error: err.message });
  }
}
