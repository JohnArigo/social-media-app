import type { NextApiRequest, NextApiResponse } from "next";

import prisma from "../../../lib/prisma";

export default async function (req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ alert: "Method not allowed" });
  }
  const userData = JSON.parse(req.body);

  const savedUser = await prisma.user.create({ data: userData });

  res.json(savedUser);
  // res.status(200).json({ name: "John Doe" });
}
