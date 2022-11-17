import { Switch, Textarea, TextInput, Notification } from "@mantine/core";
import { IconCheck } from "@tabler/icons";
import { getSession, useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect, useMemo, useState } from "react";
import { postType, User, Friend, UserArray } from "../lib/types";
//POST to createNewPost API
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
//post type
export type postTypeSend = {
  title: string;
  content: string;
  published: boolean;
  authorId: number;
};

export default function CreatePost() {
  const router = useRouter();

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
  //data being sent to api
  const [postData, setPostData] = useState<postTypeSend>({
    title: "",
    content: "",
    published: true,
    authorId: userData.id,
  });
  //handle change in form
  const handleChange = (event: any) => {
    const { name, value, type, checked } = event?.target;
    setPostData((prevState: postTypeSend) => {
      return {
        ...prevState,
        [name]: type === "checkbox" ? checked : value,
      };
    });
  };
  const [pass, setPass] = useState(false);
  //handles submitting to api / clears forms
  const handleSubmit = async (e: any) => {
    e.preventDefault();
    try {
      await newPost(postData);
      console.log(postData);
      setPass(true);
      setPostData({
        title: "",
        content: "",
        published: false,
        authorId: userData.id,
      });
      router.push(`../success`);
    } catch (error) {
      console.log(error);
    }
  };

  if (pass) {
    return <main>Success!</main>;
  } else {
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
}
