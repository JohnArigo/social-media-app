import { Button, Modal, Textarea, Text, Collapse } from "@mantine/core";
import { getSession, useSession } from "next-auth/react";
import Link from "next/link";
import { useState, useEffect } from "react";
import PostList from "../../components/postList";
import UploadBanner from "../../components/uploadBanner";
import UploadImage from "../../components/uploadImage";
import { postType, User, SendUser, Friend, portType } from "../../lib/types";

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
    about: "Initial",
    flex: "Initial",
    friends: [],
    posts: [],
  });
  useEffect(() => {
    fetch(`../api/findUser/${userID}`)
      .then((res) => res.json())
      .then((data) => {
        setUserData(data);
      });
  }, []);
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
  console.log(postData);
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
  };
  //filters friends to only display 3
  const filterFriends = () => {
    if (userData?.friends?.length! > 4) {
      return userData?.friends?.splice(3)!;
    } else return userData.friends;
  };

  const [portSize, setPortSize] = useState<portType>({
    width: 0,
    height: 0,
  });

  const handleResize = () => {
    if (typeof window !== "undefined") {
      setPortSize({
        height: window?.innerHeight,
        width: window?.innerWidth,
      });
    }
  };
  useEffect(() => {
    handleResize();
    window?.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  //modal openers
  const [about, setAbout] = useState(false);
  const [flex, setFlex] = useState(false);
  const [profilePic, setProfilePic] = useState(false);
  const [banner, setBanner] = useState(false);
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

  if (portSize?.width! > 860) {
    return (
      <main className="bg-base-200 w-screen h-auto overflow-y-auto text-info-content flex justify-center mt-24">
        {/* {Header Section} */}
        <section className="w-1/2 flex flex-col items-start">
          {" "}
          <section
            className="w-full h-36 bg-red-300 flex flex-col items-end"
            onClick={() => setBanner(true)}
          >
            <h1
              className="absolute text-sm bg-zinc-50 opacity-70"
              onClick={() => setBanner(true)}
            >
              edit
            </h1>
            <Modal
              overflow="inside"
              transition="fade"
              transitionDuration={600}
              transitionTimingFunction="ease"
              opened={banner}
              onClose={() => setBanner(false)}
            >
              <UploadBanner userID={userID} />
            </Modal>
            <img className="sm:h-full w-full " src={userData.banner} />
          </section>
          {/* {Profile Image and Name} */}
          <section className="bg-transparent w-full h-30 flex flex-row items-center ml-7 absolute z-10 top-44">
            <div
              onClick={() => setProfilePic(true)}
              className="bg-white w-28 h-28  flex justify-center items-center "
            >
              <img src={userData.image} />
              <Modal
                transition="fade"
                transitionDuration={600}
                transitionTimingFunction="ease"
                opened={profilePic}
                onClose={() => setProfilePic(false)}
              >
                <UploadImage userID={userID} />
              </Modal>
            </div>
            <div className="text-info mt-14 ml-5 text-xl">
              {userData.fName + " " + userData.lName}
            </div>
          </section>
          {/* {About me} */}
          <section className="bg-base-content w-full mt-32 pb-16 max-h-80 shadow-sm flex-col flex items-start justify-start overflow-y-auto">
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
                <div className="text-accent" onClick={() => setAboutText(true)}>
                  {aboutText ? null : "See More"}
                </div>
              ) : null}
            </div>
          </section>
          {/* {Friend list NEED TO OPEN PAGE TO SEE ALL FRIENDS} */}
          <section className="mt-3 bg-base-content h-40 w-full shadow-sm flex flex-col items-start justify-start">
            <div className="self-end text-base-content">EASTER EGG</div>
            <h3 className="ml-5">Following</h3>
            <div className="flex justify-start items-center">
              {filterFriends()?.map((friendInfo: Friend) => {
                const friend = friendInfo.friendInfo;
                return (
                  <Link
                    href={`/userProfile/${friend?.id}${friend?.fName}${friend?.lName}${friend?.id}69`}
                    key={friend?.id}
                  >
                    <div className="h-24 w-28 flex flex-col justify-center items-center">
                      <div className="rounded-full w-14 h-14  flex justify-center items-center">
                        <img src={friend?.image} />
                      </div>
                      <h1>{friend?.fName + " " + friend?.lName}</h1>
                    </div>
                  </Link>
                );
              })}
            </div>
          </section>
          {/* {Flex announcements} */}
          <section className="mt-3 pb-16 bg-base-content w-full max-h-80 overflow-y-auto shadow-sm flex flex-col items-start justify-start">
            <div
              className="self-end text-gray-300"
              onClick={() => setFlex(true)}
            >
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
                <div className="text-accent" onClick={() => setFlexText(true)}>
                  {flexText ? null : "See More"}
                </div>
              ) : null}
            </div>
          </section>
        </section>

        {/* {Posts} */}
        <section className="w-full h-screen flex flex-col justify-start ">
          {" "}
          <h1 className="text-info w-full text-center mt-5">
            {userData.fName + " " + userData.lName}s Posts
          </h1>
          <PostList postData={postData} setPostData={setPostData} />
        </section>
      </main>
    );
  }
  //render
  else {
    return (
      <main className="bg-base-200 w-screen h-auto overflow-y-auto text-info-content">
        {/* {Header Section} */}
        <section
          className="h-32 w-full bg-red-300 flex flex-col items-end"
          onClick={() => setBanner(true)}
        >
          <h1
            className="absolute text-sm bg-zinc-50 opacity-70"
            onClick={() => setBanner(true)}
          >
            edit
          </h1>
          <Modal
            overflow="inside"
            transition="fade"
            transitionDuration={600}
            transitionTimingFunction="ease"
            opened={banner}
            onClose={() => setBanner(false)}
          >
            <UploadBanner userID={userID} />
          </Modal>
          <img className="h-32 w-full " src={userData.banner} />
        </section>
        {/* {Profile Image and Name} */}
        <section className="bg-transparent w-full h-30 flex flex-row items-center  absolute z-10 top-14">
          <div
            onClick={() => setProfilePic(true)}
            className="ml-5 w-28 h-28  flex justify-center items-center "
          >
            <img src={userData.image} />
            <Modal
              transition="fade"
              transitionDuration={600}
              transitionTimingFunction="ease"
              opened={profilePic}
              onClose={() => setProfilePic(false)}
            >
              <UploadImage userID={userID} />
            </Modal>
          </div>
          <div className="text-info mt-14 ml-5 text-xl">
            {userData.fName + " " + userData.lName}
          </div>
        </section>
        {/* {About me} */}
        <section className="bg-base-content  mt-32 pb-16 max-h-80  w-full shadow-sm flex-col flex items-start justify-start overflow-y-scroll">
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
              <div className="text-accent" onClick={() => setAboutText(true)}>
                {aboutText ? null : "See More"}
              </div>
            ) : null}
          </div>
        </section>
        {/* {Friend list NEED TO OPEN PAGE TO SEE ALL FRIENDS} */}
        <section className="mt-3 bg-base-content  h-40 w-full shadow-sm flex flex-col items-start justify-start">
          <div className="self-end text-base-content">EASTER EGG</div>
          <h3 className="ml-5">Following</h3>
          <div className="flex justify-start items-center">
            {filterFriends()?.map((friendInfo: Friend) => {
              const friend = friendInfo.friendInfo;
              return (
                <Link
                  href={`/userProfile/${friend?.id}${friend?.fName}${friend?.lName}${friend?.id}69`}
                  key={friend?.id}
                >
                  <div className="h-24 w-28 flex flex-col justify-center items-center">
                    <div className="rounded-full w-14 h-14  flex justify-center items-center">
                      <img src={friend?.image} />
                    </div>
                    <h1>{friend?.fName + " " + friend?.lName}</h1>
                  </div>
                </Link>
              );
            })}
          </div>
        </section>
        {/* {Flex announcements} */}
        <section className="mt-3 pb-16 bg-base-content  max-h-80 overflow-y-auto w-full shadow-sm flex flex-col items-start justify-start">
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
              <div className="text-accent" onClick={() => setFlexText(true)}>
                {flexText ? null : "See More"}
              </div>
            ) : null}
          </div>
        </section>
        {/* {Posts} */}
        <h1 className="text-info flex items-center justify-center h-14">
          {userData.fName + " " + userData.lName}s Posts
        </h1>
        <section className="mt-5 h-auto">
          <PostList postData={postData} setPostData={setPostData} />
        </section>
      </main>
    );
  }
}
