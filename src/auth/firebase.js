import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { toast } from "react-toastify";

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTHDOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_PROJECTID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGEBUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MSGSENDERID,
  appId: process.env.REACT_APP_FIREBASE_APPID,
};

export const signUpWithGoogle = (navigate, msg) => {
  const provider = new GoogleAuthProvider();

  signInWithPopup(auth, provider)
    .then((result) => {
      navigate("/");
      toast.success(`${msg} in successfully!`);
    })
    .catch((error) => {
      console.log(error);
    });
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
