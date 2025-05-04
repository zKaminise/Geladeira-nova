
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
    name: "Filé de Frango Sassami",
    description: "Filé de Frango para nossa dieta!",
    image: "https://coopsp.vtexassets.com/arquivos/ids/214783/7893000516083.jpg?v=637919523728600000",
    price: "R$ 24,90",
    url: "https://www.amazon.com.br",
    reservedBy: null,
  },
  {
    id: "2",
    name: "1 KG de Patinho Moído",
    description: "Carne para sair do Frango",
    image: "https://coopsp.vtexassets.com/arquivos/ids/216050/6151.jpg?v=637919531240400000",
    price: "R$ 59,90",
    url: "https://www.americanas.com.br",
    reservedBy: null,
  },
  {
    id: "3",
    name: "1 KG de Qualquer Carne",
    description: "Sinta-se avontade para escolher a carne",
    image: "./CarneAleat.png",
    price: "R$ ???",
    url: "https://www.magazineluiza.com.br",
    reservedBy: null,
  },
  {
    id: "4",
    name: "Fardo de Coca-cola 2L",
    description: "Pra comida não descer seca",
    image: "https://conteudo.irmaosgoncalves.com.br/produto/27894900027048/27894900027048_1-removebg-preview.jpg?width=500",
    price: "R$ 50,00 +/-",
    url: "https://www.amazon.com.br",
    reservedBy: null,
  },
  {
    id: "5",
    name: "Fardo de Coca-cola Lata",
    description: "Pra Carol levar pro Trampo",
    image: "https://storage-alsolucoes.s3.amazonaws.com/media/uploads/produto/refrigerante_coca_cola_350ml_fardo_c_6_c2c9744d-5cb8-4192-b524-33a7c030b217.jpg",
    price: "R$ 29,00 +/-",
    url: "https://www.americanas.com.br",
    reservedBy: null,
  },
  {
    id: "6",
    name: "Fardo com 6 Prats de Laranja",
    description: "Só pra quem for amigo de verdade",
    image: "https://static.wixstatic.com/media/0d7cd4_2039cd0733b94ea7b044bfeb4e1298cf~mv2.jpeg/v1/fill/w_637,h_628,al_c,q_85,enc_avif,quality_auto/0d7cd4_2039cd0733b94ea7b044bfeb4e1298cf~mv2.jpeg",
    price: "R$ 80,00 +/-",
    url: "https://www.magazineluiza.com.br",
    reservedBy: null,
  },
  {
    id: "7",
    name: "500g de Peito de Peru",
    description: "Pra fazer no café da manha",
    image: "https://s3-sa-east-1.amazonaws.com/superimg/img.produtos/2259800000002/804/img_500_1.png",
    price: "R$ 25,90 +/-",
    url: "https://www.amazon.com.br",
    reservedBy: null,
  },
  {
    id: "8",
    name: "500g de Mussarela Fatiada",
    description: "Pra completar o pão",
    image: "https://www.naturaldaterra.com.br/_next/image?url=https%3A%2F%2Fnaturalterra.vtexassets.com%2Farquivos%2Fids%2F173655%2FQueijo-Mussarela-fatiado.jpg.jpg%3Fv%3D638735776632270000&w=1440&q=75",
    price: "R$ 20,90 +/-",
    url: "https://www.americanas.com.br",
    reservedBy: null,
  },
  {
    id: "9",
    name: "Achocolatado Chocomil",
    description: "BBB (Baum, Bonito e Barato)",
    image: "https://http2.mlstatic.com/D_NQ_NP_980241-MLU78917124204_092024-O.webp",
    price: "R$ 27,00 com 27",
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
    // if (storedGifts) {
    //   setGifts(JSON.parse(storedGifts));
    // } else {
    //   setGifts(initialGifts);
    //   localStorage.setItem("giftRegistry_gifts", JSON.stringify(initialGifts));
    // }
    setGifts(initialGifts);
    localStorage.setItem("giftRegistry_gifts", JSON.stringify(initialGifts));

    
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
