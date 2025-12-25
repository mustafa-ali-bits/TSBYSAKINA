import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-amber-900 text-white py-8">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center space-y-4">
          <h3 className="text-2xl font-serif font-bold">The Sweet Tooth</h3>
          <p className="text-amber-200 text-sm italic">by Sakina</p>
          <p className="text-amber-200 text-sm">Handcrafted with love, one chocolate at a time</p>
          <div className="border-t border-amber-800 mt-6 pt-6">
            <p className="text-amber-200 text-sm">© 2024 The Sweet Tooth by Sakina. All rights reserved.</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
