import admin from "firebase-admin";
import serviceAccount from "./fameo-d8a3e-firebase-adminsdk-28b4p-9ae12d4ae0.json" assert { type: "json" };

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const db = admin.firestore();

export default db;
