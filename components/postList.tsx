import Link from "next/link";
import { useState, useEffect } from "react";
import { Likes, portType, postType, User } from "../lib/types";
import defaultPhoto from "../images/defaultPhoto.jpeg";
import Image from "next/image";
import {
  IconMessage,
  IconMessageDots,
  IconThumbUp,
  IconThumbUpOff,
} from "@tabler/icons";
import { useSession } from "next-auth/react";
import Posts from "./posts";

export type postDataType = {
  postData: postType[];
  setPostData: any;
  userData?: User;
  //(value: SetStateAction<postType[]>) => void
  //FIND WHY THIS IS A TYPE ERROR
};

export default function PostList({
  postData,
  setPostData,
  userData,
}: postDataType) {
  const [userLikes, setUserLikes] = useState<Likes[] | undefined>(
    userData?.like
  );

  return (
    <section className="text-info-content shadow-sm pb-20 h-full w-full flex flex-col justify-start items-center overflow-y-auto overflow-x-hidden">
      {/* individual post */}
      {postData?.map((post: postType, index: number) => {
        return <Posts key={index} post={post} userData={userData!} />;
      })}
    </section>
  );
}
