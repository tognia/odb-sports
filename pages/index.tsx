"use client";
import Articles from "./Articles";
import Head from "next/head";
import { CMS_NAME } from "../lib/constants";
import Navbar from "../components/navbar";

import {
  getAuth,
  signInWithPopup,
  signOut,
  GoogleAuthProvider,
} from "firebase/auth";
import { useState, useEffect } from "react";
import Sidebar1 from "../components/sidebar1";

export default function Index() {
  const auth = getAuth();
  const provider = new GoogleAuthProvider(); // Initialize the GoogleAuthProvider
  const [userLogged, setUserLogged] = useState({
    email: "",
    displayName: "",
    photoURL: "",
  });
  const [showArticles, setShowArticles] = useState(false);
  const [showArticleAddForm, setShowArticleAddForm] = useState(false);
  const [articleSelected, setArticleSelected] = useState({ id : "", title: "", body: "", urlImg:"" });


  function onLogout() {
    signOut(auth)
      .then(() => {
        setUserLogged({ email: "", displayName: "", photoURL: "" });
        console.log("User logged out");
      })
      .catch((error) => {
      });
  }
  function onDisplayArticles() {
    setShowArticles(true);
  }
  function showAddForm(e:any){
    e.preventDefault();
    onAddOrViewArticle();
    setShowArticleAddForm(true);
   }
   function showViewForm(item:any){
    onAddOrViewArticle();
    setShowArticleAddForm(false);
    setArticleSelected({ ...articleSelected,id:item.id, title:item.title, body:item.body })
   }
  function onAddOrViewArticle() {
    setShowArticles(false);
  }

  useEffect(() => {
    signInWithPopup(auth, provider)
      .then((result) => {
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const user = result.user;
        setUserLogged({
          email: user.email,
          displayName: user.displayName,
          photoURL: user.photoURL,
        });
        console.log("USER LOGGED", user);
      })
      .catch((error) => {
      });
  }, []);
  return userLogged.displayName !== "" ? (
    <>
      <Head>
        <title>{`Home - ${CMS_NAME}`}</title>
      </Head>
      <Navbar
        userLogged={userLogged}
        onLogout={onLogout}
        onDisplayArticles={onDisplayArticles}
      />
      <div>
        <div className="bg-white"></div>
        <div className="bg-white w-full">
          <div className=" w-full flex ml-1 mr-10">
            <div className="flex w-full bg-gray-100 ">
             <Sidebar1
                onLogout={onLogout}
                onDisplayArticles={onDisplayArticles}
                showAddForm = {showAddForm}
                showViewForm={showViewForm}
              />
              <div className="flex-col justify-center w-full ml-10 mr-10">
                <Articles
                  showArticles={showArticles}
                  onAddOrViewArticle={onAddOrViewArticle}
                  showArticleAddForm={showArticleAddForm}
                  articleSelected = {articleSelected}
                />

              </div>
              
            </div>
          </div>
        </div>
      </div>
    </>
  ) : (
    <div>USER NOT LOGGED</div>
  );
}
