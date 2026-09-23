import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { HashLink } from 'react-router-hash-link';
import heroicecream from '../assets/hero_icecream.webp';
import { buttonClass } from '../components/ui/Button';
import AOS from 'aos';
import 'aos/dist/aos.css';

const Hero = () => {
  useEffect(() => {
    AOS.init({
      offset: 200,
      duration: 600,
      easing: 'ease-in-sine',
    });
  }, []);

  return (
    <section id="hero" className="mx-auto grid w-full max-w-6xl items-center gap-8 px-8 py-10 lg:grid-cols-2 lg:items-stretch lg:gap-16 lg:px-12 lg:py-0">
      <div className="text-center lg:flex lg:flex-col lg:justify-center lg:py-16 lg:text-left">
        <h1 className="font-display text-5xl leading-tight text-ink md:text-6xl" data-aos="zoom-in" data-aos-delay="200">
          Cómete un helado
          <br />
          <span className="text-brand">Disfrutá la vida</span>
        </h1>
        <div className="mt-4 space-y-1" data-aos="zoom-in" data-aos-delay="300">
          <h2 className="text-xl font-semibold md:text-2xl">Sabores explosivos y novedosos</h2>
          <p className="text-lg text-ink/80">Bocados de felicidad</p>
        </div>
        <div className="mt-8 flex flex-wrap justify-center gap-3 lg:justify-start" data-aos="slide-up" data-aos-delay="400">
          <Link to="/flavors" className={buttonClass('primary')}>
            Armá tu balde <i className="fa-solid fa-arrow-right"></i>
          </Link>
          <HashLink to="/#shop" className={buttonClass('secondary')}>
            Ver productos
          </HashLink>
        </div>
      </div>
      <div className="relative h-72 overflow-hidden sm:h-96 lg:h-full lg:min-h-[32rem] lg:overflow-visible" data-aos="slide-left" data-aos-delay="200">
        <img
          id="hero-img"
          src={heroicecream}
          alt="Cono de helado"
          className="absolute inset-0 h-full w-full object-cover object-bottom lg:inset-auto lg:top-0 lg:left-1/2 lg:h-full lg:w-auto lg:max-w-none lg:-translate-x-1/2"
        />
      </div>
    </section>
  );
};

export default Hero;
