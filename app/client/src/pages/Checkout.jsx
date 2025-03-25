import { useState, useEffect } from 'react';
import { useCart } from '../context/CartContext';
import { useRouter } from 'next/router';
import styles from '../styles/Checkout.module.css';

const CheckoutPage = () => {
  const { cart, subtotal, clearCart } = useCart();
  const router = useRouter();
  
  const [user, setUser] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    address: '',
    phone: '',
    notes: ''
  });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check if user is logged in (I still need to implement this)
    const fetchUserData = async () => {
      try {
        // Replace with user fetch logic
        const response = await fetch('/api/user');
        if (response.ok) {
          const userData = await response.json();
          setUser(userData);
          setFormData({
            name: userData.name || '',
            address: userData.address || '',
            phone: userData.phone || '',
            notes: ''
          });
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchUserData();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Prepare order data
    const orderData = {
      customer: formData,
      items: cart,
      total: subtotal,
      date: new Date().toISOString()
    };

    // Send to WhatsApp
    const whatsappMessage = generateWhatsAppMessage(orderData);
    const encodedMessage = encodeURIComponent(whatsappMessage);
    const whatsappUrl = `https://wa.me/+542804881974?text=${encodedMessage}`;
    
    // Open WhatsApp in a new tab
    window.open(whatsappUrl, '_blank');
    
    // Clear cart and redirect
    clearCart();
    router.push('/order-confirmation');
  };

  const generateWhatsAppMessage = (order) => {
    let message = `*Nuevo Pedido de Helados*\n\n`;
    message += `*Cliente:* ${order.customer.name}\n`;
    message += `*Dirección:* ${order.customer.address}\n`;
    message += `*Teléfono:* ${order.customer.phone}\n\n`;
    message += `*Pedido:*\n`;
    
    order.items.forEach(item => {
      message += `- ${item.name} x${item.quantity} = ARS ${(item.price * item.quantity).toFixed(2)}\n`;
    });
    
    message += `\n*Total:* ARS ${order.total.toFixed(2)}\n\n`;
    message += `*Notas:* ${order.customer.notes || 'Ninguna'}\n\n`;
    message += `*Fecha:* ${new Date(order.date).toLocaleString()}`;
    
    return message;
  };

  if (isLoading) {
    return <div className="container my-5 text-center">Cargando...</div>;
  }

  if (cart.length === 0) {
    return (
      <div className="container my-5 text-center">
        <h2>Tu carrito está vacío</h2>
        <button 
          className="btn btn-primary mt-3" 
          onClick={() => router.push('/')}
        >
          Volver al menú
        </button>
      </div>
    );
  }

  return (
    <div className="container my-5">
      <div className="row">
        <div className="col-lg-8">
          <h2 className="mb-4">Información de Entrega</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="name" className="form-label">Nombre Completo</label>
              <input
                type="text"
                className="form-control"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>
            
            <div className="mb-3">
              <label htmlFor="address" className="form-label">Dirección</label>
              <textarea
                className="form-control"
                id="address"
                name="address"
                rows="3"
                value={formData.address}
                onChange={handleChange}
                required
              />
            </div>
            
            <div className="mb-3">
              <label htmlFor="phone" className="form-label">Teléfono</label>
              <input
                type="tel"
                className="form-control"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                required
              />
            </div>
            
            <div className="mb-4">
              <label htmlFor="notes" className="form-label">Notas adicionales</label>
              <textarea
                className="form-control"
                id="notes"
                name="notes"
                rows="2"
                value={formData.notes}
                onChange={handleChange}
                placeholder="Ej: Puerta azul, timbre roto, etc."
              />
            </div>
            
            <button type="submit" className="btn btn-primary w-100 py-3">
              Enviar Pedido por WhatsApp
            </button>
          </form>
        </div>
        
        <div className="col-lg-4 mt-4 mt-lg-0">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">Resumen del Pedido</h5>
              <ul className="list-group list-group-flush mb-3">
                {cart.map(item => (
                  <li key={item.id} className="list-group-item d-flex justify-content-between">
                    <div>
                      {item.name} x{item.quantity}
                    </div>
                    <div>
                      ARS {(item.price * item.quantity).toFixed(2)}
                    </div>
                  </li>
                ))}
              </ul>
              <div className="d-flex justify-content-between fw-bold">
                <span>Total:</span>
                <span>ARS {subtotal.toFixed(2)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;