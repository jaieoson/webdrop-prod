 /* eslint-disable jsx-a11y/alt-text */
/* eslint-disable react/no-unescaped-entities */
/* eslint-disable react/no-unknown-property */
/* eslint-disable @next/next/no-img-element */
/* eslint-disable jsx-a11y/img-redundant-alt */

import React, { useRef, useState, useEffect, useContext } from "react";
import NavBar from "../components/Navbar";
import { Suspense } from "react";
import { GetServerSideProps } from "next";
import { getSession } from "next-auth/react";
import Head from "next/head";
//import { prisma } from "../lib/prisma";
import  Image  from "next/image";
import Link from "next/link";
//import { Zoom } from 'react-slideshow-image';
//import 'react-slideshow-image/dist/styles.css';
//import Footer from "../components/Footer";
//import { CartContext } from "../context/CartContext";


export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  const session = await getSession({ req });

 /* if (!session) {
    return {
      redirect: {
        destination: "/login",
        permanent: false,
      },
    };
  }
*/
  
  
return {
  props: {
    
  },
    };
};

function App(props: any) {  
  const prod = props.prod;
  // let tour = user.tours.map(function(element){
  //     return element;
  // }); 

  //const addToCart = useContext(CartContext);  
  const pasta = "../productDetail/";

  // let prod = [];
  //  if (user && Array.isArray(user.product))  {
  //    prod = user.product.map(function (element) {
  //     return element;
  //   });
  // } 

    const pano = "pano/";
    const profile = "profile/"
  return (
    <div style={{ width: "100vW", height: "50vH", background: "#FFFFF" }}>
      <Head>
        <title>OShop</title>
      </Head>
      <NavBar /> 
      

      <div className="bg-blue-100 p-2" style={{width: "98%", marginLeft:"10px"}}>
    {/* <div className="text-center rounded-lg p-2 py-12 text-2xl">

          Bem-vindo ao nosso novo e emocionante e-commerce! Nosso compromisso é oferecer a melhor experiência de
          compra online para nossos clientes, com uma ampla seleção de produtos de alta qualidade a preços competitivos.
          Navegar pelo nosso site é fácil e intuitivo, permitindo que você encontre rapidamente o que precisa. Além disso,
          nossas opções de pagamento são seguras e confiáveis, garantindo uma compra tranquila e rápida.

          Nossa meta é criar uma comunidade de clientes felizes e satisfeitos, e nossa equipe está sempre à disposição
          para ajudar com quaisquer dúvidas ou problemas. Venha fazer parte da nossa comunidade e aproveite a nossa incrível
          seleção de produtos!
          
         
        </div> */}
        
</div>   
<br></br>
<br></br>
<section className="overflow-hidden text-gray-700 ">
<div className="container px-5 py-2 mx-auto lg:pt-12 lg:px-32">
<div className="flex flex-wrap -m-1 md:-m-2">
   kkkkkkkkkkkkkkkkkkkkkkkk
    </div>
  </div>
</section>
    
      <br></br>

      </div>
  
  );
}

export default App;
