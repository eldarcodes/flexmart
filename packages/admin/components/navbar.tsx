import { UserButton, auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";

import { MainNavigation } from "@/components/main-navigation";
import { StoreSwitcher } from "@/components/store-switcher";
import { ThemeToggle } from "@/components/theme-toggle";
import { db } from "@/lib/db";

export async function Navbar() {
  const { userId } = auth();

  if (!userId) {
    redirect("/sign-in");
  }

  const stores = await db.store.findMany({
    where: {
      userId,
    },
  });

  return (
    <div className="border-b">
      <div className="flex h-16 items-center px-4">
        <StoreSwitcher stores={stores} />

        <MainNavigation />

        <div className="ml-auto flex items-center space-x-4">
          <ThemeToggle />
          <UserButton afterSignOutUrl="/" />
        </div>
      </div>
    </div>
  );
}
