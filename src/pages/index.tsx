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
import { prisma } from "../lib/prisma";
import  Image  from "next/image";
import Link from "next/link";
import { Zoom } from 'react-slideshow-image';
import 'react-slideshow-image/dist/styles.css';
import Footer from "../components/Footer";
//import Footer from "../components/Footer";
//import { CartContext } from "../context/CartContext";


const ZoomSlide = () => {
  const images = [
    "../../slide01/frete-gratis-20-08.jpg",
    "../slide01/Captura de tela 2023-02-14 154326.png",
    "../slide01/smartwatches-dual-campaign-2022.jpg",
    
];


return (
    <div style={{width: "99%", padding: "10px"}}>
    <Zoom scale={1.2} indicators={true} >
          {images.map((each, index) => (
              <div key={index} style={{ width: "100%" }}>
                  <img style={{ objectFit: "cover", width: "100%", height: "400px" }} alt="Slide Image" src={each} />
              </div>
          ))}
      
    </Zoom>
    </div>
  );
};



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
  
  
const products = await prisma.product.findMany({
  select: {
    id: true,
    title: true,
    price: true,
    photo: true,
  }
});
return {
props: {
  prod: products, 
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
      
      <ZoomSlide />
      
    
<br></br>
<br></br>
<section className="overflow-hidden text-gray-700 ">
<div className="container px-5 py-2 mx-auto lg:pt-12 lg:px-32">
          <div className="flex flex-wrap -m-1 md:-m-2">
            

          {prod.map((data, key) => {
      return (
              
        <div key={key}>
      
        <div className="w-full p-4 md:p-8">
        <Link href={pasta + data.id} className="group" legacyBehavior >        
        <a style={{ cursor: 'pointer' }}>  
        <Image src={data.photo}
                width={100}
                height={100}
                priority
                  alt={data.title}        
                  style={{ width: "200px", height: "200px", objectFit: "cover" }} />
        </a>
        </Link>

         <Link href={pasta + data.id} className="group" legacyBehavior> 
              <a style={{ cursor: 'pointer' }}>
                <p>{data.title}</p>
                
                </a>
             </Link>


              
</div>
 
          
  </div>) 
}
)} 
            



    </div>
  </div>
</section>
    
      <br></br>
      <br></br>
    <Footer />
      </div>
  
  );
}

export default App;
