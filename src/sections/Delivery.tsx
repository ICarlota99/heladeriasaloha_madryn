import frame from '@/assets/frame.webp';
import { buttonClass } from '@/components/ui/Button';
import Reveal from '@/components/ui/Reveal';
import { buildWhatsAppUrl } from '@/lib/whatsapp';

export default function Delivery() {
  return (
    <section id="delivery" className="mx-auto my-16 grid max-w-7xl items-center gap-8 px-6 lg:grid-cols-2">
      <Reveal className="hidden lg:block">
        <img
          id="delivery-img"
          src={frame}
          alt="Helados Aloha"
          className="w-full rounded-[2rem] object-cover shadow-[var(--shadow-soft)]"
          loading="lazy"
        />
      </Reveal>
      <div className="flex flex-col gap-6">
        <Reveal>
          <div className="rounded-[2rem] bg-brand px-6 py-12 text-center text-white shadow-lg">
            <h2 className="font-display text-4xl md:text-5xl">Tienda Online</h2>
            <p className="mt-3 text-2xl font-semibold tracking-wide">Delivery en todo Madryn</p>
          </div>
        </Reveal>
        <Reveal delay={0.1}>
          <div className="rounded-[2rem] bg-white px-6 py-10 text-center shadow-[var(--shadow-soft)]">
            <h2 className="font-display text-4xl text-ink">Helados & Postres</h2>
            <p className="mt-4 leading-relaxed text-ink/80">
              Queremos endulzar cada momento con nuestras cremas heladas, tortas, postres, alfajores
              y palitos helados. No te quedes con las ganas.
            </p>
            <p className="mt-4 text-lg font-semibold">
              Pedí <strong>delivery</strong> y disfrutá una experiencia inolvidable.
            </p>
            <a
              href={buildWhatsAppUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className={`${buttonClass('primary')} mt-6`}
            >
              Pedí por WhatsApp
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
