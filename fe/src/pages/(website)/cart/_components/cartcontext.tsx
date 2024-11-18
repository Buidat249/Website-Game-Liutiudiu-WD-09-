import React, { createContext, useContext, useState } from "react";

interface CartContextType {
    selectedGames: { [gameId: number]: { selected: boolean; quantity: number } };
    setSelectedGames: React.Dispatch<
      React.SetStateAction<{ [gameId: number]: { selected: boolean; quantity: number } }>
    >;
  }

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: React.ReactNode }) => {
    const [selectedGames, setSelectedGames] = useState<{
      [gameId: number]: { selected: boolean; quantity: number };
    }>({});
    
    return (
      <CartContext.Provider value={{ selectedGames, setSelectedGames }}>
        {children}
      </CartContext.Provider>
    );
  };
  

export const useCartContext = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCartContext must be used within a CartProvider");
  }
  return context;
};
