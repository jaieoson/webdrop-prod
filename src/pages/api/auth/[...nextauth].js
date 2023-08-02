// pages/api/auth/[...nextauth].js
import NextAuth from "next-auth"
//import EmailProvider from 'next-auth/providers/email';
//import {PrismaAdapter} from '@next-auth/prisma-adapter';
// import {PrismaClient} from '@prisma/client';
// const prisma = new PrismaClient(); 

import GithubProvider from "next-auth/providers/github"
import GoogleProvider from 'next-auth/providers/google'

export default NextAuth({
  
  providers: [
    // OAuth authentication providers
      // EmailProvider({
      //   server: process.env.EMAIL_SERVER,
      //   from: process.env.EMAIL_FROM,
      // }),
    
    GithubProvider({
        clientId: process.env.GITHUB_ID,
        clientSecret: process.env.GITHUB_SECRET,
    }),
    
    GoogleProvider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET,
    }),
  
  ],

  secret: process.env.SECRET,
})