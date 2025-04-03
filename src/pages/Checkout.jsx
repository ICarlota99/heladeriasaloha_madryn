import { useState } from 'react';
import { useCart } from '../context/useCart';
import { Link } from 'react-router-dom';

const CheckoutPage = () => {
  const { cart, subtotal, clearCart } = useCart();
  const [paymentMethod, setPaymentMethod] = useState('cash');

  const formatPrice = (price) => {
    if (isNaN(price)) return '0.00';
    return Number(price).toLocaleString('es-AR', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    });
  };

  const [formData, setFormData] = useState({
    nombre: '',
    telefono: '',
    direccion: ''
  });
  const [errors, setErrors] = useState({
    nombre: '',
    telefono: '',
    direccion: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [orderSent, setOrderSent] = useState(false);

  // Frontend validators for user input
  const validateName = (name) => {
    if (!name.trim()) return 'El nombre es obligatorio';
    if (name.length < 3) return 'El nombre debe tener al menos 3 caracteres';
    if (!/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/.test(name)) return 'Solo se permiten letras y espacios';
    return '';
  };

  const validatePhone = (phone) => {
    if (!phone.trim()) return 'El teléfono es obligatorio';
    if (phone.length < 7) return 'El teléfono debe tener al menos 7 caracteres';
    if (!/^[0-9+()\s-]{8,20}$/.test(phone)) return 'Teléfono inválido';
    return '';
  };

  const validateAddress = (address) => {
    if (!address.trim()) return 'La dirección es obligatoria';
    if (address.length < 10) return 'La dirección debe ser más específica';
    return '';
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Real Time Validation
    if (name === 'nombre') {
      setErrors(prev => ({ ...prev, nombre: validateName(value) }));
    } else if (name === 'telefono') {
      setErrors(prev => ({ ...prev, telefono: validatePhone(value) }));
    } else if (name === 'direccion') {
      setErrors(prev => ({ ...prev, direccion: validateAddress(value) }));
    }
  };

  const validateForm = () => {
    const newErrors = {
      nombre: validateName(formData.nombre),
      telefono: validatePhone(formData.telefono),
      direccion: validateAddress(formData.direccion)
    };
    
    setErrors(newErrors);
    return !Object.values(newErrors).some(error => error !== '');
  };

  const handlePaymentChange = (e) => {
    setPaymentMethod(e.target.id);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    // Generate WhatsApp msg
    const whatsappMessage = `*NUEVO PEDIDO - HELADERÍA ALOHA*\n\n` +
      `*Cliente:* ${formData.nombre}\n` +
      `*Teléfono:* ${formData.telefono}\n` +
      `*Dirección:* ${formData.direccion}\n\n` +
      `*Método de pago:* ${paymentMethod === 'cash' ? 'Efectivo al recibir' : 'Transferencia bancaria'}\n\n` +
      `*Detalles del pedido:*\n${cart.map(item => 
        `- ${item.name} x${item.quantity} = ARS ${(item.price * item.quantity).toFixed(2)}`
      ).join('\n')}\n\n` +
      `*Total:* ARS ${subtotal.toFixed(2)}\n\n` +
      `*Fecha:* ${new Date().toLocaleString()}`;

    // Open whatsapp
    const phoneNumber = '542804881974';
    const encodedMessage = encodeURIComponent(whatsappMessage);
    window.open(`https://wa.me/${phoneNumber}?text=${encodedMessage}`, '_blank');
    
    // Clean cart and show confirmation
    console.log('Order submitted:', { cart, total: subtotal });
    clearCart();
    setOrderSent(true);
    setIsSubmitting(false);
  };

  if (orderSent) {
    return (
      <div className="container my-5 text-center">
        <div className="alert alert-success">
          <h2>¡Pedido realizado con éxito!</h2>
          <p className="mb-4">Tu pedido ha sido enviado al WhatsApp del negocio.</p>
          <p className="mb-4">Nos pondremos en contacto contigo para confirmar.</p>
          <p className='text-muted'>**Asegúrate de haber enviado el mensaje con el pedido al chat de Whatsapp**</p>
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

  window.scrollTo(0, 0);

  return (
    <div className="container my-5">
      <h2 className="mb-4">Finalizar Compra</h2>
      
      <div className="row">
        <div className="col-md-8">
          {/* Customer Information Form */}
          <div className="card mb-4">
            <div className="card-body">
              <h5 className="card-title">Información de contacto</h5>
              <form onSubmit={handleSubmit} >
                <div className="mb-3">
                  <label className="form-label">Nombre *</label>
                  <input
                    type="text"
                    className={`form-control ${errors.nombre ? 'is-invalid' : ''}`}
                    id="nombre"
                    name="nombre"
                    value={formData.nombre}
                    onChange={handleChange}
                    required
                    placeholder="Ej: Ana González"
                  />
                  {errors.nombre && <div className="invalid-feedback">{errors.nombre}</div>}
                </div>
                <div className="mb-3">
                  <label className="form-label">Teléfono *</label>
                  <input
                    type="tel"
                    className={`form-control ${errors.telefono ? 'is-invalid' : ''}`}
                    id="telefono"
                    name="telefono"
                    value={formData.telefono}
                    onChange={handleChange}
                    required
                    placeholder="Ej: +54 280 1234567"
                  />
                  {errors.telefono && <div className="invalid-feedback">{errors.telefono}</div>}
                </div>
                <div className="mb-3">
                  <label className="form-label">Dirección de entrega *</label>
                  <textarea
                    className={`form-control ${errors.direccion ? 'is-invalid' : ''}`}
                    id="direccion"
                    name="direccion"
                    rows="3"
                    value={formData.direccion}
                    onChange={handleChange}
                    required
                    placeholder="Incluya calles, número, piso/departamento y referencias"
                  />
                  {errors.direccion && <div className="invalid-feedback">{errors.direccion}</div>}
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
                      {item.quantity} x {item.name}
                    </span>
                    <span>ARS {formatPrice(item.price * item.quantity)}</span>
                  </li>
                ))}
              </ul>

              <div className="d-flex justify-content-between mb-2">
                <span>Subtotal:</span>
                <span>ARS { formatPrice(subtotal) }</span>
              </div>
              <div className="d-flex justify-content-between mb-3">
                <span className='me-2'>Envío:</span>
                <span><strong>
                  Se le informará el precio según la dirección luego de confirmar el pedido
                </strong></span>
              </div>
              <hr />
              <div className="d-flex justify-content-between fw-bold">
                <span>Total:</span>
                <span>ARS {subtotal.toFixed(2)}</span>
              </div>
            </div>
          </div>

          {/* Payment and Submit */}
          <div className="card">
            <div className="card-body">
              <h5 className="card-title mb-3">Método de pago</h5>
              <div className="form-check mb-2">
                <input 
                  className="form-check-input" 
                  type="radio" 
                  name="payment" 
                  id="cash" 
                  checked={paymentMethod === 'cash'}
                  onChange={handlePaymentChange}
                />
                <label className="form-check-label" htmlFor="cash">
                  Efectivo al recibir
                </label>
              </div>
              <div className="form-check mb-3">
                <input 
                  className="form-check-input" 
                  type="radio" 
                  name="payment" 
                  id="transfer" 
                  checked={paymentMethod === 'transfer'}
                  onChange={handlePaymentChange}
                />
                <label className="form-check-label" htmlFor="transfer">
                  Transferencia bancaria
                </label>
              </div>

              <button 
                type='submit'
                className="btn btn-dark w-100 py-3"
                onClick={handleSubmit}
              >
                {isSubmitting ? 'Enviando...' : 'Enviar pedido por WhatsApp'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;