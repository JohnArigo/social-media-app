import type { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";
import prisma from "../../../lib/prisma";
import { Friend, SendUser, User } from "../../../lib/types";

export default async function (req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ alert: "Method not allowed" });
  }
  const userData: Friend = JSON.parse(req.body);
  const savedUser = await prisma.friend.delete({
    where: {
      relationshipId: userData.relationshipId
    },
  });

  res.json(savedUser);
}
