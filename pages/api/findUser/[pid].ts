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
    select: {
      id: true,
      image: true,
      email: true,
      fName: true,
      lName: true,
      banner: true,
      about: true,
      flex: true,
      theme: true,
      posts: {
        include: { author: true },
      },
      likes: true,
      friends: {
        include: {
          friendInfo: {
            select: {
              image: true,
              fName: true,
              lName: true,
              email: true,
              posts: {
                include: {
                  author: true,
                },
              },
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
      // include: {
      //   friends: {
      //     include: {
      //       friendInfo: {
      //         select: {
      //           image: true,
      //           fName: true,
      //           lName: true,
      //           email: true,
      //           posts: {
      //             include: {
      //               author: true,
      //             },
      //           },
      //           id: true,
      //         },
      //       },
      //       owner: {
      //         select: {
      //           image: true,
      //           fName: true,
      //           lName: true,
      //           email: true,
      //           id: true,
      //         },
      //       },
      //     },
      //   },

      //   posts: {
      //     include: {
      //       author: true,
      //     },
      //   },
      // },
    },
  });

  res.status(200).json(user);
}
