import { useState } from 'react';
import { useCart } from '../context/CartContext';
import { Link } from 'react-router-dom';
import Button, { buttonClass } from '../components/ui/Button';

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

    const phoneNumber = '542804881974';
    const encodedMessage = encodeURIComponent(whatsappMessage);
    window.open(`https://wa.me/${phoneNumber}?text=${encodedMessage}`, '_blank');

    console.log('Order submitted:', { cart, total: subtotal });
    clearCart();
    setOrderSent(true);
    setIsSubmitting(false);
  };

  if (orderSent) {
    return (
      <div className="mx-auto flex min-h-[50vh] max-w-xl flex-col items-center justify-center px-6 py-16 text-center">
        <div className="rounded-3xl bg-white p-8 shadow-md">
          <h1 className="font-display text-4xl text-ink">¡Pedido realizado con éxito!</h1>
          <p className="mt-4">Tu pedido ha sido enviado al WhatsApp del negocio.</p>
          <p className="mt-2">Nos pondremos en contacto contigo para confirmar.</p>
          <p className="mt-4 text-sm text-ink/60">
            Asegurate de haber enviado el mensaje con el pedido al chat de WhatsApp.
          </p>
        </div>
        <Link to="/" className={`${buttonClass('primary')} mt-6`}>
          Volver al inicio
        </Link>
      </div>
    );
  }

  if (cart.length === 0) {
    return (
      <div className="mx-auto flex min-h-[50vh] max-w-xl flex-col items-center justify-center px-6 py-16 text-center">
        <h1 className="font-display text-5xl text-ink">No hay items en el carrito</h1>
        <Link to="/" className={`${buttonClass('primary')} mt-6`}>
          Volver al menú
        </Link>
      </div>
    );
  }

  window.scrollTo(0, 0);

  const fieldClass = (hasError) =>
    `mt-1 w-full rounded-2xl border bg-cream/40 px-4 py-3 outline-none transition focus:border-brand focus:ring-2 focus:ring-brand/30 ${
      hasError ? 'border-red-500' : 'border-peach'
    }`;

  return (
    <div className="mx-auto max-w-6xl px-4 py-12">
      <h1 className="font-display text-5xl text-ink">Finalizar compra</h1>

      <div className="mt-8 grid items-start gap-8 lg:grid-cols-5">
        <form onSubmit={handleSubmit} className="rounded-3xl bg-white p-6 shadow-md lg:col-span-3 md:p-8">
          <h2 className="text-xl font-bold">Información de contacto</h2>
          <div className="mt-5">
            <label className="text-sm font-semibold" htmlFor="nombre">Nombre *</label>
            <input
              type="text"
              className={fieldClass(errors.nombre)}
              id="nombre"
              name="nombre"
              value={formData.nombre}
              onChange={handleChange}
              required
              placeholder="Ej: Ana González"
            />
            {errors.nombre && <p className="mt-1 text-sm text-red-600">{errors.nombre}</p>}
          </div>
          <div className="mt-4">
            <label className="text-sm font-semibold" htmlFor="telefono">Teléfono *</label>
            <input
              type="tel"
              className={fieldClass(errors.telefono)}
              id="telefono"
              name="telefono"
              value={formData.telefono}
              onChange={handleChange}
              required
              placeholder="Ej: +54 280 1234567"
            />
            {errors.telefono && <p className="mt-1 text-sm text-red-600">{errors.telefono}</p>}
          </div>
          <div className="mt-4">
            <label className="text-sm font-semibold" htmlFor="direccion">Dirección de entrega *</label>
            <textarea
              className={fieldClass(errors.direccion)}
              id="direccion"
              name="direccion"
              rows="3"
              value={formData.direccion}
              onChange={handleChange}
              required
              placeholder="Incluya calles, número, piso/departamento y referencias"
            />
            {errors.direccion && <p className="mt-1 text-sm text-red-600">{errors.direccion}</p>}
          </div>
        </form>

        <div className="space-y-4 lg:sticky lg:top-24 lg:col-span-2 lg:self-start">
          <div className="rounded-3xl bg-white p-6 shadow-md">
            <h2 className="text-xl font-bold">Resumen del pedido</h2>
            <ul className="mt-4 divide-y divide-peach/60">
              {cart.map(item => (
                <li key={item.id} className="flex justify-between gap-3 py-3 text-sm">
                  <span>
                    {item.quantity} x {item.name}
                  </span>
                  <span className="shrink-0 font-semibold">ARS {formatPrice(item.price * item.quantity)}</span>
                </li>
              ))}
            </ul>
            <div className="mt-2 flex justify-between text-sm">
              <span>Subtotal</span>
              <span>ARS {formatPrice(subtotal)}</span>
            </div>
            <div className="mt-3 flex justify-between gap-4 text-sm">
              <span>Envío</span>
              <span className="text-right font-semibold">
                Se le informará el precio según la dirección luego de confirmar el pedido
              </span>
            </div>
            <div className="mt-4 flex justify-between border-t border-peach/70 pt-3 text-lg font-bold">
              <span>Total</span>
              <span className="text-brand">ARS {subtotal.toFixed(2)}</span>
            </div>
          </div>

          <div className="rounded-3xl bg-white p-6 shadow-md">
            <h2 className="text-xl font-bold">Método de pago</h2>
            <label className="mt-4 flex cursor-pointer items-center gap-3 rounded-2xl border border-peach bg-cream/30 px-4 py-3">
              <input
                className="h-4 w-4 accent-brand"
                type="radio"
                name="payment"
                id="cash"
                checked={paymentMethod === 'cash'}
                onChange={handlePaymentChange}
              />
              Efectivo al recibir
            </label>
            <label className="mt-3 flex cursor-pointer items-center gap-3 rounded-2xl border border-peach bg-cream/30 px-4 py-3">
              <input
                className="h-4 w-4 accent-brand"
                type="radio"
                name="payment"
                id="transfer"
                checked={paymentMethod === 'transfer'}
                onChange={handlePaymentChange}
              />
              Transferencia bancaria
            </label>
            <Button className="mt-5 w-full py-3" onClick={handleSubmit}>
              {isSubmitting ? 'Enviando...' : 'Enviar pedido por WhatsApp'}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
