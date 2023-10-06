import React, { useEffect, useState } from "react";
import { Button, Form, Image } from 'antd';
import { ref, getDownloadURL, uploadBytesResumable } from "firebase/storage";
import { db, storage } from "../../../database/firebase";
import UploadImage from "../../../components/UploadImage";
import { doc, updateDoc } from "firebase/firestore";
import StorageUtils from "../../../utils/Storage.utils";

  type ArticleViewType = {
    id:string;
    title : string;
    body : string;
    urlImg : string;
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
  const [itemToUpdate, setItemToUpdtate] = useState({ title: Article.title, body: Article.body, urlImg:Article.urlImg });
  const [title, setTitle] = useState(Article.title);
  const [body, setBody] = useState(Article.body);
  const [ima, setIma] = useState<File>();
  const [update, setUpdate] = useState(false);
  const [imgUrl, setImgUrl] = useState(Article.urlImg);
  const [logoFile, setLogoFile] = useState<any>();

  let url: any;
  const imageChange = (e:any) => {
    e.preventDefault();
    if (e.target.files && e.target.files.length > 0) {
           setIma(e.target.files[0]);
    }
  };
  const updateItem = async (e:any) => {
    e.preventDefault();
      const file = ima;
      // url = await StorageUtils.getUrlImage(logoFile.name,logoFile, "upload");
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
            title: title,
            body: body,
            urlImg: imgUrl,
          });
        }     
 
     onSubmitSucceed();
    }
    if(itemToUpdate.title!=="" && itemToUpdate.body!=="" && imgUrl!=="")
    updateArticle();    
  }, [imgUrl, update])

  useEffect(() => {
      setTitle(Article.title);
      setBody(Article.body);
      setImgUrl(Article.urlImg);
  }, [Article]);

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
        <div className="flex-col md lg:w-800 flex mb-8 ml-10 mr-1">
    <textarea
     value={body}
      rows={4}
     className=" col-span-5 p-3 border mx-3"
     placeholder="Write the Content here ..."
     onChange={(e) => setBody(e.target.value)}
    ></textarea>
     </div>
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
