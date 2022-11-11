import type { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";
import prisma from "../../../lib/prisma";
import { SendUser, ThemeSend, User } from "../../../lib/types";

export default async function (req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ alert: "Method not allowed" });
  }
  const userData: ThemeSend = JSON.parse(req.body);

  const savedUser = await prisma.user.update({
    where: {
      id: userData.id,
    },
    data: {
      theme: userData.theme,
    },
  });

  res.json(savedUser);
}
