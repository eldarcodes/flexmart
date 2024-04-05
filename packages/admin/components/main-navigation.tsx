"use client";

import Link from "next/link";
import { useParams, usePathname } from "next/navigation";

import { cn } from "@/lib/utils";

export function MainNavigation() {
  const pathname = usePathname();
  const params = useParams();

  const routes = [
    {
      href: `/${params.storeId}`,
      label: "Overview",
    },
    {
      href: `/${params.storeId}/billboards`,
      label: "Billboards",
    },
    {
      href: `/${params.storeId}/categories`,
      label: "Categories",
    },
    {
      href: `/${params.storeId}/settings`,
      label: "Settings",
    },
  ];

  return (
    <nav className="flex items-center space-x-4 lg:space-x-6 mx-6">
      {routes.map(({ label, href }) => {
        const isActive = pathname === href;

        return (
          <Link
            key={href}
            href={href}
            className={cn(
              "text-sm font-medium transition-colors hover:text-primary",
              isActive ? "text-black dark:text-white" : "text-muted-foreground"
            )}
          >
            {label}
          </Link>
        );
      })}
    </nav>
  );
}
