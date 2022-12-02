import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../lib/prisma";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "GET") {
    return res.status(405).json({ alert: "Method not allowed" });
  }
  const { pid } = req.query;
  const userID = parseInt(pid?.toString()!);
  const user = await prisma.user.findUnique({
    where: {
      id: userID,
    },
    include: {
      messages: {
        include: {
          from: {
            select: {
              image: true,
              fName: true,
              lName: true,
            },
          },
          toUser: {
            select: {
              image: true,
              fName: true,
              lName: true,
            },
          },
        },
        distinct: ["toId"],
        orderBy: {
          id: "desc",
        },
      },
      toMessage: {
        include: {
          from: {
            select: {
              image: true,
              fName: true,
              lName: true,
            },
          },
          toUser: {
            select: {
              image: true,
              fName: true,
              lName: true,
            },
          },
        },
        distinct: ["toId"],
        orderBy: {
          id: "desc",
        },
      },
    },
  });
  //   where: {
  //     OR: [
  //       {
  //         fromId: userID,
  //       },
  //       { toId: userID },
  //     ],
  //   },
  //   include: {
  //     toUser: {
  //       select: { image: true },
  //     },
  //     from: {
  //       select: { image: true, fName: true, lName: true },
  //     },
  //   },
  //   distinct: ["toId"],
  //   orderBy: {
  //     id: "desc",
  //   },
  // });

  res.status(200).json(user);
}
