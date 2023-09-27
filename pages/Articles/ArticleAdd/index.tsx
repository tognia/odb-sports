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
    onSubmitSucceed: (e: any) => void;
}

const ArticleAdd: React.FC<ArticleAddProps> = ({
    onSubmitSucceed
}) => {

  const [newItem, setNewItem] = useState({ title: "", body: "", urlImg:"" });
  const [img, setImg] = useState<any>('');
  const [ima, setIma] = useState<File>();
  const [imgUrl, setImgUrl] = useState("");

    const imageChange = (e:any) => {
    e.preventDefault();
    if (e.target.files && e.target.files.length > 0) {
           console.log("Change00001", "change00001");
           setIma(e.target.files[0]);
    }
  };

  const addItem = async (e:any) => {
    e.preventDefault();
      // const imgRef = ref(storage, `files/${v4()}`);
      // uploadBytes(imgRef, img);
      console.log("BLAALALA", ima.name);
      const file = ima;
      if (file) {
        console.log("ChangeAAAAAAA", "changeAAAAAAA");
        const storageRef = ref(storage, `files/${file.name}`);
        const uploadTask = uploadBytesResumable(storageRef, file);  
        uploadTask.on("state_changed",
        (snapshot) => {
          
        },
        (error) => {
          alert(error);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            console.log("downloadURL",downloadURL);
            setImgUrl(downloadURL);
            if (newItem.title !== "" && newItem.body !== "") {
                addDoc(collection(db, "articles"), {
                title: newItem.title,
                body: newItem.body,
                urlImg: downloadURL,
              });
            }
            setNewItem({ title: "", body: "", urlImg:""}); 
            onSubmitSucceed(e);
         });
        }
      );
      }

  }

  const addItem1 = async (e:any) => {
    e.preventDefault();
    if (newItem.title !== "" && newItem.body !== "") {
      await addDoc(collection(db, "articles"), {
        title: newItem.title,
        body: newItem.body,
        // urlImg: newItem.urlImg,
      });
    }
    // setNewItem({ title: "", body: ""});
    onSubmitSucceed(e);
  };

  useEffect(() => {
    console.log("imgUrl", imgUrl);

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
