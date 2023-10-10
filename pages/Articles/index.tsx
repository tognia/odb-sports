import React, { useEffect, useState } from "react";
import {
    collection,
    query,
    onSnapshot,
    deleteDoc,
    doc
  } from "firebase/firestore";
import { db } from "../../database/firebase";
import ArticleAdd from "./ArticleAdd";
import ArticleView from "./ArticleView";
import allArticles from "../../data/getArticles";


interface ArticlesProps {
    showArticles: boolean;
    onAddOrViewArticle: () => void;
    onSubmitSucceed:() => void;
    showArticleAddForm:boolean;  
    articleSelected : any; 
    author:string;
}

const Articles: React.FC<ArticlesProps> = ({
    showArticles,
    onAddOrViewArticle,
    showArticleAddForm,
    onSubmitSucceed,
    articleSelected,
    author
}) => {
  const [items, setItems] = useState([]);
  const [isItemAdded, setIsItemAdded] = useState(0);
  const [isItemDeleted, setIsItemDeleted] = useState(false);
 
 function showAddForm(e:any){
  e.preventDefault();
  onAddOrViewArticle();
 }

 function showViewForm(item:any){
  onAddOrViewArticle();
 }

 // Read Items from database
 useEffect(() => {
    const q = query(collection(db, "articles"));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      let itemArr = [];
      querySnapshot.forEach((doc) => {
        itemArr.push({ ...doc.data(), id: doc.id });
      });
      setItems(itemArr);

      return unsubscribe();
    });
  }, [isItemAdded, isItemDeleted ]);

   // Delete Item from database

   const delteItem = async(id) => {
    await deleteDoc(doc(db,'articles', id));
    setIsItemDeleted(!isItemDeleted);
}
  return (
    <>
    <section className="flex-col md:flex-row flex align-middle items-center md:justify-between mt-16 mb-16 md:mb-12 ml-10 mr-10">
      <h4 className="text-3xl md:text-4xl font-bold tracking-tighter leading-tight md:pr-8 invisible md:visible">
      { (!showArticleAddForm && articleSelected.id === "" || showArticles ) && (
      <p>Select  Article  on your left</p>
      )}
      </h4>
 
    </section>
   
     { (showArticleAddForm && !showArticles) && (
        <ArticleAdd onSubmitSucceed={onSubmitSucceed} author={author}/>
     )}

    { (articleSelected.id!=="" && !showArticleAddForm && !showArticles) && (
        <ArticleView Article={articleSelected} onSubmitSucceed={onSubmitSucceed}/>
     )}
        
    </>
  );
};

export default Articles;
