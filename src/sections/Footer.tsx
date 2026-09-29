import { Link } from 'react-router-dom';
import { HashLink } from 'react-router-hash-link';
import logo from '@/assets/logo.svg';
import GoogleMaps from '@/components/GoogleMapsLink';
import Reveal from '@/components/ui/Reveal';
import { BRAND_NAME, FACEBOOK_URL, WHATSAPP_DISPLAY } from '@/lib/constants';
import { buildWhatsAppUrl } from '@/lib/whatsapp';

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const linkClass = 'text-cream no-underline transition hover:text-white hover:underline';

  return (
    <footer id="footer" className="brand-band mt-20 pb-24 md:pb-0 md:mt-28">
      <Reveal className="mx-auto grid max-w-7xl gap-10 px-6 py-16 sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <img src={logo} alt={BRAND_NAME} className="w-44" />
          <p className="mt-4 max-w-xs text-sm text-cream/90">
            Helados artesanales en Puerto Madryn. Pedí online y disfrutá delivery en toda la ciudad.
          </p>
        </div>
        <div>
          <h2 className="mb-3 text-sm font-bold tracking-wide">INFO</h2>
          <GoogleMaps tone="light" />
        </div>
        <div className="flex flex-col gap-2">
          <h2 className="mb-1 text-sm font-bold tracking-wide">CATÁLOGO</h2>
          <Link to="/flavors" className={linkClass}>
            Armá tu balde
          </Link>
          <HashLink to="/#shop" className={linkClass}>
            Productos
          </HashLink>
          <HashLink to="/#whyus" className={linkClass}>
            Sucursales
          </HashLink>
        </div>
        <div className="flex flex-col gap-2">
          <h2 className="mb-1 text-sm font-bold tracking-wide">CONTACTO</h2>
          <p>
            <strong>¿Alguna consulta? Escribinos:</strong>
          </p>
          <a className={linkClass} href={FACEBOOK_URL} target="_blank" rel="noopener noreferrer">
            <i className="fa-brands fa-facebook-f" aria-hidden /> Facebook
          </a>
          <a className={linkClass} href={buildWhatsAppUrl()} target="_blank" rel="noopener noreferrer">
            <i className="fa-brands fa-whatsapp" aria-hidden /> WhatsApp {WHATSAPP_DISPLAY}
          </a>
        </div>
      </Reveal>
      <div className="border-t border-white/25 px-6 py-6 text-center text-sm">
        <p>©{currentYear} ALOSURMORA.SA Todos los derechos reservados</p>
        <p className="mt-1">
          Diseñado y desarrollado por{' '}
          <a
            className="text-cream underline hover:text-white"
            href="https://github.com/ICarlota99"
            target="_blank"
            rel="noopener noreferrer"
          >
            ICarlota99
          </a>
        </p>
      </div>
    </footer>
  );
}
