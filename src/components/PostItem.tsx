"use client";

import { Card, CardContent, CardHeader } from "@/components/ui/card";
import type { Post } from "@/context/SocialContext";
import { formatTimestamp } from "@/lib/formatters";

interface PostItemProps {
  post: Post;
}

export function PostItem({ post }: PostItemProps) {
  return (
    <Card className="mb-4 bg-gray-900 border-gray-800">
      <CardHeader className="py-3 flex flex-row items-center justify-between border-b border-gray-800">
        <div className="font-bold text-white">@{post.username}</div>
        <div className="text-xs text-gray-400">{formatTimestamp(post.timestamp)}</div>
      </CardHeader>
      <CardContent className="py-4">
        <p className="whitespace-pre-wrap text-white">{post.text}</p>
      </CardContent>
    </Card>
  );
}
