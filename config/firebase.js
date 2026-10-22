
const admin = require("firebase-admin");

const serviceAccount = JSON.parse(
    process.env.FIREBASE_SERVICE_ACCOUNT
);

if (!admin.apps.length) {
    admin.initializeApp({
        credential: admin.credential.cert(serviceAccount),
        databaseURL: "https://nodejs-19b15-default-rtdb.firebaseio.com/"
    });
}

const db = admin.database();

module.exports = db;