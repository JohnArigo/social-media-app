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

declare global {
  interface Window {
    cloudinary: any;
  }
}

export default function App({
  Component,
  pageProps,
}: AppProps<{ session: Session }>) {
  const [opened, setOpened] = useState(false);
  const [searchValue, setSearchValue] = useState<string>("");
  const [search, setSearch] = useState<boolean>(false);
  return (
    <SessionProvider session={pageProps.session}>
      <Header
        setOpened={setOpened}
        searchValue={searchValue}
        setSearchValue={setSearchValue}
        setSearch={setSearch}
      />
      <Modal
        transition="fade"
        transitionDuration={600}
        transitionTimingFunction="ease"
        opened={opened}
        onClose={() => setOpened(false)}
        title={"Write your Post!"}
      >
        <CreatePost setOpened={setOpened} />
      </Modal>
      <Component test={searchValue} search={search} {...pageProps} />
    </SessionProvider>
  );
}
