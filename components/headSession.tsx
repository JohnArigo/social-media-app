import Link from "next/link";

export default function HeaderSession({ setOpened }: any) {
  return (
    <main className="bottom-0 fixed w-full h-20 bg-yellow-500 flex flex-row justify-around items-center">
      <Link href="/home">
        <div>Home</div>
      </Link>
      <div>Explore</div>
      <div onClick={() => setOpened(true)}>
        <div>Post</div>
      </div>
      <div>Friends</div>
      <div>Profile</div>
    </main>
  );
}
