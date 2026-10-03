import { useState, type ChangeEvent, type FormEvent } from 'react';
import { Link } from 'react-router-dom';
import Button, { buttonClass } from '@/components/ui/Button';
import { useCart } from '@/hooks/useCart';
import { WHATSAPP_PHONE } from '@/lib/constants';
import { formatPrice } from '@/lib/formatPrice';
import { buildWhatsAppUrl } from '@/lib/whatsapp';
import type { CheckoutFormData, CheckoutFormErrors, PaymentMethod } from '@/types';

function validateName(name: string): string {
  if (!name.trim()) return 'El nombre es obligatorio';
  if (name.length < 3) return 'El nombre debe tener al menos 3 caracteres';
  if (!/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/.test(name)) return 'Solo se permiten letras y espacios';
  return '';
}

function validatePhone(phone: string): string {
  if (!phone.trim()) return 'El teléfono es obligatorio';
  if (phone.length < 7) return 'El teléfono debe tener al menos 7 caracteres';
  if (!/^[0-9+()\s-]{8,20}$/.test(phone)) return 'Teléfono inválido';
  return '';
}

function validateAddress(address: string): string {
  if (!address.trim()) return 'La dirección es obligatoria';
  if (address.length < 10) return 'La dirección debe ser más específica';
  return '';
}

