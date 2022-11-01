import { postType } from "../pages/Home";

export type postDataType = {
  postData: postType[];
  setPostData: any;
  //(value: SetStateAction<postType[]>) => void
  //FIND WHY THIS IS A TYPE ERROR
};

export default function PostList({ postData, setPostData }: postDataType) {
  return (
    <section className=" shadow-sm pb-24 text-black h-full w-full flex flex-row flex-wrap justify-center items-end overflow-y-scroll">
      {postData.map((post: postType, index: number) => {
        if (post.published) {
          return (
            <div
              className="w-full h-80 bg-white rounded-xl mt-5 flex flex-col"
              key={post.title + post.authorid + index}
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
              <div className="flex flex-row mt-3 ml-2 h-1/6 items-center">
                <div className="w-1/4 ">
                  <div className="bg-green-600 rounded-full h-16 w-16 flex justify-center items-center">
                    Image
                  </div>
                </div>
                <div>{post.author.fName + " " + post.author.lName}</div>
              </div>
              <div className=" mt-5 w-full text-xl">{post.title}</div>
              <div className="max-h-2/3 overflow-y-auto">
                {post.content}
                Rackham.
              </div>
            </div>
          );
        }
      })}
    </section>
  );
}
