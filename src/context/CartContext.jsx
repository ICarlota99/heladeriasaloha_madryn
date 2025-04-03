import { createContext, useContext, useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import PropTypes from 'prop-types';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  
  // Load/save to localStorage
  useEffect(() => {
    const savedCart = localStorage.getItem('icecreamCart');
    if (savedCart) setCart(JSON.parse(savedCart));
  }, []);

  useEffect(() => {
    localStorage.setItem('icecreamCart', JSON.stringify(cart));
  }, [cart]);

  // Helper to generate unique cart item ID
  const getCartItemId = (product) => {
    return `${product.id}-${product.selectedFlavor || 'default'}`;
  };

  // Cart methods
  const addToCart = (product, quantity = 1) => {
    setCart(prevCart => {
      const cartItemId = getCartItemId(product);
      const existingItemIndex = prevCart.findIndex(item => getCartItemId(item) === cartItemId);

      if (existingItemIndex >= 0) {
        const updatedCart = [...prevCart];
        updatedCart[existingItemIndex] = {
          ...updatedCart[existingItemIndex],
          quantity: updatedCart[existingItemIndex].quantity + quantity
        };
        return updatedCart;
      }

      return [...prevCart, { ...product, quantity }];
    });

    // Show toast notification
    const displayName = product.selectedFlavor 
      ? `${product.name} (${product.selectedFlavor})` 
      : product.name;
    
    toast.success(`${quantity > 1 ? `${quantity} x ` : ''}${displayName} añadido al carrito`, {
      icon: '🛒',
    });
  };

  const removeFromCart = (productId, flavor = null) => {
    setCart(prevCart => 
      prevCart.filter(item => 
        !(item.id === productId && item.selectedFlavor === flavor)
      )
    );
  };

  const updateQuantity = (productId, newQuantity, flavor = null) => {
    if (newQuantity < 1) {
      removeFromCart(productId, flavor);
      return;
    }

    setCart(prevCart =>
      prevCart.map(item =>
        item.id === productId && item.selectedFlavor === flavor
          ? { ...item, quantity: newQuantity }
          : item
      )
    );
  };

  const clearCart = () => {
    setCart([]);
    toast.info('Carrito vaciado', { icon: '🗑️' });
  };

  // Calculations
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  const subtotal = cart.reduce((sum, item) => sum + (Number(item.price) * item.quantity, 0));

  return (
    <CartContext.Provider 
      value={{ 
        cart, 
        addToCart, 
        removeFromCart, 
        updateQuantity, 
        clearCart,
        totalItems,
        subtotal
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

CartProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default CartContext;