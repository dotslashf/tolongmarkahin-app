import db from '../../../services/firebase';
import bcryptjs from 'bcryptjs';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).send({ message: 'Only POST requests allowed' });
  }
  try {
    const { username, password } = req.body;
    const configRef = db.collection('config');
    const queryRef = await configRef.where('username', '==', username).get();
    if (queryRef.empty) {
      return res.status(404).send({ message: 'No matching documents.' });
    }
    const isValidPassword = bcryptjs.compareSync(
      password,
      queryRef.docs[0].data().password
    );
    if (!isValidPassword) {
      return res.status(401).send({ message: 'Invalid password.' });
    }
    const user = {
      id: queryRef.docs[0].id,
      username: queryRef.docs[0].data().username,
      defaultFolder: queryRef.docs[0].data().defaultFolder,
    };
    return res.status(200).json(user);
  } catch (err) {
    return res.status(404).json({ error: err.message });
  }
}
