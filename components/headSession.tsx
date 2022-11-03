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
  useEffect(() => {
    user?.filter((user: User) => {
      if (user.email === session?.user?.email!) {
        setUserData(user);
      }
    });
  }, []);
  const userID = parseInt(session?.user?.name?.toString()!);
  const [userData, setUserData] = useState<User>({
    id: userID,
    email: session?.user?.email!,
    fName: "first",
    lName: "last",
    password: "password123",
    friends: [],
    posts: [],
  });

  return (
    <main className="bottom-0 fixed w-full h-20 bg-yellow-500 flex flex-row justify-around items-center">
      <Link href="/home">
        <div>Home</div>
      </Link>
      <div>Explore</div>
      <div onClick={() => setOpened(true)}>
        <div>Post</div>
      </div>
      <div>Friends</div>
      <Link
        href={`/userProfile/${
          userData?.id + userData?.fName + userData?.lName + userData?.id + 69
        }`}
      >
        <div>Profile</div>
      </Link>
    </main>
  );
}
