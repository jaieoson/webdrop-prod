/* eslint-disable react/jsx-key */
import { getSession, useSession } from "next-auth/react";
import { FormEvent, SetStateAction, useEffect, useRef } from "react";
import Router from "next/router";
import { signIn, signOut } from "next-auth/react";
import { useState } from "react";
import NavBar from "../../components/Navbar";
import Footer from "../../components/Footer";
import { GetServerSideProps } from "next/types";
import { prisma } from "prisma";
import UploadImages from "../../components/UploadsMultipleS3";
import Link from "next/link";

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  const session = await getSession({ req });

  const user = await prisma.user.findFirst({
    where: {
      email: session.user.email,
    },
    select: {
      id: true,

    }
  });

  if (!session) {
    return {
      redirect: {
        destination: "/login",
        permanent: false,
      },
    };
  } 
    
  return {
    props: {
      user: user,
    
    },
  };

};


export default function Comp(props: any) {
  const user = props.user;
 
 
  const { data: session } = useSession();
  // console.log(session?.user?.email);
 // console.log(session?.user?.email);
 const [newTitle, setNewTitle] = useState("");
 const [newBio, setNewBio] = useState("");
 const [newCatId, setNewCatId] = useState("");
 const [newUserid, setNewUserid] = useState("");
 const [newImgs, setNewImags] = useState([]);

  console.log(newUserid);
  console.log(newCatId);
 
  const childToParent = function (childdata: []) {
    // childdata = urlList
    setNewImags(childdata); 

// usar crop para criar um tambnail e setar
    // tem que encontrar um local melhor para setar o userid
console.log(user.id);
setNewUserid(user.id);

  };


  async function createSlide(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const result = await fetch("http://localhost:3000/api/slide/create", {
      method: "POST",
      body: JSON.stringify({
        userId: newUserid,
        title: newTitle,
        introduction: newBio,
        imgs: newImgs
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });
  }

  const profile = "../../profile/";

  if (session) {
    return (
      <>
        <NavBar />
        <h1 className="text-3xl font-bold underline">
      {user ? <Link href={profile+user.id} legacyBehavior><a target="_blank">Profile</a></Link> : ''}
      </h1>
      
        <hr/>
        <br /><br />
        <h1 className="text-3xl text-red-800">Create Slide</h1>
        <br />
    
        <form onSubmit={createSlide}>

          <br />
          <div className="mb-6">
            <input
              value={newTitle}
              onChange={(e) => setNewTitle(e.target.value)}
              placeholder="Marca da Loja"
              type="text"
              id="default-input"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            />
          </div>

          <label  className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400">Your message</label>
          <textarea
            value={newBio}
            onChange={(e) => setNewBio(e.target.value)}
            id="message" placeholder="apresentação"
            className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"></textarea>

<br/>
<br/>

          <UploadImages childToParent={childToParent} />
          <br /> <br />
 
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            type="submit">
            Add slide
          </button>
        </form>

        <Footer />
      </>
    );
  }
}
