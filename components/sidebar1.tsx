import React, { useEffect, useState } from "react";
import { Button, Popconfirm, message, Popover } from "antd";
import { collection, query, onSnapshot } from "firebase/firestore";
import { db } from "../database/firebase";
import { DeleteOutlined } from "@ant-design/icons";

interface SideMenuProps {
  showAddForm: (e: any) => void;
  showViewForm: (item: any) => void;
  isItemUpdated: number;
  delteItem: (item: any) => void;
}

const Sidebar1: React.FC<SideMenuProps> = ({
  delteItem,
  showAddForm,
  showViewForm,
  isItemUpdated,
}) => {
  const [items, setItems] = useState([]);
  const [isShown, setIsShown] = useState(false);
  const [itemSelected, setItemSelected] = useState("");
  const [itemToDelete, setItemToDelete] = useState("");

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
  }, [isItemUpdated]);

  const confirm = (e: React.MouseEvent<HTMLElement>) => {
    delteItem(itemToDelete);
    message.success('Article Deleted with success');
  };
  
  const cancel = (e: React.MouseEvent<HTMLElement>) => {
     };

  return (
    <div className="hidden lg:block">
      <div className="flex-col h-screen justify-center p-3 bg-white shadow w-60">
        <div className="space-y-1">
          <div className="flex items-center mt-5 mb-3">
            {/* <h2 className="text-xl font-bold">Dashboard</h2> */}
            <button>
              <a
                onClick={showAddForm}
                className="mx-3 min-h-screen mt-8 bg-black hover:bg-white hover:text-black border border-black text-white font-bold py-3 px-12 lg:px-8 duration-200 transition-colors mb-6 lg:mb-0"
              >
                ADD ARTICLE
              </a>
            </button>
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
                {items.map((item, id) => (
                  <div
                    className="rounded-sm mb-1 p-4 w-full flex justify-start hover:bg-blue-200 border-t-black"
                    key={id}
                    onClick={() => {
                      showViewForm(item);
                    }}
                    onMouseOver={() => {
                        setItemSelected(item.title)
                        setIsShown(true)
                    }}
                    onMouseOutCapture={() => setIsShown(false)}
                  >
                    <img
                      src={item.coverImage}
                      width={30}
                      height={30}
                      className="object-cover btn- h-7 w-7 rounded-full mr-2 bg-gray-300"
                    />
                    <span
                      className="capitalize"
                      onMouseOver={() => setIsShown(true)}
                      onMouseOutCapture={() => setIsShown(false)}
                    >
                      {item.title}
                    </span>
                    {isShown && itemSelected === item.title && (
                      <Popover
                        placement="leftBottom"
                        title=""
                        content={
                      <Popconfirm
                          title="Delete the task"
                          description="Are you sure to delete this Article ?"
                          onConfirm={confirm}
                          onCancel={cancel}
                          okText="Yes"
                          cancelText="No"
                          okType = "danger"
                        >
                        <Button onClick={() => setItemToDelete(item.id) }>
                          DELETE
                        </Button>
                        </Popconfirm>
                      }
                        trigger="click"
                        className="ml-5"
                      >
                        <DeleteOutlined style={{ fontSize: '16px', color: '#560404' }}/>
                      </Popover>
                    )}
                  </div>
                ))}
              </div>
            </ul>
          </div>
        </div>
      </div>
    
    </div>
  );
};

export default Sidebar1;
