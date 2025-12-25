import { notFound } from 'next/navigation';
import { Product } from '@/types/product';
import { DataService } from '@/lib/dataService';
import ProductDetail from '@/components/ProductDetail';

interface PageProps {
  params: {
    id: string;
  };
}

export default async function ProductPage({ params }: PageProps) {
  const products = DataService.getDemoData();
  const product = products.find(p => p.id === parseInt(params.id));

  if (!product) {
    notFound();
  }

  return <ProductDetail product={product} />;
}

export async function generateStaticParams() {
  const products = DataService.getDemoData();
  return products.map((product) => ({
    id: product.id.toString(),
  }));
}
