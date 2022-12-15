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

export type postDataType = {
  postData: postType[];
  setPostData: any;
  userData: User;
  //(value: SetStateAction<postType[]>) => void
  //FIND WHY THIS IS A TYPE ERROR
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

export default function PostList({
  postData,
  setPostData,
  userData,
}: postDataType) {
  const [userLikes, setUserLikes] = useState<Likes[] | undefined>(
    userData.like
  );

  return (
    <section className="text-info-content shadow-sm pb-20 h-full w-full flex flex-col justify-start items-center overflow-y-auto overflow-x-hidden">
      {/* individual post */}
      {postData?.map((post: postType, index: number) => {
        const [comment, setComment] = useState<string>("");
        //opens comments on click of comment icon
        const [openComment, setOpenComment] = useState<boolean>(false);

        //enables color change if user likes post
        const [like, setLike] = useState<boolean>(false);
        //stores like data for user
        const [likeToDelete, setLikeToDelete] = useState<Likes>();
        //stores post data for user to like
        const [postToLike, setPostToLike] = useState<Likes>({
          postId: post.id!,
          userId: userData.id,
        });

        useEffect(() => {
          post.likes?.filter((like: Likes) => {
            if (like.user?.id === userData.id) {
              setLike(true);
              setLikeToDelete(like);
              return true;
            } else false;
          });
        }, [postData]);

        //handles like button click
        const handleLike = async () => {
          if (like) {
            setLike(false);
            try {
              await unlikePost(likeToDelete!);
              console.log("success");
            } catch (error) {
              console.log(error);
              setLike(true);
            }
          } else {
            setLike(true);
            try {
              await likePost(postToLike);
              console.log("success");
            } catch (error) {
              setLike(false);
              console.log(error);
            }
          }
        };

        if (post.published) {
          return (
            <div
              className="w-96 h-96 sm:w-1/2 md:1/3 lg:w-1/3 bg-base-content rounded-lg mt-5 flex flex-col"
              key={post?.title + post.authorId + index}
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
              <div className="ml-3 flex items-center">
                <IconThumbUp size={15} color="blue" />
                <h4>{post.likes?.length}</h4>
              </div>
              <div className="w-full flex justify-around text-xs border-y border-gray-500 py-2">
                <div
                  onClick={handleLike}
                  className="w-1/4 flex justify-center items-center"
                >
                  <IconThumbUp size={30} color={like ? "blue" : "black"} />
                  <h4>Like</h4>
                </div>
                <div className="w-1/4 flex justify-center items-center">
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
            </div>
          );
        }
      })}
    </section>
  );
}
