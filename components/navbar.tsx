import { Button, Popconfirm, Popover } from "antd";
import React, { useEffect, useState } from "react";

interface NavBarProps {
  userLogged: any;
  onDisplayArticles: () => void;
  onLogout: () => void;
}

const Navbar: React.FC<NavBarProps> = ({
  userLogged,
  onDisplayArticles,
  onLogout,
}) => {
  const [openPopup, setOpenPopup] = useState(false);
  const HandleRemovePopUp = () => setOpenPopup(false);
  const content = (
    <div>
      <p>Content</p>
      <p>Content</p>
    </div>
  );

  return (
    <div>
      <div className="pt-0 pr-0 pb-0 pl-0 mt-0 mr-0 mb-0 ml-0"></div>
      <div className="bg-white">
        <div className="flex-col flex">
          <div className="w-full border-b-2 border-gray-200">
            <div className="bg-white h-16 justify-between items-center mx-auto px-4 flex">
              <div>
                {/* <img src="https://res.cloudinary.com/speedwares/image/upload/v1659284687/windframe-logo-main_daes7r.png"
                    className="block btn- h-8 w-auto" alt="" /> */}
                <button
                  onClick={() => {
                    onDisplayArticles();
                  }}
                >
                  <h5 className="text-2xl md:text-4xl font-bold tracking-tighter leading-tight md:pr-4">
                    Odb-Sports.
                  </h5>
                </button>
              </div>
              <Popover
                placement="leftBottom"
                title=""
                content={<Button onClick={() => onLogout()}>Logout</Button>}
                trigger="click"
              >
                <div className="md:space-x-2 align-middle mt-2 mb-2 justify-end items-end ml-auto flex space-x-3">
                  <div className="md:space-x-2 justify-end align-middle items-end ml-auto flex space-x-3">
                    <button>
                      <p className="font-semibold align-middle text-sm">
                        {userLogged?.displayName}
                      </p>
                    </button>
                  </div>
                  <div className="md:space-x-6 justify-end align-middle items-center ml-auto flex space-x-3">
                    <button>
                      <img
                        src={userLogged?.photoURL}
                        className="object-cover  h-9 w-9 rounded-full align-middle items-center bg-gray-300"
                        alt=""
                      />
                    </button>
                  </div>
                </div>
              </Popover>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
