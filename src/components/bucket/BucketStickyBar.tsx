import Button from '@/components/ui/Button';
import { formatPrice } from '@/lib/formatPrice';
import type { Flavor } from '@/types';
import type { WizardStep } from '@/hooks/useBucketBuilder';

interface BucketStickyBarProps {
  step: WizardStep;
  selectedCount: number;
  maxFlavors: number;
  selectedFlavors: Flavor[];
  total: number;
  canContinue: boolean;
  onBack?: () => void;
  onContinue: () => void;
  onAddToCart: () => void;
}

export default function BucketStickyBar({
  step,
  selectedCount,
  maxFlavors,
  selectedFlavors,
  total,
  canContinue,
  onBack,
  onContinue,
  onAddToCart,
}: BucketStickyBarProps) {
  if (step === 1) return null;

  return (
    <div className="fixed inset-x-0 bottom-0 z-40 border-t border-peach/40 bg-white/95 px-3 py-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] shadow-[0_-8px_24px_rgb(42_33_24_/_0.08)] backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center gap-3">
        {onBack ? (
          <Button
            variant="secondary"
            className="hidden shrink-0 px-4 md:inline-flex"
            onClick={onBack}
          >
            Volver
          </Button>
        ) : null}

        <div className="min-w-0 flex-1">
          {step === 2 ? (
            <>
              <p className="text-xs font-semibold text-ink/55">
                {selectedCount}/{maxFlavors} sabores
              </p>
              <p className="truncate text-sm font-bold text-ink">
                {selectedFlavors.length > 0
                  ? selectedFlavors
                      .map((f) => f.name.replace(/\s*¡Nuevo Sabor!\s*/gi, '').trim())
                      .join(' · ')
                  : 'Sumá al menos un sabor'}
              </p>
            </>
          ) : (
            <>
              <p className="text-xs font-semibold text-ink/55">Total</p>
              <p className="font-bold text-brand">ARS {formatPrice(total)}</p>
            </>
          )}
        </div>

        {step === 2 ? (
          <Button className="shrink-0 px-5 sm:px-8" disabled={!canContinue} onClick={onContinue}>
            Continuar
          </Button>
        ) : (
          <Button className="shrink-0 px-5 sm:px-8" onClick={onAddToCart}>
            <i className="fa-solid fa-cart-shopping sm:mr-2" aria-hidden />
            <span className="hidden sm:inline">Agregar al carrito</span>
            <span className="sm:hidden">Agregar</span>
          </Button>
        )}
      </div>
    </div>
  );
}
