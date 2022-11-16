import { useRouter } from "next/router";

export default function () {
  const router = useRouter();
  router.push(`../userProfile/myProfile`);
  return <main>upload success...</main>;
}
