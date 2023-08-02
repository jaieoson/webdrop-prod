import { GetServerSideProps, NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/react";
import { prisma } from "../../../lib/prisma";

// eslint-disable-next-line import/no-anonymous-default-export
export default async function (req: NextApiRequest, res: NextApiResponse) {
  const session = await getSession();

 // if (session) {
 //   const userId = session.user?.email;

    const { title, photo, tambnail } = req.body;

    // criar um array com {url:imgs},

    const exitCategory = await prisma.category.findMany({
      where: {
         title: title,
      },
      select: {
        title: true,
      }
      
    })
  
  console.log(exitCategory.length);

  
  if (exitCategory.length == 0) {
    await prisma.category.create({
      data: {
        title,
        photo,
        tambnail,
     
      },
    });
    return res.status(201).json({});
  } else {
    return res.status(400).json({});
  }
   
 
  
}
