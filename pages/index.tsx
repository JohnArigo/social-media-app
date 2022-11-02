import { Textarea, TextInput } from "@mantine/core";
import { getSession, useSession } from "next-auth/react";
import { useEffect, useMemo, useState } from "react";
import PostList from "../components/postList";

import prisma from "../lib/prisma";
import { postType, User } from "../lib/types";
import { UserArray } from "./userProfile/[id]";

export async function getServerSideProps() {
  const session = await getSession();
  const user = await prisma.user.findMany({
    where: {
      email: session?.user?.email!,
    },
  });

  return {
    props: {
      user: user,
    },
  };
}

export default function Home({ user }: UserArray) {
  console.log(user);
  const { data: session } = useSession();
  console.log(session?.user?.email);
  const [userData, setUserData] = useState<User>({
    id: 1,
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

  const [postData, setPostData] = useState<postType>({
    title: "",
    content: "",
    published: false,
    author: userData,
    authorId: userData.id,
  });

  const handleChange = (event: any) => {
    const { name, value } = event?.target;
    setPostData((prevState: postType) => {
      return {
        ...prevState,
        [name]: value,
      };
    });
  };

  console.log(postData);
  return (
    <main className="w-screen h-screen ">
      <form className="w-full h-full flex flex-col justify-center items-center">
        <TextInput
          className="w-full"
          label="Post Title"
          name="title"
          value={postData.title}
          onChange={handleChange}
        />
        <Textarea
          className="w-full"
          label="Content"
          name="content"
          value={postData.content}
          onChange={handleChange}
          minRows={10}
          maxRows={15}
        />
      </form>
    </main>
  );
}
