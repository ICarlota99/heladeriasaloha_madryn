import { Link } from 'react-router-dom';
import whyus from '@/assets/whyus.webp';
import { buttonClass } from '@/components/ui/Button';
import Reveal from '@/components/ui/Reveal';
import { BUSINESS_HOURS, LOCATIONS } from '@/lib/constants';

const mapLinkClass =
  'inline-flex rounded-full bg-peach-light px-4 py-2 text-sm font-semibold text-ink no-underline transition hover:bg-brand hover:text-white';

export default function Whyus() {
  return (
    <section
      id="whyus"
      className="mx-auto my-8 grid max-w-7xl items-stretch gap-0 overflow-hidden rounded-[2rem] bg-white shadow-[var(--shadow-soft)] lg:grid-cols-2"
    >
      <Reveal y={0} className="min-h-64">
        <img src={whyus} alt="Heladería Aloha" className="h-full w-full object-cover" loading="lazy" />
      </Reveal>
      <Reveal delay={0.1} className="flex flex-col items-center justify-center px-6 py-10 text-center md:px-12">
        <h2 className="font-display text-5xl text-ink">Nosotros</h2>
        <p className="mt-4 leading-relaxed text-ink/85">
          En Heladerías Aloha, somos una familia apasionada por las delicias heladas. Con más de 20
          años de experiencia, combinamos el mejor sabor con innovación constante.
          <span className="mt-3 hidden lg:block">
            Ofrecemos una amplia gama de productos, incluyendo opciones <strong>Sin TACC</strong>.
          </span>
        </p>
        <div className="mt-6 space-y-3">
          <p>
            <strong>Horarios:</strong>
            <br />
            {BUSINESS_HOURS}
          </p>
          <p className="font-semibold">Dónde encontrarnos</p>
          <div className="flex flex-col items-center gap-2">
            {LOCATIONS.map((location) => (
              <a
                key={location.url}
                className={mapLinkClass}
                href={location.url}
                target="_blank"
                rel="noopener noreferrer"
              >
                {location.label}
              </a>
            ))}
          </div>
        </div>
        <Link to="/about" className={`${buttonClass('primary')} mt-6`}>
          Leer más
        </Link>
      </Reveal>
    </section>
  );
}
