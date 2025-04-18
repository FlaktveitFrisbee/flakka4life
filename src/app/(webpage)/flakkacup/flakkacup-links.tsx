import { cn } from "@/lib/utils";
import Link from "next/link";
import React from "react";
import { currentWeekly, type Weekly } from "./helpers";

export default function FlakkacupLinks(props: {
  currentPageWeekly: Weekly;
  weeklies: Weekly[];
}) {
  const { currentPageWeekly, weeklies } = props;

  return (
    <nav className="flex flex-col gap-2">
      {weeklies.map((weekly) => (
        <FlakkacupLink
          key={weekly.id}
          weekly={weekly}
          isOnCurrentPage={weekly.id === currentPageWeekly.id}
        />
      ))}
    </nav>
  );
}

export function FlakkacupLink(props: {
  weekly: Weekly;
  isOnCurrentPage: boolean;
}) {
  const { weekly, isOnCurrentPage } = props;
  const href =
    weekly.id === currentWeekly.id ? `/flakkacup` : `/flakkacup/${weekly.id}`;
  return (
    <Link
      href={href}
      key={weekly.id}
      className={cn(
        "underline hover:no-underline",
        isOnCurrentPage && "font-semibold",
      )}
    >
      {weekly.name}
    </Link>
  );
}
