import {
  Button,
  Collapse,
  Modal,
  Switch,
  Textarea,
  TextInput,
  Text,
} from "@mantine/core";
import { getSession, useSession } from "next-auth/react";
import Link from "next/link";
import Router, { useRouter } from "next/router";
import { useState, useEffect } from "react";
import PostList from "../../components/postList";
import prisma from "../../lib/prisma";
import {
  currentUser,
  Friend,
  HomeType,
  Message,
  postType,
  User,
} from "../../lib/types";

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
      friends: {
        include: {
          friendInfo: {
            select: {
              image: true,
              fName: true,
              lName: true,
              email: true,
              id: true,
            },
          },
        },
      },
    },
  });
  return {
    props: {
      user: user,
      revalidate: 10,
    },
  };
}

//add friend api
async function newFriend(sendingPackage: Friend) {
  const response = await fetch("../api/friendCalls/addFriend", {
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
  const response = await fetch("../api/friendCalls/removeFriend", {
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

export default function Home({ user }: any) {
  const { data: session } = useSession();
  const userID = parseInt(session?.user?.name!.toString()!);
  const userImage = session?.user?.image!;

  //initial session user
  const initialFriend = [
    {
      friendFirstName: "First",
      friendId: 0,
      friendLastName: "Last",
      id: 0,
      ownerId: 0,
      relationshipId: "",
    },
  ];

  const initialUser: User = {
    id: 0,
    fName: "first",
    lName: "last",
    email: "",
    posts: [],
    friends: [],
  };
  //session user state/data to pull
  const [currentUser, setCurrentUser] = useState<currentUser>({
    friends: initialFriend,
    id: userID,
    email: session?.user?.email!,
    image: session?.user?.image!,
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
  const router = useRouter();
  const profileId = router?.query?.id?.slice(0, 1);
  console.log(profileId);
  useEffect(() => {
    fetch(`../api/findUser/${profileId}`)
      .then((res) => res.json())
      .then((data) => setUserData(data));
  }, [profileId]);
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
    image: userData.image,
    friendId: userData.id,
    friendFirstName: userData.fName,
    friendLastName: userData.lName,
    ownerId: userID,
    relationshipId: (
      userData.id +
      userID +
      userData.email +
      userData.fName +
      userData.lName +
      userID
    ).toString(),
  });

  console.log(friend);
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
    toImage: currentUser.image,
    toId: userData.id,
    message: "",
    fromId: userID,
  });
  useEffect(() => {
    setMessageData((prevState) => {
      return {
        ...prevState,
        toImage: currentUser.image,
      };
    });
  }, [currentUser]);

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

  //modal openers
  const [aboutText, setAboutText] = useState(false);
  const [flexText, setFlexText] = useState(false);

  const filterFriends = () => {
    if (userData.friends.length > 4) {
      return userData.friends.splice(3);
    } else return userData.friends;
  };
  return (
    <main className="bg-base-200 w-screen h-auto overflow-y-auto text-info-content">
      {/* {Header Section} */}
      <section className="h-32 bg-red-300">
        <img className="h-32 w-full bg-red-300" src={userData.banner} />
      </section>
      {/* {Profile Image and Name} */}
      <section className="w-full  h-30 flex flex-row items-center  absolute z-10 top-14">
        <div className="ml-5 w-28 h-28  flex justify-center items-center bg-white">
          <img src={userData.image} />
        </div>
        <div className="mt-16 ml-5 text-info text-xl">
          {userData.fName + " " + userData.lName}
        </div>
      </section>
      <section className="mt-20 flex justify-around items-center">
        {isMyFriend ? (
          <div
            onClick={deleteFriend}
            className="bg-primary cursor-pointer text-center rounded-xl w-32 "
          >
            Following
          </div>
        ) : (
          <div
            onClick={addFriend}
            className="cursor-pointer text-center rounded-xl w-32 bg-white"
          >
            Follow
          </div>
        )}
        <div
          onClick={() => setOpened(true)}
          className="rounded-xl w-32 bg-secondary text-center"
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
      {/* {About me} */}
      <section className="mt-24 bg-base-content text-info-content pb-16 max-h-80  w-full shadow-sm flex-col flex items-start justify-start overflow-y-scroll">
        <h3 className="ml-5 mt-5">About Me</h3>
        <div>
          <Collapse in={aboutText}>
            {userData.about}
            <div onClick={() => setAboutText(false)}>See less</div>
          </Collapse>
          {aboutText ? null : <Text lineClamp={3}>{userData.about}</Text>}
          {userData.about!.length > 130 ? (
            <div className="text-accent" onClick={() => setAboutText(true)}>
              {aboutText ? null : "See More"}
            </div>
          ) : null}
        </div>
      </section>
      {/* {Friend list NEED TO MAP AND OPEN PAGE TO SEE ALL FRIENDS} */}
      <section className="mt-3 bg-base-content h-40 w-full shadow-sm flex flex-col items-start justify-start">
        <div className="self-end text-base-content">EASTER EGG</div>
        <h3 className="ml-5">Following</h3>
        <Text
          lineClamp={1}
          className="flex flex-wrap flex-row w-96 h-full justify-start items-center"
        >
          {filterFriends().map((friendInfo: Friend) => {
            const friend = friendInfo.friendInfo;
            const handleClick = () => {
              router.push(
                `../userProfile/${friend?.id}${friend?.fName}${friend?.lName}${friend?.id}69`
              );
            };
            return (
              <div
                onClick={handleClick}
                className="h-24 w-28 flex flex-col justify-center items-center "
              >
                <div className="rounded-full w-14 h-14  flex justify-center items-center">
                  <img src={friend?.image} />
                </div>
                <h1>{friend?.fName + " " + friend?.lName}</h1>
              </div>
            );
          })}
        </Text>
      </section>
      {/* {Flex announcements} */}
      <section className="mt-3 pb-16 bg-base-content text-info-content max-h-80 overflow-y-auto w-full shadow-sm flex flex-col items-start justify-start">
        <h3 className="ml-5 mt-5">Announcements</h3>
        <Collapse in={flexText}>
          {userData.flex}
          <div onClick={() => setFlexText(false)}>See less</div>
        </Collapse>
        {flexText ? null : <Text lineClamp={3}>{userData.flex}</Text>}
        {userData.flex!.length > 130 ? (
          <div onClick={() => setFlexText(true)}>
            {flexText ? null : "See More"}
          </div>
        ) : null}
      </section>
      {/* {Posts} */}
      <h1 className="flex items-center justify-center h-14 text-info">
        {userData.fName + " " + userData.lName}'s Posts
      </h1>
      <section className="mt-5 h-auto ">
        <PostList postData={postData} setPostData={setPostData} />
      </section>
    </main>
  );
}
