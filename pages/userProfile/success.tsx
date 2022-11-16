import { useRouter } from "next/router";

export default function Success() {
  const router = useRouter();
  typeof window! == "undefined" && router.push(`../userProfile/myProfile`);
  return <main>upload success...</main>;
}
