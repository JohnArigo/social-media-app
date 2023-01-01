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

export type postsProps = {
  post: postType;
  userData: User;
  key: number;
};

async function sendComment(sendingPackage: Comment) {
  const response = await fetch("../api/postInteraction/comment", {
    method: "POST",
    body: JSON.stringify(sendingPackage),
  });
  if (!response.ok) {
    throw new Error(response.statusText);
  }
  return await response.json();
}

async function likePost(sendingPackage: Likes) {
  const response = await fetch("../api/postInteraction/like", {
    method: "POST",
    body: JSON.stringify(sendingPackage),
  });
  if (!response.ok) {
    throw new Error(response.statusText);
  }
  return await response.json();
}

async function unlikePost(sendingPackage: Likes) {
  const response = await fetch("../api/postInteraction/unlike", {
    method: "POST",
    body: JSON.stringify(sendingPackage),
  });
  if (!response.ok) {
    throw new Error(response.statusText);
  }
  return await response.json();
}

export const Posts = ({ post, userData, key }: postsProps) => {
  const [comment, setComment] = useState<string>("");
  //opens comments on click of comment icon
  const [openComment, setOpenComment] = useState<boolean>(false);
  //enables color change if user likes post
  const [like, setLike] = useState<boolean>(false);
  //store like count
  const [likeCount, setLikeCount] = useState<number | undefined>(
    post.likes?.length
  );
  //stores like data for user
  const [likeToDelete, setLikeToDelete] = useState<Likes>();
  //stores post data for user to like
  const [postToLike, setPostToLike] = useState<Likes>({
    postId: post.id!,
    userId: userData?.id,
  });
  //find if user already liked post
  useEffect(() => {
    post.likes?.filter((like: Likes) => {
      if (like.user?.id === userData.id) {
        setLike(true);
        setLikeToDelete(like);
        return true;
      } else false;
    });
  }, [post]);

  //handles like button click
  const handleLike = async () => {
    if (like) {
      setLike(false);
      setLikeCount(likeCount! - 1);
      try {
        await unlikePost(likeToDelete!);
        console.log("success");
      } catch (error) {
        console.log(error);
      }
    } else {
      setLike(true);
      setLikeCount(likeCount! + 1);
      try {
        await likePost(postToLike);
        console.log("success");
      } catch (error) {
        if (error) {
          console.log(error);
        }
      }
    }
  };

  const handleComment = async () => {};

  if (post.published) {
    return (
      <div
        className="w-96 h-96 sm:w-1/2 md:1/2 lg:w-5/12 xl:1/3 bg-base-content rounded-lg mt-5 flex flex-col"
        key={post?.title + post.authorId}
      >
        <div className="self-end text-xs text-base-content">Egg</div>

        <Link href={`/userProfile/${post.authorId}`}>
          <div className="flex flex-row mt-3 ml-2 h-1/6 items-center">
            <div className="w-1/4">
              <div className=" rounded-full h-16 w-16 flex justify-center items-center cursor-pointer">
                {post?.author?.image ? (
                  <img
                    className=" rounded-full h-16 w-16 "
                    src={post?.author?.image}
                  />
                ) : (
                  <Image
                    className="rounded-full"
                    height={64}
                    width={64}
                    src={defaultPhoto}
                  />
                )}
              </div>
            </div>
            <div>{post?.author?.fName + " " + post?.author?.lName}</div>
          </div>
        </Link>

        <div className="ml-2 mt-5 w-full text-xl">{post.title}</div>
        <div className="ml-2 max-h-2/3 overflow-y-auto mb-5">
          {post.content}
        </div>
        {likeCount !== undefined && likeCount > 0 ? (
          <div className="ml-3 flex items-center">
            <IconThumbUp size={15} color="blue" />
            <h4>{likeCount}</h4>
          </div>
        ) : null}
        <div className="w-full flex justify-around text-xs border-y border-gray-500 py-2">
          <div
            onClick={handleLike}
            className="w-1/4 flex justify-center items-center"
          >
            <IconThumbUp size={30} color={like ? "blue" : "black"} />
            <h4>Like</h4>
          </div>
          <div
            onClick={() => setOpenComment((prevState) => !prevState)}
            className="w-1/4 flex justify-center items-center"
          >
            <IconMessageDots
              size={30}
              onClick={() => {
                setOpenComment(true);
              }}
            />
            <h4>Comments</h4>
          </div>
          <div className="w-1/4 flex justify-center items-center">
            <IconMessage size={30} />
            <h4>Direct Message</h4>
          </div>
        </div>

        <div className="w-full flex justify-center items-center mt-2">
          <input
            className="bg-white shadow-md h-14 w-5/6 rounded-lg mt-2"
            type="text"
            value={comment}
            onChange={(e) => {
              setComment(e.target.value);
            }}
          />
          <button className="ml-2">Post</button>
        </div>
        {openComment ? (
          <div>This is where the comments will be iterated</div>
        ) : null}
      </div>
    );
  } else return null;
};

export default Posts;
