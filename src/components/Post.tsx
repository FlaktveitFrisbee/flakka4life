// src/components/Post.tsx
"use client";
import { PortableText } from "next-sanity";
import { POSTS_QUERYResult } from "../../sanity.types";
import SanityImage from "./SanityImage";
import { cn } from "@/lib/utils";
import { useEffect, useRef, useState } from "react";
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

  useEffect(() => {
    if (contentRef.current) {
      const height = contentRef.current.scrollHeight;
      setContentHeight(height);
      setShouldShowExpand(height > 300);
    }
  }, [body]);

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
        <div className="relative">
          <div
            ref={contentRef}
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
          {shouldShowExpand && !isExpanded && (
            <div
              className="pointer-events-none absolute right-0 bottom-0 left-0 h-24 bg-gradient-to-t from-white to-white/0 dark:from-zinc-950 dark:to-zinc-950/0"
              style={{
                transition: "opacity 200ms ease-in-out",
                opacity: isExpanded ? 0 : 1,
              }}
            />
          )}
          {shouldShowExpand && (
            <button
              className={cn(
                "absolute -bottom-4 left-1/2 -translate-x-1/2 transform rounded-full bg-zinc-100 p-2 shadow-md transition-all hover:cursor-pointer hover:bg-zinc-200 dark:bg-zinc-800 dark:hover:bg-zinc-700",
                !isExpanded && "hover:translate-y-0.5",
              )}
              onClick={() => setIsExpanded(!isExpanded)}
            >
              {isExpanded ? (
                <ChevronUp className="h-4 w-4" />
              ) : (
                <ChevronDown className="h-4 w-4" />
              )}
            </button>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
