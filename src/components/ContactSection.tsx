import React from 'react';
import { Mail, Phone, Instagram, Facebook } from 'lucide-react';

const ContactSection: React.FC = () => {
  return (
    <section id="contact" className="bg-white py-16">
      <div className="max-w-7xl mx-auto px-4">
        <div className="max-w-2xl mx-auto text-center space-y-8">
          <h2 className="text-4xl font-serif font-bold text-amber-900">Get in Touch</h2>
          <p className="text-stone-600">Have questions or want to place a custom order? We'd love to hear from you!</p>
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
            <a href="mailto:hello@thesweettooth.com" className="flex items-center gap-3 text-stone-700 hover:text-amber-900 transition-colors">
              <Mail className="w-5 h-5" />
              <span>hello@thesweettooth.com</span>
            </a>
            <a href="tel:+1234567890" className="flex items-center gap-3 text-stone-700 hover:text-amber-900 transition-colors">
              <Phone className="w-5 h-5" />
              <span>(555) 123-4567</span>
            </a>
          </div>

          <div className="flex gap-4 justify-center pt-4">
            <a href="#" className="p-3 bg-stone-100 rounded-full hover:bg-amber-900 hover:text-white transition-all">
              <Instagram className="w-6 h-6" />
            </a>
            <a href="#" className="p-3 bg-stone-100 rounded-full hover:bg-amber-900 hover:text-white transition-all">
              <Facebook className="w-6 h-6" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
