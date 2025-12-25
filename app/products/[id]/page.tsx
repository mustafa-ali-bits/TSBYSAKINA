'use client';

import React, { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { Product } from '@/types/product';
import { DataService } from '@/lib/dataService';
import ProductDetail from '@/components/ProductDetail';

const ProductPage: React.FC = () => {
  const params = useParams();
  const router = useRouter();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const id = params.id as string;
    if (id) {
      // For demo purposes, get from demo data
      const products = DataService.getDemoData();
      const foundProduct = products.find(p => p.id === parseInt(id));
      setProduct(foundProduct || null);
      setLoading(false);
    }
  }, [params.id]);

  const handleBack = () => {
    router.push('/');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-stone-50 flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="animate-spin w-12 h-12 border-4 border-amber-900 border-t-transparent rounded-full mx-auto"></div>
          <p className="text-stone-600">Loading product...</p>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-stone-50 flex items-center justify-center">
        <div className="text-center space-y-4">
          <h1 className="text-2xl font-bold text-amber-900">Product Not Found</h1>
          <p className="text-stone-600">The product you're looking for doesn't exist.</p>
          <button
            onClick={handleBack}
            className="bg-amber-900 text-white px-6 py-2 rounded-full font-semibold hover:bg-amber-800 transition-all"
          >
            Back to Products
          </button>
        </div>
      </div>
    );
  }

  return <ProductDetail product={product} onBack={handleBack} />;
};

export default ProductPage;
