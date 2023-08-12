import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'

import NavBar from '../components/Navbar'
import Login from '../components/Login'
import Footer from '../components/Footer'
import Router from 'next/router'
import { useSession, signIn, signOut } from "next-auth/react"
import React from 'react'

import { GetServerSideProps } from 'next';
import { getSession } from 'next-auth/react';


export const getServerSideProps: GetServerSideProps = async ({req}) => { 

  const session = await getSession({ req })
  
  if (session) {
    return {
      redirect: {
        destination: "/checkout",
        permanent: false,
      }
    }
  }

  return {
    props: {
      
    }
  }
};


export default function Home() {

 
 
  return (
   <div>


<NavBar/>





<Login/>

<Footer/>

   </div>
  )
}
