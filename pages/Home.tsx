import { getSession } from "next-auth/react";
import { useState } from "react";
import internal from "stream";
import PostList from "../components/postList";
import Stories from "../components/stories";
import prisma from "../lib/prisma";
import { postType, HomeType } from "../lib/types";

export async function getServerSideProps() {
  const session = await getSession();
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
  };
}

export default function Home({ posts, user }: HomeType) {
  const [postData, setPostData] = useState<postType[]>(posts);

  return (
    <main className="w-screen h-screen bg-gray-200">
      <Stories />
      <PostList postData={postData} setPostData={setPostData} />
    </main>
  );
}
