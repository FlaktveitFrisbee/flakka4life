import SanityImage from "@/components/SanityImage";
import { Button } from "@/components/ui/button";
import { getPost } from "@/server/queries";
import { ArrowLeftIcon } from "lucide-react";
import { PortableText } from "next-sanity";
import Link from "next/link";
import { notFound } from "next/navigation";
import React from "react";
import type { Metadata } from "next";
import type { PortableTextBlock } from "@/sanity/schemaTypes/blockContentType";

export function generateStaticParams() {
  // This opts in the route to be statically generated on demand and cached using ISR (https://nextjs.org/docs/app/building-your-application/data-fetching/incremental-static-regeneration)
  return [];
}

export async function generateMetadata(props: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  // fetch post information
  const { slug } = await props.params;
  const post = await getPost(slug);

  // Extract text from Portable Text blocks
  const description =
    post?.body
      ?.filter(
        (block): block is PortableTextBlock =>
          block._type === "block" && Array.isArray(block.children),
      )
      .map((block) =>
        block.children
          ?.map((child) => child.text)
          .filter(Boolean)
          .join(""),
      )
      .filter(Boolean)
      .join(" ")
      .slice(0, 250) || ""; // Limit to 250 characters for meta description

  return {
    title: post?.title ?? "Post not found",
    description,
  };
}

export default async function page(props: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await props.params;
  const post = await getPost(slug);

  if (!post?.body) {
    return notFound();
  }

  return (
    <main className="prose prose-sm dark:prose-invert sm:prose lg:prose-lg container mx-auto p-4 md:pt-6">
      <div className="flex items-baseline justify-between">
        <Button variant="outline" asChild>
          <Link href="/posts">
            <ArrowLeftIcon />
            Innlegg
          </Link>
        </Button>
        <div className="text-muted-foreground text-sm">
          {post?.publishedAt
            ? new Date(post.publishedAt).toLocaleString("no-NO", {
                year: "numeric",
                month: "long",
                day: "numeric",
                hour: "2-digit",
                minute: "2-digit",
                timeZone: "Europe/Oslo",
              })
            : null}
        </div>
      </div>
      <h1 className="pt-4">{post.title}</h1>
      <PortableText
        value={post.body}
        components={{
          types: {
            image: SanityImage,
          },
        }}
      />
    </main>
  );
}
