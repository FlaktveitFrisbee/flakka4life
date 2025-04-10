import "server-only";
import { Competition, DiscgolfMetrixResult } from "@/lib/types/metrixresult";
import { sanityFetch } from "@/sanity/lib/client";
import { POSTS_QUERY } from "@/sanity/lib/queries";

export async function getCompetition(competitionId: string) {
  const params = new URLSearchParams({
    content: "result",
    id: competitionId,
  });

  const response = await fetch(
    `${process.env.DISC_GOLF_METRIX_API_URL}?${params}`,
  );

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
