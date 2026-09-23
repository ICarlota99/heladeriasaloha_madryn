import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { HashLink } from 'react-router-hash-link';
import logo from '../assets/logo_orange.svg';
import { useCart } from '../context/useCart';

const productLinks = [
  { to: '/category/cones', label: 'Conos y paletas' },
  { to: '/category/desserts', label: 'Postres helados' },
  { to: '/category/pints', label: 'Pintas y baldes' },
  { to: '/category/cakes', label: 'Tortas heladas' },
];

const navLinkClass =
  'font-semibold text-ink no-underline transition hover:text-brand';

function CartLink({ totalItems, className = '' }) {
  return (
    <Link
      to="/cart"
      className={`relative text-ink no-underline transition hover:text-brand ${className}`}
      aria-label="Carrito"
    >
      <i className="fa-solid fa-cart-shopping text-xl"></i>
      {totalItems > 0 && (
        <span className="absolute -right-2 -top-2 flex h-5 min-w-5 items-center justify-center rounded-full bg-brand px-1 text-xs font-bold text-white">
          {totalItems}
        </span>
      )}
    </Link>
  );
}

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [productsOpen, setProductsOpen] = useState(false);
  const { totalItems } = useCart();
  const location = useLocation();

  useEffect(() => {
    setMenuOpen(false);
    setProductsOpen(false);
  }, [location]);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [menuOpen]);

  const closeMenu = () => {
    setMenuOpen(false);
    setProductsOpen(false);
  };

  const links = (
        <>
          <li>
            <HashLink to="/#hero" className={navLinkClass} onClick={closeMenu}>
              Inicio
            </HashLink>
          </li>
          <li
            className="relative"
            onMouseEnter={() => {
              if (window.matchMedia('(min-width: 1024px)').matches) setProductsOpen(true);
            }}
            onMouseLeave={() => {
              if (window.matchMedia('(min-width: 1024px)').matches) setProductsOpen(false);
            }}
          >
            <button
              type="button"
              className={`${navLinkClass} inline-flex items-center gap-1`}
              aria-expanded={productsOpen}
              onClick={() => {
                if (window.matchMedia('(min-width: 1024px)').matches) {
                  setProductsOpen(true);
                  return;
                }
                setProductsOpen((open) => !open);
              }}
            >
              Productos
              <i className="fa-solid fa-chevron-down text-xs"></i>
            </button>
            <ul
              className={`${
                productsOpen ? 'mt-3 flex' : 'hidden'
              } flex-col gap-1 lg:absolute lg:right-0 lg:top-full lg:z-20 lg:mt-2 lg:w-56 lg:rounded-2xl lg:bg-gradient-to-br lg:from-brand lg:to-peach lg:p-2 lg:shadow-xl`}
            >
              {productLinks.map((item) => (
                <li key={item.to}>
                  <Link
                    to={item.to}
                    className="block rounded-xl px-3 py-2 font-semibold text-ink no-underline transition hover:bg-white/50 lg:text-white lg:hover:bg-white/20"
                    onClick={closeMenu}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </li>
          <li>
            <HashLink to="/#flavors" className={navLinkClass} onClick={closeMenu}>
              Sabores
            </HashLink>
          </li>
          <li>
            <HashLink to="/#whyus" className={navLinkClass} onClick={closeMenu}>
              Nosotros
            </HashLink>
          </li>
          <li>
            <HashLink to="/#footer" className={navLinkClass} onClick={closeMenu}>
              Contacto
            </HashLink>
          </li>
        </>
  );

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <div className="border-b border-peach/40 bg-white/85 shadow-sm backdrop-blur-md">
      <nav className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3 lg:px-8">
        <Link to="/" className="flex items-center gap-3 no-underline" onClick={closeMenu}>
          <img src={logo} alt="Heladerías Aloha" className="h-12 w-auto md:h-14" />
          <span className="hidden font-brand text-lg leading-tight text-brand xl:block">
            Heladerías Aloha, Madryn
          </span>
        </Link>

        <div className="flex items-center gap-4 lg:hidden">
          <CartLink totalItems={totalItems} />
          <button
            type="button"
            className="rounded-full p-2 text-ink"
            aria-label={menuOpen ? 'Cerrar menú' : 'Abrir menú'}
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((open) => !open)}
          >
            <i className={`fa-solid ${menuOpen ? 'fa-xmark' : 'fa-bars'} text-xl`}></i>
          </button>
        </div>

        <ul className="hidden items-center gap-6 lg:flex">
          {links}
          <li>
            <CartLink totalItems={totalItems} />
          </li>
        </ul>
      </nav>
      </div>

      <ul
        className={`${
          menuOpen ? 'flex' : 'hidden'
        } fixed inset-x-0 bottom-0 top-(--header-offset) z-40 flex-col gap-5 overflow-y-auto bg-cream px-6 py-8 lg:hidden`}
      >
        {links}
      </ul>
    </header>
  );
};

export default Header;
