"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useUser } from "@clerk/nextjs";

export default function Home() {
  const router = useRouter();
  const { isLoaded, isSignedIn } = useUser();

  useEffect(() => {
    if (!isLoaded) return;

    if (isSignedIn) {
      router.push("/editor");
    } else {
      router.push("/sign-in");
    }
  }, [isLoaded, isSignedIn, router]);

  return null;
}
