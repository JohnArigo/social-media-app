import { getSession, useSession } from "next-auth/react";
import { NextApiHandler, NextApiRequest } from "next/types";
import { useEffect, useState } from "react";
import { themeChange } from "theme-change";
import PostList from "../components/postList";
import prisma from "../lib/prisma";
import {
  postType,
  HomeType,
  User,
  Friend,
  postsType,
  portType,
} from "../lib/types";

export async function getServerSideProps() {
  const posts = await prisma.post.findMany({
    include: {
      author: true,
    },
    orderBy: {
      id: "desc",
    },
  });
  return {
    props: {
      posts: posts,
    },
  };
}

export default function Home({ posts }: postsType) {
  //pull session for ID
  const { data: session } = useSession();
  //find userID for API call
  const userID = parseInt(session?.user?.name?.toString()!);
  //userData for rendering
  const [userData, setUserData] = useState<User>({
    id: userID,
    email: session?.user?.email!,
    fName: session?.user?.image!,
    lName: "last",
    password: "password123",
    friends: [],
    posts: [],
  });
  //api call to fetch user data from db
  useEffect(() => {
    fetch(`../api/findUser/${userID}`)
      .then((res) => res.json())
      .then((data) => {
        setUserData(data);
      });
  }, [userID]);
  //to pass to story componenet *data source*
  const [friendData, setFriendData] = useState<Friend[]>();

  useEffect(() => {
    fetch(`../api/findUserFriends/${userID}`)
      .then((res) => res.json())
      .then((data) => {
        setFriendData(data.friends);
      });
  }, [userData]);

  const [postData, setPostData] = useState<postType[]>(posts);

  return (
    <main className="w-screen h-screen md:mt-24">
      <h1 className="text-info text-2xl text-center">User Posts</h1>
      <PostList postData={postData} setPostData={setPostData} />
    </main>
  );
}
