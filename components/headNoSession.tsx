import Link from "next/link";

export default function HeaderNoSession() {
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
