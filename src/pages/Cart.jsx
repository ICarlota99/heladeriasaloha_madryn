import { useEffect, useState } from 'react';
import { useCart } from '../context/CartContext';
import { Link } from 'react-router-dom';

// Dynamic import all images from assets folder at build time
const imageModules = import.meta.glob('../assets/products/**/*.{jpg,png,webp}');

// Format prices
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

  // State to store loaded images
  const [loadedImages, setLoadedImages] = useState({});

  // Load all cart images dynamically
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
          newLoadedImages[item.id] = ''; // Fallback to empty
        }
      }

      setLoadedImages(prev => ({ ...prev, ...newLoadedImages }));
    };

    loadImages();
  }, [cart]);

  if (cart.length === 0) {
    return (
      <div className="container my-5 text-center">
        <h2>Tu carrito está vacío</h2>
        <Link to="/" className="btn btn-dark mt-3">
          Volver al menú
        </Link>
      </div>
    );
  }

  return (
    <div className="container my-5">
      <h2 className="mb-4">Tu Pedido</h2>
      <div className="table-responsive">
        <table className="table">
          <thead>
            <tr>
              <th>Imagen</th>
              <th>Producto</th>
              <th>Cantidad</th>
              <th>Precio Unitario</th>
              <th>Subtotal</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {cart.map(item => (
              <tr key={item.id}>
                <td>
                  <div className="d-flex align-items-center">
                    {loadedImages[item.id] && (
                      <img 
                        src={loadedImages[item.id]} 
                        alt={item.name} 
                        className="img-thumbnail me-3" 
                        style={{ width: '80px', height: '80px', objectFit: 'cover' }}
                      />
                    )}
                  </div>
                </td>
                <td>
                  <div>
                    <h5 className="mb-1">{item.name}</h5>
                  </div>
                </td>
                <td>
                  <div className="d-flex align-items-center">
                    <button 
                      className="btn btn-outline-secondary btn-sm" 
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                    >
                      -
                    </button>
                    <span className="mx-2">{item.quantity}</span>
                    <button 
                      className="btn btn-outline-secondary btn-sm" 
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                    >
                      +
                    </button>
                  </div>
                </td>
                <td>ARS {formatPrice(item.price)}</td>
                <td>ARS {formatPrice(Number(item.price) * item.quantity)}</td>
                <td>
                  <button 
                    className="btn btn-danger btn-sm" 
                    onClick={() => removeFromCart(item.id)}
                  >
                    <i className="fas fa-trash"></i>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      <div className="row mt-4">
        <div className="col-md-6 offset-md-6">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">Resumen del Pedido</h5>
              <div className="d-flex justify-content-between mb-2">
                <span>Subtotal:</span>
                <span>ARS {formatPrice(subtotal)}</span>
              </div>
              <div className="d-flex justify-content-between fw-bold">
                <span>Total:</span>
                <span>ARS {formatPrice(subtotal)}</span>
              </div>
            </div>
          </div>
          
          <div className="d-flex justify-content-between mt-4">
            <button 
              className="btn btn-light" 
              onClick={clearCart}
            >
              Vaciar Carrito
            </button>
            <Link to="/checkout" className="btn btn-dark">
              Continuar
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;