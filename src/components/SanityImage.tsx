import { urlFor } from "@/sanity/lib/image";
import { getImageDimensions, SanityImageSource } from "@sanity/asset-utils";
import Image from "next/image";
import React from "react";

export default function SanityImage({ value }: { value: SanityImageSource }) {
  // Barebones lazy-loaded image component
  const { width, height } = getImageDimensions(value);
  const url = urlFor(value).width(800).fit("max").auto("format").url();
  return <Image width={width} height={height} src={url} alt="" priority />;
}
