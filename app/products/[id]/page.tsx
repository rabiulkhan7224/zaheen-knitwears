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

export default async function ProductPage({ params }: { params: { id: string } }) {
  const product = await getProduct(params.id);

  if (!product) notFound();

  return <ProductDetail product={product} />;
}