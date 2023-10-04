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
    showArticleAddForm:boolean;  
    articleSelected : any; 
}

const Articles: React.FC<ArticlesProps> = ({
    showArticles,
    onAddOrViewArticle,
    showArticleAddForm,
    articleSelected
}) => {
  const [items, setItems] = useState([]);
  const [isItemAdded, setIsItemAdded] = useState(0);
  const [isItemDeleted, setIsItemDeleted] = useState(false);
  // const [articleSelected, setArticleSelected] = useState({ id : "", title: "", body: "", urlImg:"" });

 function onSubmitSucceed() {
    setIsItemAdded(isItemAdded+1);
    // setShowArticleAddForm(false);
 }

 function showAddForm(e:any){
  e.preventDefault();
  onAddOrViewArticle();
  // setShowArticleAddForm(true);
 }

 function showViewForm(item:any){
  onAddOrViewArticle();
  // setShowArticleAddForm(false);
  // setArticleSelected({ ...articleSelected,id:item.id, title:item.title, body:item.body })
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
      {/* <button><a
              onClick={showAddForm}
              className="mx-3 min-h-screen mt-8 bg-black hover:bg-white hover:text-black border border-black text-white font-bold py-3 px-12 lg:px-8 duration-200 transition-colors mb-6 lg:mb-0"
            >
              ADD ARTICLE
      </a></button> */}
    </section>
    {/* { (!showArticleAddForm && articleSelected.id === "" || showArticles ) && (
          <ul className="bg-slate-700 p-4 rounded-lg justify-start flex-auto ml-10 mr-10">
            {items.map((item, id) => (
              <li
                key={id}
                className="my-4w-full flex justify-between border:border-slate-900 bottom-4 hover:bg-orange-300  border-b-slate-900 bg-slate-300"
              >
                
                <div className="p-4 w-full flex justify-start border-t-black"
                    onClick={() =>{showViewForm(item)}}
                >
                  <img src={item.urlImg} width={30} height={30} className="object-cover btn- h-7 w-7 rounded-full mr-2 bg-gray-300"/>
                  <span className="capitalize">{item.title}</span>
               </div>
               
                <button 
                  onClick={() =>(delteItem(item.id))}
                  className="ml-8 p-4 border-l-2 border-slate-900 hover:bg-slate-900 w-16 ">
                  X
                </button>
              </li>
            ))}
          </ul>
       )} */}
     { (showArticleAddForm && !showArticles) && (
        <ArticleAdd onSubmitSucceed={onSubmitSucceed}/>
     )}

    { (articleSelected.id!=="" && !showArticleAddForm && !showArticles) && (
        <ArticleView Article={articleSelected} onSubmitSucceed={onSubmitSucceed}/>
     )}
        
    </>
  );
};

export default Articles;
