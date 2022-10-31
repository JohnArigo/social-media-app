import { getSession, useSession } from "next-auth/react";
import { getToken } from "next-auth/jwt";
import HeaderSession from "./headSession";
import HeaderNoSession from "./headNoSession";
import type { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";

export async function getServerSideProps(req: NextApiRequest) {
  const prisma = new PrismaClient();
  const session = await getSession();
  const user = prisma.user.findMany({
    where: {
      email: session?.user?.email!,
    },
  });
  return {
    props: {
      user: session,
    },
  };
}

export default function Header(user: any) {
  console.log(user);

  const { data: session, status } = useSession();
  console.log(status);
  console.log(session?.user);
  if (status === "authenticated") {
    return <HeaderSession />;
  } else {
    return <HeaderNoSession />;
  }
}
