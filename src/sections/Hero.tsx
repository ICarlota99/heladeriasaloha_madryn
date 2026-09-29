import { Link } from 'react-router-dom';
import { HashLink } from 'react-router-hash-link';
import { motion, useReducedMotion } from 'motion/react';
import heroicecream from '@/assets/hero_icecream.webp';
import { buttonClass } from '@/components/ui/Button';
import { BRAND_NAME } from '@/lib/constants';

export default function Hero() {
  const reduceMotion = useReducedMotion();

  return (
    <section id="hero" className="relative isolate min-h-[calc(100svh-var(--header-offset))] overflow-hidden">
      <motion.img
        src={heroicecream}
        alt="Cono de helado Aloha"
        className="absolute inset-0 h-full w-full object-cover object-[center_70%]"
        initial={reduceMotion ? false : { scale: 1.08 }}
        animate={{ scale: 1 }}
        transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-ink/80 via-ink/45 to-ink/20" />

      <div className="relative z-10 mx-auto flex min-h-[calc(100svh-var(--header-offset))] w-full max-w-6xl flex-col justify-end px-5 pb-14 pt-16 sm:px-8 lg:justify-center lg:pb-20">
        <motion.div
          className="max-w-xl text-white"
          initial={reduceMotion ? false : { opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          <p className="font-brand text-3xl leading-none sm:text-4xl md:text-5xl">{BRAND_NAME}</p>
          <h1 className="mt-4 font-display text-5xl leading-[1.05] sm:text-6xl md:text-7xl">
            Cómete un helado
            <span className="mt-1 block text-peach-light">Disfrutá la vida</span>
          </h1>
          <p className="mt-4 max-w-md text-lg text-white/90">
            Sabores explosivos y novedosos, listos para pedir online en Madryn.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link to="/flavors" className={buttonClass('primary')}>
              Armá tu balde <i className="fa-solid fa-arrow-right" aria-hidden />
            </Link>
            <HashLink to="/#shop" className={buttonClass('ghost')}>
              Ver productos
            </HashLink>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
