import type { Flavor } from '@/types';

interface FlavorPickerTileProps {
  flavor: Flavor;
  selected: boolean;
  order?: number;
  onToggle: () => void;
}

function cleanName(name: string): string {
  return name.replace(/\s*¡Nuevo Sabor!\s*/gi, '').trim();
}

export default function FlavorPickerTile({
  flavor,
  selected,
  order,
  onToggle,
}: FlavorPickerTileProps) {
  const name = cleanName(flavor.name);

  return (
    <button
      type="button"
      onClick={onToggle}
      aria-pressed={selected}
      className={`group relative flex min-h-[4.5rem] w-full items-center gap-2.5 rounded-2xl px-3 py-3 text-left transition duration-200 sm:min-h-[5rem] sm:px-3.5 sm:py-3.5 ${
        selected
          ? 'bg-gradient-to-br from-brand to-brand-dark text-white shadow-[0_8px_20px_rgb(244_120_33_/_0.35)] ring-2 ring-brand'
          : 'bg-gradient-to-br from-white to-[#F6EADF] text-ink shadow-sm ring-1 ring-ink/8 hover:-translate-y-0.5 hover:shadow-md hover:ring-brand/35'
      }`}
    >
      <span
        className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-sm font-bold sm:h-10 sm:w-10 ${
          selected ? 'bg-white/20 text-white' : 'bg-brand/10 text-brand'
        }`}
        aria-hidden
      >
        {selected && order != null ? order : <i className="fa-solid fa-ice-cream text-sm" />}
      </span>

      <span className="min-w-0 flex-1">
        <span
          className={`block font-display text-base leading-snug text-balance sm:text-lg ${
            selected ? 'text-white' : 'text-ink'
          }`}
        >
          {name}
        </span>
        {flavor.new ? (
          <span
            className={`mt-1 inline-block rounded-full px-2 py-0.5 text-[10px] font-bold tracking-wide uppercase ${
              selected ? 'bg-white/20 text-white' : 'bg-brand/15 text-brand'
            }`}
          >
            Nuevo
          </span>
        ) : null}
      </span>

      <span
        className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full transition ${
          selected
            ? 'bg-white text-brand'
            : 'bg-white/80 text-ink/25 ring-1 ring-ink/10 group-hover:text-brand'
        }`}
        aria-hidden
      >
        <i className={`fa-solid ${selected ? 'fa-check' : 'fa-plus'} text-xs`} />
      </span>
    </button>
  );
}
