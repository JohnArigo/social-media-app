import "../styles/globals.css";
import { getSession, SessionProvider, useSession } from "next-auth/react";
import type { AppProps } from "next/app";
import Header from "../components/header";
import { Session } from "next-auth";
import { Modal } from "@mantine/core";
import { useEffect, useState } from "react";
import CreatePost from "../components/createPost";
import prisma from "../lib/prisma";
import { portType, postType, User } from "../lib/types";

//initial user props
export async function getServerSideProps() {
  const session = await getSession();
  const posts = await prisma.post.findMany({
    include: {
      author: true,
    },
  });
  const user = await prisma.user.findUnique({
    where: {
      email: session?.user?.email!,
    },
  });
  return {
    props: {
      posts: posts,
      user: user,
    },
  };
}

declare global {
  interface Window {
    cloudinary: any;
  }
}

export default function App({
  Component,
  pageProps,
}: AppProps<{ session: Session; user: User[]; posts: postType[] }>) {
  const [opened, setOpened] = useState(false);
  const [searchValue, setSearchValue] = useState<string>("");
  return (
    <SessionProvider session={pageProps.session}>
      <Header
        setOpened={setOpened}
        test={searchValue}
        setTest={setSearchValue}
      />
      <Modal
        transition="fade"
        transitionDuration={600}
        transitionTimingFunction="ease"
        opened={opened}
        onClose={() => setOpened(false)}
        title={"Write your Post!"}
      >
        <CreatePost user={pageProps.user} />
      </Modal>
      <Component test={searchValue?.toString()} {...pageProps} />
    </SessionProvider>
  );
}
