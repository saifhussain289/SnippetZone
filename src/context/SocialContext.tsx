"use client";

import { createContext, useContext, useEffect, useState, type ReactNode } from "react";

export interface Post {
  id: string;
  text: string;
  username: string;
  timestamp: number;
}

interface SocialContextType {
  currentUser: string | null;
  posts: Post[];
  login: (username: string) => void;
  logout: () => void;
  createPost: (text: string) => void;
}

const SocialContext = createContext<SocialContextType | undefined>(undefined);

export function SocialProvider({ children }: { children: ReactNode }) {
  const [currentUser, setCurrentUser] = useState<string | null>(null);
  const [posts, setPosts] = useState<Post[]>([]);

  // Load data from localStorage on initial mount
  useEffect(() => {
    // Try to load user from localStorage
    const savedUser = localStorage.getItem("currentUser");
    if (savedUser) {
      setCurrentUser(savedUser);
    }

    // Try to load posts from localStorage
    try {
      const savedPosts = localStorage.getItem("posts");
      if (savedPosts) {
        setPosts(JSON.parse(savedPosts));
      }
    } catch (error) {
      console.error("Failed to load posts from localStorage:", error);
      localStorage.removeItem("posts"); // Clear corrupted data
    }
  }, []);

  // Save posts to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem("posts", JSON.stringify(posts));
  }, [posts]);

  // Save user to localStorage whenever it changes
  useEffect(() => {
    if (currentUser) {
      localStorage.setItem("currentUser", currentUser);
    } else {
      localStorage.removeItem("currentUser");
    }
  }, [currentUser]);

  const login = (username: string) => {
    if (username.trim()) {
      setCurrentUser(username.trim());
    }
  };

  const logout = () => {
    setCurrentUser(null);
  };

  const createPost = (text: string) => {
    if (!currentUser || !text.trim()) return;

    const newPost: Post = {
      id: Date.now().toString(),
      text: text.trim(),
      username: currentUser,
      timestamp: Date.now(),
    };

    setPosts((prevPosts) => [newPost, ...prevPosts]); // Add new post at beginning
  };

  return (
    <SocialContext.Provider
      value={{
        currentUser,
        posts,
        login,
        logout,
        createPost,
      }}
    >
      {children}
    </SocialContext.Provider>
  );
}

export function useSocial() {
  const context = useContext(SocialContext);
  if (context === undefined) {
    throw new Error("useSocial must be used within a SocialProvider");
  }
  return context;
}
