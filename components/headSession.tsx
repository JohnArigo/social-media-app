import { useSession } from "next-auth/react";
import Link from "next/link";
import { useState, useEffect } from "react";
import { User } from "../lib/types";

export type HeaderSessionType = {
  setOpened: any;
  user: User[];
};
export default function HeaderSession({ setOpened, user }: HeaderSessionType) {
  const { data: session, status } = useSession();

  return (
    <main className="bottom-0 fixed w-full h-20 bg-accent text-neutral flex flex-row justify-around items-center">
      <Link href="/home">
        <div>Home</div>
      </Link>
      <div>Explore</div>
      <div onClick={() => setOpened(true)}>
        <div>Post</div>
      </div>
      <Link href={"/messages"}>
        <div>Messages</div>
      </Link>

      <Link href={`/userProfile/myProfile`}>
        <div>Profile</div>
      </Link>
    </main>
  );
}
