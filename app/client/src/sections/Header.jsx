import React from 'react'

const Header = () => {
  return (
    <div>
      <nav id="navbar-menu" className="navbar fixed-top navbar-dark navbar-expand-xxl dark_container">
        <div id="navbar_div" className="container-fluid">
            {/* Logo  */}
            <a className="navbar-brand sucursal" href="#">Aloha, Puerto Madryn</a>

            {/* Toggler menu */}
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#top_navbar" aria-controls="top_navbar" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>

            <div className="collapse navbar-collapse justify-content-end" id="top_navbar">
                <div className="navbar-nav menu_list d-flex justify-content-end">
                    <li className="nav-item">
                        <a className="nav-link active" aria-current="page" href="index.html#home_section">Inicio</a>
                    </li>
                    <li className="nav-item dropdown">
                        <a className="nav-link dropdown-toggle" href="#products" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                        Productos
                        </a>
                        <ul className="dropdown-menu">
                            <li><a className="dropdown-item" href="#">Conos y paletas</a></li>
                            <li><a className="dropdown-item" href="#">Postres helados</a></li>
                            <li><a className="dropdown-item" href="#">Pintas y baldes</a></li>
                            <li><a className="dropdown-item" href="#">Tortas heladas</a></li>
                        </ul>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" href="#">Sabores</a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" href="#">Nosotros</a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" href="#">Contacto</a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" href="#"><i className="fa-solid fa-cart-shopping" href="index.html"></i></a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" href="#"><i className="fa-solid fa-magnifying-glass" href="index.html"></i></a>
                    </li>
                </div>
            </div>
          </div>
      </nav>
    </div>
  )
}

export default Header
