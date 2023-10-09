import React, { useState, useEffect } from "react";

import {
    collection,
    addDoc
  } from "firebase/firestore";
  import { ref, getDownloadURL, uploadBytesResumable } from "firebase/storage";
  import { db } from "../../../database/firebase";
  import { storage } from "../../../database/firebase";


interface ArticleAddProps {
    author:string;
    onSubmitSucceed: () => void;
}

const ArticleAdd: React.FC<ArticleAddProps> = ({
    onSubmitSucceed,
    author
}) => {

  const [newItem, setNewItem] = useState({ title: "", body: "", urlImg:"" });
  const [ima, setIma] = useState<File>();
  const [imgUrl, setImgUrl] = useState("");
  const [componentsArray, setComponentsArray] = useState([
    {num : 1,
    type: 'Paragraph',
    text: ""
  }
  ]);
  const [nbrParagraph, setNbrParagraph] = useState(1);
  let url = "";

    const imageChange = (e:any) => {
    e.preventDefault();
    if (e.target.files && e.target.files.length > 0) {
           setIma(e.target.files[0]);
    }
  };
  const AddParagraph = (e:any) => {
      e.preventDefault();
      setNbrParagraph(nbrParagraph+1);
      setComponentsArray([...componentsArray,
        {
          num:nbrParagraph+1,
          type:"Paragraph",
          text:""
        } ]);
  }

  const handleUpdate = (value, index) => {
    const cpy = [...componentsArray];
    cpy[index].text = value;
    setNewItem({ ...newItem, body: value })
  }
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
            setImgUrl(downloadURL);
            url = downloadURL;
         })
        }
      );
      }
  
  }

  useEffect(() => {

    const addArticle = async () => {
      await addDoc(collection(db, "articles"),
      {
        author: author,
        createdAt: "",
        updatedAt: "",
        coverImage: imgUrl,
        title:  newItem.title,
        components: componentsArray,
        urlImg: imgUrl
    }
      );
     setNewItem({ title: "", body: "", urlImg:""});
     onSubmitSucceed();
    }
    if(newItem.title!=="" && newItem.body!=="" && imgUrl!=="")
    addArticle();    
  }, [imgUrl])

  useEffect(() => {
    AddParagraph;
    console.log("componentsArray",componentsArray);
  }, [nbrParagraph]);

  return (
    
    <form className="grid-cols-10 flex-col xs:block lg:w-full flex ml-10 mr-1 text-black">
    <div className="flex-col w-full flex mt-10 ml-10 mr-2 mb-8">
    <input title="Upload Logo" type="file" onChange={imageChange} />
    </div>
   
    <div className="flex-col max-w-full mb-8 flex ml-10 mr-2">
    <input
      value={newItem.title}
      onChange={(e) => setNewItem({ ...newItem, title: e.target.value })}
      className="col-span-3 p-3 border"
      type="text"
      placeholder="Enter Title"
    />
    </div>
    
    {componentsArray.map((item:any, index) =>  (    
    <div className="flex-col md lg:w-800 flex mt-3 mb-8 ml-10 mr-2">
    <h1>{item.type+" "+item.num}</h1>
    <textarea
     key={item.num}
     value={componentsArray[index].text}
      onChange={(e) =>
        handleUpdate(e.target.value, index)
      }
     rows={4}
     className="col-span-2  p-3 border"
     placeholder="Write the Content here ..."
    ></textarea>
    </div>
    
    ))}   
    
    
    <div className="flex-col max-w-full mb-8 mt-10 mb-3 flex ml-10 mr-2">
    <button>
              <a
                onClick={(e:any)=>AddParagraph(e)}
                className="mx-3 min-h-screen mt-8 bg-indigo-400 hover:bg-white hover:text-black border border-black text-blue-950 font-bold py-3 px-12 lg:px-8 duration-200 transition-colors mb-6 lg:mb-0"
              >
                ADD PARAGRAH
              </a>
            </button>
    </div>
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
