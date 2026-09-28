import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useReducer,
  type ReactNode,
} from 'react';
import { toast } from 'react-toastify';
import { CART_STORAGE_KEY } from '@/lib/constants';
import { parsePrice } from '@/lib/formatPrice';
import type { CartItem, Product } from '@/types';

interface CartState {
  items: CartItem[];
}

type CartAction =
  | { type: 'ADD'; product: Product; quantity: number }
  | { type: 'REMOVE'; productId: CartItem['id'] }
  | { type: 'UPDATE_QTY'; productId: CartItem['id']; quantity: number }
  | { type: 'CLEAR' };

export interface CartContextValue {
  cart: CartItem[];
  addToCart: (product: Product, quantity?: number) => void;
  removeFromCart: (productId: CartItem['id']) => void;
  updateQuantity: (productId: CartItem['id'], quantity: number) => void;
  clearCart: () => void;
  totalItems: number;
  subtotal: number;
}

const CartContext = createContext<CartContextValue | null>(null);

function loadCart(): CartItem[] {
  try {
    const raw = localStorage.getItem(CART_STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw) as CartItem[];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function cartReducer(state: CartState, action: CartAction): CartState {
  switch (action.type) {
    case 'ADD': {
      const { product, quantity } = action;
      const existing = state.items.find((item) => item.id === product.id);
      if (existing) {
        return {
          items: state.items.map((item) =>
            item.id === product.id
              ? {
                  ...item,
                  quantity: item.quantity + quantity,
                  ...(product.description ? { description: product.description } : {}),
                }
              : item,
          ),
        };
      }
      return { items: [...state.items, { ...product, quantity }] };
    }
    case 'REMOVE':
      return { items: state.items.filter((item) => item.id !== action.productId) };
    case 'UPDATE_QTY':
      if (action.quantity < 1) return state;
      return {
        items: state.items.map((item) =>
          item.id === action.productId ? { ...item, quantity: action.quantity } : item,
        ),
      };
    case 'CLEAR':
      return { items: [] };
    default:
      return state;
  }
}

export function CartProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(cartReducer, undefined, () => ({ items: loadCart() }));

  useEffect(() => {
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(state.items));
  }, [state.items]);

  const addToCart = useCallback((product: Product, quantity = 1) => {
    dispatch({ type: 'ADD', product, quantity });
    toast.success(
      quantity > 1 ? `${product.name} añadido (x${quantity})` : `${product.name} añadido al carrito`,
    );
  }, []);

  const removeFromCart = useCallback((productId: CartItem['id']) => {
    dispatch({ type: 'REMOVE', productId });
  }, []);

  const updateQuantity = useCallback((productId: CartItem['id'], quantity: number) => {
    dispatch({ type: 'UPDATE_QTY', productId, quantity });
  }, []);

  const clearCart = useCallback(() => {
    dispatch({ type: 'CLEAR' });
  }, []);

  const totalItems = useMemo(
    () => state.items.reduce((sum, item) => sum + item.quantity, 0),
    [state.items],
  );

  const subtotal = useMemo(
    () => state.items.reduce((sum, item) => sum + parsePrice(item.price) * item.quantity, 0),
    [state.items],
  );

  const value = useMemo(
    () => ({
      cart: state.items,
      addToCart,
      removeFromCart,
      updateQuantity,
      clearCart,
      totalItems,
      subtotal,
    }),
    [state.items, addToCart, removeFromCart, updateQuantity, clearCart, totalItems, subtotal],
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart(): CartContextValue {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}
