import { OrderForm } from "@/components/OrderForm";
import { db } from "@/db";
import { products, ProductsType } from "@/db/schema";
import { eq } from "drizzle-orm";
import { notFound } from "next/navigation";

export default async function OrderPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const query = (await searchParams)?.product;
  const productId = Array.isArray(query) ? query[0] : query;
  if (!productId) notFound();
  console.log("This is the product id passed ", productId); // Delete Later

  const product: ProductsType[] = await db
    .select()
    .from(products)
    .where(eq(products.id, productId));

  if (product.length === 0) notFound();

  return (
    <>
      <OrderForm product={product[0]} />
    </>
  );
}
