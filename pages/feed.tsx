import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import PostList from "../components/postList";
import prisma from "../lib/prisma";
import { postType, User, Friend, postsType } from "../lib/types";
export async function getServerSideProps() {
  const posts = await prisma.post.findMany({
    select: {
      id: true,
      title: true,
      content: true,
      published: true,
      authorId: true,
      author: {
        select: {
          id: true,
          email: true,
          image: true,
          fName: true,
          lName: true,
        },
      },
      comments: {
        select: {
          id: true,
          content: true,
          author: {
            select: {
              id: true,
              email: true,
              image: true,
              fName: true,
              lName: true,
            },
          },
        },
      },
      likes: {
        select: {
          id: true,
          user: {
            select: {
              id: true,
              email: true,
              image: true,
              fName: true,
              lName: true,
            },
          },
        },
      },
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

export default function Feed({ posts }: postsType) {
  const [postData, setPostData] = useState<postType[]>(posts);
  console.log(postData);
  //pull session for ID
  const { data: session } = useSession();
  //find userID for API call
  const userID = parseInt(session?.user?.name?.toString()!);
  //userData for rendering
  const [userData, setUserData] = useState<User>({
    id: userID,
    email: "initial",
    fName: "initial",
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
  const [friendData, setFriendData] = useState<Friend[]>();

  useEffect(() => {
    fetch(`../api/findUserFriends/${userID}`)
      .then((res) => res.json())
      .then((data) => {
        setFriendData(data.friends);
      });
  }, [userData]);

  return (
    <main className="bg-base-200 w-screen h-screen sm:pt-24 overflow-y-hidden">
      <h1 className="text-info text-2xl text-center">User Posts</h1>
      <PostList
        postData={postData}
        setPostData={setPostData}
        userData={userData}
      />
    </main>
  );
}
