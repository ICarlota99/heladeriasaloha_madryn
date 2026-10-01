import type { Flavor } from '@/types';

interface SelectedFlavorsTrayProps {
  flavors: Flavor[];
  maxFlavors: number;
  onRemove: (flavorId: string) => void;
}

export default function SelectedFlavorsTray({
  flavors,
  maxFlavors,
  onRemove,
}: SelectedFlavorsTrayProps) {
  return (
    <div className="rounded-2xl bg-white/90 p-3 shadow-sm ring-1 ring-brand/10 sm:p-4">
      <div className="flex items-center justify-between gap-2">
        <p className="text-sm font-bold text-ink">
          Elegí tus sabores · {flavors.length}/{maxFlavors}
        </p>
        {flavors.length > 0 && flavors.length < maxFlavors ? (
          <p className="text-xs text-ink/55">Podés completar el balde o continuar</p>
        ) : null}
      </div>

      {flavors.length === 0 ? (
        <p className="mt-2 text-sm text-ink/55">Tocá un sabor para sumarlo al balde</p>
      ) : (
        <ul className="mt-3 flex gap-2 overflow-x-auto pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {flavors.map((flavor, index) => (
            <li key={flavor.id}>
              <span className="inline-flex max-w-[11rem] items-center gap-1.5 rounded-full bg-[#F6EADF] py-1.5 pr-1.5 pl-2.5 text-xs font-semibold text-ink ring-1 ring-brand/15">
                <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-brand text-[10px] font-bold text-white">
                  {index + 1}
                </span>
                <span className="truncate">{flavor.name.replace(/\s*¡Nuevo Sabor!\s*/gi, '').trim()}</span>
                <button
                  type="button"
                  className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-ink/50 hover:bg-white hover:text-brand"
                  aria-label={`Quitar ${flavor.name}`}
                  onClick={() => onRemove(flavor.id)}
                >
                  <i className="fa-solid fa-xmark text-xs" aria-hidden />
                </button>
              </span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
