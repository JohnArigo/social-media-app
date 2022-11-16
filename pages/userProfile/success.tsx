import { useRouter } from "next/router";
import { useEffect } from "react";

export default function Success() {
  const router = useRouter();
  useEffect(() => {
    router.push(`../userProfile/myProfile`);
  }, []);

  return <main>upload success...</main>;
}
