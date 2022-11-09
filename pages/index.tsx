import { Textarea, TextInput } from "@mantine/core";
import { getSession, useSession } from "next-auth/react";
import { useEffect, useMemo, useState } from "react";
import PostList from "../components/postList";

import prisma from "../lib/prisma";
import { postType, User } from "../lib/types";
import { UserArray } from "./userProfile/[id]";

export default function Home() {
  const { data: session } = useSession();
}
