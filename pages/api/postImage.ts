import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../lib/prisma";

export default async function (req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ alert: "Method not allowed" });
  }
  const imageData = JSON.parse(req.body);

  const savedImage = await prisma.user.update({
    where: {
      id: imageData.id,
    },
    data: {
      image: imageData.image,
    },
  });

  res.json(savedImage);
}
