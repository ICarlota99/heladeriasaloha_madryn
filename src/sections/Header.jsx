import { useEffect, useRef, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { HashLink } from 'react-router-hash-link';
import logo from '../assets/logo.svg';
import { useCart } from '../context/useCart';

const productLinks = [
  { to: '/category/cones', label: 'Conos y paletas' },
  { to: '/category/desserts', label: 'Postres helados' },
  { to: '/category/pints', label: 'Pintas y baldes' },
  { to: '/category/cakes', label: 'Tortas heladas' },
];

const navLinkClass =
  'font-semibold text-white no-underline transition hover:text-white/75';

function CartLink({ totalItems, className = '' }) {
  return (
    <Link
      to="/cart"
      className={`relative text-white no-underline transition hover:text-white/75 ${className}`}
      aria-label="Carrito"
    >
      <i className="fa-solid fa-cart-shopping text-xl"></i>
      {totalItems > 0 && (
        <span className="absolute -right-2 -top-2 flex h-5 min-w-5 items-center justify-center rounded-full bg-white px-1 text-xs font-bold text-brand">
          {totalItems}
        </span>
      )}
    </Link>
  );
}

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [productsOpen, setProductsOpen] = useState(false);
  const productsCloseTimer = useRef(null);
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

  const openProducts = () => {
    if (productsCloseTimer.current) {
      clearTimeout(productsCloseTimer.current);
      productsCloseTimer.current = null;
    }
    setProductsOpen(true);
  };

  const scheduleCloseProducts = () => {
    if (!window.matchMedia('(min-width: 1024px)').matches) return;
    productsCloseTimer.current = setTimeout(() => setProductsOpen(false), 200);
  };

  useEffect(() => () => {
    if (productsCloseTimer.current) clearTimeout(productsCloseTimer.current);
  }, []);

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
              if (window.matchMedia('(min-width: 1024px)').matches) openProducts();
            }}
            onMouseLeave={scheduleCloseProducts}
          >
            <button
              type="button"
              className={`${navLinkClass} inline-flex items-center gap-1`}
              aria-expanded={productsOpen}
              onClick={() => {
                if (window.matchMedia('(min-width: 1024px)').matches) {
                  openProducts();
                  return;
                }
                setProductsOpen((open) => !open);
              }}
            >
              Productos
              <i className="fa-solid fa-chevron-down text-xs"></i>
            </button>
            <div className={`${productsOpen ? 'mt-3 block' : 'hidden'} lg:absolute lg:right-0 lg:top-full lg:z-20 lg:mt-0 lg:pt-2`}>
            <ul
              className="flex flex-col gap-1 lg:w-56 lg:rounded-2xl lg:bg-white lg:p-2 lg:shadow-xl"
            >
              {productLinks.map((item) => (
                <li key={item.to}>
                  <Link
                    to={item.to}
                    className="block rounded-xl px-3 py-2 font-semibold text-white no-underline transition hover:bg-white/15 lg:text-ink lg:hover:bg-brand/10 lg:hover:text-brand"
                    onClick={closeMenu}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
            </div>
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
    <header className="fixed inset-x-0 top-0 z-50 w-full max-w-full">
      <div className="border-b border-white/15 bg-brand shadow-sm">
      <nav className="mx-auto flex w-full min-w-0 max-w-7xl items-center justify-between gap-4 px-4 py-3 lg:px-8">
        <Link to="/" className="flex min-w-0 items-center gap-3 no-underline" onClick={closeMenu}>
          <img src={logo} alt="Heladerías Aloha" className="h-12 w-[6.3rem] shrink-0 md:h-14 md:w-[7.35rem]" />
          <span className="hidden min-w-0 truncate font-brand text-2xl font-semibold leading-tight text-white xl:block">
            Heladerías Aloha, Madryn
          </span>
        </Link>

        <div className="flex items-center gap-4 lg:hidden">
          <CartLink totalItems={totalItems} />
          <button
            type="button"
            className="rounded-full p-2 text-white"
            aria-label={menuOpen ? 'Cerrar menú' : 'Abrir menú'}
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((open) => !open)}
          >
            <i className={`fa-solid ${menuOpen ? 'fa-xmark' : 'fa-bars'} text-xl`}></i>
          </button>
        </div>

        <ul className="hidden min-w-0 items-center gap-4 lg:flex xl:gap-6">
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
        } fixed inset-x-0 bottom-0 top-(--header-offset) z-40 w-full max-w-full flex-col gap-5 overflow-y-auto overflow-x-clip bg-brand px-6 py-8 lg:hidden`}
      >
        {links}
      </ul>
    </header>
  );
};

export default Header;
