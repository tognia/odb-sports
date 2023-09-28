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


interface ArticlesProps {
    listArticles: any[];

}

const Articles: React.FC<ArticlesProps> = ({
    listArticles
}) => {
  const [items, setItems] = useState([]);
  const [showArticleAddForm, setShowArticleAddForm] = useState(false);
  const [isItemAdded, setIsItemAdded] = useState(0);
  const [isItemDeleted, setIsItemDeleted] = useState(false);
  const [articleSelected, setArticleSelected] = useState({ id : "", title: "", body: "", urlImg:"" });

 function onSubmitSucceed() {
    // e.preventDefault();
    setIsItemAdded(isItemAdded+1);
    setShowArticleAddForm(false);
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
    <section className="flex-col md:flex-row flex items-center md:justify-between mt-16 mb-16 md:mb-12">
      <h4 className="text-3xl md:text-4xl font-bold tracking-tighter leading-tight md:pr-8">
        Articles
      </h4>
      <a
              onClick={() => setShowArticleAddForm(true)}
              className="mx-3 bg-black hover:bg-white hover:text-black border border-black text-white font-bold py-3 px-12 lg:px-8 duration-200 transition-colors mb-6 lg:mb-0"
            >
              ADD ARTICLE
      </a>
    </section>
          <ul className="bg-slate-700 p-4 rounded-lg">
            {items.map((item, id) => (
              <li
                key={id}
                className="my-4w-full flex justify-between border:border-slate-900 bottom-4 hover:bg-orange-300  border-b-slate-900 bg-slate-300"
              >
                <div className="p-4 w-full flex justify-between border-t-black"
                    onClick={(e) => setArticleSelected({ ...articleSelected,id:item.id, title:item.title, body:item.body })}
                >
                  <span className="capitalize">{item.title}</span>
               </div>
               <img src={item.urlImg} width={30} height={30} />
                <button 
                  onClick={() =>(delteItem(item.id))}
                  className="ml-8 p-4 border-l-2 border-slate-900 hover:bg-slate-900 w-16 ">
                  X
                </button>
              </li>
            ))}
          </ul>
     { showArticleAddForm && (
        <ArticleAdd onSubmitSucceed={onSubmitSucceed}/>
     )}

    { articleSelected.id!=="" && (
        <ArticleView Article={articleSelected}/>
     )}
        
    </>
  );
};

export default Articles;
