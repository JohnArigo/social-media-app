import { Textarea, TextInput } from "@mantine/core";
import { getSession, useSession } from "next-auth/react";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { Message, postType, User } from "../../lib/types";

export default function Home() {
  const { data: session } = useSession();
  const userID = parseInt(session?.user?.name?.toString()!);
  const [userMessages, setUserMessages] = useState<Message[]>([
    {
      fromId: userID,
      message: "Initial",
      toEmail: "FakeEmail@fake.com",
      toFName: "Joe",
      toImage: "",
      toId: 0,
      toLName: "Doe",
    },
  ]);
  console.log(userMessages);
  useEffect(() => {
    fetch(`./api/findUserMessages/${userID}`)
      .then((res) => res.json())
      .then((data) => setUserMessages(data));
  }, []);

  return (
    <main className="w-screen h-screen text-info-content md:mt-20">
      <h1 className="text-center text-2xl font-bold text-info mt-10">
        Messages
      </h1>
      <section className="flex flex-col items-center overflow-y-auto pb-20">
        {userMessages.map((message: Message) => {
          if (message.toId)
            return (
              <Link
                href={`./messages/${message.toId}${message.toFName}${message.toLName}`}
              >
                <div
                  className="bg-base-content text-info-content mt-5 shadow-md rounded-lg flex items-center h-24 w-96 "
                  key={message.toId}
                >
                  <div className="w-28 flex justify-center items-center">
                    <div className="rounded-full w-14 h-14 flex justify-center items-center">
                      <img className="rounded-full" src={message.toImage!} />
                    </div>
                  </div>
                  <div className=" h-full flex flex-col justify-center">
                    <h1 className="text-lg font-bold">
                      {message.toFName + " " + message.toLName}
                    </h1>
                    <div className="text-sm">Open Conversation</div>
                  </div>
                </div>
              </Link>
            );
        })}
      </section>
    </main>
  );
}
