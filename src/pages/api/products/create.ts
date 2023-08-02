import { GetServerSideProps, NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/react";
import { prisma } from "../../../lib/prisma";

// eslint-disable-next-line import/no-anonymous-default-export
export default async function (req: NextApiRequest, res: NextApiResponse) {
  const session = await getSession();

 // if (session) {
 //   const userId = session.user?.email;

    const { title, price, stock, description, supplierUrl, userId, catId, photo, tambnail, imgs } = req.body;


  
  
    // criar um array com {url:imgs},
  const existProduct = await prisma.product.findMany({
    where: {
      title: title,
    },
    select: {
      title: true,
    }
      
  });
  
  console.log(existProduct.length);

  if (existProduct.length === 0) {
    await prisma.product.create({
      data: {
        title,
        price,
        stock,
        description,
        supplierUrl,
        User: {
          connect: {
            id:userId
          }
        },
        Category: {
          connect: {
            id:catId
          } 
        },
        photo,
        tambnail,
        imgs: {
          createMany: {
            data: imgs.map((img: string) => ({ url: img })),
          },
        },
      },
    
    });
  
    return res.status(201).json({});
  } else {
    return res.status(400).json({});
    
  }
}
