import "server-only";
import {
  type Competition,
  type DiscgolfMetrixResult,
} from "@/lib/types/metrixresult";
import { sanityFetch } from "@/sanity/lib/client";
import { POST_QUERY, POSTS_QUERY } from "@/sanity/lib/queries";
import { env } from "@/env";
import { cache } from "react";

export async function getCompetition(competitionId: string) {
  const params = new URLSearchParams({
    content: "result",
    id: competitionId,
  });

  const response = await fetch(`${env.DISC_GOLF_METRIX_API_URL}?${params}`);

  if (!response.ok) {
    throw new Error("Failed to fetch competition");
  }

  const data = (await response.json()) as DiscgolfMetrixResult;

  if (data.Errors.length > 0) {
    return {
      error: data.Errors,
    };
  }

  return {
    competition: data.Competition as Competition,
  };
}

export async function getPosts() {
  const posts = await sanityFetch({
    query: POSTS_QUERY,
    tags: ["post"],
  });
  return posts;
}

// React cache will memoize the result of the function for the duration of the request
// Since we use the post data in both the page and the generateMetadata function, we can dedupe the request with react cache
// https://nextjs.org/docs/app/getting-started/metadata-and-og-images#memoizing-data-requests
export const getPost = cache(async (slug: string) => {
  const post = await sanityFetch({
    query: POST_QUERY,
    params: { slug },
    tags: [`post:${slug}`],
  });
  return post;
});
