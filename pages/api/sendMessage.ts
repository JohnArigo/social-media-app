import type { NextApiRequest, NextApiResponse } from "next";

import prisma from "../../lib/prisma";

export default async function (req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ alert: "Method not allowed" });
  }
  const messageData = JSON.parse(req.body);

  const savedMessage = await prisma.message.create({ data: messageData });

  res.json(savedMessage);
  // res.status(200).json({ name: "John Doe" });
}
