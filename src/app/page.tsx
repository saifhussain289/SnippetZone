"use client";

import { useSocial } from "@/context/SocialContext";
import { LoginForm } from "@/components/LoginForm";
import { PostFeed } from "@/components/PostFeed";

export default function Home() {
  const { currentUser } = useSocial();

  return (
    <main className="min-h-screen bg-black">
      {currentUser ? <PostFeed /> : <LoginForm />}
    </main>
  );
}
