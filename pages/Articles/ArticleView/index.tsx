import React, { useState } from "react";

import {
    collection,
    addDoc
  } from "firebase/firestore";
  import { db } from "../../../database/firebase";

interface ArticleViewProps {
    onSubmitSucceed: (e: any) => void;
}

const ArticleView: React.FC<ArticleViewProps> = ({
    onSubmitSucceed
}) => {

  const [newItem, setNewItem] = useState({ title: "", body: "" });

  const addItem = async (e) => {
    e.preventDefault();
    if (newItem.title !== "" && newItem.body !== "") {
      // setItems([...items, newItem]);
      await addDoc(collection(db, "articles"), {
        title: newItem.title,
        body: newItem.body,
      });
    }
    setNewItem({ title: "", body: "" });
    onSubmitSucceed(e);
  };



  return (
    
    <form className="grid grid-cols-10 items-center text-black">
    <input
      value={newItem.title}
      onChange={(e) => setNewItem({ ...newItem, title: e.target.value })}
      className="col-span-3 p-3 border"
      type="text"
      placeholder="Enter Title"
    />
   
    <textarea
     value={newItem.body}
      onChange={(e) =>
        setNewItem({ ...newItem, body: e.target.value })
      }
     rows={4}
     className=" col-span-5 p-3 border mx-3"
     placeholder="Write the Content here ..."
    ></textarea>
    <button
      onClick={addItem}
      className="text-white bg-slate-900 hover:bg-slate-900 p-3 text-xl"
      type="submit"
    >
      Save
    </button>
  </form>
  );
};

export default ArticleView;
