import { useState } from "react";
import Stories from "../components/stories";
import prisma from "../lib/prisma";

export async function getServerSideProps() {
  const posts = await prisma.post.findMany();
  return {
    props: {
      posts: posts,
    },
  };
}
export type User = {
  id: number;
  email: string;
  fName: string;
  lName: string;
  password: string;
  posts: postType[];
};
export type postType = {
  title: string;
  content: string;
  published: boolean;
  author: User;
  authorid: number;
};

export type postsType = {
  posts: postType[];
};
export default function Home({ posts }: postsType) {
  console.log(posts);
  const [postData, setPostData] = useState<postsType>({ posts });

  return (
    <main className="w-screen h-screen bg-gray-100">
      <Stories />
      <section className="h-full w-full bg-red-200"></section>
    </main>
  );
}
