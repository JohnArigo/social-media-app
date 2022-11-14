import { Menu } from "@mantine/core";
import { IconSettings, IconUser, IconLogout } from "@tabler/icons";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useState, useEffect } from "react";
import { User } from "../lib/types";
import { NextLink } from "@mantine/next";

export type HeaderSessionType = {
  setOpened: any;
  user: User[];
};
export default function HeaderSession({ setOpened, user }: HeaderSessionType) {
  const { data: session, status } = useSession();

  return (
    <main className="bottom-0 fixed w-full h-20 bg-accent text-neutral flex flex-row justify-around items-center">
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
            href={"./settings"}
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
