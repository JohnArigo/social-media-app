import { postType, User } from "../lib/types";
import { useAmp } from "next/amp";
import { useEffect, useState } from "react";
import { IconSearch } from "@tabler/icons";
import Link from "next/link";
import PostList from "../components/postList";

export type testPage = {
  test: string;
};
export default function Search({ test, search }: any) {
  const [userData, setUserData] = useState<User[]>();
  const [postData, setPostData] = useState<postType[]>();
  const [searchValue, setSearchValue] = useState<string>();
  const [searchType, setSearchType] = useState<string>("name");

  useEffect(() => {
    fetch(`./api/search/${searchType}/${test}`)
      .then((res) => res.json())
      .then((data) => setUserData(data));
  }, [search]);

  const handleSearch = async () => {
    try {
      await fetch(`./api/search/${searchType}/${searchValue}`)
        .then((res) => res.json())
        .then((data) =>
          searchType === "name" ? setUserData(data) : setPostData(data)
        );
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <main className="mt-24">
      <section>
        <h4>Category</h4>
        <button
          className="btn btn-primary"
          onClick={() => setSearchType("name")}
        >
          People
        </button>
        <button
          className="btn btn-primary"
          onClick={() => setSearchType("posts")}
        >
          Posts
        </button>
        <button className="btn btn-primary">News</button>
      </section>
      <section className="flex mt-5 items-center">
        <input
          className="bg-white h-8 w-40 mr-5 rounded-lg"
          value={searchValue}
          onChange={(event) => setSearchValue(event?.target.value)}
          placeholder={test}
        />
        <IconSearch size={20} onClick={handleSearch} />
      </section>
      {searchType === "name" ? (
        <section>
          {userData?.map((user: User) => {
            return (
              <Link
                href={`../userProfile/${user.id}${user.fName}${user.lName}${user.id}69`}
              >
                <div className="cursor-pointer flex items-center mt-5 h-20 bg-base-content w-96 lg:w-1/4 rounded-lg ">
                  <img
                    className="w-14 h-14 rounded-full mr-5"
                    src={user.image}
                  />
                  <h1>{user.fName + " " + user.lName}</h1>
                </div>
              </Link>
            );
          })}
        </section>
      ) : (
        <section>
          {<PostList postData={postData!} setPostData={setPostData} />}
        </section>
      )}
    </main>
  );
}
