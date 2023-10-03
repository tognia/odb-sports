import React, { useEffect, useState } from "react";
import {
    collection,
    query,
    onSnapshot,
    deleteDoc,
    doc
  } from "firebase/firestore";
import { db } from "../database/firebase";

interface SideMenuProps {
    onDisplayArticles: () => void;
    onLogout: () => void;
    showAddForm: (e:any) => void;
    showViewForm: (e:any) => void;
}


const Sidebar1: React.FC<SideMenuProps> = ({
        onDisplayArticles,  
        onLogout,
        showAddForm,
        showViewForm
    }) => {
        const [items, setItems] = useState([]);
        const [isItemAdded, setIsItemAdded] = useState(0);
        const [isItemDeleted, setIsItemDeleted] = useState(false);
// Read Items from database
useEffect(() => {
    const q = query(collection(db, "articles"));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      let itemArr = [];
      querySnapshot.forEach((doc) => {
        itemArr.push({ ...doc.data(), id: doc.id });
      });
      setItems(itemArr);
      return unsubscribe();
    });
  }, [isItemAdded, isItemDeleted ]);

    return (
        <div className="hidden lg:block">
            <div className="flex-col h-screen justify-center p-3 bg-white shadow w-60">
                <div className="space-y-1">
                    <div className="flex items-center mt-5 mb-3">
                        {/* <h2 className="text-xl font-bold">Dashboard</h2> */}
                        <button><a
                                    onClick={showAddForm}
                                    className="mx-3 min-h-screen mt-8 bg-black hover:bg-white hover:text-black border border-black text-white font-bold py-3 px-12 lg:px-8 duration-200 transition-colors mb-6 lg:mb-0"
                                    >
                                    ADD ARTICLE
                            </a></button>
                    </div>
                    <div className="flex items-center mt-5">
                    <hr className="w-48 h-0.5 mx-auto my-2 bg-gray-100 border-0 rounded md:my-4 dark:bg-gray-700"></hr>
                    </div>
                    <div className="flex items-center">
                        <ul className="pt-2 pb-4 space-y-1 text-sm">
                                                     
                            <li className="rounded-sm">
                            <h4 className="text-3xl md:text-4xl justify-center font-bold tracking-tighter ml-10 leading-tight  md:pr-8 invisible md:visible">
                                Articles
                            </h4>
                            <hr className="w-20 h-0.5 mx-auto my-2 bg-gray-100 border-0 rounded md:my-4 dark:bg-gray-700"></hr>                             
                            </li>
                            <div className="grid grid-cols-1 divide-y to-blue-500"> 
                    {items.map((item, id) =>
                        
                            <div className="rounded-sm mb-1 p-4 w-full flex justify-start hover:bg-blue-200 border-t-black"
                                 key={id}
                                 onClick={() =>{showViewForm(item)}}
                               >
                                <img src={item.urlImg} width={30} height={30} className="object-cover btn- h-7 w-7 rounded-full mr-2 bg-gray-300"/>
                                <span className="capitalize">{item.title}</span>
                            </div>                       
                        )} 
                    </div>  
                        </ul>
                    </div>
                </div>
            </div>
            {/* <div className="container mx-auto mt-12">
                <div className="grid grid-cols-1 gap-6 mb-6 lg:grid-cols-3">
                    <div className="w-full px-4 py-5 bg-white rounded-lg shadow">
                        <div className="text-sm font-medium text-gray-500 truncate">
                            Total users
                        </div>
                        <div className="mt-1 text-3xl font-semibold text-gray-900">
                            12,00
                        </div>
                    </div>
                    <div className="w-full px-4 py-5 bg-white rounded-lg shadow">
                        <div className="text-sm font-medium text-gray-500 truncate">
                            Total Profit
                        </div>
                        <div className="mt-1 text-3xl font-semibold text-gray-900">
                            $ 450k
                        </div>
                    </div>
                    <div className="w-full px-4 py-5 bg-white rounded-lg shadow">
                        <div className="text-sm font-medium text-gray-500 truncate">
                            Total Orders
                        </div>
                        <div className="mt-1 text-3xl font-semibold text-gray-900">
                            20k
                        </div>
                    </div>
                </div>
            </div> */}
        </div>
    );
}

export default Sidebar1;