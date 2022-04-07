import {initializeApp} from "firebase/app";
import {getFirestore} from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyAr47HkUx9SJAHWKP-Zl0O0SVXbFzHFuPc",
    authDomain: "todo-14d41.firebaseapp.com",
    projectId: "todo-14d41",
    storageBucket: "todo-14d41.appspot.com",
    messagingSenderId: "295073190890",
    appId: "1:295073190890:web:43403460abc423c2819893"
};

const firebase = initializeApp(firebaseConfig);

export const db = getFirestore(firebase);

export default firebase;
