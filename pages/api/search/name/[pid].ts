import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../../lib/prisma";

export default async function (req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "GET") {
    return res.status(405).json({ alert: "Method not allowed" });
  }
  const { pid } = req.query;
  const userInput = pid?.toString();
  const posts = await prisma.user.findMany({
    where: {
      OR: [
        { fName: { contains: userInput } },
        { lName: { contains: userInput } },
      ],
    },
    select: {
      image: true,
      fName: true,
      lName: true,
      id: true,
    },
  });

  res.json(posts);
}
