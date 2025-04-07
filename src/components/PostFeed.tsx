"use client";

import { useSocial } from "@/context/SocialContext";
import { PostItem } from "./PostItem";
import { CreatePost } from "./CreatePost";
import { Button } from "./ui/button";

export function PostFeed() {
  const { posts, currentUser, logout } = useSocial();

  return (
    <div className="max-w-2xl mx-auto p-4">
      <header className="flex items-center justify-between mb-6 pt-4">
        <h1 className="text-2xl font-bold text-white">Text Social</h1>
        <div className="flex items-center gap-4">
          <span className="text-gray-400">@{currentUser}</span>
          <Button
            variant="outline"
            size="sm"
            onClick={logout}
            className="border-gray-700 text-gray-300 hover:bg-gray-800"
          >
            Logout
          </Button>
        </div>
      </header>

      <CreatePost />

      <div>
        {posts.length === 0 ? (
          <div className="text-center py-10 text-gray-400">
            No posts yet. Be the first to post!
          </div>
        ) : (
          posts.map((post) => <PostItem key={post.id} post={post} />)
        )}
      </div>
    </div>
  );
}
