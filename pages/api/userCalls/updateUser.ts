import type { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";
import prisma from "../../../lib/prisma";
import { SendUser, User } from "../../../lib/types";

export default async function (req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ alert: "Method not allowed" });
  }
  const userData: SendUser = JSON.parse(req.body);
  console.log(userData);
  const savedUser = await prisma.user.update({
    where: {
      email: userData.email,
    },
    data: {
      fName: userData.fName,
      lName: userData.lName,
      about: userData.about,
      flex: userData.flex,
    },
  });

  res.json(savedUser);
}
