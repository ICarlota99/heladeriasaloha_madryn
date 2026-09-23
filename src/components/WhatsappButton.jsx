const WhatsAppButton = () => {
  const phoneNumber = '+542804881974';
  const message = '¡Hola! Quiero hacer un pedido de helados.';
  const whatsappLink = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;

  return (
    <a
      href={whatsappLink}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Escribir por WhatsApp"
      className="fixed bottom-7 right-7 z-50 flex h-16 w-16 items-center justify-center rounded-full bg-brand text-4xl text-white shadow-lg transition duration-300 hover:scale-110 hover:bg-brand-dark"
    >
      <i className="fa-brands fa-whatsapp"></i>
    </a>
  );
};

export default WhatsAppButton;
