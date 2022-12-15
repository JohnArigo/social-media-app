import type { NextApiRequest, NextApiResponse } from "next";

import prisma from "../../../lib/prisma";

export default async function (req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ alert: "Method not allowed" });
  }
  const likeData = JSON.parse(req.body);

  const savedLike = await prisma.like.create({ data: likeData });

  res.json(savedLike);
}
