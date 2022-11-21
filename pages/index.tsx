import { useState, useEffect } from "react";
import { Transition } from "@headlessui/react";
import { useInView } from "react-intersection-observer";
import { portType } from "../lib/types";
import Typewriter from "typewriter-effect";
import cloudinary from "../images/cloudinary.png";
import planetScale from "../images/planetscale.png";
import vercel from "../images/vercel.svg";
import Image from "next/image";

export default function Index() {
  const [portSize, setPortSize] = useState<portType>({
    width: 0,
    height: 0,
  });
  const [scrollSize, setScrollSize] = useState<number>(0);
  const [transitionOne, setTransitionOne] = useState<boolean>(false);
  const [transitionTwo, setTransitionTwo] = useState<boolean>(false);
  const screenPercent = scrollSize / portSize?.height!;
  console.log(screenPercent);
  console.log(transitionOne);
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
  const handleScroll = () => {
    setScrollSize?.(window.scrollY);
  };
  useEffect(() => {
    handleScroll();
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const activateTransitionOne = () => {
    setTransitionOne(true);
  };
  const activateTransitionTwo = () => {
    setTransitionTwo(true);
  };
  useEffect(() => {
    if (screenPercent >= 0.15) {
      activateTransitionOne();
    }
    if (screenPercent >= 0.85) {
      activateTransitionTwo();
    }
  }, [screenPercent]);

  return (
    <main className="w-screen h-screen">
      {portSize?.width! > 760 ? (
        <section role="filler" className="h-16"></section>
      ) : null}

      <section className="w-full h-5/6 bg-splash bg-cover flex flex-col items-end justify-end">
        <div className="bg-white w-full h-1/3 sm:w-96 sm:h-96 md:mb-10 md:mr-2 flex flex-col justify-center rounded-sm">
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
      <section className="w-full h-2/3 bg-blue-200 flex ">
        <Transition
          className="h-3/4 w-full flex justify-around"
          show={transitionOne}
          appear={true}
        >
          <Transition.Child
            className="w-1/4 h-full flex justify-center items-center"
            enter="duration-1000 delay-20"
            enterFrom="-translate-y-10 opacity-0"
            enterTo="translate-y-0 opacity-100"
            leave="transition-opacity duration-150"
            leaveFrom="translate-y-0 opacity-100"
            leaveTo="translate-y-0 opacity-100"
          >
            <div className="flex flex-col items-center">
              <Image height={60} width={60} src={cloudinary} />
              <h1 className="text-center">
                Upload Profile Image using cloudinary service
              </h1>
            </div>
          </Transition.Child>
          <Transition.Child
            className="w-1/4 h-full flex justify-center items-center"
            enter="duration-1000 delay-90"
            enterFrom="-translate-y-10 opacity-0"
            enterTo="translate-y-0 opacity-100"
            leave="transition-opacity duration-150"
            leaveFrom="translate-y-0 opacity-100"
            leaveTo="translate-y-0 opacity-100"
          >
            <div className="flex flex-col items-center">
              <Image height={50} width={50} src={planetScale} />
              <h1 className="text-center">
                Utilizes serverless database using AWS
              </h1>
            </div>
          </Transition.Child>
          <Transition.Child
            className="w-1/4 h-full flex justify-center items-center"
            enter="duration-1000 delay-160"
            enterFrom="-translate-y-10 opacity-0"
            enterTo="translate-y-0 opacity-100"
            leave="transition-opacity duration-150"
            leaveFrom="translate-y-0 opacity-100"
            leaveTo="translate-y-0 opacity-100"
          >
            <div className="flex flex-col items-center">
              <Image height={50} width={50} src={vercel} />
              <h1 className="text-center">
                Deployed using Vercel, a fast and highly reliable service
              </h1>
            </div>
          </Transition.Child>
        </Transition>
      </section>

      <section className="w-full h-3/4 bg-red-100 flex">
        <Transition
          className="h-3/4 w-full flex justify-around"
          show={transitionTwo}
          appear={true}
        >
          <Transition.Child
            className="w-1/4 h-full flex justify-center items-center"
            enter="duration-1000 delay-20"
            enterFrom="-translate-y-10 opacity-0"
            enterTo="translate-y-0 opacity-100"
            leave="transition-opacity duration-150"
            leaveFrom="translate-y-0 opacity-100"
            leaveTo="translate-y-0 opacity-100"
          >
            <h1 className="">Upload Profile ID using cloudinary service</h1>
          </Transition.Child>
          <Transition.Child
            className="w-1/4 h-full flex justify-center items-center"
            enter="duration-1000 delay-90"
            enterFrom="-translate-y-10 opacity-0"
            enterTo="translate-y-0 opacity-100"
            leave="transition-opacity duration-150"
            leaveFrom="translate-y-0 opacity-100"
            leaveTo="translate-y-0 opacity-100"
          >
            <h1 className="">Damn Bruh</h1>
          </Transition.Child>
          <Transition.Child
            className="w-1/4 h-full flex justify-center items-center"
            enter="duration-1000 delay-160"
            enterFrom="-translate-y-10 opacity-0"
            enterTo="translate-y-0 opacity-100"
            leave="transition-opacity duration-150"
            leaveFrom="translate-y-0 opacity-100"
            leaveTo="translate-y-0 opacity-100"
          >
            <h1 className="">Damn Bruh</h1>
          </Transition.Child>
        </Transition>
      </section>
      <section className="w-full h-full bg-yellow-300"></section>
      {portSize?.width! > 760 ? null : (
        <section role="filler" className="h-20"></section>
      )}
    </main>
  );
}
