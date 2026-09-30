import { Link } from 'react-router-dom';
import Button, { buttonClass } from '@/components/ui/Button';
import Stepper from '@/components/ui/Stepper';
import { useCart } from '@/hooks/useCart';
import { formatPrice } from '@/lib/formatPrice';
import { getProductImageSrc } from '@/lib/productImages';

export default function CartPage() {
  const { cart, removeFromCart, updateQuantity, subtotal, clearCart } = useCart();

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
    <div className="mx-auto max-w-6xl px-4 py-12 pb-28 md:pb-12">
      <h1 className="font-display text-5xl text-ink">Tu pedido</h1>
      <div className="mt-8 grid items-start gap-8 lg:grid-cols-3">
        <ul className="space-y-4 lg:col-span-2">
          {cart.map((item) => {
            const imageSrc = getProductImageSrc(item.image) ?? (item.image.startsWith('/') ? item.image : undefined);
            return (
              <li
                key={item.id}
                className="flex flex-col gap-4 rounded-3xl bg-white p-4 shadow-md sm:flex-row sm:items-center"
              >
                <div className="h-20 w-20 shrink-0 overflow-hidden rounded-2xl bg-peach-light">
                  {imageSrc ? (
                    <img src={imageSrc} alt={item.name} className="h-full w-full object-cover" />
                  ) : null}
                </div>
                <div className="min-w-0 flex-1">
                  <h2 className="text-lg font-bold">{item.name}</h2>
                  <p className="text-sm text-ink/70">ARS {formatPrice(item.price)} c/u</p>
                </div>
                <Stepper
                  value={item.quantity}
                  decrementDisabled={item.quantity === 1}
                  onDecrement={() => updateQuantity(item.id, item.quantity - 1)}
                  onIncrement={() => updateQuantity(item.id, item.quantity + 1)}
                />
                <p className="font-bold text-brand sm:w-32 sm:text-right">
                  ARS {formatPrice(Number(item.price) * item.quantity)}
                </p>
                <button
                  type="button"
                  className="flex h-11 w-11 items-center justify-center rounded-full bg-red-600 text-white"
                  onClick={() => removeFromCart(item.id)}
                  aria-label="Quitar producto"
                >
                  <i className="fa-solid fa-trash" aria-hidden />
                </button>
              </li>
            );
          })}
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
              Continuar al checkout
            </Link>
          </div>
        </aside>
      </div>
    </div>
  );
}
