import { useEffect, useState } from 'react';
import { useCart } from '../context/CartContext';
import { Link } from 'react-router-dom';

const Checkout = () => {
  const { cart, subtotal, clearCart } = useCart();
  const [orderComplete, setOrderComplete] = useState(false);

  const formatPrice = (price) => {
    if (isNaN(price)) return '0.00';
    return Number(price).toLocaleString('es-AR', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    });
  };

  const handleSubmitOrder = () => {
    // Here you would typically send the order to your backend
    console.log('Order submitted:', { cart, total: subtotal });
    setOrderComplete(true);
    clearCart();
  };

  if (orderComplete) {
    return (
      <div className="container my-5 text-center">
        <div className="alert alert-success">
          <h2>¡Pedido realizado con éxito!</h2>
          <p>Gracias por tu compra. Te contactaremos pronto.</p>
        </div>
        <Link to="/" className="btn btn-dark mt-3">
          Volver al inicio
        </Link>
      </div>
    );
  }

  if (cart.length === 0) {
    return (
      <div className="container my-5 text-center">
        <h2>No hay items en el carrito</h2>
        <Link to="/" className="btn btn-dark mt-3">
          Volver al menú
        </Link>
      </div>
    );
  }

  return (
    <div className="container my-5">
      <h2 className="mb-4">Finalizar Compra</h2>
      
      <div className="row">
        <div className="col-md-8">
          {/* Customer Information Form */}
          <div className="card mb-4">
            <div className="card-body">
              <h5 className="card-title">Información de contacto</h5>
              <form>
                <div className="mb-3">
                  <label className="form-label">Nombre completo</label>
                  <input type="text" className="form-control" required />
                </div>
                <div className="mb-3">
                  <label className="form-label">Teléfono</label>
                  <input type="tel" className="form-control" required />
                </div>
                <div className="mb-3">
                  <label className="form-label">Dirección de entrega</label>
                  <textarea className="form-control" rows="3" required></textarea>
                </div>
              </form>
            </div>
          </div>
        </div>

        <div className="col-md-4">
          {/* Order Summary */}
          <div className="card mb-4">
            <div className="card-body">
              <h5 className="card-title">Resumen del Pedido</h5>
              <ul className="list-group list-group-flush mb-3">
                {cart.map(item => (
                  <li key={item.id} className="list-group-item d-flex justify-content-between">
                    <span>
                      {item.quantity} × {item.name}
                    </span>
                    <span>ARS {formatPrice(item.price * item.quantity)}</span>
                  </li>
                ))}
              </ul>

              <div className="d-flex justify-content-between mb-2">
                <span>Subtotal:</span>
                <span>ARS {formatPrice(subtotal)}</span>
              </div>
              <div className="d-flex justify-content-between mb-3">
                <span>Envío:</span>
                <span>ARS 0.00</span>
              </div>
              <hr />
              <div className="d-flex justify-content-between fw-bold">
                <span>Total:</span>
                <span>ARS {formatPrice(subtotal)}</span>
              </div>
            </div>
          </div>

          {/* Payment and Submit */}
          <div className="card">
            <div className="card-body">
              <h5 className="card-title mb-3">Método de pago</h5>
              <div className="form-check mb-2">
                <input className="form-check-input" type="radio" name="payment" id="cash" defaultChecked />
                <label className="form-check-label" htmlFor="cash">
                  Efectivo al recibir
                </label>
              </div>
              <div className="form-check mb-3">
                <input className="form-check-input" type="radio" name="payment" id="transfer" />
                <label className="form-check-label" htmlFor="transfer">
                  Transferencia bancaria
                </label>
              </div>

              <button 
                className="btn btn-dark w-100"
                onClick={handleSubmitOrder}
              >
                Confirmar Pedido
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;