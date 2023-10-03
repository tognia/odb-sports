import React, { useState } from "react";

  type ArticleViewType = {
    id:string;
    title : string;
    body : string;
  };

  interface ArticleViewProps {
    Article: ArticleViewType;
  }

const ArticleView: React.FC<ArticleViewProps> = ({
  Article
}) => {

  return (
    
    <form className="grid-cols-10 flex-col w-full flex ml-10 mr-10 text-black">
      <div className="flex-col w-full flex mt-10 ml-10 mr-10 mb-8">
        <div className="flex-col max-w-full mb-8 flex ml-10 mr-10">
        <input
          value={Article.title}
          className="col-span-3 p-3 border"
          type="text"
          placeholder="Enter Title"
        />
        </div>
        <div className="flex-col w-full flex mb-8 ml-10 mr-10">
    <textarea
     value={Article.body}
      rows={4}
     className=" col-span-5 p-3 border mx-3"
     placeholder="Write the Content here ..."
    ></textarea>
     </div>
   </div>
  </form>
  );
};

export default ArticleView;
