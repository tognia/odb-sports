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
  const [ima, setIma] = useState<File>();
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
      if (logoFile) {
        url = await StorageUtils.getUrlImage(logoFile.name,logoFile, "upload")
        const storageRef = ref(storage, `files/${logoFile.name}`);
        const uploadTask = uploadBytesResumable(storageRef, logoFile);  
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
  }
  useEffect(() => {

    const updateArticle = async () => {
      // await  updateDoc(doc(db, "articles", Article.id), {
      //   title: itemToUpdate.title,
      //   body: itemToUpdate.body,
      //   urlImg: imgUrl,
      // });
      const washingtonRef = doc(db, "articles", `${Article.id}`);

      // await updateDoc(washingtonRef, {
      //   title: itemToUpdate.title,
      //   body: itemToUpdate.body,
      //   urlImg: imgUrl,
      // });
      console.log("Fly Zone", imgUrl,
      {
        id : Article.id,
        title: itemToUpdate.title,
        body: itemToUpdate.body,
        urlImg: imgUrl,
      }
      )
     onSubmitSucceed();
    }
    if(itemToUpdate.title!=="" && itemToUpdate.body!=="" && imgUrl!=="")
    updateArticle();    
  }, [imgUrl])

  return (
    
    <Form
    layout="vertical"
    name="nest-messages"
    form={form}
    autoComplete="off"
    onSubmitCapture={updateItem}
    style={styles.form}
    >
      <div className="flex-col w-full flex mt-10 ml-10 mr-10 mb-8">
      <div className="flex-col w-full flex mt-10 ml-10 mr-10 mb-8">
    {/* <input title="Upload Logo" type="file" onChange={imageChange} />
        <Image
          width={200}
          src={Article.urlImg}
        /> */}
              <UploadImage 
                onImageUpdate={setLogoFile} 
                selectedImage={itemToUpdate.urlImg}
              />

      </div>
        <div className="flex-col max-w-full mb-8 flex ml-10 mr-10">
        <input
          value={itemToUpdate.title}
          className="col-span-3 p-3 border"
          type="text"
          placeholder="Enter Title"
          onChange={(e) => setItemToUpdtate({ ...itemToUpdate, title: e.target.value })}
        />
        </div>
        <div className="flex-col w-full flex mb-8 ml-10 mr-10">
    <textarea
     value={itemToUpdate.body}
      rows={4}
     className=" col-span-5 p-3 border mx-3"
     placeholder="Write the Content here ..."
     onChange={(e) => setItemToUpdtate({ ...itemToUpdate, body: e.target.value })}
    ></textarea>
     </div>
     {/* <button
      onClick={updateItem}
      className="text-white bg-slate-900 hover:bg-slate-900 p-3 text-xl"
      type="submit"
    >
      Save
    </button> */}
     <Button
          type="primary"
          htmlType="submit"
          size="large"
          // disabled={!FormOptions.nameCompetition}
          onClick={(e: any) => {
            e.stopPropagation();
          }}
        >
          SAVE
    </Button>
   </div>
  </Form>
  );
};

export default ArticleView;
