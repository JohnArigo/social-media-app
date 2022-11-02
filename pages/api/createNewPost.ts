import type { NextApiRequest, NextApiResponse } from "next";

import prisma from "../../lib/prisma";

export default async function (req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ alert: "Method not allowed" });
  }
  const postData = JSON.parse(req.body);

  const savedPost = await prisma.post.create({ data: postData });

  res.json(savedPost);
  // res.status(200).json({ name: "John Doe" });
}
