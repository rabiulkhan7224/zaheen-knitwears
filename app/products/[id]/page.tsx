import ProductDetail from '@/components/ProductDetail';
import { notFound } from 'next/navigation';

async function getProduct(id: string) {
  const res = await fetch(
    `https://zaheen-knitwears-backend.vercel.app/api/v1/products/${id}`
  );

  if (!res.ok) return null;
  const data = await res.json();
  return data.data;
}

export default async function ProductPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params; 

  const product = await getProduct(id);

  if (!product) notFound();

  return <ProductDetail product={product} />;
}
