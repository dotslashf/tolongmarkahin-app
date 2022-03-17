import db from '../../../services/firebase';
import { getToken } from 'next-auth/jwt';

const secret = process.env.NEXT_AUTH_SECRET;

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).send({ message: 'Only POST requests allowed' });
  }

  const token = await getToken({ req, secret });

  if (!token) {
    return res.status(401).json({ message: 'No token' });
  }

  if (req.method === 'POST') {
    const { folder, bookmarkId } = JSON.parse(req.body);

    try {
      await db
        .collection('bookmarks')
        .doc(token.id)
        .collection(folder)
        .doc(bookmarkId)
        .delete();

      return res
        .status(200)
        .json({ status: 'OK', message: 'Bookmark deleted' });
    } catch (err) {
      return res.status(400).json({ error: err.message });
    }
  }
}