export default function CheckoutPage() {
  const { cart, subtotal, clearCart } = useCart();
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('cash');
  const [formData, setFormData] = useState<CheckoutFormData>({
    nombre: '',
    telefono: '',
    direccion: '',
  });
  const [errors, setErrors] = useState<CheckoutFormErrors>({
    nombre: '',
    telefono: '',
    direccion: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [orderSent, setOrderSent] = useState(false);

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    if (name === 'nombre') setErrors((prev) => ({ ...prev, nombre: validateName(value) }));
    if (name === 'telefono') setErrors((prev) => ({ ...prev, telefono: validatePhone(value) }));
    if (name === 'direccion') setErrors((prev) => ({ ...prev, direccion: validateAddress(value) }));
  };

  const validateForm = () => {
    const nextErrors: CheckoutFormErrors = {
      nombre: validateName(formData.nombre),
      telefono: validatePhone(formData.telefono),
      direccion: validateAddress(formData.direccion),
    };
    setErrors(nextErrors);
    return !Object.values(nextErrors).some(Boolean);
  };

  const handleSubmit = (e?: FormEvent) => {
    e?.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);

    const whatsappMessage =
      `*NUEVO PEDIDO - HELADERÍA ALOHA*\n\n` +
      `*Cliente:* ${formData.nombre}\n` +
      `*Teléfono:* ${formData.telefono}\n` +
      `*Dirección:* ${formData.direccion}\n\n` +
      `*Método de pago:* ${paymentMethod === 'cash' ? 'Efectivo al recibir' : 'Transferencia bancaria'}\n\n` +
      `*Detalles del pedido:*\n${cart
        .map(
          (item) =>
            `- ${item.name} x${item.quantity} = ARS ${formatPrice(Number(item.price) * item.quantity, 2)}`,
        )
        .join('\n')}\n\n` +
      `*Total:* ARS ${formatPrice(subtotal, 2)}\n\n` +
      `*Fecha:* ${new Date().toLocaleString('es-AR')}`;

    window.open(buildWhatsAppUrl(whatsappMessage, WHATSAPP_PHONE), '_blank');
    clearCart();
    setOrderSent(true);
    setIsSubmitting(false);
  };

  if (orderSent) {
    return (
      <div className="mx-auto flex min-h-[50vh] max-w-xl flex-col items-center justify-center px-6 py-16 text-center">
        <div className="rounded-3xl bg-white p-8 shadow-md">
          <h1 className="font-display text-4xl text-ink">¡Pedido listo para enviar!</h1>
          <p className="mt-4">Tu pedido se abrió en WhatsApp del negocio.</p>
          <p className="mt-2">Confirmá el envío del mensaje para que lo recibamos.</p>
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

  const fieldClass = (hasError: boolean) =>
    `mt-1 w-full rounded-2xl border bg-cream/40 px-4 py-3 outline-none transition focus:border-brand focus:ring-2 focus:ring-brand/30 ${
      hasError ? 'border-red-500' : 'border-peach'
    }`;

  return (
    <div className="mx-auto max-w-6xl px-4 py-12 pb-28 md:pb-12">
      <h1 className="font-display text-5xl text-ink">Finalizar compra</h1>

      <div className="mt-8 grid items-start gap-8 lg:grid-cols-5">
        <form onSubmit={handleSubmit} className="rounded-3xl bg-white p-6 shadow-md md:p-8 lg:col-span-3">
          <h2 className="text-xl font-bold">Información de contacto</h2>
          <div className="mt-5">
            <label className="text-sm font-semibold" htmlFor="nombre">
              Nombre *
            </label>
            <input
              type="text"
              className={fieldClass(Boolean(errors.nombre))}
              id="nombre"
              name="nombre"
              value={formData.nombre}
              onChange={handleChange}
              required
              placeholder="Ej: Ana González"
            />
            {errors.nombre ? <p className="mt-1 text-sm text-red-600">{errors.nombre}</p> : null}
          </div>
          <div className="mt-4">
            <label className="text-sm font-semibold" htmlFor="telefono">
              Teléfono *
            </label>
            <input
              type="tel"
              className={fieldClass(Boolean(errors.telefono))}
              id="telefono"
              name="telefono"
              value={formData.telefono}
              onChange={handleChange}
              required
              placeholder="Ej: +54 280 1234567"
            />
            {errors.telefono ? <p className="mt-1 text-sm text-red-600">{errors.telefono}</p> : null}
          </div>
          <div className="mt-4">
            <label className="text-sm font-semibold" htmlFor="direccion">
              Dirección de entrega *
            </label>
            <textarea
              className={fieldClass(Boolean(errors.direccion))}
              id="direccion"
              name="direccion"
              rows={3}
              value={formData.direccion}
              onChange={handleChange}
              required
              placeholder="Incluí calles, número, piso/departamento y referencias"
            />
            {errors.direccion ? <p className="mt-1 text-sm text-red-600">{errors.direccion}</p> : null}
          </div>
        </form>

        <div className="space-y-4 lg:sticky lg:top-24 lg:col-span-2 lg:self-start">
          <div className="rounded-3xl bg-white p-6 shadow-md">
            <h2 className="text-xl font-bold">Resumen del pedido</h2>
            <ul className="mt-4 divide-y divide-peach/60">
              {cart.map((item) => (
                <li key={item.id} className="flex justify-between gap-3 py-3 text-sm">
                  <span>
                    {item.quantity} x {item.name}
                  </span>
                  <span className="shrink-0 font-semibold">
                    ARS {formatPrice(Number(item.price) * item.quantity)}
                  </span>
                </li>
              ))}
            </ul>
            <div className="mt-4 flex justify-between border-t border-peach/70 pt-3 text-lg font-bold">
              <span>Total</span>
              <span className="text-brand">ARS {formatPrice(subtotal)}</span>
            </div>
            <p className="mt-2 text-xs text-ink/60">
              El costo de envío se confirma según tu dirección al recibir el pedido.
            </p>
          </div>

          <div className="rounded-3xl bg-white p-6 shadow-md">
            <h2 className="text-xl font-bold">Método de pago</h2>
            <label className="mt-4 flex cursor-pointer items-center gap-3 rounded-2xl border border-peach bg-cream/30 px-4 py-3">
              <input
                className="h-4 w-4 accent-brand"
                type="radio"
                name="payment"
                checked={paymentMethod === 'cash'}
                onChange={() => setPaymentMethod('cash')}
              />
              Efectivo al recibir
            </label>
            <label className="mt-3 flex cursor-pointer items-center gap-3 rounded-2xl border border-peach bg-cream/30 px-4 py-3">
              <input
                className="h-4 w-4 accent-brand"
                type="radio"
                name="payment"
                checked={paymentMethod === 'transfer'}
                onChange={() => setPaymentMethod('transfer')}
              />
              Transferencia bancaria
            </label>
            <Button className="mt-5 w-full py-3" onClick={() => handleSubmit()} disabled={isSubmitting}>
              {isSubmitting ? 'Enviando...' : 'Enviar pedido por WhatsApp'}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
