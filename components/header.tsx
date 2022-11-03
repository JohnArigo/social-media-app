import { getSession, useSession } from "next-auth/react";
import HeaderSession from "./headSession";
import HeaderNoSession from "./headNoSession";
import prisma from "../lib/prisma";
import { NextApiRequest } from "next";
import { User } from "../lib/types";
import { useState, useEffect } from "react";

// export async function getServerSideProps() {
//   const response = await fetch("../api/getUserInfo");
//   const userInfo = await response.json();
//   return {
//     props: {
//       user: userInfo,
//     },
//   };
// }

export default function Header({ setOpened, user }: any) {
  const { data: session, status } = useSession();
  if (status === "authenticated") {
    return <HeaderSession setOpened={setOpened} user={user} />;
  } else {
    return <HeaderNoSession />;
  }
}
