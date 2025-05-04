
import React from 'react';
import { useGiftRegistry } from '@/contexts/GiftRegistryContext';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const Header: React.FC = () => {
  const { isAuthenticated, email, logout } = useGiftRegistry();

  return (
    <header className="w-full bg-white shadow-sm py-4 border-b border-blue-100">
      <div className="container mx-auto flex justify-between items-center px-4">
        <Link to="/" className="text-2xl font-bold text-blue-600">
          Chá de Geladeira Nova
        </Link>
        
        {isAuthenticated && (
          <div className="flex items-center gap-4">
            <span className="text-sm text-gray-600 hidden md:inline-block">
              Olá, {email?.split('@')[0]}
            </span>
            <Button 
              variant="outline" 
              size="sm" 
              onClick={logout}
              className="border-blue-300 text-blue-700 hover:bg-blue-50"
            >
              Sair
            </Button>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
