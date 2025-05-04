
import React from 'react';
import Header from '@/components/Header';
import { Outlet } from 'react-router-dom';

const Layout: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow">
        <Outlet />
      </main>
      <footer className="bg-white py-6">
        <div className="container mx-auto px-4 text-center text-gray-500 text-sm">
          Chá de Casa Nova © {new Date().getFullYear()} - Criado com amor para nosso novo lar
        </div>
      </footer>
    </div>
  );
};

export default Layout;
