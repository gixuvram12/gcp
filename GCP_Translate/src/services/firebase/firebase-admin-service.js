const admin = require('firebase-admin');

//service key account key is encrypted
const firebaseServiceKey = process.env.FIREBASE_SERVICE_ACCOUNT_KEY;

const DecryptAdminKey = Buffer.from(firebaseServiceKey, 'base64').toString('ascii');
const decryptedJsonKey = JSON.parse(DecryptAdminKey);

const firebaseAdminService = admin.initializeApp({
    credential: admin.credential.cert(decryptedJsonKey)
});

module.exports = firebaseAdminService;