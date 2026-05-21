import React from 'react';
import { ScrambleText } from '@/components/ui/scramble-text';

export const Navbar = () => {
  return (
    <div className="fixed top-6 left-1/2 -translate-x-1/2 z-50 w-11/12 md:w-1/2 transition-all duration-500">
      <nav className="flex items-center justify-center py-4 bg-white/40 backdrop-blur-xl rounded-full shadow-lg shadow-black/5 hover:shadow-xl hover:bg-white/50 transition-all duration-300">
        <ScrambleText 
          text="EMIE" 
          className="font-bold text-xl tracking-[0.2em] text-black cursor-crosshair" 
        />
      </nav>
    </div>
  );
};
