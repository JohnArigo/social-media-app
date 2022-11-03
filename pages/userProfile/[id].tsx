import { getSession, useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import PostList from "../../components/postList";

import prisma from "../../lib/prisma";
import { postType, User } from "../../lib/types";

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
  //   const myID = () => {
  //     const { id } = query;
  //     const myID = parseInt(id?.toString()!.slice(0, 1)!);
  //     return myID;
  //   };
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

export default function Home({ user }: any) {
  console.log(user);
  const { data: session } = useSession();
  const userID = parseInt(session?.user?.name?.toString()!);
  const [userData, setUserData] = useState<User>(user);

  //   useEffect(() => {
  //     user.filter((user: User) => {
  //       if (user.email === session?.user?.email!) {
  //         setUserData(user);
  //       }
  //     });
  //   }, [user]);

  const profile = userData;

  const [postData, setPostData] = useState<postType[]>(userData.posts!);

  return (
    <main className="w-screen h-auto overflow-y-auto">
      <section className="h-28 bg-red-300">This is the banner photo</section>
      <section className="w-full h-30 flex flex-row items-center  absolute z-10 top-14">
        <div className="ml-5 w-28 h-28  flex justify-center items-center bg-green-500">
          R
        </div>
        <div className="mt-10 ml-5">{profile.fName + " " + profile.lName}</div>
      </section>

      <section className="mt-32 h-40 bg-white w-full shadow-sm flex justify-start">
        <h3 className="ml-5">About Me</h3>
      </section>
      <section className="mt-3 bg-white h-40 w-full shadow-sm flex justify-start">
        <h3 className="ml-5">Friends</h3>
      </section>
      <section className="mt-3 bg-white h-40 w-full shadow-sm flex justify-start">
        <h3 className="ml-5">Announcements</h3>
      </section>
      <h1 className="flex items-center justify-center h-14">
        {profile.fName + " " + profile.lName}'s Posts
      </h1>
      <section className="mt-5 h-auto ">
        <PostList postData={postData} setPostData={setPostData} />
      </section>
    </main>
  );
}
