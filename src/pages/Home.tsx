
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useGiftRegistry } from '@/contexts/GiftRegistryContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/components/ui/use-toast';

const Home: React.FC = () => {
  const { setEmail, isAuthenticated } = useGiftRegistry();
  const [inputEmail, setInputEmail] = useState('');
  const [emailError, setEmailError] = useState('');
  const navigate = useNavigate();
  const { toast } = useToast();

  // If user is already authenticated, redirect to gifts page
  React.useEffect(() => {
    if (isAuthenticated) {
      navigate('/gifts');
    }
  }, [isAuthenticated, navigate]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Simple email validation
    if (!inputEmail) {
      setEmailError('Por favor, insira seu email');
      return;
    }
    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(inputEmail)) {
      setEmailError('Por favor, insira um email válido');
      return;
    }
    
    setEmail(inputEmail);
    setEmailError('');
    navigate('/gifts');
  };

  return (
    <div className="min-h-[calc(100vh-80px)] flex flex-col items-center justify-center bg-secondary/30 px-4">
      <div className="max-w-md w-full space-y-8 animate-fade-in">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-casanova-700 mb-2">
            Chá de Geladeira Nova da Carol e Misaozin
          </h1>
          <p className="text-gray-600 mb-8">
            Ajude-nos a preencher nossa geladeira e aguentar até o fim do ano!
          </p>
          
          <div className="bg-white p-8 rounded-xl shadow-md">
            <div className="mb-8 overflow-hidden rounded-lg">
              <img 
                src="./MisaoCarol.jpeg" 
                alt="Misao e Carol" 
                className="w-full h-48 object-cover" 
              />
            </div>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                  Seu Email
                </label>
                <Input
                  id="email"
                  type="email"
                  placeholder="nome@exemplo.com"
                  value={inputEmail}
                  onChange={(e) => setInputEmail(e.target.value)}
                  className={emailError ? "border-red-500" : ""}
                />
                {emailError && (
                  <p className="mt-1 text-sm text-red-600">
                    {emailError}
                  </p>
                )}
              </div>
              
              <Button 
                type="submit" 
                className="w-full bg-casanova-600 hover:bg-casanova-700"
              >
                Ver Lista de Presentes
              </Button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
