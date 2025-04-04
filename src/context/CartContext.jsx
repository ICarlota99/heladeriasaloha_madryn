import { createContext, useContext, useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import PropTypes from 'prop-types';

// Create context
const CartContext = createContext();

// Main Provider Component
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

  // Cart methods
  const addToCart = (product, quantity = 1) => {
    const productId = product.id?.toString() || '';
    const isBucket = productId.startsWith('balde-');
    
    setCart(prevCart => {
      const existingItem = prevCart.find(item => 
        isBucket ? item.id === product.id : item.id === product.id
      );
  
      return existingItem
        ? prevCart.map(item =>
            item.id === product.id
              ? { 
                  ...item, 
                  quantity: item.quantity + quantity,
                  ...(isBucket ? { description: product.description } : {})
                }
              : item
          )
        : [...prevCart, { ...product, quantity }];
    });
  
    // Show toast AFTER state update
    setTimeout(() => {
      const existingItem = cart.find(item => 
        isBucket ? item.id === product.id : item.id === product.id
      );
      
      if (existingItem) {
        toast.success(`+${quantity} ${product.name} (Total: ${existingItem.quantity + quantity})`, {
          icon: '🛒',
        });
      } else {
        toast.success(`${product.name} añadido al carrito${quantity > 1 ? ` (x${quantity})` : ''}`, {
          icon: '🛒',
        });
      }
    }, 0);
  };

  const removeFromCart = (productId) => {
    setCart(prevCart => prevCart.filter(item => item.id !== productId));
  };

  const updateQuantity = (productId, newQuantity) => {
    if (newQuantity < 1) return;
    setCart(prevCart =>
      prevCart.map(item =>
        item.id === productId ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  const clearCart = () => setCart([]);

  // Calculations
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  const subtotal = cart.reduce((sum, item) => {
    const price = typeof item.price === 'string' ? 
      parseFloat(item.price.replace(',', '.')) : 
      Number(item.price);
    return sum + (price * item.quantity);
  }, 0);

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

// Custom hook
export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

export default CartContext;