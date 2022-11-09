import { Button, Modal, Textarea, Text, Collapse } from "@mantine/core";
import { getSession, useSession } from "next-auth/react";
import Link from "next/link";
import { useState, useEffect } from "react";
import PostList from "../../components/postList";
import { postType, User, SendUser, Friend } from "../../lib/types";

export type UserArray = {
  user: User[];
  users?: User[];
};
//api POST handler
async function postUpdatedUser(dataToSend: User) {
  const response = await fetch("../../api/userCalls/updateUser", {
    method: "POST",
    body: JSON.stringify(dataToSend),
  });

  if (!response.ok) {
    throw new Error(response.statusText);
  }

  return await response.json();
}

export default function Home() {
  //find session to fetch userData
  const { data: session } = useSession();
  //find userID for API call
  const userID = parseInt(session?.user?.name?.toString()!);
  //userData for rendering
  const [userData, setUserData] = useState<User>({
    id: userID,
    email: session?.user?.email!,
    fName: "First",
    lName: "last",
    password: "",
    about: "Initial",
    flex: "Initial",
    friends: [],
    posts: [],
  });

  //api call to fetch user data from db
  useEffect(() => {
    fetch(`../api/findUser/${userID}`)
      .then((res) => res.json())
      .then((data) => {
        setUserData(data);
      });
  }, []);

  //post data to pass into postList component
  const [postData, setPostData] = useState<postType[]>(userData.posts!);

  //set post data only if data from session is valid
  //once user data is fetched, set post state to passdown onto post history
  useEffect(() => {
    if (userData.fName !== undefined) {
      setPostData(userData.posts!);
    }
  }, [userData]);
  //handles changes with forms on profile
  const handleChange = (event: any) => {
    const { name, value } = event.target;
    setUserData((prevState) => {
      return { ...prevState, [name]: value };
    });
  };
  //POST api
  const handleSubmit = async () => {
    try {
      await postUpdatedUser(userData);
      console.log("updated");
    } catch (error) {
      console.log(error);
    }
    setAbout(false);
    setFlex(false);
    setUserOpen(false);
  };

  //modal openers
  const [about, setAbout] = useState(false);
  const [flex, setFlex] = useState(false);
  const [userOpen, setUserOpen] = useState(false);
  const [aboutText, setAboutText] = useState(false);
  const [flexText, setFlexText] = useState(false);

  //contingency for bad data load
  if (userData.email === undefined) {
    return (
      <main>
        <h1>Unable to load page, please try again later</h1>
      </main>
    );
  }
  //render
  else
    return (
      <main className="w-screen h-auto overflow-y-auto">
        <section className="h-28 bg-red-300">This is the banner photo</section>
        <section className="w-full h-30 flex flex-row items-center  absolute z-10 top-14">
          <div className="ml-5 w-28 h-28  flex justify-center items-center bg-green-500">
            R
          </div>
          <div className="mt-10 ml-5">
            {userData.fName + " " + userData.lName}
          </div>
        </section>

        <section className="mt-32 max-h-80 bg-white w-full shadow-sm flex-col flex items-start justify-start overflow-y-scroll">
          <div
            className="self-end text-gray-300"
            onClick={() => setAbout(true)}
          >
            edit
          </div>
          <Modal
            transition="fade"
            transitionDuration={600}
            transitionTimingFunction="ease"
            opened={about}
            onClose={() => setAbout(false)}
            title="Tell us about you!"
          >
            <Textarea
              className="w-full"
              label="About"
              name="about"
              value={userData.about}
              onChange={handleChange}
              minRows={15}
              maxRows={20}
            />
            <div className="w-full flex justify-center mt-5">
              <Button onClick={handleSubmit} className="bg-blue-200">
                Submit
              </Button>
            </div>
          </Modal>
          <h3 className="ml-5">About Me</h3>

          <div>
            <Collapse in={aboutText}>
              {userData.about}
              <div onClick={() => setAboutText(false)}>See less</div>
            </Collapse>
            {aboutText ? null : <Text lineClamp={3}>{userData.about}</Text>}
            {userData.about!.length > 130 ? (
              <div onClick={() => setAboutText(true)}>
                {aboutText ? null : "See More"}
              </div>
            ) : null}
          </div>
        </section>
        <section className="mt-3 bg-white h-40 w-full shadow-sm flex flex-col items-start justify-start">
          <div className="self-end text-white">EASTER EGG</div>
          <h3 className="ml-5">Friends</h3>
          <div>
            {userData.friends.map((friend: Friend) => {
              return (
                <Link
                  href={`/userProfile/${friend.friendId}${friend.friendFirstName}${friend.friendLastName}${friend.friendId}69`}
                >
                  <div className="h-24 w-28 flex flex-col justify-center items-center">
                    <div className="rounded-full w-14 h-14 bg-blue-200 flex justify-center items-center">
                      {friend.friendFirstName.charAt(0)}
                    </div>
                    <h1>
                      {friend.friendFirstName + " " + friend.friendLastName}
                    </h1>
                  </div>
                </Link>
              );
            })}
          </div>
        </section>
        <section className="mt-3 bg-white max-h-80 overflow-y-auto w-full shadow-sm flex flex-col items-start justify-start">
          <div className="self-end text-gray-300" onClick={() => setFlex(true)}>
            edit
          </div>
          <Modal
            transition="fade"
            transitionDuration={600}
            transitionTimingFunction="ease"
            opened={flex}
            onClose={() => setFlex(false)}
            title="Tell us about you!"
          >
            <Textarea
              className="w-full"
              label="Announcements"
              name="flex"
              value={userData.flex}
              onChange={handleChange}
              minRows={15}
              maxRows={18}
            />
            <div className="w-full flex justify-center mt-5">
              <Button onClick={handleSubmit} className="bg-blue-200">
                Submit
              </Button>
            </div>
          </Modal>
          <h3 className="ml-5">Announcements</h3>
          <div>
            <Collapse in={flexText}>
              {userData.flex}
              <div onClick={() => setFlexText(false)}>See less</div>
            </Collapse>
            {flexText ? null : <Text lineClamp={3}>{userData.flex}</Text>}
            {userData.flex!.length > 130 ? (
              <div onClick={() => setFlexText(true)}>
                {flexText ? null : "See More"}
              </div>
            ) : null}
          </div>
        </section>
        <h1 className="flex items-center justify-center h-14">
          {userData.fName + " " + userData.lName}'s Posts
        </h1>
        <section className="mt-5 h-auto">
          <PostList postData={postData} setPostData={setPostData} />
        </section>
      </main>
    );
}
