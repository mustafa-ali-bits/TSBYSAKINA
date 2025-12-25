import React from 'react';
import { Search } from 'lucide-react';

interface SearchAndFilterProps {
  searchTerm: string;
  onSearchChange: (term: string) => void;
  selectedCategory: string;
  subcategories: string[];
  selectedSubcategory: string;
  onSelectSubcategory: (subcategory: string) => void;
}

const SearchAndFilter: React.FC<SearchAndFilterProps> = ({
  searchTerm,
  onSearchChange,
  selectedCategory,
  subcategories,
  selectedSubcategory,
  onSelectSubcategory
}) => {
  return (
    <section id="products" className="bg-stone-50 border-b border-stone-200">
      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
          <div className="relative flex-1 max-w-md w-full">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-stone-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search for chocolates..."
              className="w-full pl-12 pr-4 py-3 bg-white border border-stone-200 rounded-full focus:ring-2 focus:ring-amber-900 focus:border-transparent transition-all"
              value={searchTerm}
              onChange={(e) => onSearchChange(e.target.value)}
            />
          </div>

          {selectedCategory !== 'All' && subcategories.length > 1 && (
            <div className="flex gap-2 flex-wrap">
              <span className="text-sm text-stone-600 self-center font-medium mr-2">Filter by:</span>
              {subcategories.map(subcategory => (
                <button
                  key={subcategory}
                  onClick={() => onSelectSubcategory(subcategory)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                    selectedSubcategory === subcategory
                      ? 'bg-amber-800 text-white shadow-md'
                      : 'bg-white text-stone-700 hover:bg-stone-100 border border-stone-200'
                  }`}
                >
                  {subcategory}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default SearchAndFilter;
