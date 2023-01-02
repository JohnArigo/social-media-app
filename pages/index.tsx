import { useState, useEffect } from "react";
import { Transition } from "@headlessui/react";
import { useInView } from "react-intersection-observer";
import { portType } from "../lib/types";
import Typewriter from "typewriter-effect";
import cloudinary from "../images/cloudinary.png";
import planetScale from "../images/planetscale.png";
import vercel from "../images/vercel.svg";
import Image from "next/image";
import {
  IconSearch,
  IconFilter,
  IconMessage,
  IconUser,
  IconSunHigh,
} from "@tabler/icons";
import TransitionY from "../components/transition";

export default function Index() {
  const [portSize, setPortSize] = useState<portType>({
    width: 0,
    height: 0,
  });

  const [transitionOne, setTransitionOne] = useState<boolean>(false);
  const [transitionTwo, setTransitionTwo] = useState<boolean>(false);

  //handles window resizing
  const handleResize = () => {
    if (typeof window !== "undefined") {
      setPortSize({
        height: window?.innerHeight,
        width: window?.innerWidth,
      });
    }
  };

  //handles window resizing
  useEffect(() => {
    handleResize();
    window?.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const activateTransitionOne = () => {
    setTransitionOne(true);
  };
  const activateTransitionTwo = () => {
    setTransitionTwo(true);
  };

  const [ref2, inView2, entry2] = useInView({
    threshold: 0.5,
  });

  const [ref1, inView1, entry1] = useInView({
    threshold: 0.7,
  });

  return (
    <main className="w-screen h-screen overflow-y-auto">
      {portSize?.width! > 760 ? (
        <section role="filler" className="h-16"></section>
      ) : null}

      <section className="w-full sticky top-0 h-2/3 sm:top-0 z-20 flex flex-col items-end justify-end">
        <video
          //video background
          autoPlay={true}
          muted={true}
          loop={true}
          className="w-full z-10 h-full object-cover"
          src="https://res.cloudinary.com/dwbzf4ywk/video/upload/v1672539492/production_ID_4391550_enmzuh.mp4"
        />
        <div className="w-full h-full bg-gray-300 z-20 absolute top-0 bg-opacity-20"></div>
        <div className="bg-white sm:absolute sm:top-20 z-30 w-full h-1/3 sm:w-96 sm:h-96 md:mb-10 md:mr-2 flex flex-col justify-center rounded-sm">
          <h1 className="text-accent italic text-4xl mt-5 flex self-center">
            <Typewriter
              options={{
                strings: [
                  "Bonjour",
                  "Hola",
                  "Salut",
                  "Zdravstvuyte",
                  "Hello",
                  "Nǐn hǎo",
                  "Salve",
                  "Konnichiwa",
                  "Guten Tag",
                  "Olá",
                  "Anyoung haseyo",
                  "Asalaam alaikum",
                  "Goddag",
                  "Shikamoo",
                  "Goedendag",
                  "Yassas",
                  "Dzień dobry",
                  "Selamat siang",
                  "Namaste, Namaskar",
                  "Merhaba",
                  "Shalom",
                  "God dag",
                ],
                autoStart: true,
                loop: true,
              }}
            />
          </h1>
          <h2 className="text-center self-center">
            Welcome to the social media app! Its made in the NextJS Framework
            with React, NodeJS, MySQL, Prisma and Tailwind CSS.
          </h2>
        </div>
      </section>
      <section className="w-screen h-screen flex flex-col">
        <section
          className="w-full sticky sm:top-16 top-0 h-full bg-gray-50 text-slate-900 flex justify-center items-center z-50"
          ref={ref1}
        >
          <TransitionY execute={inView1}>
            <div className="h-2/3 w-full flex justify-around mt-10 z-50">
              <div className="w-1/4 h-full flex flex-col items-center">
                <Image height={60} width={60} src={cloudinary} />
                <h1 className="text-center">
                  Upload Profile Image using cloudinary service
                </h1>
              </div>
              <div className="w-1/4 h-full flex flex-col items-center z-50">
                <Image height={50} width={50} src={planetScale} />
                <h1 className="text-center">
                  Utilizes serverless database using AWS
                </h1>
              </div>
              <div className="w-1/4 h-full flex flex-col items-center">
                <Image height={50} width={50} src={vercel} />
                <h1 className="text-center">
                  Deployed using Vercel, a fast and highly reliable service
                </h1>
              </div>
            </div>
          </TransitionY>
        </section>
        <section
          ref={ref2}
          className="w-full text-white h-full pb-20 bg-[conic-gradient(at_top_right,_var(--tw-gradient-stops))] from-slate-200 via-accent-500 to-gray-500 flex justify-center items-center z-50"
        >
          <TransitionY execute={inView2}>
            <div className="w-full h-3/4 flex flex-col justify-between items-center">
              <div className="w-11/12 h-1/2 flex justify-between ">
                <div className="w-1/2 flex flex-col h-full items-center">
                  <IconSunHigh size={50} />
                  <h1 className="text-center">
                    Check current headlines and weather using Explore
                  </h1>
                </div>

                <div className="w-1/2 flex flex-col h-full items-center">
                  <IconMessage size={50} />
                  <h1 className="text-center">
                    Say hello by creating a post or direct message other users
                    by accessing their profiles
                  </h1>
                </div>
              </div>
              <div className="w-11/12 h-1/2 flex justify-between ">
                <div className="w-1/2 flex flex-col h-full items-center">
                  <IconSearch size={50} />
                  <h1 className="text-center">
                    Search for news articles, posts and people using the search
                    function
                  </h1>
                </div>

                <div className="w-1/2 flex flex-col h-full items-center">
                  <IconUser size={50} />
                  <h1 className="text-center">
                    Customize your profile by uploading your profile image and
                    writing a little bit about yourself
                  </h1>
                </div>
              </div>
            </div>
          </TransitionY>
        </section>
      </section>

      {portSize?.width! > 760 ? null : (
        <section role="filler" className="h-20"></section>
      )}
    </main>
  );
}
