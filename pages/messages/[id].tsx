import { Textarea, Button } from "@mantine/core";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import prisma from "../../lib/prisma";
import { Message, User } from "../../lib/types";

export async function getStaticPaths() {
  const messages = await prisma.message.findMany();

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

export default function UserConversation({ user }: any) {
  const toId: number = user.id;
  const { data: session } = useSession();
  const userId: number = parseInt(session?.user?.name?.toString()!);
  const [messages, setMessages] = useState<Message[]>([
    {
      fromId: userId,
      message: "Initial",
      toEmail: "FakeEmail@fake.com",
      toFName: "Joe",
      toId: 0,
      toLName: "Doe",
    },
  ]);
  useEffect(() => {
    fetch(`../api/findConversation/${userId}/${toId}`)
      .then((res) => res.json())
      .then((data) => setMessages(data));
  });

  return (
    <main className="w-screen h-screen">
      <section className="flex flex-col items-center overflow-y-auto">
        {messages.map((message) => {
          const messageStyle = () => {
            if (message.fromId === userId) {
              return "rounded-lg flex flex-row-reverse items-center justify-start w-96 h-28 bg-green-200 mt-5";
            } else {
              return "rounded-lg flex items-center justify-start w-96 h-28 bg-green-200 mt-5";
            }
          };
          return (
            <div className={messageStyle()}>
              <div className="w-20 ml-2">
                {" "}
                <div className="rounded-full w-14 h-14 bg-green-500 flex justify-center items-center">
                  {message.toFName.charAt(0)}
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
      <form className="h-40 flex justify-center items-center bg-red-500 pt-16 pb-32">
        <Textarea />
        <Button>Submit</Button>
      </form>
    </main>
  );
}
