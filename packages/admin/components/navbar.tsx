import { UserButton } from "@clerk/nextjs";

import { MainNavigation } from "@/components/main-navigation";

interface NavbarProps {}

export function Navbar({}: NavbarProps) {
  return (
    <div className="border-b">
      <div className="flex h-16 items-center px-4">
        <div>Store switcher</div>

        <MainNavigation />

        <div className="ml-auto flex items-center space-x-4">
          <UserButton afterSignOutUrl="/" />
        </div>
      </div>
    </div>
  );
}
