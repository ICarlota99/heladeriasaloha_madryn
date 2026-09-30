import { Link } from 'react-router-dom';
import bucketImg from '@/assets/products/baldes/baldes.webp';
import FlavorCarousel from '@/components/FlavorCarousel';
import Reveal from '@/components/ui/Reveal';
import type { FeaturedFlavor } from '@/types';

const flavors: FeaturedFlavor[] = [
  {
    id: 1,
    name: 'Alfajor Marplatense',
    description: 'Helado con trozos de alfajor marplatense',
    image: 'flavors/alfajor_marplatense.webp',
    tags: ['Dulce de leche', 'Chocolate', 'Crocante'],
    accent: 'peach',
  },
  {
    id: 2,
    name: 'Chocorrica',
    description: 'El sabor de la torta más rica',
    image: 'flavors/chocorrica.webp',
    tags: ['Dulce de leche', 'Galletitas', 'Chocolate'],
    accent: 'rose',
  },
  {
    id: 3,
    name: 'Cookies & Cream',
    description: 'Crema de leche helada con galletitas de chocolate',
    image: 'flavors/cookies_and_cream.webp',
    tags: ['Crema', 'Cookies', 'Cacao'],
    accent: 'sky',
  },
  {
    id: 4,
    name: 'Mousse de Chocolate',
    description: 'Crema helada tipo mousse de chocolate con frutilla natural',
    image: 'flavors/mousse_de_chocolate_con_frutilla.webp',
    tags: ['Chocolate', 'Mousse', 'Frutilla'],
    accent: 'blush',
  },
  {
    id: 5,
    name: 'Dulce de Leche',
    description: 'Crema helada tde dulce de leche',
    image: 'flavors/dulceleche.webp',
    tags: ['Dulce de leche', 'Cremoso', 'Mousse'],
    accent: 'blush',
  },
  {
    id: 6,
    name: 'Mascarpone y frutos rojos',
    description: 'Crema helada de mascarpone con frutos rojos',
    image: 'flavors/mascarpone.webp',
    tags: ['Mascarpone', 'Frutos rojos', 'Cremoso'],
    accent: 'blush',
  },
];

const bucketSteps = [
  { icon: 'fa-ice-cream', label: 'Elegí tus sabores' },
  { icon: 'fa-star', label: 'Personalizá tu combinación' },
  { icon: 'fa-heart', label: 'Disfrutá Aloha' },
] as const;

function TitleRays({ side }: { side: 'left' | 'right' }) {
  return (
    <span
      className={`hidden text-brand sm:inline-flex ${side === 'left' ? 'mr-3 -scale-x-100' : 'ml-3'}`}
      aria-hidden
    >
      <svg width="28" height="36" viewBox="0 0 28 36" fill="none">
        <path d="M4 6 L14 2" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
        <path d="M2 18 L14 18" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
        <path d="M4 30 L14 34" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
      </svg>
    </span>
  );
}

export default function Flavors() {
  return (
    <section
      id="flavors"
      className="relative overflow-hidden bg-cream-soft px-5 py-16 sm:px-6 sm:py-20 lg:py-24"
    >
      <div
        className="pointer-events-none absolute -right-20 top-10 h-52 w-52 rounded-[46%] bg-brand/10 sm:h-64 sm:w-64"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute -left-24 bottom-40 h-56 w-56 rounded-[48%] bg-coral/15"
        aria-hidden
      />

      <div className="relative mx-auto max-w-7xl">
        <Reveal className="mx-auto max-w-3xl text-center">
          <p className="flex items-center justify-center gap-3 text-xs font-bold tracking-[0.22em] text-brand uppercase sm:text-sm">
            <span className="hidden h-px w-10 bg-brand/70 sm:block" aria-hidden />
            Los sabores más pedidos
            <span className="hidden h-px w-10 bg-brand/70 sm:block" aria-hidden />
          </p>

          <h2 className="mt-4 flex items-center justify-center font-display text-4xl leading-tight text-ink sm:text-5xl md:text-6xl">
            <TitleRays side="left" />
            <span>¿Cuál va a ser tu próximo favorito?</span>
            <TitleRays side="right" />
          </h2>

          <p className="mt-3 text-base text-ink/75 sm:text-lg">
            Descubrí los sabores que todos eligen una y otra vez.
          </p>
        </Reveal>

        <div className="-mx-5 mt-10 sm:-mx-6 sm:mt-12">
          <FlavorCarousel flavors={flavors} />
        </div>

        <Reveal className="mt-14 sm:mt-20">
          <div className="relative grid items-center gap-8 overflow-hidden rounded-[2rem] bg-white/80 p-5 shadow-[var(--shadow-soft)] ring-1 ring-brand/10 sm:p-8 lg:grid-cols-2 lg:gap-12 lg:p-10">
            <div className="relative">
              <span
                className="pointer-events-none absolute -left-1 top-6 text-brand/70 sm:left-2"
                aria-hidden
              >
                ✦
              </span>
              <span
                className="pointer-events-none absolute right-4 top-4 text-brand/60 sm:right-10"
                aria-hidden
              >
                ✦
              </span>
              <img
                src={bucketImg}
                alt="Balde de helado Aloha"
                className="mx-auto w-full max-w-md object-contain drop-shadow-lg"
                loading="lazy"
              />
            </div>

            <div className="relative text-center lg:text-left">
              <h3 className="font-display text-4xl leading-tight text-ink sm:text-5xl">
                ¿No podés elegir uno solo?{' '}
                <span className="text-brand" aria-hidden>
                  ♡
                </span>
              </h3>
              <p className="mt-3 text-base text-ink/75 sm:text-lg">
                Combiná tus sabores favoritos en un balde hecho a tu medida.
              </p>

              <Link
                to="/flavors"
                className="mt-6 inline-flex min-h-12 w-full items-center justify-center gap-3 rounded-full bg-brand px-6 py-3.5 text-sm font-bold tracking-wide text-white uppercase no-underline shadow-md transition hover:bg-brand-dark hover:shadow-lg sm:w-auto sm:text-base"
              >
                <i className="fa-solid fa-ice-cream" aria-hidden />
                Armá tu balde personalizado
                <i className="fa-solid fa-arrow-right text-xs" aria-hidden />
              </Link>

              <ul className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-3 sm:gap-0 sm:divide-x sm:divide-ink/15">
                {bucketSteps.map((step) => (
                  <li
                    key={step.label}
                    className="flex items-center justify-center gap-2 px-2 text-sm font-semibold text-ink/80 sm:flex-col sm:gap-1 lg:px-3"
                  >
                    <i className={`fa-solid ${step.icon} text-brand`} aria-hidden />
                    <span>{step.label}</span>
                  </li>
                ))}
              </ul>

              <div
                className="pointer-events-none absolute -bottom-8 -right-6 text-7xl text-coral/20 sm:text-8xl"
                aria-hidden
              >
                <i className="fa-solid fa-leaf" />
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
