'use client'
import Articles from "./Articles";
import Head from "next/head";
import { CMS_NAME } from "../lib/constants";
import Navbar from "../components/navbar";
import Sidebar from "../components/sidebar";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { useState, useEffect } from "react";


export default function Index() {
  const auth = getAuth();
  const provider = new GoogleAuthProvider(); // Initialize the GoogleAuthProvider
  const [userLogged, setUserLogged] = useState({email:'', displayName:''});

  useEffect(()=>{
    signInWithPopup(auth, provider)
  .then((result) => {
    const credential = GoogleAuthProvider.credentialFromResult(result);
    const token = credential.accessToken;
    const user = result.user;
    setUserLogged({email:user.email, displayName:user.displayName});
    console.log('USER LOGGED', user.displayName);
  }).catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    const email = error.customData.email;
    const credential = GoogleAuthProvider.credentialFromError(error);
  });
  },[])
  return (
    (userLogged.displayName!=='')?(
    <>
      <Head>
        <title>{`Home - ${CMS_NAME}`}</title>
      </Head>
      <Navbar />

      <div>
        <div className="bg-white"></div>
        <div className="bg-white w-full">
          <div className="flex-col w-full flex ml-10 mr-10">
            <div className="flex w-auto bg-gray-100">
              <Sidebar />
              <div className="flex-col w-full ml-10 mr-10">
                <Articles listArticles={[]} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
  :
  (
    <div>USER NOT LOGGED</div>
  )
  )
}
