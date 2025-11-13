
import React from 'react';
import { ChartBarSquareIcon } from '@heroicons/react/24/solid';

const Header: React.FC = () => {
  return (
    <header className="bg-gray-800/50 backdrop-blur-sm p-4 shadow-lg sticky top-0 z-10">
      <div className="container mx-auto flex items-center gap-3">
         <ChartBarSquareIcon className="h-8 w-8 text-indigo-400" />
        <h1 className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-indigo-400 to-cyan-400 text-transparent bg-clip-text">
          Dashboard Joki Tugas
        </h1>
      </div>
    </header>
  );
};

export default Header;
