/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable react/no-unknown-property */
/* eslint-disable @next/next/no-img-element */
/* eslint-disable jsx-a11y/img-redundant-alt */

import React, { useRef, useState, useEffect, FormEvent } from "react";

import NavBar from "../../components/Navbar";

import { Suspense } from "react";
import router, { useRouter } from "next/router";
import  Image  from "next/image";
import { Zoom } from 'react-slideshow-image';
import 'react-slideshow-image/dist/styles.css';
import { prisma } from "../../lib/prisma";
import { GetServerSideProps } from "next";
import { getSession, useSession } from "next-auth/react";
import Link from "next/link";




export const getServerSideProps: GetServerSideProps = async ({ query }) => {
 
  type String = any
  
  const id = query.id;
  
  // aqui tem que procurar o usuário pelo id usando findMany e não findFirst
  // analisar melhor aqui isso, pode haver o problema aqui
    const user = await prisma.user.findFirst({
      where: {
        id: id as String,
      },
      select: {
        id: true,
        name: true,
        email: true,
        avatar: true,
        profile: {
          select: {
            title: true,
            introduction: true,
            imgSlide: {
               select: {
                 url: true,
              }
            }
          }
        },
        product: {
          select: {
            id: true,
            title: true,
            photo: true,
            tambnail: true,
            imgs: {
              select: {
                url: true,
              }
            }
          },
        },
      },
    });

return {
  props: {
      user: user,
    
  },
    };
      };


   
  
function Profile(props: any) {
     const user = props.user;

 
       const slideShow = []
     if (user && user.profile && user.profile.length > 0) {
      user.profile.forEach(profileItem => {
        if (profileItem.imgSlide && profileItem.imgSlide.length > 0) {
          profileItem.imgSlide.forEach(img => {
            console.log(img.url);
            slideShow.push(img.url);
          });
        }
      }); // talvez possa limpar mais esse código.. faça testes tirando os outros ifs
    } else if (user && user.profile && typeof user.profile === 'object') {
      if (user.profile.imgSlide && user.profile.imgSlide.length > 0) {
        user.profile.imgSlide.forEach(img => {
          console.log(img.url);
        });
      } else if (user.profile.imgSlide && typeof user.profile.imgSlide === 'object') {
        console.log(user.profile.imgSlide.url);
      } else {
        console.log("URL da imagem não encontrada.");
      }
    } else {
      console.log("Perfil não encontrado.");
    }
   
  
  const ZoomSlide = () => {
  
  return (
      <div style={{width: "99%", padding: "10px"}}>
      <Zoom scale={1.2} indicators={true} >
      
            {slideShow.map((each, index) => (
                <div key={index} style={{ width: "100%" }}>
                    <img style={{ objectFit: "cover", width: "100%", height: "400px" }} alt="Slide Image" src={each} />
                </div>
            ))}
        
      </Zoom> 
      </div>
    );
  };
  


  let prod = user.product.map(function (element) {
    return element;
  });
  // se tiver produto a variavel mensag estará vazia fora do escopo que a define
  const mensag = prod.length + " Produto no Catálogo:";
  if (prod == null || prod.length == 0 || prod === undefined) {
    // se não tiver produto a variavel prod será um array vazio e a mensagem será exibida
    prod = [];
    alert("Please add a product");
    const mensag = "Você ainda não adicionou produtos no seu catálogo.";
     
  }

  const pasta = "../productDetail/";

  // aqui ele vai passar a selecionar pelo nome da loja, o nume único
  // quando o user for criar o nome da loja, vai acessar db profile para ve se esse nome ja existe

  const router = useRouter();
  const parametro = router.query.id;
  const baseURL = "http://localhost:3000/api/users/select?id=";

    return (
      <div style={{ width: "100vW", height: "50vH", background: "#fff" }}>
      
        <NavBar />
    
        <ZoomSlide />
      
      

        <br></br>
        <section className="overflow-hidden text-gray-700 ">
          <div className="container px-5 py-2 mx-auto lg:pt-12 lg:px-32">
            <div className="flex flex-wrap -m-1 md:-m-2">

            

              {prod.map((data, key) => {
      
                return (
                        
                  <div key={key}>
                    <div className="flex flex-wrap w-1/3">
                      <div className="w-full p-4 md:p-2">
                      
                      
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
                    </div>
                  
                  </div>)
              }
              )}
            </div>
          </div>
        </section>
  
        <br></br>

      </div>
    );
  }

export default Profile;