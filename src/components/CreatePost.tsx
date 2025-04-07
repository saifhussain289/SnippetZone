"use client";

import { useState } from "react";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useSocial } from "@/context/SocialContext";

export function CreatePost() {
  const [text, setText] = useState("");
  const { createPost } = useSocial();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (text.trim()) {
      createPost(text);
      setText("");  // Clear the input after posting
    }
  };

  return (
    <Card className="mb-6 bg-gray-900 border-gray-800">
      <form onSubmit={handleSubmit}>
        <CardContent className="pt-4">
          <Textarea
            placeholder="What's on your mind?"
            className="min-h-24 bg-gray-800 border-gray-700 text-white"
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
        </CardContent>
        <CardFooter className="flex justify-end border-t border-gray-800 pt-2">
          <Button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 text-white"
            disabled={!text.trim()}
          >
            Post
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
}
