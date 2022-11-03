import { getSession, useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import PostList from "../../components/postList";
import prisma from "../../lib/prisma";
import { postType, User } from "../../lib/types";

// export async function getStaticProps() {
//   const session = await getSession();

//   const user = await prisma.user.findMany({
//     where: {
//       email: session?.user?.email!,
//     },
//     include: {
//       posts: {
//         include: {
//           author: true,
//         },
//       },
//     },
//   });
//   return {
//     props: {
//       user: user,
//     },
//   };
// }
export type UserArray = {
  user: User[];
  users?: User[];
};

export default function Home({ user }: UserArray) {
  //find session to fetch userData
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

  //   useEffect(() => {
  //     user.filter((user: User) => {
  //       if (user.email === session?.user?.email!) {
  //         setUserData(user);
  //       }
  //     });
  //   }, [userData]);

  //post data to pass into postList component
  const [postData, setPostData] = useState<postType[]>(userData.posts!);

  //set post data only if data from session is valid
  useEffect(() => {
    if (userData.fName !== undefined) {
      setPostData(userData.posts!);
    }
  }, [userData]);

  //contingency for bad data load
  if (userData.email === undefined) {
    return (
      <main>
        <h1>Unable to load page, please try again later</h1>
      </main>
    );
  }
  //render
  else
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

        <section className="mt-32 h-40 bg-white w-full shadow-sm flex-col flex items-start justify-start">
          <div className="self-end text-gray-300">edit</div>
          <h3 className="ml-5">About Me</h3>
        </section>
        <section className="mt-3 bg-white h-40 w-full shadow-sm flex flex-col items-start justify-start">
          <div className="self-end text-white">EASTER EGG</div>
          <h3 className="ml-5">Friends</h3>
        </section>
        <section className="mt-3 bg-white h-40 w-full shadow-sm flex flex-col items-start justify-start">
          <div className="self-end text-gray-300">edit</div>
          <h3 className="ml-5">Announcements</h3>
        </section>
        <h1 className="flex items-center justify-center h-14">
          {userData.fName + " " + userData.lName}'s Posts
        </h1>
        <section className="mt-5 h-auto">
          <PostList postData={postData} setPostData={setPostData} />
        </section>
      </main>
    );
}
