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
    
    <form className="grid grid-cols-10 items-center text-black">
    <input
      value={Article.title}
      className="col-span-3 p-3 border"
      type="text"
      placeholder="Enter Title"
    />
   
    <textarea
     value={Article.body}
      rows={4}
     className=" col-span-5 p-3 border mx-3"
     placeholder="Write the Content here ..."
    ></textarea>
   
  </form>
  );
};

export default ArticleView;
