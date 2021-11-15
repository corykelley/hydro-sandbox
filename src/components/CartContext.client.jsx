// Import the cart context components and hooks from React that allow you to
// define the state of the cart.
import {createContext, useState, useContext, useMemo} from 'react';

const Cart = createContext(null);

// The `CartContext` component accepts `children` as a prop.
// This injects any nested components into the `Cart` when you call it.
export default function CartContext({children}) {
  // Define the state of the cart when it's opened or closed.
  const [cartOpen, setCartOpen] = useState(false);
  const value = useMemo(() => {
    return {
      isCartOpen: cartOpen,
      openCart: () => setCartOpen(true),
      closeCart: () => setCartOpen(false),
      toggleCart: () => setCartOpen(!cartOpen),
    };
  }, [cartOpen, setCartOpen]);

  // Create a context for using the cart.
  return <Cart.Provider value={value}>{children}</Cart.Provider>;
}

// Define the `useCart` hook.
export function useCart() {
  // Return the cart context to the accessed cart object.
  return useContext(Cart);
}
