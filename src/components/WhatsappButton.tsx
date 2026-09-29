import { useLocation } from 'react-router-dom';
import { buildWhatsAppUrl } from '@/lib/whatsapp';

export default function WhatsAppButton() {
  const location = useLocation();
  const hideOnMobileCart = location.pathname === '/cart' || location.pathname === '/checkout';

  return (
    <a
      href={buildWhatsAppUrl()}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Escribir por WhatsApp"
      className={`fixed z-50 flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-3xl text-white shadow-lg transition duration-300 hover:scale-110 hover:brightness-110 sm:bottom-7 sm:right-7 sm:h-16 sm:w-16 ${
        hideOnMobileCart ? 'bottom-24 right-4 md:bottom-7 md:right-7' : 'bottom-24 right-4 md:bottom-7'
      }`}
    >
      <i className="fa-brands fa-whatsapp" aria-hidden />
    </a>
  );
}
