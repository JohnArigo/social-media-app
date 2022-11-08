import { Button, Modal, Switch, Textarea, TextInput } from "@mantine/core";
import { getSession, useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import PostList from "../../components/postList";
import prisma from "../../lib/prisma";
import { Friend, HomeType, Message, postType, User } from "../../lib/types";

export async function getStaticPaths() {
  const pages = await prisma.user.findMany();

  const paths = pages.map((page) => {
    return { params: { id: page.id + page.fName + page.lName + page.id + 69 } };
  });

  return {
    paths,
    fallback: false,
  };
}
export async function getStaticProps(context: any) {
  const userID = parseInt(context.params.id.slice(0, 1));
  const user = await prisma.user.findUnique({
    where: {
      id: userID,
    },
    include: {
      posts: {
        include: {
          author: true,
        },
      },
    },
  });
  return {
    props: {
      user: user,
    },
  };
}
export type UserArray = {
  user: User[];
  users?: User[];
};
//add friend api
async function newFriend(sendingPackage: Friend) {
  const response = await fetch("../api/addFriend", {
    method: "POST",
    body: JSON.stringify(sendingPackage),
  });
  if (!response.ok) {
    throw new Error(response.statusText);
  }
  return await response.json();
}
//remove friend api
async function removeFriend(sendingPackage: Friend) {
  const response = await fetch("../api/removeFriend", {
    method: "POST",
    body: JSON.stringify(sendingPackage),
  });
  if (!response.ok) {
    throw new Error(response.statusText);
  }
  return await response.json();
}
//send message api
async function sendMessage(sendingPackage: Message) {
  const response = await fetch("../api/sendMessage", {
    method: "POST",
    body: JSON.stringify(sendingPackage),
  });
  if (!response.ok) {
    throw new Error(response.statusText);
  }
  return await response.json();
}
//type for user session
export type currentUser = {
  friends: Friend[];
  id: number;
  email: string;
};

export default function Home({ user }: HomeType) {
  const { data: session } = useSession();
  const userID = parseInt(session?.user?.name!.toString()!);
  //initial session user
  const initialFriend = [
    {
      friendFirstName: "First",
      friendId: 0,
      friendLastName: "Last",
      id: 0,
      ownerId: 0,
    },
  ];
  //session user state/data to pull
  const [currentUser, setCurrentUser] = useState<currentUser>({
    friends: initialFriend,
    id: userID,
    email: session?.user?.email!,
  });
  //search current users friends to see if profile being viewed matches
  useEffect(() => {
    fetch(`../api/findUserFriends/${userID}`)
      .then((res) => res.json())
      .then((data) => {
        setCurrentUser(data);
      });
  }, []);
  //bool to see if friend => will return true
  const [isMyFriend, setIsMyFriend] = useState<boolean>(false);
  //userdata for other person that (sessio.user) is viewing
  const [userData, setUserData] = useState<User>(user);
  //finding to see if user is a friend
  useEffect(() => {
    currentUser.friends.map((friend: Friend) => {
      if (friend.friendId !== 0) {
        if (friend.friendId === userData.id) {
          setIsMyFriend(true);
        }
      }
    });
  }, [currentUser]);

  //userPosts to map
  const [postData, setPostData] = useState<postType[]>(userData.posts!);
  //data to send when adding
  const [friend, setFriend] = useState<Friend>({
    friendId: userData.id,
    friendFirstName: userData.fName,
    friendLastName: userData.lName,
    ownerId: userID,
  });
  //submit add friend to add friend api
  const addFriend = async () => {
    try {
      await newFriend(friend);
      console.log(friend);
      setIsMyFriend(true);
    } catch (error) {
      console.log(error);
    }
  };
  //submit delete friend to delete API
  const deleteFriend = async () => {
    try {
      await removeFriend(friend);
      console.log("succesfully remove friend");
      setIsMyFriend(false);
    } catch (error) {
      console.log(error);
    }
  };
  //modal switch
  const [opened, setOpened] = useState<boolean>(false);
  //message data to be sent to api
  const [messageData, setMessageData] = useState<Message>({
    toEmail: userData.email,
    toFName: userData.fName,
    toLName: userData.lName,
    toId: userData.id,
    message: "",
    fromId: userID,
  });
  //message data change handler
  const handleMessageChange = (event: any) => {
    const { name, value } = event?.target;
    setMessageData((prevState) => {
      return {
        ...prevState,
        [name]: value,
      };
    });
  };
  //send data to api
  const handleMessageSubmit = async (e: any) => {
    e.preventDefault();
    try {
      await sendMessage(messageData);
      console.log("Succesfully sent message");
      setOpened(false);
      setMessageData((prevState) => {
        return { ...prevState, message: "" };
      });
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <main className="w-screen h-auto overflow-y-auto">
      <section className="h-28 bg-red-300">This is the banner photo</section>
      <section className="w-full h-30 flex flex-row items-center  absolute z-10 top-14">
        <div className="ml-5 w-28 h-28  flex justify-center items-center bg-green-500">
          R
        </div>
        <div className="mt-10 ml-5">
          {userData.fName + " " + userData.lName}
        </div>
      </section>
      <section className="mt-20 flex justify-around items-center">
        {isMyFriend ? (
          <div
            onClick={deleteFriend}
            className="bg-blue-400 cursor-pointer text-center rounded-xl w-32 "
          >
            Friends
          </div>
        ) : (
          <div
            onClick={addFriend}
            className="cursor-pointer text-center rounded-xl w-32 bg-white"
          >
            Add Friend
          </div>
        )}
        <div
          onClick={() => setOpened(true)}
          className="rounded-xl w-32 bg-white text-center"
        >
          <Modal
            opened={opened}
            onClose={() => setOpened(false)}
            title="Write your post!"
          >
            <form
              onSubmit={handleMessageSubmit}
              className="w-full h-full flex flex-col justify-center items-center"
            >
              <h1>Message to: {userData.fName + " " + userData.lName}</h1>
              <Textarea
                className="w-full"
                label="Content"
                name="message"
                value={messageData.message}
                onChange={handleMessageChange}
                minRows={10}
                maxRows={15}
              />
              <button>Post</button>
            </form>
          </Modal>
          Message
        </div>
      </section>

      <section className="mt-12 h-40 bg-white w-full shadow-sm flex justify-start">
        <h3 className="ml-5">About Me</h3>
      </section>
      <section className="mt-3 bg-white h-40 w-full shadow-sm flex justify-start">
        <h3 className="ml-5">Friends</h3>
      </section>
      <section className="mt-3 bg-white h-40 w-full shadow-sm flex justify-start">
        <h3 className="ml-5">Announcements</h3>
      </section>
      <h1 className="flex items-center justify-center h-14">
        {userData.fName + " " + userData.lName}'s Posts
      </h1>
      <section className="mt-5 h-auto ">
        <PostList postData={postData} setPostData={setPostData} />
      </section>
    </main>
  );
}
