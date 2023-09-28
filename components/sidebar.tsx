function Sidebar() {
  return (
       <div className="bg-white lg:flex md:w-64 md:flex-col">
                          <div className="flex-col pt-5 flex overflow-y-auto">
                              <div className="h-full flex-col justify-between px-4 flex">
                                  <div className="space-y-4">
                                      <div className="bg-top bg-cover space-y-1">
                                          <a href="#" className="font-medium text-sm items-center rounded-lg text-gray-900 px-4 py-2.5 flex
                  transition-all duration-200 hover:bg-gray-200 group cursor-pointer">
                                              <span className="justify-center items-center flex">
                                                  <span className="justify-center items-center flex">
                                                      <span className="justify-center items-center flex">
                                                          <span className="items-center justify-center flex">
                                                              <svg className="flex-shrink-0 w-5 h-5 mr-4" xmlns="http://www.w3.org/2000/svg" fill="none"
                                                                  viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round"
                                                                      stroke-linejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1
                            1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" /></svg>
                                                          </span>
                                                      </span>
                                                  </span>
                                              </span> 
                                              <span>Dashboard</span>
                                          </a>
                                          <a href="#" className="font-medium text-sm items-center rounded-lg text-gray-900 px-4 py-2.5 block
                  transition-all duration-200 hover:bg-gray-200 group cursor-pointer">
                                        <span>Articles</span>
                                          </a>
                                          <a href="#" className="font-medium text-sm items-center rounded-lg text-gray-900 px-4 py-2.5 flex
                  transition-all duration-200 hover:bg-gray-200 group cursor-pointer">
                                              
                                              <span>Logout</span>
                                          </a>
                                      </div>
                                     
                                  </div>
                                  
                              </div>
                          </div>
                      </div> 

  );
}

export default Sidebar;