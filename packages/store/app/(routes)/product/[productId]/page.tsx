import { getProduct, getProducts } from "@/api/products";
import { Gallery } from "@/components/gallery";
import { Info } from "@/components/info";
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
          <div className="md:grid md:grid-cols-2 items-start lg:gap-x-8">
            <Gallery images={product.images} />

            <div className="md:px-4 sm:px-0 mt-10 md:mt-0">
              <Info product={product} />
            </div>
          </div>

          <hr className="my-10" />
          <ProductList title="Related items" products={suggestedProducts} />
        </div>
      </Container>
    </div>
  );
}
