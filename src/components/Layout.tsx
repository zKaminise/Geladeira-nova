
import React from 'react';
import Header from '@/components/Header';
import { Outlet } from 'react-router-dom';

const Layout: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col bg-blue-50">
      <Header />
      <main className="flex-grow">
        <Outlet />
      </main>
      <footer className="bg-gradient-to-r from-blue-500 to-blue-600 text-white py-6">
        <div className="container mx-auto px-4 text-center text-sm">
          Chá de Casa Nova © {new Date().getFullYear()} - Criado com amor para nossa geladeira
        </div>
      </footer>
    </div>
  );
};

export default Layout;
