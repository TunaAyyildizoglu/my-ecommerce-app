import { useState } from 'react';

// Sepet ile ilgili mantıksal işlemler burada olacak
export const useCart = () => {
  const [cart, setCart] = useState([]);

  // Sepete ürün ekleme fonksiyonu
  

  // Sepeti temizleme fonksiyonu
  const clearCart = () => {
    setCart([]);
  };

  return {
    cart,
    clearCart,
  };
};