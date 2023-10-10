import React, {  useEffect, useState } from "react";
import { Form, Image } from 'antd';
import { ref, getDownloadURL, uploadBytesResumable } from "firebase/storage";
import { db, storage } from "../../../database/firebase";
import { doc, updateDoc } from "firebase/firestore";

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
  const [ima, setIma] = useState<File>();
  const [update, setUpdate] = useState(false);
  const [imgUrl, setImgUrl] = useState(Article.coverImage);
  const [logoFile, setLogoFile] = useState<any>();

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
            updatedAt: "",
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
    
    <form className="grid-cols-10 flex-col xs:block lg:w-full flex ml-10 mr-1 text-black">
      <div className="flex-col w-full flex mt-10 ml-10 mr-1 mb-8">
     <Image
          width={200}
          src={imgUrl}
        />   
    <input title="Upload Logo" type="file" onChange={imageChange} />
      </div>
        <div className="flex-col max-w-full mb-8 flex ml-10 mr-1">
        <input
          value={title}
          className="col-span-3 p-3 border"
          type="text"
          placeholder="Enter Title"
          onChange={(e) => setTitle(e.target.value)}
        />
        </div>
      {components.map((item:any, index) =>(
          <div className="flex-col md lg:w-800 mt-3 flex mb-8 ml-10 mr-1">
          <h1>{item.type+" "+item.num}</h1>
          <textarea
            key={item.num}
            value={components[index].text}
            onChange={(e) =>
              handleUpdate(e.target.value, index)
            }
           rows={4}
           className=" col-span-5 p-3 border mx-3"
          ></textarea>
           </div>
      ))

      }
      
     <button
      onClick={updateItem}
      className="text-white bg-slate-900 hover:bg-slate-900 p-3 text-xl"
      type="submit"
    >
      Save
    </button> 
  </form>
  );
};

export default ArticleView;
