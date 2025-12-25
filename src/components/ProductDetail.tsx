import React from 'react';
import { ArrowLeft, Star, Heart } from 'lucide-react';
import { Product } from '../types/product';
import { ProductUtils } from '../lib/productUtils';

interface ProductDetailProps {
  product: Product;
  onBack: () => void;
}

const ProductDetail: React.FC<ProductDetailProps> = ({ product, onBack }) => {
  const discount = ProductUtils.getDiscountPercentage(product.mrp, product.price);
  const savings = ProductUtils.getSavingsAmount(product.mrp, product.price);

  return (
    <div className="min-h-screen bg-stone-50">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-amber-900 hover:text-amber-700 transition-colors mb-6"
        >
          <ArrowLeft className="w-5 h-5" />
          Back to Products
        </button>

        <div className="grid md:grid-cols-2 gap-12">
          <div className="space-y-6">
            <div className="relative h-96 bg-stone-100 rounded-2xl overflow-hidden">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute top-4 left-4 flex flex-col gap-2">
                <span className="bg-red-500 text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg">
                  {discount}% OFF
                </span>
                <span className="bg-amber-900 text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg">
                  {product.category}
                </span>
                <span className="bg-white text-amber-900 text-xs font-semibold px-3 py-1 rounded-full shadow-lg">
                  {product.subcategory}
                </span>
              </div>
              <button className="absolute top-4 right-4 p-3 bg-white/90 backdrop-blur-sm rounded-full shadow-lg hover:bg-white transition-all">
                <Heart className="w-5 h-5 text-amber-900" />
              </button>
            </div>
          </div>

          <div className="space-y-6">
            <div>
              <h1 className="text-4xl font-serif font-bold text-amber-900 mb-2">{product.name}</h1>
              <p className="text-stone-600 text-lg">{product.description}</p>
            </div>

            <div className="flex items-center gap-1">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`w-5 h-5 ${i < Math.floor(product.rating) ? 'fill-amber-400 text-amber-400' : 'text-stone-300'}`}
                />
              ))}
              <span className="text-lg font-medium text-stone-700 ml-2">{product.rating} / 5.0</span>
            </div>

            <div className="space-y-2">
              <div className="flex items-center gap-4">
                <span className="text-3xl font-bold text-amber-900">${product.price}</span>
                <span className="text-xl text-stone-400 line-through">${product.mrp}</span>
                <span className="text-lg font-semibold text-green-600">Save ${savings}</span>
              </div>
              <p className="text-stone-600">Limited time offer - {discount}% discount!</p>
            </div>

            <div className="space-y-4">
              <button className="w-full bg-amber-900 text-white py-4 rounded-full font-semibold hover:bg-amber-800 transition-all shadow-lg hover:shadow-xl">
                Add to Cart
              </button>
              <button className="w-full bg-white text-amber-900 py-4 rounded-full font-semibold hover:bg-stone-100 transition-all shadow-md border border-stone-200">
                Add to Wishlist
              </button>
            </div>

            <div className="bg-stone-100 p-6 rounded-xl">
              <h3 className="text-lg font-semibold text-amber-900 mb-3">Product Details</h3>
              <div className="space-y-2 text-sm text-stone-700">
                <p><span className="font-medium">Category:</span> {product.category}</p>
                <p><span className="font-medium">Subcategory:</span> {product.subcategory}</p>
                <p><span className="font-medium">Rating:</span> {product.rating}/5</p>
                <p><span className="font-medium">MRP:</span> ${product.mrp}</p>
                <p><span className="font-medium">Price:</span> ${product.price}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
