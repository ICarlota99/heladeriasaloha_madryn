import { useState } from 'react';
import { useCart } from '../context/CartContext';
import { useNavigate } from 'react-router-dom';

const CheckoutPage = () => {
  const { cart, subtotal, clearCart } = useCart();
  const navigate = useNavigate();
  
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
    clearCart();
    setOrderSent(true);
    setIsSubmitting(false);
  };

  if (orderSent) {
    return (
      <div className="container my-5 text-center">
        <div className="card p-4" style={{ maxWidth: '500px', margin: '0 auto' }}>
          <h2 className="text-success mb-4">¡Pedido enviado con éxito!</h2>
          <p className="mb-4">Tu pedido ha sido enviado al WhatsApp del negocio.</p>
          <p className="mb-4">Nos pondremos en contacto contigo para confirmar.</p>
          <button 
            className="btn btn-dark mt-3" 
            onClick={() => navigate('/')}
          >
            Volver al menú principal
          </button>
        </div>
      </div>
    );
  }

  // Empty cart
  if (cart.length === 0) {
    return (
      <div className="container my-5 text-center">
        <h2>Tu carrito está vacío</h2>
        <button 
          className="btn btn-dark mt-3" 
          onClick={() => navigate('/')}
        >
          Volver al menú principal
        </button>
      </div>
    );
  }

  // Page UI code
  return (
    <div className="container my-5">
      <div className="row justify-content-center">
        <div className="col-md-8">
          <h2 className="mb-4">Finalizar Compra</h2>
          
          <form onSubmit={handleSubmit} className="card p-4">
            <div className="mb-3">
              <label htmlFor="nombre" className="form-label">
                Nombre completo *
              </label>
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
              <label htmlFor="telefono" className="form-label">
                Número de teléfono *
              </label>
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

            <div className="mb-4">
              <label htmlFor="direccion" className="form-label">
                Dirección completa *
              </label>
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

            <div className="mb-4">
              <h5>Resumen del pedido</h5>
              <ul className="list-group">
                {cart.map(item => (
                  <li key={item.id} className="list-group-item d-flex justify-content-between">
                    <span>{item.name} x{item.quantity}</span>
                    <span>ARS {(item.price * item.quantity).toFixed(2)}</span>
                  </li>
                ))}
              </ul>
              <div className="d-flex justify-content-between mt-3 fw-bold fs-5">
                <span>Total:</span>
                <span>ARS {subtotal.toFixed(2)}</span>
              </div>
            </div>

            <button 
              type="submit" 
              className="btn btn-primary w-100 py-3"
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Enviando...' : 'Enviar pedido por WhatsApp'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;