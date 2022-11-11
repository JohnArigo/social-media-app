import type { NextApiRequest, NextApiResponse } from "next";
import { useSession } from "next-auth/react";
import prisma from "../../../lib/prisma";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // if (req.method !== "GET") {
  //   return res.status(405).json({ alert: "Method not allowed" });
  // }
  const { pid } = req.query;
  const userID = parseInt(pid?.toString()!);
  const user = await prisma.user.findUnique({
    where: {
      id: userID,
    },
    include: {
      friends: {
        include: {
          friendInfo: {
            select: {
              image: true,
              fName: true,
              lName: true,
              email: true,
              id: true,
            },
          },
          owner: {
            select: {
              image: true,
              fName: true,
              lName: true,
              email: true,
              id: true,
            },
          },
        },
      },
      posts: {
        include: {
          author: true,
        },
      },
    },
  });

  res.status(200).json(user);
}
