import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../lib/prisma";

export default async function (req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "GET") {
    return res.status(405).json({ alert: "Method not allowed" });
  }
  const posts = await prisma.post.findMany({
    include: {
      author: true,
    },
    orderBy: {
      id: "desc",
    },
  });

  res.json(posts);
}
