import React from "react";
import {Image } from 'antd';

interface ArticleFormProps {
    title : any;
    setTitle: (item:any) => void;
    componentsArray:any[];
    imgUrl: string;
    imageChange: (e:any) => void;
    handleUpdate: (e:any, index:any) => void;
    AddParagraph: (e:any) => void;
    addItem: (e:any) => void;
    edit:boolean;
}

const ArticleForm: React.FC<ArticleFormProps> = ({
    title,
    setTitle,
    componentsArray,
    imgUrl,
    imageChange,
    handleUpdate,
    AddParagraph,
    addItem,
    edit
}) => {

 

  return (
    
    <form className="grid-cols-10 flex-col xs:block lg:w-full flex ml-10 mr-1 text-black">
    <div className="flex-col w-full flex mt-10 ml-10 mr-2 mb-8">
    <Image
          width={200}
          src={imgUrl}
        />   
    <input title="Upload Logo" type="file" onChange={imageChange} />
    </div>
   
    <div className="flex-col max-w-full mb-8 flex ml-10 mr-2">
    <input
      value={title}
      onChange={(e) => setTitle( e.target.value)}
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

export default ArticleForm;
