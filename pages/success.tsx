import { useRouter } from "next/router";
import { useEffect } from "react";

export default function Success() {
  const router = useRouter();
  useEffect(() => {
    router.back();
  }, []);

  return <main>upload success...</main>;
}
