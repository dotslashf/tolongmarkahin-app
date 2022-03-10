import db from '../../../../services/firebase';

export default async function handler({ query: { id } }, res) {
  try {
    const bookmarks = await db
      .collection('bookmarks')
      .doc(id)
      .listCollections();
    return res.status(200).json(
      bookmarks.map(bookmark => {
        return { folderName: bookmark.id };
      })
    );
  } catch (err) {
    return res.status(404).json({ error: err.message });
  }
}
