import Link from "next/link";

import { Container } from "@/components/ui/container";
import { MainNavigation } from "@/components/main-navigation";
import { getCategories } from "@/api/categories";
import { NavbarActions } from "@/components/navbar-actions";

export async function Navbar() {
  const categories = await getCategories();

  return (
    <div className="border-b">
      <Container>
        <div className="relative px-4 sm:px-6 lg:px-8 flex h-16 items-center">
          <Link href="/" className="ml-4 flex lg:ml-0 gap-x-2">
            <p className="font-bold text-xl">STORE</p>
          </Link>

          <MainNavigation data={categories} />

          <NavbarActions />
        </div>
      </Container>
    </div>
  );
}
