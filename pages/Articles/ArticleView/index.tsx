import React, {  useEffect, useState } from "react";
import { Form, Image } from 'antd';
import { ref, getDownloadURL, uploadBytesResumable } from "firebase/storage";
import { db, storage } from "../../../database/firebase";
import { doc, updateDoc } from "firebase/firestore";
import moment from "moment-timezone";
import ArticleForm from "../ArticleForm";

  type ArticleViewType = {
    id:string;
    title : string;
    body : string;
    coverImage : string;
    components:any[];
  };


  interface ArticleViewProps {
    Article: ArticleViewType;
    onSubmitSucceed: () => void;
  }

  const styles = {
    container: { margin: "16px" },
    form: { marginTop: 40 }
  }

const ArticleView: React.FC<ArticleViewProps> = ({
  Article,
  onSubmitSucceed
}) => {
  const [form] = Form.useForm();
  const [itemToUpdate, setItemToUpdtate] = useState({ title: Article.title, body: Article.body, coverImage:Article.coverImage });
  const [title, setTitle] = useState(Article.title);
  const [body, setBody] = useState(Article.body);
  const [components, setComponents] = useState(Article.components);
  const [componentsArray, setComponentsArray] = useState(Article.components);
  const [newItem, setNewItem] = useState({ title: "", body: "", urlImg:"" });
  const [ima, setIma] = useState<File>();
  const [update, setUpdate] = useState(false);
  const [imgUrl, setImgUrl] = useState(Article.coverImage);
  const timezoneFixture = "Africa/Douala";
  const [nbrParagraph, setNbrParagraph] = useState(1);

  console.log('components',Article);

  let url: any;
  const imageChange = (e:any) => {
    e.preventDefault();
    if (e.target.files && e.target.files.length > 0) {
           setIma(e.target.files[0]);
    }
  };
  const handleUpdate = (value:string, index:number) => {
    let cpy = [...components];
    cpy[index].text = value;
    setComponents(cpy);
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
    console.log("Date Now 2025",z5);

      return z5;
  }
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

  const updateItem = async (e:any) => {
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
            setUpdate(true);
         })
        }
      )
      ;
      } else
      {
        setUpdate(true);
      }
  
  }
  useEffect(() => {

    const updateArticle = async () => {

      const updateRef = doc(db, "articles", `${Article.id}`);
        if(update) {
          await updateDoc(updateRef, {
            updatedAt: getDate(),
            coverImage: imgUrl,
            title:  title,
            components: componentsArray,
          });
        setUpdate(false);
        }     
 
     onSubmitSucceed();
    }
    if(itemToUpdate.title!=="" && imgUrl!=="")
    updateArticle();    
  }, [imgUrl, update])

  useEffect(() => {
      setTitle(Article.title);
      setBody(Article.body);
      setImgUrl(Article.coverImage);
      setComponents(Article.components);
      setComponentsArray(Article.components);
  }, [Article]);
  
  useEffect(() => {

  },[componentsArray] )

  return (
    
    <ArticleForm
      edit = {false} 
      newItem={newItem} 
      setNewItem={setNewItem} 
      componentsArray={componentsArray}
      onSubmitSucceed={onSubmitSucceed} 
      imageChange={imageChange} 
      handleUpdate={handleUpdate} 
      AddParagraph={AddParagraph} 
      addItem={updateItem}
       />
  );
};

export default ArticleView;
