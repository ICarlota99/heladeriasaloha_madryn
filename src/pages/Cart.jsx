import { useEffect, useState } from 'react';
import { useCart } from '../context/CartContext';
import { Link } from 'react-router-dom';
import Button, { buttonClass } from '../components/ui/Button';

const imageModules = import.meta.glob('../assets/products/**/*.{jpg,png,webp}');

const formatPrice = (price) => {
  if (isNaN(price)) return '0.00';
  return Number(price).toLocaleString('es-AR', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  });
};

const CartPage = () => {
  const {
    cart,
    removeFromCart,
    updateQuantity,
    subtotal,
    clearCart
  } = useCart();

  const [loadedImages, setLoadedImages] = useState({});

  useEffect(() => {
    const loadImages = async () => {
      const newLoadedImages = {};

      for (const item of cart) {
        try {
          if (item.image && !loadedImages[item.id]) {
            const cleanPath = item.image.replace(/^\.+\//, '');
            const imagePath = `../assets/${cleanPath}`;
            const module = await imageModules[imagePath]();
            newLoadedImages[item.id] = module.default;
          }
        } catch (err) {
          console.error(`Error loading image for ${item.name}:`, err);
          newLoadedImages[item.id] = '';
        }
      }

      setLoadedImages(prev => ({ ...prev, ...newLoadedImages }));
    };

    loadImages();
  }, [cart]);

  if (cart.length === 0) {
    return (
      <div className="mx-auto flex min-h-[50vh] max-w-xl flex-col items-center justify-center px-6 py-16 text-center">
        <h1 className="font-display text-5xl text-ink">Tu carrito está vacío</h1>
        <p className="mt-3 text-ink/70">Elegí un helado y armá tu pedido.</p>
        <Link to="/" className={`${buttonClass('primary')} mt-6`}>
          Volver al menú
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-6xl px-4 py-12">
      <h1 className="font-display text-5xl text-ink">Tu pedido</h1>
      <div className="mt-8 grid items-start gap-8 lg:grid-cols-3">
        <ul className="space-y-4 lg:col-span-2">
          {cart.map(item => (
            <li key={item.id} className="flex flex-col gap-4 rounded-3xl bg-white p-4 shadow-md sm:flex-row sm:items-center">
              <div className="h-20 w-20 shrink-0 overflow-hidden rounded-2xl bg-peach-light">
                {loadedImages[item.id] && (
                  <img
                    src={loadedImages[item.id]}
                    alt={item.name}
                    className="h-full w-full object-cover"
                  />
                )}
              </div>
              <div className="min-w-0 flex-1">
                <h2 className="text-lg font-bold">{item.name}</h2>
                <p className="text-sm text-ink/70">ARS {formatPrice(item.price)} c/u</p>
              </div>
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  className="flex h-9 w-9 items-center justify-center rounded-full border-2 border-brand font-bold text-brand"
                  onClick={() => updateQuantity(item.id, item.quantity - 1)}
                  aria-label="Restar"
                >
                  -
                </button>
                <span className="min-w-6 text-center font-bold">{item.quantity}</span>
                <button
                  type="button"
                  className="flex h-9 w-9 items-center justify-center rounded-full border-2 border-brand font-bold text-brand"
                  onClick={() => updateQuantity(item.id, item.quantity + 1)}
                  aria-label="Sumar"
                >
                  +
                </button>
              </div>
              <p className="font-bold text-brand sm:w-32 sm:text-right">
                ARS {formatPrice(Number(item.price) * item.quantity)}
              </p>
              <button
                type="button"
                className="flex h-10 w-10 items-center justify-center rounded-full bg-red-600 text-white"
                onClick={() => removeFromCart(item.id)}
                aria-label="Quitar producto"
              >
                <i className="fa-solid fa-trash"></i>
              </button>
            </li>
          ))}
        </ul>

        <aside className="rounded-3xl bg-white p-6 shadow-md lg:sticky lg:top-24">
          <h2 className="text-xl font-bold">Resumen del pedido</h2>
          <div className="mt-4 flex justify-between">
            <span>Subtotal</span>
            <span>ARS {formatPrice(subtotal)}</span>
          </div>
          <div className="mt-2 flex justify-between border-t border-peach/70 pt-3 text-lg font-bold">
            <span>Total</span>
            <span className="text-brand">ARS {formatPrice(subtotal)}</span>
          </div>
          <div className="mt-6 flex flex-col gap-3">
            <Button variant="secondary" onClick={clearCart}>
              Vaciar carrito
            </Button>
            <Link to="/checkout" className={buttonClass('primary')}>
              Continuar
            </Link>
          </div>
        </aside>
      </div>
    </div>
  );
};

export default CartPage;
