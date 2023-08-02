import { NextApiRequest, NextApiResponse } from "next";

import { prisma } from "./../../../lib/prisma";

// eslint-disable-next-line import/no-anonymous-default-export
export default async function (req: NextApiRequest, res: NextApiResponse) {
  const { name, email, avatar, password, phone, title, bio, status } = req.body;

 const { id } = await prisma.user.create({
    data: {
      name,
      email,
      avatar,
      password,
      phone,
      title,
      bio,
      status,
    },
   
    select: {
      id: true,
      email: true,
    },
  });

  return res.status(201).json({
    id: id,
    email: email,
  });
}
    