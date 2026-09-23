import { useEffect } from 'react';
import frame from '../assets/frame.webp';
import { buttonClass } from '../components/ui/Button';
import AOS from 'aos';
import 'aos/dist/aos.css';

const Delivery = () => {
  const phoneNumber = '+542804881974';
  const message = '¡Hola! Quiero hacer un pedido de helados.';
  const whatsappLink = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;

  useEffect(() => {
    AOS.init({
      offset: 200,
      duration: 600,
      easing: 'ease-in-sine',
    });
  }, []);

  return (
    <section id="delivery" className="mx-auto my-16 grid max-w-7xl items-center gap-8 px-6 lg:grid-cols-2">
      <img
        id="delivery-img"
        data-aos="slide-left"
        data-aos-delay="300"
        src={frame}
        alt="Helados Aloha"
        className="hidden w-full rounded-[2rem] object-cover lg:block"
        loading="lazy"
      />
      <div className="flex flex-col gap-6">
        <div
          data-aos="slide-down"
          data-aos-delay="400"
          className="rounded-[2rem] bg-brand px-6 py-12 text-center text-white shadow-lg"
        >
          <h2 className="font-display text-4xl md:text-5xl">Tienda Online</h2>
          <p className="mt-3 text-2xl font-semibold tracking-wide">Delivery en todo Madryn</p>
        </div>
        <div
          data-aos="slide-up"
          data-aos-delay="400"
          className="rounded-[2rem] bg-white px-6 py-10 text-center shadow-lg"
        >
          <h2 className="font-display text-4xl text-ink">Helados & Postres</h2>
          <p className="mt-4 leading-relaxed">
            Queremos endulzar cada momento de tu vida con nuestras cremas heladas,
            tortas, postres, alfajores y palitos helados que deleitan el paladar.
            No te quedes con las ganas.
          </p>
          <p className="mt-4 text-lg font-semibold">
            Pedí <strong>delivery</strong> y disfrutá de una experiencia inolvidable.
          </p>
          <a
            href={whatsappLink}
            target="_blank"
            rel="noopener noreferrer"
            className={`${buttonClass('primary')} mt-6`}
          >
            Contáctanos
          </a>
        </div>
      </div>
    </section>
  );
};

export default Delivery;
