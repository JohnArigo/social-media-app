import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../lib/prisma";

export default async function (req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "GET") {
    return res.status(405).json({ alert: "Method not allowed" });
  }

  const posts = await prisma.post.findMany({
    select: {
      id: true,
      title: true,
      content: true,
      published: true,
      authorId: true,
      author: {
        select: {
          id: true,
          email: true,
          image: true,
          fName: true,
          lName: true,
        },
      },
      // comments: {
      //   select: {
      //     id: true,
      //     content: true,
      //     author: {
      //       select: {
      //         id: true,
      //         email: true,
      //         image: true,
      //         fName: true,
      //         lName: true,
      //       },
      //     },
      //   },
      // },
      // likes: {
      //   select: {
      //     id: true,
      //     user: {
      //       select: {
      //         id: true,
      //         email: true,
      //         image: true,
      //         fName: true,
      //         lName: true,
      //       },
      //     },
      //   },
      // },
    },
    orderBy: {
      id: "desc",
    },
  });

  res.json(posts);
}
