"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { cn } from "@/lib/utils";
import { Category } from "@/types";

interface MainNavigationProps {
  data: Category[];
}

export function MainNavigation({ data }: MainNavigationProps) {
  const pathname = usePathname();

  const routes = data.map((route) => ({
    href: `/category/${route.id}`,
    label: route.name,
  }));

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
              isActive ? "text-black" : "text-neutral-500"
            )}
          >
            {label}
          </Link>
        );
      })}
    </nav>
  );
}
