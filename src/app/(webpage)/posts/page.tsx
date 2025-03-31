import { Posts } from "@/components/Posts";
import { sanityFetch } from "@/sanity/lib/client";
import { POSTS_QUERY } from "@/sanity/lib/queries";
import React from "react";

export default async function page() {
  const result = await sanityFetch({
    query: POSTS_QUERY,
  });

  console.log(result);

  return (
    <div>
      <Posts posts={result} />
    </div>
  );
}
