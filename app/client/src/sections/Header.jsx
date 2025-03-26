import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { HashLink } from 'react-router-hash-link'; 
import logo from '../assets/logo.svg';
import { useCart } from '../context/useCart';
import { useAuth } from '../context/AuthContext';

const Header = () => {
  const [isMobile, setIsMobile] = useState(false);
  const { totalItems } = useCart();
  const { isLoggedIn, logout } = useAuth();
  const navigate = useNavigate();
  
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <div>
      <nav id="navbar-menu" className="navbar fixed-top navbar-dark navbar-expand-xl dark-container">
        <div className="container-fluid py-0">
          {/* Logo */}
          <div>
            <img src={logo} alt="logo" className="logo" />
            {isMobile ? null : (
              <Link to="/" className="navbar-brand sucursal">
                Heladerías Aloha, Madryn
              </Link>
            )}
          </div>

          {/* Toggler menu */}
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#top_navbar"
            aria-controls="top_navbar"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse justify-content-end" id="top_navbar">
            <div className="navbar-nav menu_list d-flex justify-content-end">
              <li className="nav-item">
                <HashLink to="/#hero" className="nav-link">
                  Inicio
                </HashLink>
              </li>
              <li className="nav-item dropdown">
                <HashLink to="/#products" className="nav-link dropdown-toggle" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                  Productos
                </HashLink>
                <ul className="dropdown-menu">
                  <li>
                    <Link to="category/cones" className="dropdown-item">
                      Conos y paletas
                    </Link>
                  </li>
                  <li>
                    <Link to="category/desserts" className="dropdown-item">
                      Postres helados
                    </Link>
                  </li>
                  <li>
                    <Link to="category/pints" className="dropdown-item">
                      Pintas y baldes
                    </Link>
                  </li>
                  <li>
                    <Link to="category/cakes" className="dropdown-item">
                      Tortas heladas
                    </Link>
                  </li>
                </ul>
              </li>
              <li className="nav-item">
                <HashLink to="/#flavors" className="nav-link">
                  Sabores
                </HashLink>
              </li>
              <li className="nav-item">
                <HashLink to="/#whyus" className="nav-link">
                  Nosotros
                </HashLink>
              </li>
              <li className="nav-item">
                <HashLink to="/#footer" className="nav-link">
                  Contacto
                </HashLink>
              </li>
              <li className="nav-item">
                <Link to="/cart" className="nav-link position-relative">
                  <i className="fas fa-shopping-cart"></i>
                  {totalItems > 0 && (
                    <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                      {totalItems}
                    </span>
                  )}
              </Link>
              </li>
              <li className="nav-item dropdown">
                {isLoggedIn ? (
                  <>
                    <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                      <i className="fas fa-user"></i>
                    </a>
                    <ul className="dropdown-menu dropdown-menu-end">
                      <li>
                        <button className="dropdown-item" onClick={handleLogout}>
                          Cerrar sesión
                        </button>
                      </li>
                      <li>
                        <Link to="/reset_password" className="dropdown-item">
                          Restablecer contraseña
                        </Link>
                      </li>
                      <li>
                        <Link to="/delete_account" className="dropdown-item text-danger">
                          Eliminar cuenta
                        </Link>
                      </li>
                    </ul>
                  </>
                ) : (
                  <Link to="/login" className="nav-link">
                    <i className="fas fa-user"></i>
                  </Link>
                )}
              </li>
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Header;