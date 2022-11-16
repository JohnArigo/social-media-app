import Head from "next/head";
import Link from "next/link";
import { portType } from "../lib/types";
export type noSessionHeader = {
  portSize: portType;
};
export default function HeaderNoSession({ portSize }: noSessionHeader) {
  if (portSize?.width! > 860) {
    return (
      <main className="top-0 fixed w-full h-20 bg-accent text-neutral flex flex-row justify-between items-center">
        <Head>
          <link
            href="https://fonts.googleapis.com/css2?family=Noto+Sans+Mono:wght@300;600;700&family=Pacifico&display=swap"
            rel="stylesheet"
          />
        </Head>
        <Link href={`../`}>
          <h1 className="text-2xl ml-5 font-pacifico font-extrabold cursor-pointer">
            Social Media App
          </h1>
        </Link>

        <section className="flex w-1/6 justify-between mr-2">
          <Link href="/signup">
            <div className="bg-primary text-info rounded-2xl w-24 h-10 flex items-center justify-center cursor-pointer">
              Sign up
            </div>
          </Link>
          <Link href="/signin">
            <div className="bg-primary text-info rounded-2xl w-24 h-10 flex items-center justify-center cursor-pointer">
              Sign in
            </div>
          </Link>
        </section>
      </main>
    );
  } else {
    return (
      <main className="bottom-0 fixed w-full h-20 bg-accent text-neutral flex flex-row justify-around items-center">
        <Link href="/signup">
          <div>Sign up</div>
        </Link>
        <Link href="/signin">
          <div>Sign in</div>
        </Link>
      </main>
    );
  }
}
