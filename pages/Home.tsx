import { getSession, useSession } from "next-auth/react";
import { NextApiHandler, NextApiRequest } from "next/types";
import { useEffect, useState } from "react";

import PostList from "../components/postList";
import Stories from "../components/stories";
import prisma from "../lib/prisma";
import { postType, HomeType, User, Friend, postsType } from "../lib/types";
//import { options } from "pages/api/auth/[...nextauth]";

//pull all data posts
export async function getStaticProps(req: NextApiRequest) {
  //get session for all users in server
  const session = await getSession({ req });
  //find all posts
  const posts = await prisma.post.findMany({
    include: {
      author: true,
    },
  });
  return {
    props: {
      posts: posts,
    },
    revalidate: 10,
  };
}

export default function Home({ posts }: postsType) {
  //all post data
  const [postData, setPostData] = useState<postType[]>(posts);
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
  }, []);
  //to pass to story componenet *data source*
  const [friendData, setFriendData] = useState<Friend[]>(userData.friends);

  //set post data only if data from session is valid
  useEffect(() => {
    if (userData.fName === undefined) {
      setFriendData(userData.friends!);
    }
  }, [userData]);

  return (
    <main className="w-screen h-screen bg-gray-200">
      <Stories allFriends={friendData} />
      <PostList postData={postData} setPostData={setPostData} />
    </main>
  );
}
