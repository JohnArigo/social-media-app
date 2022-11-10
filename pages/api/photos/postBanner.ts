import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../lib/prisma";

export default async function (req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ alert: "Method not allowed" });
  }
  const bannerData = JSON.parse(req.body);

  const savedBanner = await prisma.user.update({
    where: {
      id: bannerData.id,
    },
    data: {
      banner: bannerData.banner,
    },
  });

  res.json(savedBanner);
}
