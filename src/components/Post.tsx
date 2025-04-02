// src/components/Post.tsx
"use client";
import { PortableText } from "next-sanity";
import { POSTS_QUERYResult } from "../../sanity.types";
import SanityImage from "./SanityImage";
import { cn } from "@/lib/utils";
import { useRef, useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import { Card, CardContent, CardHeader } from "./ui/card";

export function Post({
  post,
  className,
}: {
  post: POSTS_QUERYResult[0];
  className?: string;
}) {
  const { title, body, publishedAt } = post || {};
  const [isExpanded, setIsExpanded] = useState(false);
  const [shouldShowExpand, setShouldShowExpand] = useState(false);
  const [contentHeight, setContentHeight] = useState(0);
  const contentRef = useRef<HTMLDivElement>(null);

  const measureContent = (element: HTMLDivElement | null) => {
    if (element) {
      const height = element.scrollHeight;
      setContentHeight(height);
      setShouldShowExpand(height > 300);
    }
  };

  return (
    <Card className={cn("w-full max-w-prose", className)}>
      <CardHeader>
        {title ? (
          <h2 className="text-2xl font-bold tracking-tight">{title}</h2>
        ) : null}
        {publishedAt ? (
          <p className="text-sm text-gray-500">
            {new Date(publishedAt).toLocaleString("no-NO", {
              year: "numeric",
              month: "long",
              day: "numeric",
              hour: "2-digit",
              minute: "2-digit",
              timeZone: "Europe/Oslo",
            })}
          </p>
        ) : null}
      </CardHeader>
      <CardContent className="prose prose-sm dark:prose-invert sm:prose lg:prose-lg w-full">
        <div className="relative pb-6">
          <div
            ref={(el) => {
              contentRef.current = el;
              measureContent(el);
            }}
            style={{
              maxHeight: isExpanded ? `${contentHeight}px` : "300px",
              transition: "max-height 500ms ease-in-out",
            }}
            className="overflow-hidden"
          >
            <div>
              {body ? (
                <PortableText
                  value={body}
                  components={{
                    types: {
                      image: SanityImage,
                    },
                  }}
                />
              ) : null}
            </div>
          </div>
          {shouldShowExpand && (
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className={cn(
                "group absolute right-0 -bottom-3 left-0 -mx-6 flex flex-col items-center transition-all duration-200",
                isExpanded
                  ? "pointer-events-none opacity-0"
                  : "opacity-100 hover:opacity-90",
              )}
            >
              <div className="h-24 w-full rounded-b-xl bg-gradient-to-t from-white via-white/80 to-transparent dark:from-zinc-950 dark:via-zinc-950/80 dark:to-transparent" />
              <div className="-mt-12 rounded-full bg-zinc-100 p-2 shadow-md transition-all group-hover:translate-y-0.5 group-hover:bg-zinc-200 dark:bg-zinc-800 dark:group-hover:bg-zinc-700">
                <ChevronDown className="size-5" />
              </div>
            </button>
          )}
          {shouldShowExpand && isExpanded && (
            <button
              onClick={() => setIsExpanded(false)}
              className="absolute -bottom-3 left-1/2 -translate-x-1/2 transform rounded-full bg-zinc-100 p-2 shadow-md transition-all hover:translate-y-0.5 hover:bg-zinc-200 dark:bg-zinc-800 dark:hover:bg-zinc-700"
            >
              <ChevronUp className="size-5" />
            </button>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
