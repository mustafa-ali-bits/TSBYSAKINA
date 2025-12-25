'use client';

import React, { useState, useEffect } from 'react';
import { DataService } from '@/lib/dataService';
import { ProductUtils } from '@/lib/productUtils';
import { Product } from '@/types/product';
import Header from '@/components/Header';
import ErrorBanner from '@/components/ErrorBanner';
import HeroSection from '@/components/HeroSection';
import CategoryNav from '@/components/CategoryNav';
import SearchAndFilter from '@/components/SearchAndFilter';
import ProductsGrid from '@/components/ProductsGrid';
import AboutSection from '@/components/AboutSection';
import ContactSection from '@/components/ContactSection';
import Footer from '@/components/Footer';

const Page: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedSubcategory, setSelectedSubcategory] = useState('All');

  const fetchProducts = async () => {
    setLoading(true);
    setError(null);
    
    try {
      const data = await DataService.fetchFromGoogleSheets();
      setProducts(data);
    } catch (err) {
      console.error('Error fetching data:', err);
      setError((err as Error).message);
      setProducts(DataService.getDemoData());
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  useEffect(() => {
    setSelectedSubcategory('All');
  }, [selectedCategory]);

  const categories = ProductUtils.getUniqueCategories(products);
  const subcategories = ProductUtils.getSubcategories(products, selectedCategory);
  const filteredProducts = ProductUtils.filterProducts(
    products, 
    searchTerm, 
    selectedCategory, 
    selectedSubcategory
  );

  return (
    <div className="min-h-screen bg-stone-50">
      <Header onRefresh={fetchProducts} isLoading={loading} />
      <ErrorBanner error={error} />
      <HeroSection />
      <CategoryNav 
        categories={categories}
        selectedCategory={selectedCategory}
        onSelectCategory={setSelectedCategory}
      />
      <SearchAndFilter 
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        selectedCategory={selectedCategory}
        subcategories={subcategories}
        selectedSubcategory={selectedSubcategory}
        onSelectSubcategory={setSelectedSubcategory}
      />
      <ProductsGrid 
        products={filteredProducts}
        loading={loading}
        selectedCategory={selectedCategory}
        selectedSubcategory={selectedSubcategory}
      />
      <AboutSection />
      <ContactSection />
      <Footer />
    </div>
  );
};

export default Page;
