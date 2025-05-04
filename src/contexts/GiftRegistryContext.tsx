
import React, { createContext, useState, useContext, useEffect, ReactNode } from "react";
import { toast } from "@/components/ui/use-toast";

interface GiftItem {
  id: string;
  name: string;
  description: string;
  image: string;
  price: string;
  url: string;
  reservedBy: string | null;
}

interface GiftRegistryContextType {
  email: string | null;
  setEmail: (email: string) => void;
  isAuthenticated: boolean;
  logout: () => void;
  gifts: GiftItem[];
  reserveGift: (giftId: string) => void;
  cancelReservation: (giftId: string) => void;
  loading: boolean;
}

const GiftRegistryContext = createContext<GiftRegistryContextType | undefined>(undefined);

// Sample gift data
const initialGifts: GiftItem[] = [
  {
    id: "1",
    name: "Conjunto de Panelas Antiaderentes",
    description: "Conjunto completo de panelas antiaderentes para sua nova cozinha",
    image: "https://images.unsplash.com/photo-1593784991095-a205069470b6?q=80&auto=format&fit=crop",
    price: "R$ 299,90",
    url: "https://www.amazon.com.br",
    reservedBy: null,
  },
  {
    id: "2",
    name: "Jogo de Cama Queen Size",
    description: "Jogo de cama 100% algodão egípcio, 300 fios",
    image: "https://images.unsplash.com/photo-1584100936595-c0654b55a2e2?q=80&auto=format&fit=crop",
    price: "R$ 199,90",
    url: "https://www.americanas.com.br",
    reservedBy: null,
  },
  {
    id: "3",
    name: "Liquidificador Multiprocessador",
    description: "Potente liquidificador com várias funções para preparar sucos e refeições",
    image: "https://images.unsplash.com/photo-1525171254930-2365224b0dc5?q=80&auto=format&fit=crop",
    price: "R$ 279,90",
    url: "https://www.magazineluiza.com.br",
    reservedBy: null,
  },
  {
    id: "4",
    name: "Conjunto de Toalhas",
    description: "Kit com 4 toalhas de banho e 4 toalhas de rosto macias",
    image: "https://images.unsplash.com/photo-1582235314098-8a9e41c832af?q=80&auto=format&fit=crop",
    price: "R$ 129,90",
    url: "https://www.amazon.com.br",
    reservedBy: null,
  },
  {
    id: "5",
    name: "Cafeteira Italiana",
    description: "Cafeteira italiana de aço inoxidável para um café perfeito",
    image: "https://images.unsplash.com/photo-1610889556528-9a770e32642f?q=80&auto=format&fit=crop",
    price: "R$ 99,90",
    url: "https://www.americanas.com.br",
    reservedBy: null,
  },
  {
    id: "6",
    name: "Jogo de Taças para Vinho",
    description: "Conjunto com 6 taças de cristal para vinho tinto",
    image: "https://images.unsplash.com/photo-1550850654-196d8bbfc584?q=80&auto=format&fit=crop",
    price: "R$ 149,90",
    url: "https://www.magazineluiza.com.br",
    reservedBy: null,
  },
  {
    id: "7",
    name: "Aspirador de Pó Portátil",
    description: "Aspirador de pó sem fio com bateria de longa duração",
    image: "https://images.unsplash.com/photo-1553835029-32ef07e26e83?q=80&auto=format&fit=crop",
    price: "R$ 399,90",
    url: "https://www.amazon.com.br",
    reservedBy: null,
  },
  {
    id: "8",
    name: "Conjunto de Talheres",
    description: "Kit completo com 24 peças de talheres em aço inox",
    image: "https://images.unsplash.com/photo-1544829885-7c98cdad7933?q=80&auto=format&fit=crop",
    price: "R$ 179,90",
    url: "https://www.americanas.com.br",
    reservedBy: null,
  }
];

export const GiftRegistryProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [email, setEmailState] = useState<string | null>(null);
  const [gifts, setGifts] = useState<GiftItem[]>([]);
  const [loading, setLoading] = useState(true);

  // Load data from localStorage on initial render
  useEffect(() => {
    const storedEmail = localStorage.getItem("giftRegistry_email");
    if (storedEmail) {
      setEmailState(storedEmail);
    }

    const storedGifts = localStorage.getItem("giftRegistry_gifts");
    if (storedGifts) {
      setGifts(JSON.parse(storedGifts));
    } else {
      setGifts(initialGifts);
      localStorage.setItem("giftRegistry_gifts", JSON.stringify(initialGifts));
    }
    
    setLoading(false);
  }, []);

  // Save data to localStorage whenever it changes
  useEffect(() => {
    if (email) {
      localStorage.setItem("giftRegistry_email", email);
    }
  }, [email]);

  useEffect(() => {
    if (gifts.length > 0 && !loading) {
      localStorage.setItem("giftRegistry_gifts", JSON.stringify(gifts));
    }
  }, [gifts, loading]);

  const setEmail = (newEmail: string) => {
    setEmailState(newEmail);
    toast({
      title: "Bem-vindo(a)!",
      description: `Você entrou como ${newEmail}`,
    });
  };

  const logout = () => {
    localStorage.removeItem("giftRegistry_email");
    setEmailState(null);
    toast({
      title: "Até logo!",
      description: "Você saiu com sucesso",
    });
  };

  const reserveGift = (giftId: string) => {
    if (!email) return;

    setGifts(prevGifts =>
      prevGifts.map(gift =>
        gift.id === giftId ? { ...gift, reservedBy: email } : gift
      )
    );

    toast({
      title: "Presente reservado!",
      description: "Você reservou este item com sucesso",
    });
  };

  const cancelReservation = (giftId: string) => {
    if (!email) return;

    const gift = gifts.find(g => g.id === giftId);
    if (!gift || gift.reservedBy !== email) return;

    setGifts(prevGifts =>
      prevGifts.map(gift =>
        gift.id === giftId ? { ...gift, reservedBy: null } : gift
      )
    );

    toast({
      title: "Reserva cancelada",
      description: "A reserva deste item foi cancelada",
    });
  };

  return (
    <GiftRegistryContext.Provider
      value={{
        email,
        setEmail,
        isAuthenticated: !!email,
        logout,
        gifts,
        reserveGift,
        cancelReservation,
        loading
      }}
    >
      {children}
    </GiftRegistryContext.Provider>
  );
};

export const useGiftRegistry = () => {
  const context = useContext(GiftRegistryContext);
  if (context === undefined) {
    throw new Error("useGiftRegistry must be used within a GiftRegistryProvider");
  }
  return context;
};
