import { SessionProvider } from "next-auth/react"


import '../styles/globals.css'
import { AppProps } from 'next/app'

//import { CartProvider } from './../context/CartContext';
import React from "react";

function MyApp({ Component, pageProps: { session, ...pageProps }} : AppProps ) {

    return (  
      
        <SessionProvider session={session}>
            
            
            <Component {...pageProps} />

           
            </SessionProvider>
  
  )
}

export default MyApp