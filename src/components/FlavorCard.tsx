import { getFlavorImageSrc } from '@/lib/productImages';
import type { FeaturedFlavor, FlavorAccent } from '@/types';

const accentRay: Record<FlavorAccent, string> = {
  peach: 'bg-brand',
  rose: 'bg-coral',
  sky: 'bg-[#7BA7D9]',
  blush: 'bg-[#D97A72]',
};

interface FlavorCardProps {
  flavor: FeaturedFlavor;
  className?: string;
}

function AccentRays({ accent, side }: { accent: FlavorAccent; side: 'left' | 'right' }) {
  return (
    <span
      className={`flex shrink-0 flex-col justify-center gap-1 ${side === 'left' ? '-scale-x-100' : ''}`}
      aria-hidden
    >
      <span className={`h-0.5 w-2.5 rounded-full ${accentRay[accent]} opacity-80`} />
      <span className={`h-0.5 w-3.5 rounded-full ${accentRay[accent]}`} />
      <span className={`h-0.5 w-2.5 rounded-full ${accentRay[accent]} opacity-80`} />
    </span>
  );
}

export default function FlavorCard({ flavor, className = '' }: FlavorCardProps) {
  const imageSrc = getFlavorImageSrc(flavor.image);

  return (
    <article
      className={`flex h-full flex-col overflow-hidden rounded-[1.75rem] bg-[#F3E6D8] shadow-[0_10px_28px_rgb(42_33_24_/_0.08)] ${className}`}
    >
      <div className="aspect-square overflow-hidden bg-cream-soft">
        {imageSrc ? (
          <img
            src={imageSrc}
            alt={flavor.name}
            className="h-full w-full object-cover"
            loading="lazy"
            draggable={false}
          />
        ) : null}
      </div>

      <div className="flex flex-1 flex-col items-center bg-gradient-to-b from-[#F6EADF] to-[#EFE0D0] px-3 pb-5 pt-4 text-center sm:px-4">
        <p className="inline-flex w-full max-w-full items-center justify-center gap-2 rounded-full bg-white px-3 py-2 shadow-[0_2px_8px_rgb(42_33_24_/_0.06)] sm:gap-2.5 sm:px-4">
          <AccentRays accent={flavor.accent} side="left" />
          <span className="min-w-0 font-display text-sm leading-snug text-balance break-words text-ink sm:text-base">
            {flavor.name}
          </span>
          <AccentRays accent={flavor.accent} side="right" />
        </p>
        <p className="mt-3 text-sm leading-relaxed text-ink/65">{flavor.tags.join(' · ')}</p>
      </div>
    </article>
  );
}
