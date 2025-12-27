import React from 'react';

interface CategoryNavProps {
  categories: string[];
  selectedCategory: string;
  onSelectCategory: (category: string) => void;
}

const CategoryNav: React.FC<CategoryNavProps> = ({ categories, selectedCategory, onSelectCategory }) => {
  return (
    <section className="bg-white border-b border-stone-200">
      <div className="max-w-7xl mx-auto px-4 py-4">
        <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
          {categories.map(category => (
            <button
              key={category}
              onClick={() => onSelectCategory(category)}
              className={`px-6 py-2 rounded-full font-medium whitespace-nowrap transition-all flex-shrink-0 ${
                selectedCategory === category
                  ? 'bg-amber-900 text-white shadow-md'
                  : 'bg-stone-100 text-stone-700 hover:bg-stone-200'
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CategoryNav;
