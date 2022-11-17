import Link from "next/link";
import { useState, useEffect } from "react";
import { portType, postType } from "../lib/types";

export type postDataType = {
  postData: postType[];
  setPostData: any;
  //(value: SetStateAction<postType[]>) => void
  //FIND WHY THIS IS A TYPE ERROR
};

export default function PostList({ postData, setPostData }: postDataType) {
  return (
    <section className="text-info-content shadow-sm pb-24 h-full w-full flex flex-col justify-start items-center overflow-y-auto">
      {postData?.map((post: postType, index: number) => {
        if (post.published) {
          return (
            <div
              className="w-96 h-96 sm:w-1/2  lg:w-5/12 bg-base-content rounded-xl mt-5 flex flex-col"
              key={post.title + post.authorId + index}
            >
              <div className="self-end mr-1 text-xs text-base-content">Egg</div>
              {/* <div
                className="self-end mr-1 text-xs text-gray-300"
                onClick={() =>
                  setPostData((prevState: any) => {
                    return [...prevState, (prevState[index].published = false)];
                  })
                }
              >
                hide
              </div> */}
              <Link
                href={`/userProfile/${
                  post.authorId +
                  post?.author?.fName! +
                  post?.author?.lName! +
                  post.authorId +
                  69
                }`}
              >
                <div className="flex flex-row mt-3 ml-2 h-1/6 items-center">
                  <div className="w-1/4 ">
                    <div className=" rounded-full h-16 w-16 flex justify-center items-center cursor-pointer">
                      <img
                        className=" rounded-full h-16 w-16 "
                        src={post?.author?.image}
                      />
                    </div>
                  </div>
                  <div>{post?.author?.fName + " " + post?.author?.lName}</div>
                </div>
              </Link>

              <div className="ml-2 mt-5 w-full text-xl">{post.title}</div>
              <div className="ml-2 max-h-2/3 overflow-y-auto">
                {post.content}
              </div>
            </div>
          );
        }
      })}
    </section>
  );
}
