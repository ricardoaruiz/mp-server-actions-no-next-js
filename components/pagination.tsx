"use client";

import { MetaLink } from "@/actions/types";
import {
  Pagination as PaginationComponent,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { useRouteHandler } from "@/hooks/useRouteHandler";
import { cn } from "@/lib/utils";

type PaginationProps = {
  data: MetaLink[];
};

export default function Pagination({ data = [] }: PaginationProps) {
  const { getUrl } = useRouteHandler()

  return (
    <PaginationComponent>
      <PaginationContent>
        {data.map((link, index) => {
          const isFirst = index === 0;
          const isLast = index === data.length - 1;
          const isFirstOrLast = isFirst || isLast;

          if (isFirstOrLast) {
            const url = link.url ? new URL(link.url) : null;

            let to = "";
            if (url) {
              const params = new URLSearchParams(url.search);
              const page = params.get("page");

              to = page
                ? getUrl({
                    search: [{ name: "page", value: page === "1" ? "" : page }],
                  })
                : "";
            }

            return (
              <PaginationItem
                key={link.label}
                className={cn("hidden md:inline-flex", {
                  "bg-transparent hover:bg-transparent text-slate-400 pointer-events-none":
                    !to,
                })}
              >
                {isFirst ? (
                  <PaginationPrevious href={to} />
                ) : (
                  <PaginationNext href={to} />
                )}
              </PaginationItem>
            );
          }

          const isEllipsis = link.label === "...";
          const url = !isEllipsis
            ? getUrl({
                search: [
                  { name: "page", value: link.label === "1" ? "" : link.label },
                ],
              })
            : "#";

          return (
            <PaginationItem
              key={`${link.label}${index}`}
              className="hidden md:inline-flex"
            >
              {isEllipsis ? (
                <PaginationEllipsis />
              ) : (
                <PaginationLink href={url} isActive={link.active}>
                  {link.label}
                </PaginationLink>
              )}
            </PaginationItem>
          );
        })}
      </PaginationContent>
    </PaginationComponent>
  );
}
