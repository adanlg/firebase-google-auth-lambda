// firebaseAdmin.ts
import admin from 'firebase-admin';

// Load your service account key
const serviceAccount = require('./path/to/your/serviceAccountKey.json');

// Initialize Firebase Admin SDK
if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
  });
}

export default admin;
