import { Post } from "@/components/Post";
import { getPosts } from "@/server/queries";
import React from "react";

export default async function page() {
  const posts = await getPosts();

  return (
    <div className="flex flex-col items-center p-4">
      <div className="flex w-full max-w-7xl flex-col items-center gap-4">
        {posts.map((post) => (
          <Post key={post._id} post={post} />
        ))}
      </div>
    </div>
  );
}
