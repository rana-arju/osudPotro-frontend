import ProductDetails from "@/components/ProductDetails";

import { getMedicineById } from "@/services/medicine";

export default async function ProductPage({ params }: any) {
  // Mock product data - in a real app, fetch this based on params.id
  const id = await params?.id;

  const productData = await getMedicineById(id);

  const product = productData?.data;

  return (
    <div>
      <ProductDetails product={product} />
    </div>
  );
}
