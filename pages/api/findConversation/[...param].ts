import type { NextApiRequest, NextApiResponse } from "next";
import { useSession } from "next-auth/react";
import prisma from "../../../lib/prisma";
export type paramType = {
  param: string[];
};
export type param = {
  fromId: string;
  toId: string;
};
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // if (req.method !== "GET") {
  //   return res.status(405).json({ alert: "Method not allowed" });
  // }
  const { param } = req.query;
  //@ts-ignore
  const dbParams = param?.join("");
  const userID = parseInt(dbParams.charAt(0));
  const toId = parseInt(dbParams.charAt(1));
  const user = await prisma.message.findMany({
    where: {
      OR: [
        { fromId: userID, toId: toId },
        {
          fromId: toId,
          toId: userID,
        },
      ],
    },
  });

  res.status(200).json(user);
}
