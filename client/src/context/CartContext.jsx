import { createContext, useContext, useState } from "react";

import { fetchCart, addToCartAPI, updateCartItemAPI, removeFromCartAPI } from "../api/cartApi"

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [loading,setLoading]=useState(false);

  const loadCart = async () => {
    try {
      setLoading(true);
      const res = await fetchCart();
      setCart(res.data.cart?.items || []);
    } catch (err) {
      console.error("Failed to load cart", err);
    } finally {
      setLoading(false);
    }
  };

  const addToCart=async(productId,quantity=1)=>{
    try{
      const res=await addToCartAPI(productId,quantity);
      setCart(res.data.cart.items)
    }catch(error){
      console.error("Add to Cart Failed:",error)
    }

  }

  // ✅ UPDATE CART (increase / decrease quantity)
  const updateCartItem = (id, quantity) => {
    if (quantity <= 0) {
      removeFromCart(id);
      return;
    }

    setCart((prevCart) =>
      prevCart.map((item) => (item.id === id ? { ...item, quantity } : item))
    );
  };

  // ✅ REMOVE ITEM FROM CART
  const removeFromCart = (id) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== id));
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        updateCartItem,
        removeFromCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
