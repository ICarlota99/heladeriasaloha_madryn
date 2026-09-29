import { Link } from 'react-router-dom';
import SimpleProductCard from '@/components/SimpleProductCard';
import { buttonClass } from '@/components/ui/Button';
import Reveal from '@/components/ui/Reveal';
import SectionHeading from '@/components/ui/SectionHeading';
import type { FeaturedFlavor } from '@/types';

const flavors: FeaturedFlavor[] = [
  {
    id: 1,
    name: 'Alfajor Marplatense',
    description: 'Helado con trozos de alfajor marplatense',
    image: 'flavors/alfajor_marplatense.webp',
  },
  {
    id: 2,
    name: 'Chocorrica',
    description: 'El sabor de la torta más rica',
    image: 'flavors/chocorrica.webp',
  },
  {
    id: 3,
    name: 'Cookies & Cream',
    description: 'Crema de leche helada con galletitas de chocolate',
    image: 'flavors/cookies_and_cream.webp',
  },
  {
    id: 4,
    name: 'Mousse de Chocolate con Frutilla',
    description: 'Crema helada tipo mousse de chocolate con frutilla natural',
    image: 'flavors/mousse_de_chocolate_con_frutilla.webp',
  },
];

export default function Flavors() {
  return (
    <section id="flavors" className="mx-auto max-w-7xl px-6 pb-16 pt-28">
      <Reveal>
        <SectionHeading title="Explorá nuestros sabores más populares" />
      </Reveal>

      <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {flavors.map((flavor, index) => (
          <Reveal key={flavor.id} delay={index * 0.08}>
            <SimpleProductCard product={flavor} />
          </Reveal>
        ))}
      </div>

      <Reveal className="mt-10 text-center">
        <p className="mb-4 text-ink/75">Combiná tus favoritos en un balde a medida.</p>
        <Link to="/flavors" className={buttonClass('primary')}>
          Armá tu balde personalizado <i className="fa-solid fa-arrow-right" aria-hidden />
        </Link>
      </Reveal>
    </section>
  );
}
