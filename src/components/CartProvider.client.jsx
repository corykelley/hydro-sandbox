// Import the `CartProvider` component as `ShopifyCartProvider`.
// Hydrogen provides a special `@shopify/hydrogen/client`
// module to reference components that are safe to use within client components.
// You should use this import path when writing your client components.
import {CartProvider as ShopifyCartProvider} from '@shopify/hydrogen/client';
// Import the `CartContext` client component and `useCart` hook.
import CartContext, {useCart} from './CartContext.client';

// The `CartContext` component accepts `children`, `cart`, and `numCartLines` as props.
export default function CartProvider({children, cart, numCartLines}) {
  // Return the context of the cart, the cart, and the number of cart lines.
  return (
    <CartContext>
      <Provider cart={cart} numCartLines={numCartLines}>
        {children}
      </Provider>
    </CartContext>
  );
}

function Provider({children, cart, numCartLines}) {
  const {openCart} = useCart();
  console.log(useCart());

  // Return the `ShopifyCartProvider` component.
  return (
    <ShopifyCartProvider
      cart={cart}
      numCartLines={numCartLines}
      onCreate={openCart}
      onLineAdd={openCart}
    >
      {children}
    </ShopifyCartProvider>
  );
}
