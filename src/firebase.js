
import { initializeApp } from "firebase/app";
import { createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { addDoc, collection, getFirestore } from "firebase/firestore";
import { toast } from "react-toastify";


const firebaseConfig = {
  apiKey: "AIzaSyD9sCzS1op_HSzLuedwqOaYjTRzIL7J4CY",
  authDomain: "netflix-clone-20c5c.firebaseapp.com",
  projectId: "netflix-clone-20c5c",
  storageBucket: "netflix-clone-20c5c.appspot.com",
  messagingSenderId: "312390770212",
  appId: "1:312390770212:web:c4d7d3e8f246445b6442b1"
};


const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app); 


const signup = async (name, email, password)=>{
    try{
        const res = await createUserWithEmailAndPassword(auth, email, password);
        const user = res.user;
        await addDoc(collection(db, "user"), {
            uid: user.uid,
            name,
            authProvider: "local",
            email,
        });
    } catch(error) {
        console.log(error);
        toast.error(error.code.split('/')[1].split('-').join(" "));
    }
}


const login = async(email, password) =>{
    try{
         await signInWithEmailAndPassword(auth, email, password);
    } catch(error) {
        console.log(error);
        toast.error(error.code.split('/')[1].split('-').join(" "));
        }
    }


const logout = ()=>{
    signOut(auth);
}


export {auth, db,  login, signup, logout};