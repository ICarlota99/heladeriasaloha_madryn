import Link from 'next/link';

const OrderConfirmation = () => {
  return (
    <div className="container my-5 text-center">
      <div className="card p-5">
        <div className="card-body">
          <h1 className="text-success mb-4">¡Pedido Confirmado!</h1>
          <p className="lead mb-4">
            Gracias por tu pedido. Hemos recibido tu solicitud y nos pondremos en contacto contigo pronto.
          </p>
          <p className="mb-4">
            Si tienes alguna pregunta, no dudes en contactarnos.
          </p>
          <Link href="/" className="btn btn-primary">
            Volver al Inicio
          </Link>
        </div>
      </div>
    </div>
  );
};

export default OrderConfirmation;