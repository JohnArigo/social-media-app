import { Switch, Textarea, TextInput } from "@mantine/core";
import { getSession, useSession } from "next-auth/react";
import { useEffect, useMemo, useState } from "react";
import PostList from "../components/postList";

import prisma from "../lib/prisma";
import { postType, User, friends } from "../lib/types";
import { UserArray } from "../pages/userProfile/[id]";

async function newPost(sendingPackage: postTypeSend) {
  const response = await fetch("../api/createNewPost", {
    method: "POST",
    body: JSON.stringify(sendingPackage),
  });

  if (!response.ok) {
    throw new Error(response.statusText);
  }

  return await response.json();
}

export type postTypeSend = {
  title: string;
  content: string;
  published: boolean;
  authorId: number;
};

export default function CreatePost({ user }: UserArray) {
  const { data: session } = useSession();

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

  const [postData, setPostData] = useState<postTypeSend>({
    title: "",
    content: "",
    published: true,
    authorId: userData.id,
  });

  const handleChange = (event: any) => {
    const { name, value, type, checked } = event?.target;
    setPostData((prevState: postTypeSend) => {
      return {
        ...prevState,
        [name]: type === "checkbox" ? checked : value,
      };
    });
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    try {
      await newPost(postData);
      setPostData({
        title: "",
        content: "",
        published: false,
        authorId: userData.id,
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <main className="w-full h-96 ">
      <form
        onSubmit={handleSubmit}
        className="w-full h-full flex flex-col justify-center items-center"
      >
        <Switch
          size="md"
          onLabel="Publish"
          offLabel="Draft"
          name="published"
          checked={postData.published}
          onChange={handleChange}
        />
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
        <button>Post</button>
      </form>
    </main>
  );
}
