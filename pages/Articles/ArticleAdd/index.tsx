import React, { useState, useEffect } from "react";

import {
    collection,
    addDoc
  } from "firebase/firestore";
  import { ref, getDownloadURL, uploadBytesResumable } from "firebase/storage";
  import { db } from "../../../database/firebase";
  import { storage } from "../../../database/firebase";
  import { getStorage, uploadBytes } from "firebase/storage";
  import { v4 } from "uuid";

interface ArticleAddProps {
    onSubmitSucceed: () => void;
}

const ArticleAdd: React.FC<ArticleAddProps> = ({
    onSubmitSucceed
}) => {

  const [newItem, setNewItem] = useState({ title: "", body: "", urlImg:"" });
  const [ima, setIma] = useState<File>();
  const [imgUrl, setImgUrl] = useState("");
  let url = "";

    const imageChange = (e:any) => {
    e.preventDefault();
    if (e.target.files && e.target.files.length > 0) {
           setIma(e.target.files[0]);
    }
  };

  const addItem = async (e:any) => {
    e.preventDefault();
      const file = ima;
      if (file) {
        const storageRef = ref(storage, `files/${file.name}`);
        const uploadTask = uploadBytesResumable(storageRef, file);  
        uploadTask.on("state_changed",
        (_snapshot) => {
          
        },
        (error) => {
          alert(error);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            console.log("downloadURL",downloadURL);
            setImgUrl(downloadURL);
            url = downloadURL;
         })
        }
      );
      }
    //  await addDoc(collection(db, "articles"), {
    //     title: newItem.title,
    //     body: newItem.body,
    //     urlImg: url,
    //   });
    //  setNewItem({ title: "", body: "", urlImg:""});
    //  onSubmitSucceed(e);

  }

  useEffect(() => {

    const addArticle = async () => {
      await addDoc(collection(db, "articles"), {
        title: newItem.title,
        body: newItem.body,
        urlImg: imgUrl,
      });
     setNewItem({ title: "", body: "", urlImg:""});
     onSubmitSucceed();
    }
    if(newItem.title!=="" && newItem.body!=="" && imgUrl!=="")
    addArticle();    
  }, [imgUrl])

  return (
    
    <form className="grid grid-cols-10 items-center text-black">
    <input type="file" onChange={imageChange} />
    {/* <button onClick={handleUpload}>Upload</button> */}
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

export default ArticleAdd;
