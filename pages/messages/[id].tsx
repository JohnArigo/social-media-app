import { Textarea, Button } from "@mantine/core";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import prisma from "../../lib/prisma";
import { Message, User } from "../../lib/types";

export async function getStaticPaths() {
  const messages = await prisma.message.findMany();
  //fix type?
  const paths = messages.map((message: Message) => {
    return { params: { id: message.toId + message.toFName + message.toLName } };
  });

  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps(context: any) {
  const userID = parseInt(context.params.id.slice(0, 1));
  const user = await prisma.user.findUnique({
    select: {
      id: true,
      email: true,
      fName: true,
      lName: true,
    },
    where: {
      id: userID,
    },
  });
  return {
    props: {
      user: user,
    },
  };
}

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

export default function UserConversation({ user }: any) {
  //NEED USE REF TO SCROLL TO BOTTOM
  const toId: number = user.id;
  const { data: session } = useSession();
  const userId: number = parseInt(session?.user?.name?.toString()!);
  const [messages, setMessages] = useState<Message[]>([
    {
      fromId: userId,
      message: "Initial",
      toEmail: "FakeEmail@fake.com",
      toFName: "Joe",
      toImage: "",
      toId: 0,
      toLName: "Doe",
    },
  ]);

  useEffect(() => {
    fetch(`../api/findConversation/${userId}/${toId}`)
      .then((res) => res.json())
      .then((data) => setMessages(data));
  }, []);

  const [messageData, setMessageData] = useState<Message>({
    toEmail: user.email,
    toFName: user.fName,
    toLName: user.lName,
    toImage: "",
    toId: user.id,
    message: "",
    fromId: userId,
  });

  useEffect(() => {
    fetch(`../../api/findUserImage/${userId}`)
      .then((res) => res.json())
      .then((data) =>
        setMessageData((prevState) => {
          return { ...prevState, toImage: data.image };
        })
      );
  }, []);

  const handleChange = (event: any) => {
    setMessageData((prevState) => {
      return { ...prevState, message: event?.target.value };
    });
  };

  const handleMessageSubmit = async (e: any) => {
    e.preventDefault();
    try {
      await sendMessage(messageData);
      console.log("Succesfully sent message");
      setMessageData((prevState) => {
        return { ...prevState, message: "" };
      });
      //USE REF TO BOTTOM
      setMessages((prevState) => {
        return [...prevState, messageData];
      });
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <main className="w-screen h-screen flex flex-col items-center text-info-content">
      <section className="flex flex-col items-center overflow-y-auto mb-44 ">
        {messages.map((message) => {
          const messageStyle = () => {
            if (message.fromId === userId) {
              return "rounded-lg flex flex-row-reverse items-center self-end w-auto h-48 bg-base-content text-info-content mt-5 pl-5";
            } else {
              return "rounded-lg flex items-center self-start w-auto h-48 bg-base-content text-info-content mt-5 pr-5";
            }
          };

          return (
            <div className={messageStyle()} key={message.id}>
              <div className="w-20 ml-2">
                <div className="rounded-full w-14 h-14 bg-green-500 flex justify-center items-center">
                  <img
                    className="rounded-full w-14 h-14"
                    src={message?.toImage!}
                  />
                </div>
              </div>
              <div className="flex flex-col justify-center">
                {message.fromId === userId ? null : (
                  <div>{message.toFName}</div>
                )}
                <div>{message.message}</div>
              </div>
            </div>
          );
        })}
      </section>
      <form className="rounded-lg self-center fixed bottom-20 w-96 h-20 flex justify-center items-center bg-gray-400">
        <Textarea
          onChange={handleChange}
          value={messageData.message}
          className="w-3/4 h-3/4"
        />
        <Button onClick={handleMessageSubmit}>Submit</Button>
      </form>
    </main>
  );
}
