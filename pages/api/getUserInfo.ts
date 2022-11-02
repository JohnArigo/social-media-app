import type { NextApiRequest, NextApiResponse } from "next";
import { useSession } from "next-auth/react";
import prisma from "../../lib/prisma";

export default async function (req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "GET") {
    return res.status(405).json({ alert: "Method not allowed" });
  }
  const { data: session, status } = useSession();
  //   const userData = JSON.parse(req.body);
  const user = prisma.user.findMany({
    where: {
      email: session?.user?.email!,
    },
  });

  res.json(user);
}
