import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../lib/prisma";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "GET") {
    return res.status(405).json({ alert: "Method not allowed" });
  }
  const { pid } = req.query;
  const userID = parseInt(pid?.toString()!);
  const user = await prisma.message.findMany({
    where: {
      fromId: userID,
    },
    //@ts-ignore
    include: {
      //@ts-ignore
      toUser: {
        select: { image: true },
      },
    },
    distinct: ["toId"],
    orderBy: {
      id: "desc",
    },
  });

  res.status(200).json(user);
}
