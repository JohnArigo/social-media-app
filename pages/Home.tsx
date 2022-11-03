import { getSession, useSession } from "next-auth/react";
import { NextApiRequest } from "next/types";
import { useEffect, useState } from "react";
import internal from "stream";
import PostList from "../components/postList";
import Stories from "../components/stories";
import prisma from "../lib/prisma";
import { postType, HomeType, User } from "../lib/types";

export async function getStaticProps(req: NextApiRequest) {
  const session = await getSession({ req });
  const posts = await prisma.post.findMany({
    include: {
      author: true,
    },
  });
  const user = await prisma.user.findMany({
    where: {
      email: session?.user?.email!,
    },
  });
  return {
    props: {
      posts: posts,
      user: user,
    },
    revalidate: 10,
  };
}

export default function Home({ posts, user }: HomeType) {
  const [postData, setPostData] = useState<postType[]>(posts);
  const { data: session } = useSession();
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

  useEffect(() => {
    user.filter((user: User) => {
      if (user.email === session?.user?.email!) {
        setUserData(user);
      }
    });
  }, []);

  return (
    <main className="w-screen h-screen bg-gray-200">
      <Stories />
      <PostList postData={postData} setPostData={setPostData} />
    </main>
  );
}
