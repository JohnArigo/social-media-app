import { Menu } from "@mantine/core";
import { IconSettings, IconUser, IconLogout } from "@tabler/icons";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useState, useEffect } from "react";
import { portType, User } from "../lib/types";
import { NextLink } from "@mantine/next";
import Image from "next/image";

export type HeaderSessionType = {
  setOpened: any;
  user: User[];
  portSize: portType;
};
export default function HeaderSession({
  setOpened,
  user,
  portSize,
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
  if (portSize?.width! > 860) {
    return (
      <main className="z-20 top-0 fixed w-full h-20 bg-accent text-neutral flex flex-row justify-around items-center">
        <section className="w-1/6 h-full flex items-center" role="search">
          <input />
        </section>
        <section
          role="link-holder"
          className="flex justify-between items-center w-1/3 h-full"
        >
          <Link href="/home">
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
              <img className="ml-3 h-10 w-10 rounded-full" src={userImage} />
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
      <main className=" bottom-0 fixed w-full h-20 bg-accent text-neutral flex flex-row justify-around items-center">
        <Link href="/home">
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
          <Menu.Dropdown>
            <Menu.Label>Go to...</Menu.Label>
            <Menu.Item
              icon={<IconSettings size={14} />}
              component={NextLink}
              href={"/settings"}
            >
              Settings
            </Menu.Item>
            <Menu.Item
              icon={<IconUser size={14} />}
              component={NextLink}
              href={`/userProfile/myProfile`}
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
