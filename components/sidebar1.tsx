import React, { useEffect, useState } from "react";

interface SideMenuProps {
    onDisplayArticles: () => void;
    onLogout: () => void;
    showAddForm: (e:any) => void;
}


const Sidebar1: React.FC<SideMenuProps> = ({
        onDisplayArticles,  
        onLogout,
        showAddForm
    }) => {
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
                            {/* <li className="rounded-sm">
                                <a
                                    href="#"
                                    className="flex items-center p-2 space-x-3 rounded-md"
                                >
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="w-6 h-6"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                        strokeWidth={2}
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                                        />
                                    </svg>
                                    <button onClick={()=>{onDisplayArticles()}}>
                                    <span>Home</span>
                                    </button>
                                </a>
                            </li> */}
                           
                            <li className="rounded-sm">
                            <h4 className="text-3xl md:text-4xl justify-center font-bold tracking-tighter ml-10 leading-tight  md:pr-8 invisible md:visible">
                                Articles
                            </h4>
                            <hr className="w-20 h-0.5 mx-auto my-2 bg-gray-100 border-0 rounded md:my-4 dark:bg-gray-700"></hr>
                                {/* <a
                                    href="#"
                                    className="flex items-center p-2 space-x-3 rounded-md"
                                >
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="w-6 h-6"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                        strokeWidth={2}
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1"
                                        />
                                    </svg>
                                    <button onClick={()=>{onLogout()}}>
                                    <span>Logout</span>
                                    </button>
                                </a> */}
                            </li>
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