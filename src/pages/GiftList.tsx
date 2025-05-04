
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useGiftRegistry } from '@/contexts/GiftRegistryContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Check, X, Eye } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';

const GiftList: React.FC = () => {
  const { isAuthenticated, gifts, email, reserveGift, cancelReservation } = useGiftRegistry();
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  // If user is not authenticated, redirect to home page
  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/');
    }
  }, [isAuthenticated, navigate]);

  // Filter gifts based on search term
  const filteredGifts = gifts.filter(gift =>
    gift.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    gift.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Get the gifts that are reserved by the current user
  const myReservedGifts = gifts.filter(gift => gift.reservedBy === email);

  // Check if a gift is reserved by the current user
  const isReservedByMe = (reservedBy: string | null) => {
    return reservedBy === email;
  };

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="max-w-5xl mx-auto">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-casanova-700 mb-3">Lista de Presentes</h1>
          <p className="text-gray-600 mb-6">
            Escolha um presente especial para nos ajudar a preencher a nossa geladeira
          </p>

          <div className="max-w-md mx-auto">
            <Input
              placeholder="Buscar presentes..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full mb-4"
            />
          </div>
        </div>

        {filteredGifts.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500">Nenhum presente encontrado para "{searchTerm}"</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredGifts.map((gift) => (
              <div
                key={gift.id}
                className={`bg-white rounded-xl shadow-md overflow-hidden gift-item-card ${
                  gift.reservedBy ? 'gift-item-reserved' : ''
                }`}
              >
                <div className="h-48 relative overflow-hidden">
                  <img
                    src={gift.image}
                    alt={gift.name}
                    className="w-full h-full object-cover transition-transform duration-300"
                  />
                  {gift.reservedBy && (
                    <div className="gift-item-reserved-banner">
                      {isReservedByMe(gift.reservedBy) ? 'Seu presente!' : 'Reservado'}
                    </div>
                  )}
                </div>
                <div className="p-4">
                  <h3 className="font-semibold text-lg mb-1">{gift.name}</h3>
                  <p className="text-gray-600 text-sm mb-2">{gift.description}</p>
                  <p className="text-casanova-600 font-semibold mb-3">{gift.price}</p>
                  
                  <div className="space-y-3">
                    {/* <a 
                      href={gift.url} 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="block text-center text-sm py-2 px-4 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-md transition-colors"
                    >
                      Ver onde comprar
                    </a> */}
                    
                    {gift.reservedBy ? (
                      isReservedByMe(gift.reservedBy) && (
                        <Button
                          onClick={() => cancelReservation(gift.id)}
                          className="w-full bg-white border border-red-200 text-red-500 hover:bg-red-50"
                          variant="outline"
                        >
                          <X className="w-4 h-4 mr-2" />
                          Cancelar reserva
                        </Button>
                      )
                    ) : (
                      <Button
                        onClick={() => reserveGift(gift.id)}
                        className="w-full bg-casanova-600 hover:bg-casanova-700"
                      >
                        <Check className="w-4 h-4 mr-2" />
                        Reservar presente
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* My Reserved Gifts Section */}
        <div className="mt-16">
          <Card>
            <CardHeader className="bg-casanova-50">
              <CardTitle className="text-casanova-700">Meus Presentes Reservados</CardTitle>
            </CardHeader>
            <CardContent className="pt-6">
              {myReservedGifts.length === 0 ? (
                <div className="text-center py-6">
                  <p className="text-gray-500">Você ainda não reservou nenhum presente</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                  {myReservedGifts.map((gift) => (
                    <div key={gift.id} className="bg-white border border-gray-100 rounded-lg overflow-hidden shadow-sm">
                      <div className="flex items-center p-3 border-b">
                        <div className="w-16 h-16 mr-3 overflow-hidden rounded">
                          <img
                            src={gift.image}
                            alt={gift.name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="flex-grow">
                          <h4 className="font-medium text-gray-800">{gift.name}</h4>
                          <p className="text-sm text-casanova-600">{gift.price}</p>
                        </div>
                      </div>
                      <div className="p-3 flex justify-between">
                        <a
                          href={gift.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-sm inline-flex items-center text-gray-600 hover:text-gray-800"
                        >
                          <Eye className="w-4 h-4 mr-1" />
                          Ver produto
                        </a>
                        <Button
                          onClick={() => cancelReservation(gift.id)}
                          size="sm"
                          variant="ghost"
                          className="text-red-500 hover:text-red-600 hover:bg-red-50 p-2"
                        >
                          <X className="w-4 h-4" />
                          Cancelar
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default GiftList;
