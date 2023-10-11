import React, { useState, useEffect } from "react";
import moment from "moment-timezone";

import {
    collection,
    addDoc
  } from "firebase/firestore";
  import { ref, getDownloadURL, uploadBytesResumable } from "firebase/storage";
  import { db } from "../../../database/firebase";
  import { storage } from "../../../database/firebase";
import ArticleForm from "../ArticleForm";


interface ArticleAddProps {
    author:string;
    onSubmitSucceed: () => void;
}

const ArticleAdd: React.FC<ArticleAddProps> = ({
    onSubmitSucceed,
    author
}) => {

  const [title, setTitle] = useState( "");
  const [ima, setIma] = useState<File>();
  const [imgUrl, setImgUrl] = useState("");
  const [componentsArray, setComponentsArray] = useState([
    {num : 1,
    type: 'Paragraph',
    text: ""
  }
  ]);
  const [nbrParagraph, setNbrParagraph] = useState(1);
  const timezoneFixture = "Africa/Douala";
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

  const getDate = () => {
    let myDate = new Date();
    const tz1 = moment.tz(myDate, timezoneFixture);
    const m = moment.utc(myDate).tz(timezoneFixture);  
    const offsetInMinutes = m.utcOffset();
    const z4 = tz1.utc().format().toString().replace("T", " ").replace("Z", "");
    const offset_hrs: any = (
      "0" + Number(Math.abs(offsetInMinutes / 60))
    ).slice(-2);
    const offset_min: any = ("0" + Math.abs(offsetInMinutes % 60)).slice(-2);
    const z5 = z4 + "+" + offset_hrs + "" + offset_min;
    return z5;
  }

  const handleUpdate = (value:string, index:number) => {
    const cpy = [...componentsArray];
    cpy[index].text = value;
    setComponentsArray(cpy);
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
        createdAt: getDate(),
        updatedAt: "",
        coverImage: imgUrl,
        title:  title,
        components: componentsArray,
    }
      );
     setTitle("");
     onSubmitSucceed();
    }
    if(title!=="" && imgUrl!=="")
    addArticle();    
  }, [imgUrl])

  useEffect(() => {
    AddParagraph;
    console.log("componentsArray",componentsArray);
  }, [nbrParagraph]);

  return (
    
    <ArticleForm
      edit = {false} 
      title={title} 
      setTitle={setTitle} 
      componentsArray={componentsArray}
      imgUrl = {imgUrl}
      imageChange={imageChange} 
      handleUpdate={handleUpdate} 
      AddParagraph={AddParagraph} 
      addItem={addItem}
       />
  );
};

export default ArticleAdd;
