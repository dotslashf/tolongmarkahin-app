import admin from 'firebase-admin';
import serviceAccountKey from '../serviceAccountKey.json';

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccountKey),
  });
}

export default admin.firestore();
