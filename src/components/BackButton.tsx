'use client';

import React from 'react';
import { ArrowLeft } from 'lucide-react';
import { useRouter } from 'next/navigation';

interface BackButtonProps {
  href?: string;
  onClick?: () => void;
}

const BackButton: React.FC<BackButtonProps> = ({ href, onClick }) => {
  const router = useRouter();

  const handleClick = () => {
    if (onClick) {
      onClick();
    } else if (href) {
      router.push(href);
    } else {
      router.back();
    }
  };

  return (
    <button
      onClick={handleClick}
      className="flex items-center gap-2 text-amber-900 hover:text-amber-700 transition-colors mb-6"
    >
      <ArrowLeft className="w-5 h-5" />
      Back to Products
    </button>
  );
};

export default BackButton;
