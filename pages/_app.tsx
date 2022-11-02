import "../styles/globals.css";
import { getSession, SessionProvider, useSession } from "next-auth/react";
import type { AppProps } from "next/app";
import Header from "../components/header";
import { Session } from "next-auth";
import { Modal } from "@mantine/core";
import { useEffect, useState } from "react";
import CreatePost from "../components/createPost";
import prisma from "../lib/prisma";
import { User } from "../lib/types";

// export async function getServerSideProps() {
//   const session = await getSession();
//   const user = await prisma.user.findMany({
//     where: {
//       email: session?.user?.email!,
//     },
//   });

//   return {
//     props: {
//       user: user,
//     },
//   };
// }

export default function App({
  Component,
  pageProps,
}: AppProps<{ session: Session; user: User[] }>) {
  const [opened, setOpened] = useState(false);
  return (
    <SessionProvider session={pageProps.session}>
      <Modal
        opened={opened}
        onClose={() => setOpened(false)}
        title="Write your post!"
      >
        <CreatePost user={pageProps.user} />
      </Modal>
      <Component {...pageProps} user={pageProps.user} />
      <Header setOpened={setOpened} />
    </SessionProvider>
  );
}
