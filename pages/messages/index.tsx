import { Textarea, TextInput } from "@mantine/core";
import { getSession, useSession } from "next-auth/react";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { Message, postType, User } from "../../lib/types";

export default function Home() {
  const { data: session } = useSession();
  const userID = parseInt(session?.user?.name?.toString()!);
  const [user, setUser] = useState<User>({
    id: 0,
    email: "test@test",
    fName: "first",
    lName: "last",
  });

  useEffect(() => {
    fetch(`./api/findUserMessages/${userID}`)
      .then((res) => res.json())
      .then((data) => setUser(data));
  }, []);
  console.log(user);
  return (
    <main className="bg-base-200 w-screen h-screen text-info-content md:pt-20">
      <h1 className="text-center text-2xl font-bold text-info pt-10">
        Messages
      </h1>
      <section className="flex flex-col items-center overflow-y-auto pb-20">
        {user.messages?.map((message: Message) => {
          // const [userImage, setUserImage] = useState<string | undefined>();
          console.log(message);
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
                      {message.toId === userID ? (
                        <img
                          className="rounded-full"
                          src={message.from?.image}
                        />
                      ) : (
                        <img
                          className="rounded-full"
                          src={message.toUser?.image}
                        />
                      )}
                    </div>
                  </div>
                  <div className=" h-full flex flex-col justify-center">
                    <h1 className="text-lg font-bold">
                      {message.toId === userID
                        ? message.from?.fName! + " " + message.from?.lName!
                        : message.toFName + " " + message.toLName}
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
