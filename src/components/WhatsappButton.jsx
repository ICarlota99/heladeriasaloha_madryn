const WhatsAppButton = () => {
  const phoneNumber = '+542804881974';
  const message = '¡Hola! Quiero hacer un pedido de helados.';

  const whatsappLink = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;

  const buttonStyle = {
    position: 'fixed',
    bottom: '30px',
    right: '30px',
    backgroundColor: '#F47821',
    color: 'white',
    borderRadius: '50%',
    width: '60px',
    height: '60px',
    textAlign: 'center',
    fontSize: '38px',
    boxShadow: '0px 2px 5px rgba(0, 0, 0, 0.3)',
    zIndex: 1000,
  };

  const iconStyle = {
    lineHeight: '60px',
  };

  return (
    <a
      href={whatsappLink}
      target="_blank"
      rel="noopener noreferrer"
      style={buttonStyle}
    >
      <i className="fa fa-whatsapp" style={iconStyle}></i>
    </a>
  );
};

export default WhatsAppButton;