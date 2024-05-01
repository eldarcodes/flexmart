import { getProduct, getProducts } from "@/api/products";
import { Gallery } from "@/components/gallery";
import { ProductList } from "@/components/product-list";
import { Container } from "@/components/ui/container";

interface ProductPageProps {
  params: {
    productId: string;
  };
}

export default async function ProductPage({ params }: ProductPageProps) {
  const product = await getProduct(params.productId);

  const suggestedProducts = await getProducts({
    categoryId: product.category.id,
  });

  return (
    <div className="bg-white">
      <Container>
        <div className="px-4 py-10 sm:px-6 lg:px-8">
          <div className="lg:grid lg:grid-cols-2 lg:items-center lg:gap-x-8">
            <Gallery images={product.images} />

            <div className="mt-10 px-4 sm:mt-16 sm:px-0 lg:mt-0">Info</div>
          </div>

          <hr className="my-10" />
          <ProductList title="Related items" products={suggestedProducts} />
        </div>
      </Container>
    </div>
  );
}
