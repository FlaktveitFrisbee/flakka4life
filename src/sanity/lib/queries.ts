// src/sanity/lib/queries.ts

import { defineQuery } from "next-sanity";

export const POSTS_QUERY = defineQuery(
  `*[_type == "post" && defined(slug.current)][0...12] | order(publishedAt desc) {
  title,
  slug,
  publishedAt,
  body,
  _id
  }`,
);

export const POST_QUERY =
  defineQuery(`*[_type == "post" && slug.current == $slug][0]{
  title, body, mainImage
}`);
