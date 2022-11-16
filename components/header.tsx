import { getSession, useSession } from "next-auth/react";
import HeaderSession from "./headSession";
import HeaderNoSession from "./headNoSession";
import prisma from "../lib/prisma";
import { NextApiRequest } from "next";
import { portType, User } from "../lib/types";
import { useState, useEffect } from "react";

export default function Header({ setOpened, user }: any) {
  const { data: session, status } = useSession();

  const [portSize, setPortSize] = useState<portType>({
    width: 0,
    height: 0,
  });

  const handleResize = () => {
    if (typeof window !== "undefined") {
      setPortSize({
        height: window?.innerHeight,
        width: window?.innerWidth,
      });
    }
  };
  useEffect(() => {
    handleResize();
    window?.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  console.log(portSize);
  if (status === "authenticated") {
    return (
      <HeaderSession setOpened={setOpened} user={user} portSize={portSize} />
    );
  } else {
    return <HeaderNoSession portSize={portSize} />;
  }
}
