import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../../lib/prisma";

export default async function (req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "GET") {
    return res.status(405).json({ alert: "Method not allowed" });
  }
  const { pid } = req.query;
  const userInput = pid?.toString();
  const posts = await prisma.post.findMany({
    where: {
      OR: [
        { title: { contains: userInput } },
        { content: { contains: userInput } },
      ],
    },
    include: {
      author: true,
    },
  });

  res.json(posts);
}
