import React from 'react';

const AboutSection: React.FC = () => {
  return (
    <section id="about" className="bg-gradient-to-br from-amber-50 to-stone-100 py-16">
      <div className="max-w-7xl mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center space-y-6">
          <h2 className="text-4xl font-serif font-bold text-amber-900">Our Story</h2>
          <p className="text-lg text-stone-700 leading-relaxed">
            At The Sweet Tooth, every chocolate is a labor of love. Sakina handcrafts each piece using premium ingredients and time-honored techniques, creating confections that delight the senses and warm the heart.
          </p>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
