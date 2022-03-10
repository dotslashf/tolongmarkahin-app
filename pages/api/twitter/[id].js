import { fetchUser } from '../../../services/twitter';

export default async function handler({ query: { id } }, res) {
  try {
    const userId = id;
    const userRes = await fetchUser(userId);
    return res.status(200).json(userRes.data);
  } catch (err) {
    return res.status(404).json({ error: err.message });
  }
}
