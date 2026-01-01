import { createContext, useContext, useEffect, useState } from "react";

import { fetchCart, addToCartAPI, updateCartItemAPI, removeFromCartAPI, clearCartAPI } from "../api/cartApi"

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
  const updateCartItem = async (productId, quantity) => {
    try {
      if (quantity <= 0) {
        await removeFromCart(productId);
        return;
      }

      const res = await updateCartItemAPI(productId, quantity);
      setCart(res.data.cart.items);
    } catch (error) {
      console.error("Update cart failed:", error);
    }
  };

  // ✅ REMOVE ITEM FROM CART
  const removeFromCart = (productId) => {
    try{
      const res= removeFromCart(productId);
      setCart(res.data.cart.items);
    }catch(error){
      console.error("failed to remove items:",error)
    }
  };

  
  const clearCart=async()=>{
    try{
      await clearCartAPI();
      setCart([]);
    }catch(error){
      console.error("Failed to Clear Cart",error)
    }
  }

  useEffect(()=>{
    loadCart();
  },[]);


  return (
    <CartContext.Provider
      value={{
        cart,
        loading,
        addToCart,
        updateCartItem,
        removeFromCart,
        clearCart,
        loadCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
