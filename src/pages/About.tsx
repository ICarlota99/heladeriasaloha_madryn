import banner from '@/assets/banner_about.webp';
import localImage from '@/assets/local.webp';
import GoogleMaps from '@/components/GoogleMapsLink';
import Reveal from '@/components/ui/Reveal';
import { BRAND_NAME, BRAND_LOCATION } from '@/lib/constants';

export default function About() {
  return (
    <section id="about">
      <img
        src={banner}
        alt={BRAND_NAME}
        className="h-56 w-full object-cover sm:h-72 md:h-96"
        loading="lazy"
      />
      <div className="mx-auto grid max-w-6xl items-start gap-10 px-6 py-12 lg:grid-cols-3">
        <Reveal className="space-y-4 text-lg leading-relaxed lg:col-span-2">
          <h1 className="font-display text-4xl text-ink md:text-5xl">
            {BRAND_NAME}, {BRAND_LOCATION}
          </h1>
          <p>
            En Heladerías Aloha, somos una familia apasionada por las delicias heladas. Con más de 20
            años de experiencia en el arte de la heladería, combinamos los mejores sabores con la
            innovación constante. Nuestras cremas heladas se elaboran con ingredientes de primera
            calidad que otorgan a cada producto un sabor cremoso e irresistible.
          </p>
          <h2 className="pt-2 font-display text-3xl">Nuestra Historia y Compromiso</h2>
          <p>
            Desde nuestros inicios, ofrecemos productos de la más alta calidad. Nuestro compromiso es
            endulzar cada momento con cremas heladas, tortas, postres, alfajores y palitos helados.
          </p>
          <h2 className="pt-2 font-display text-3xl">¿Por Qué Elegirnos?</h2>
          <p>
            <strong>Variedad y Calidad:</strong>
            <br />
            Amplia gama de productos, incluyendo opciones Sin TACC. Desde clásicos como vainilla,
            chocolate y dulce de leche hasta tropicales como banana, maracuyá y ananá.
            <br />
            <strong>Innovación y Tradición:</strong>
            <br />
            Décadas de perfeccionamiento para que cada bocado sea único.
            <br />
            <strong>Ambiente Amigable:</strong>
            <br />
            Locales acogedores donde la atención al cliente es prioridad.
          </p>
        </Reveal>
        <Reveal delay={0.1}>
          <img
            src={localImage}
            alt="Local de Aloha"
            className="w-full rounded-3xl object-cover shadow-lg"
            loading="lazy"
          />
        </Reveal>
      </div>
      <Reveal className="mx-auto max-w-6xl px-6 pb-16 text-lg leading-relaxed">
        <h2 className="font-display text-3xl">Únete a Nuestra Familia</h2>
        <p className="mt-4">
          Si estás buscando una experiencia dulce y memorable, <strong>{BRAND_NAME}</strong> es tu
          lugar. ¡Te esperamos!
        </p>
        <div className="mt-4">
          <GoogleMaps />
        </div>
      </Reveal>
    </section>
  );
}
