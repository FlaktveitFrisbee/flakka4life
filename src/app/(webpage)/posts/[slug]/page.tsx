import { getPost } from "@/server/queries";
import React from "react";

export default async function page(props: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await props.params;
  const post = await getPost(slug);

  if (!post) {
    return <div>Post not found</div>;
  }

  return <div>{post.title}</div>;
}
