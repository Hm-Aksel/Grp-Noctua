import { initializeApp, getApp, getApps } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getAuth } from "firebase/auth";

// const firebaseConfig = {
//   apiKey: process.env.REACT_APP_API_KEY,
//   authDomain: process.env.REACT_APP_AUTH_DOMAIN,
//   dataBaseURL:process.env.REACT_APP_DATABASE_URL,
//   projectId: process.env.REACT_APP_PROJECT_ID,
//   storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
//   messagingSenderId: process.env.REACT_APP_ESSAGINIG_SENDER_ID,
//   appId: process.env.REACT_APP_ID,
//   measurementId: process.env.REACT_APP_G_RTDQWWJNDM
// };

const firebaseConfig = {
  apiKey: "AIzaSyC8od4w9APmhEPCzvqstVfSrZmRG2jAgjA",

  authDomain: "web-noctua-a986c.firebaseapp.com",

  projectId: "web-noctua-a986c",

  storageBucket: "web-noctua-a986c.appspot.com",

  messagingSenderId: "131924490038",

  appId: "1:131924490038:web:b4250531dd120b36bea597",

  measurementId: "G-QLKJY28NYJ",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const storage = getStorage(app);
const auth = getAuth(app);

export { db, storage, auth };
