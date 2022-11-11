import Link from "next/link";
import { postType } from "../lib/types";

export type postDataType = {
  postData: postType[];
  setPostData: any;
  //(value: SetStateAction<postType[]>) => void
  //FIND WHY THIS IS A TYPE ERROR
};

export default function PostList({ postData, setPostData }: postDataType) {
  return (
    <section className="shadow-sm pb-24  h-full w-full flex flex-row flex-wrap justify-center items-start overflow-y-scroll">
      {postData.map((post: postType, index: number) => {
        if (post.published) {
          return (
            <div
              className="w-full h-80 bg-base-content text-info-content rounded-xl mt-5 flex flex-col"
              key={post.title + post.authorId + index}
            >
              <div
                className="self-end mr-1 text-xs text-gray-300"
                onClick={() =>
                  setPostData((prevState: any) => {
                    return [...prevState, (prevState[index].published = false)];
                  })
                }
              >
                hide
              </div>
              <Link
                href={`/userProfile/${
                  post.authorId +
                  post.author.fName +
                  post.author.lName +
                  post.authorId +
                  69
                }`}
              >
                <div className="flex flex-row mt-3 ml-2 h-1/6 items-center">
                  <div className="w-1/4 ">
                    <div className=" rounded-full h-16 w-16 flex justify-center items-center">
                      <img
                        className=" rounded-full h-16 w-16"
                        src={post.author.image}
                      />
                    </div>
                  </div>
                  <div>{post.author.fName + " " + post.author.lName}</div>
                </div>
              </Link>

              <div className=" mt-5 w-full text-xl">{post.title}</div>
              <div className="max-h-2/3 overflow-y-auto">{post.content}</div>
            </div>
          );
        }
      })}
    </section>
  );
}
