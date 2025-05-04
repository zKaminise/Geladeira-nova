
import React from 'react';
import { useGiftRegistry } from '@/contexts/GiftRegistryContext';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const Header: React.FC = () => {
  const { isAuthenticated, email, logout } = useGiftRegistry();

  return (
    <header className="w-full bg-white shadow-sm py-4">
      <div className="container mx-auto flex justify-between items-center px-4">
        <Link to="/" className="text-2xl font-bold text-casanova-700">
          Chá de Casa Nova
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
              className="border-casanova-300 text-casanova-700 hover:bg-casanova-50"
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
