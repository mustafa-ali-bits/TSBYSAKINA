import { Product } from '../types/product';

export const DataService = {
  async fetchFromGoogleSheets(): Promise<Product[]> {
    try {
      const response = await fetch('/api/products', {
        next: { revalidate: 60 }, // Cache for 60 seconds (1 minute)
      });
      if (!response.ok) {
        throw new Error('Failed to fetch products from API');
      }
      return await response.json();
    } catch (error) {
      console.error('Error fetching products:', error);
      // Return demo data on error
      return this.getDemoData();
    }
  },

  getDemoData(): Product[] {
    return [
      {
        id: 1,
        name: "Dark Chocolate Truffles",
        mrp: 29.99,
        price: 24.99,
        category: "Chocolates",
        subcategory: "Truffles",
        description: "Rich 70% dark chocolate ganache dusted with cocoa powder",
        image: "https://images.unsplash.com/photo-1548907040-4baa42d10919?w=400",
        rating: 4.8,
        inventory: true,
        customizationNote: "Add personalized message or choose from available toppings like nuts, fruits, or edible flowers."
      },
      {
        id: 2,
        name: "Premium Dark Bar",
        mrp: 11.99,
        price: 8.99,
        category: "Chocolates",
        subcategory: "Dark Chocolate",
        description: "85% single-origin dark chocolate bar",
        image: "https://images.unsplash.com/photo-1606312619070-d48b4a056a59?w=400",
        rating: 4.9,
        inventory: true,
        customizationNote: "Can be engraved with custom text or logo. Available in different cocoa percentages."
      },
      {
        id: 3,
        name: "Milk Chocolate Hazelnut",
        mrp: 9.99,
        price: 7.99,
        category: "Chocolates",
        subcategory: "Milk Chocolate",
        description: "Creamy milk chocolate with roasted hazelnuts",
        image: "https://images.unsplash.com/photo-1607478900766-efe13248b125?w=400",
        rating: 5.0,
        inventory: true,
        customizationNote: "Nut-free alternatives available. Can be customized with different nut types or made without nuts."
      }
    ];
  }
};
