import { Link, useLocation } from 'react-router-dom';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import { useCart } from '@/hooks/useCart';
import { formatPrice } from '@/lib/formatPrice';

export default function StickyCartBar() {
  const { totalItems, subtotal } = useCart();
  const location = useLocation();
  const reduceMotion = useReducedMotion();
  const hiddenRoutes = ['/cart', '/checkout'];
  const visible = totalItems > 0 && !hiddenRoutes.includes(location.pathname);

  return (
    <AnimatePresence>
      {visible ? (
        <motion.div
          initial={reduceMotion ? false : { y: 80, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 80, opacity: 0 }}
          transition={{ type: 'spring', stiffness: 380, damping: 28 }}
          className="fixed inset-x-0 bottom-0 z-40 px-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] md:hidden"
        >
          <Link
            to="/cart"
            className="flex min-h-14 items-center justify-between gap-3 rounded-2xl bg-ink px-4 py-3 text-white no-underline shadow-[var(--shadow-soft)]"
          >
            <span className="font-semibold">
              Ver carrito · {totalItems} {totalItems === 1 ? 'item' : 'items'}
            </span>
            <span className="rounded-full bg-brand px-3 py-1 text-sm font-bold">
              ARS {formatPrice(subtotal)}
            </span>
          </Link>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
