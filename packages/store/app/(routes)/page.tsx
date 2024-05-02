import { getBillboard } from "@/api/billboard";
import { getProducts } from "@/api/products";
import { Billboard } from "@/components/billboard";
import { ProductList } from "@/components/product-list";
import { Container } from "@/components/ui/container";

export default async function HomePage() {
  const billboard = await getBillboard("1cc34421-9b58-4cc6-8ab0-372a65c9db94");

  const products = await getProducts({ isFeatured: true });

  return (
    <Container>
      <div className="space-y-10 pb-10">
        <Billboard data={billboard} />

        <div className="flex flex-col gap-y-8 px-4 sm:px-6 lg:px-8">
          <ProductList title="Featured products" products={products} />
        </div>
      </div>
    </Container>
  );
}
