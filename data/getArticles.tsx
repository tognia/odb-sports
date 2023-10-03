import {
    collection,
    query,
    onSnapshot 
  } from "firebase/firestore";
import { db } from "../database/firebase";
const q = query(collection(db, "articles"));
let Aricles = [];
const getArticles = onSnapshot(q, (querySnapshot) => {    
    
    querySnapshot.forEach((doc) => {
      Aricles.push({ ...doc.data(), id: doc.id });
    });
    console.log("Aricles2023",Aricles);

    return getArticles();
  });
export const allArticles = Aricles;


 export default getArticles;