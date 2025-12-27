import React from 'react';

const HeroSection: React.FC = () => {
  return (
    <section className="relative bg-gradient-to-br from-stone-100 via-amber-50 to-stone-100 py-16 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-8 items-center">
          <div className="space-y-6">
            <h2 className="text-5xl md:text-6xl font-serif font-bold text-amber-900 leading-tight">
              Chocolates <br />Brownies<br />Cookies
            </h2>
            <p className="text-lg text-stone-700 leading-relaxed">
              Handcrafted chocolates, brownies & cookies made fresh with premium ingredients and lots of love.
            </p>
            <button
              onClick={() => {
                const element = document.getElementById('product-1');
                if (element) {
                  element.scrollIntoView({
                    behavior: 'smooth',
                    block: 'center'
                  });
                }
              }}
              className="bg-amber-900 text-white px-8 py-4 rounded-full font-semibold hover:bg-amber-800 transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
            >
              Explore Collection
            </button>
          </div>
          <div className="relative">
            <div className="bg-transparent transform hover:scale-105 transition-transform duration-300">
              <img
                src="/logo.jpeg"
                alt="The Sweet Tooth by Sakina Logo"
                className="w-full h-auto drop-shadow-2xl"
              />
            </div>
          </div>
        </div>
      </div>
      <div className="absolute top-10 right-10 w-32 h-32 bg-amber-200 rounded-full blur-3xl opacity-30"></div>
      <div className="absolute bottom-10 left-10 w-40 h-40 bg-stone-300 rounded-full blur-3xl opacity-20"></div>
    </section>
  );
};

export default HeroSection;
