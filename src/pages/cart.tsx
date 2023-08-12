/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable react/no-unescaped-entities */
/* eslint-disable react/no-unknown-property */
/* eslint-disable @next/next/no-img-element */
/* eslint-disable jsx-a11y/img-redundant-alt */

import React from "react";


import NavBar from "../components/Navbar";

import { Suspense } from "react";

import { GetServerSideProps } from "next";
import { getSession } from "next-auth/react";

import { prisma } from "../lib/prisma";
import  Image  from "next/image";
import Head from "next/head";
import 'react-slideshow-image/dist/styles.css';
import PageCart from "../components/Cart";
import Footer from "../components/Footer";



export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  const session = await getSession({ req });

  if (session) {
    const user = await prisma.user.findUnique({
      where: {
        email: session?.user?.email,
      },
      select: {
        id: true,
        name: true,
        email: true,
        avatar: true,
        status: true,
        carts: {
          select: {
            id: true,
            status: true,
          }
        },
     
      },
    })
  

    return {
      props: {
        user: user,
      },
    };

  } else {
    const user = "";
    return {
      props: {
        user: user,
      },
    };

  }


};





export default function Cart(props:any) {


  const user = props.user;

  console.log(user);

    const pano = "pano/";
    const profile = "profile/"


  return (
    <div style={{ width: "100vW", height: "50vH", background: "#723983" }}>

        <Head>
        <title>Carrinho OShop</title>
        </Head>
          
      <NavBar />
  
    
      <PageCart user={ user } />

      
      <br></br>
    



<Footer />




      </div>
  
  );
}





