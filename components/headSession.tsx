import { Menu, Modal } from "@mantine/core";
import {
  IconSettings,
  IconUser,
  IconLogout,
  IconSearch,
  IconExplicitOff,
} from "@tabler/icons";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useState, useEffect } from "react";
import { portType, User } from "../lib/types";
import { NextLink } from "@mantine/next";
import Image from "next/image";
import Head from "next/head";
import { useRouter } from "next/router";

export type HeaderSessionType = {
  setOpened: any;
  searchValue: string;
  setSearchValue: React.Dispatch<React.SetStateAction<string>>;
  portSize: portType;
  setSearch: React.Dispatch<React.SetStateAction<boolean>>;
};
export default function HeaderSession({
  setOpened,
  searchValue,
  setSearchValue,
  portSize,
  setSearch,
}: HeaderSessionType) {
  const { data: session } = useSession();
  const userID = parseInt(session?.user?.name?.toString()!);
  const [userImage, setUserImage] = useState<string>("initial");

  useEffect(() => {
    fetch(`../api/findUserImage/${userID}`)
      .then((res) => res.json())
      .then((data) => {
        setUserImage(data.image);
      });
  }, []);
  const router = useRouter();
  const [openSearch, setOpenSearch] = useState(false);
  const handleSearch = () => {
    setSearch(true);
    setOpenSearch(false);
    router.push("../search");
  };
  if (portSize?.width! > 760) {
    return (
      <main className="z-50 top-0 fixed w-full h-16 bg-gradient-to-r from-accent via-accent to-gray-100 text-neutral flex flex-row justify-around items-center">
        <section className="w-1/6  h-full flex items-center" role="search">
          <Head>
            <link rel="preconnect" href="https://fonts.googleapis.com" />

            <link
              href="https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,400;1,400;1,500&display=swap"
              rel="stylesheet"
            />
          </Head>
          {openSearch ? null : (
            <Link href={`../`}>
              <h1 className="text-gray-100 mr-5 text-md font-roboto font-extrabold cursor-pointer flex">
                Social Media App
              </h1>
            </Link>
          )}
          {openSearch ? (
            <div className="flex items-center">
              <input
                className="bg-white h-8 w-40 mr-5 rounded-lg"
                value={searchValue}
                onChange={(event) => setSearchValue(event?.target.value)}
                placeholder="search site content"
              />
              <IconSearch size={15} onClick={handleSearch} />
            </div>
          ) : (
            <IconSearch size={20} onClick={() => setOpenSearch(true)} />
          )}
        </section>
        <section
          role="link-holder"
          className="flex justify-between items-center w-1/3 h-full "
        >
          <Link href="/feed">
            <div className="cursor-pointer">Home</div>
          </Link>

          <Link href="/explore">
            <div className="cursor-pointer">Explore</div>
          </Link>

          <div onClick={() => setOpened(true)}>
            <div className="cursor-pointer">Post</div>
          </div>
          <Link href={"/messages"}>
            <div className="cursor-pointer">Messages</div>
          </Link>
        </section>
        <section
          role="user-links"
          className="flex justify-end items-center w-1/6 h-full"
        >
          <Menu>
            <Menu.Target>
              <img
                className="ml-3 h-10 w-10 rounded-full bg-white cursor-pointer"
                src={userImage}
              />
            </Menu.Target>
            <Menu.Dropdown>
              <Menu.Item
                icon={
                  <img className="ml-3 h-5 w-5 rounded-full" src={userImage} />
                }
                component={NextLink}
                href={`/userProfile/myProfile`}
              >
                Profile
              </Menu.Item>
              <Menu.Label>Danger Zone</Menu.Label>
              <Menu.Item
                icon={<IconSettings size={14} />}
                component={NextLink}
                href={"/settings"}
              >
                Settings
              </Menu.Item>{" "}
              <Menu.Item
                icon={<IconLogout size={14} />}
                component={NextLink}
                href={"../api/auth/signout"}
              >
                Logout
              </Menu.Item>
            </Menu.Dropdown>
          </Menu>
        </section>
      </main>
    );
  } else {
    return (
      <main className="z-50 bottom-0 fixed w-full h-16 bg-accent text-neutral flex flex-row justify-around items-center">
        <Link href="/feed">
          <div>Home</div>
        </Link>
        <Link href="/explore">
          <div>Explore</div>
        </Link>

        <div onClick={() => setOpened(true)}>
          <div>Post</div>
        </div>
        <Link href={"/messages"}>
          <div>Messages</div>
        </Link>

        <Menu position="top" transition="rotate-left">
          <Menu.Target>
            <div>User</div>
          </Menu.Target>

          <Menu.Dropdown className="z-50">
            <Menu.Label>Go to...</Menu.Label>
            <Menu.Item
              icon={<IconSearch size={14} />}
              component={NextLink}
              href={"../search"}
            >
              Search
            </Menu.Item>
            <Menu.Item
              icon={<IconSettings size={14} />}
              component={NextLink}
              href={"../settings"}
            >
              Settings
            </Menu.Item>
            <Menu.Item
              icon={<IconUser size={14} />}
              component={NextLink}
              href={`../userProfile/myProfile`}
            >
              Profile
            </Menu.Item>

            <Menu.Divider />
            <Menu.Label>Danger Zone</Menu.Label>
            <Menu.Item
              icon={<IconLogout size={14} />}
              component={NextLink}
              href={"../api/auth/signout"}
            >
              Logout
            </Menu.Item>
          </Menu.Dropdown>
        </Menu>
      </main>
    );
  }
}
