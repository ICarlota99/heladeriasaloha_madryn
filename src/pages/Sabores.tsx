import { useCallback } from 'react';
import BucketStickyBar from '@/components/bucket/BucketStickyBar';
import FlavorPickerTile from '@/components/bucket/FlavorPickerTile';
import SelectedFlavorsTray from '@/components/bucket/SelectedFlavorsTray';
import Button from '@/components/ui/Button';
import IceCreamLoader from '@/components/ui/IceCreamLoader';
import Stepper from '@/components/ui/Stepper';
import { useBucketBuilder, type WizardStep } from '@/hooks/useBucketBuilder';
import { BUCKET_EXTRA_IMAGES, BUCKET_SIZE_IMAGES } from '@/lib/bucketImages';
import { BUCKET_EXTRAS, BUCKET_SIZES } from '@/lib/constants';
import { formatPrice } from '@/lib/formatPrice';

const STEPS = [
  { id: 1 as const, label: 'Tamaño' },
  { id: 2 as const, label: 'Sabores' },
  { id: 3 as const, label: 'Extras' },
];

export default function Sabores() {
  const {
    step,
    setStep,
    selectedSize,
    currentSize,
    selectedFlavors,
    selectedFlavorDetails,
    quantity,
    setQuantity,
    extraQuantities,
    setExtraQuantity,
    browseMode,
    setBrowseMode,
    query,
    setQuery,
    saboresData,
    loading,
    error,
    visibleFlavors,
    total,
    selectSize,
    toggleFlavor,
    removeFlavor,
    addBucketToCart,
  } = useBucketBuilder();

  const goToStep = useCallback(
    (next: WizardStep) => {
      setStep(next);
      window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
    },
    [setStep],
  );

  if (loading) return <IceCreamLoader label="Cargando sabores..." />;
  if (error) {
    return <div className="py-24 text-center text-lg text-red-600">Error: {error}</div>;
  }

  const isSearching = query.trim().length > 0;
  const stickyVisible = Boolean(currentSize) && step !== 1;

  return (
    <div id="buckets" className="relative overflow-hidden bg-cream-soft">
      <div
        className="pointer-events-none absolute -left-20 top-0 h-52 w-52 rounded-[45%] bg-brand/12"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute -right-16 bottom-40 h-56 w-56 rounded-[48%] bg-coral/12"
        aria-hidden
      />

      <div
        className={`relative mx-auto max-w-6xl px-4 py-10 sm:px-6 sm:py-14 ${
          stickyVisible ? 'pb-32' : 'pb-16'
        }`}
      >
        <header className="mx-auto max-w-2xl text-center">
          <p className="text-xs font-bold tracking-[0.22em] text-brand uppercase">Armá tu balde</p>
          <h1 className="mt-2 font-display text-4xl leading-tight text-ink sm:text-5xl">
            Combiná tus sabores favoritos
          </h1>
          <p className="mt-3 text-ink/75">Elegí el tamaño, sumá sabores y llevátelo a casa.</p>
        </header>

        <ol className="mt-8 flex flex-wrap justify-center gap-2">
          {STEPS.map((item) => (
            <li key={item.id}>
              <button
                type="button"
                disabled={
                  (item.id === 2 && !selectedSize) || (item.id === 3 && selectedFlavors.length === 0)
                }
                onClick={() => goToStep(item.id)}
                className={`rounded-full px-4 py-2 text-sm font-bold transition disabled:opacity-40 ${
                  step === item.id ? 'bg-brand text-white' : 'bg-white text-ink shadow-sm ring-1 ring-ink/5'
                }`}
              >
                {item.id}. {item.label}
              </button>
            </li>
          ))}
        </ol>

        {step === 1 ? (
          <section className="mt-8 rounded-[1.75rem] bg-white/90 px-4 py-3 shadow-sm ring-1 ring-brand/10 sm:px-6 sm:py-4">
            <h2 className="text-center text-lg font-bold text-ink sm:text-xl">Seleccioná el tamaño</h2>
            <div className="mt-3 grid grid-cols-2 gap-2.5 sm:mt-4 sm:gap-3 lg:grid-cols-4">
              {BUCKET_SIZES.map((size) => {
                const active = selectedSize === size.size;
                const image = BUCKET_SIZE_IMAGES[size.size];
                return (
                  <button
                    key={size.size}
                    type="button"
                    className={`overflow-hidden rounded-2xl border-2 text-left transition ${
                      active
                        ? 'border-brand bg-[#F6EADF] shadow-md'
                        : 'border-transparent bg-cream-soft ring-1 ring-ink/8 hover:border-brand/50'
                    }`}
                    onClick={() => selectSize(size.size)}
                  >
                    <div className="aspect-[5/3] bg-white/60 p-2 sm:p-2.5">
                      {image ? (
                        <img
                          src={image}
                          alt=""
                          className="h-full w-full object-contain"
                          loading="lazy"
                        />
                      ) : null}
                    </div>
                    <div className="px-2.5 py-2 text-center sm:px-3">
                      <p className="text-sm font-bold text-ink sm:text-base">{size.label}</p>
                      <p className="mt-0.5 text-xs text-ink/60">Hasta {size.maxFlavors} sabores</p>
                      <p className="mt-0.5 text-sm font-bold text-brand">ARS {formatPrice(size.price)}</p>
                    </div>
                  </button>
                );
              })}
            </div>
          </section>
        ) : null}

        {step === 2 && currentSize ? (
          <section className="mt-6 space-y-4 sm:mt-8">
            <SelectedFlavorsTray
              flavors={selectedFlavorDetails}
              maxFlavors={currentSize.maxFlavors}
              onRemove={removeFlavor}
            />

            <label className="relative mx-auto block max-w-md">
              <span className="sr-only">Buscar sabor</span>
              <i
                className="fa-solid fa-magnifying-glass pointer-events-none absolute top-1/2 left-3 -translate-y-1/2 text-xs text-ink/35"
                aria-hidden
              />
              <input
                type="search"
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Buscar sabor..."
                className="min-h-9 w-full rounded-full border border-ink/10 bg-white/60 py-2 pr-3 pl-9 text-sm text-ink/80 outline-none transition placeholder:text-ink/35 focus:border-brand/40 focus:bg-white focus:ring-1 focus:ring-brand/20"
              />
            </label>

            {!isSearching ? (
              <div
                className="-mx-4 sticky top-(--header-offset) z-20 flex gap-2 overflow-x-auto bg-cream-soft/95 px-4 py-2 backdrop-blur [scrollbar-width:none] sm:mx-0 sm:static sm:flex-wrap sm:bg-transparent sm:px-0 sm:backdrop-blur-none [&::-webkit-scrollbar]:hidden"
                role="tablist"
                aria-label="Categorías de sabores"
              >
                <button
                  type="button"
                  role="tab"
                  aria-selected={browseMode === 'popular'}
                  className={`shrink-0 rounded-full px-3.5 py-2 text-sm font-bold transition ${
                    browseMode === 'popular'
                      ? 'bg-brand text-white'
                      : 'bg-white text-ink ring-1 ring-ink/10'
                  }`}
                  onClick={() => setBrowseMode('popular')}
                >
                  Más pedidos
                </button>
                <button
                  type="button"
                  role="tab"
                  aria-selected={browseMode === 'all'}
                  className={`shrink-0 rounded-full px-3.5 py-2 text-sm font-bold transition ${
                    browseMode === 'all'
                      ? 'bg-brand text-white'
                      : 'bg-white text-ink ring-1 ring-ink/10'
                  }`}
                  onClick={() => setBrowseMode('all')}
                >
                  Todos
                </button>
                {saboresData.map((category) => (
                  <button
                    key={category.category}
                    type="button"
                    role="tab"
                    aria-selected={browseMode === category.category}
                    className={`shrink-0 rounded-full px-3.5 py-2 text-sm font-bold transition ${
                      browseMode === category.category
                        ? 'bg-brand text-white'
                        : 'bg-white text-ink ring-1 ring-ink/10'
                    }`}
                    onClick={() => setBrowseMode(category.category)}
                  >
                    {category.category}
                  </button>
                ))}
              </div>
            ) : (
              <p className="text-center text-sm text-ink/60">
                Resultados para “{query.trim()}”
              </p>
            )}

            {visibleFlavors.length > 0 ? (
              <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 sm:gap-2.5 lg:grid-cols-3">
                {visibleFlavors.map((flavor) => {
                  const orderIndex = selectedFlavors.indexOf(flavor.id);
                  return (
                    <FlavorPickerTile
                      key={flavor.id}
                      flavor={flavor}
                      selected={orderIndex >= 0}
                      order={orderIndex >= 0 ? orderIndex + 1 : undefined}
                      onToggle={() => toggleFlavor(flavor.id)}
                    />
                  );
                })}
              </div>
            ) : (
              <div className="rounded-2xl bg-white/80 px-4 py-10 text-center ring-1 ring-ink/5">
                <p className="font-semibold text-ink">No encontramos ese sabor</p>
                <p className="mt-1 text-sm text-ink/60">Probá con otro nombre o explorá por categoría.</p>
                <Button variant="secondary" className="mt-4" onClick={() => setQuery('')}>
                  Limpiar búsqueda
                </Button>
              </div>
            )}

          </section>
        ) : null}

        {step === 3 && currentSize ? (
          <section className="mt-8 space-y-4">
            <div className="rounded-[1.75rem] bg-white/90 p-5 shadow-sm ring-1 ring-brand/10 sm:p-8">
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <h2 className="font-display text-3xl text-ink">Tu balde</h2>
                  <p className="mt-1 text-sm text-ink/65">
                    {currentSize.label} · hasta {currentSize.maxFlavors} sabores
                  </p>
                </div>
                <Button variant="secondary" className="text-sm" onClick={() => goToStep(2)}>
                  Editar sabores
                </Button>
              </div>
              <ol className="mt-5 space-y-2">
                {selectedFlavorDetails.map((flavor, index) => (
                  <li
                    key={flavor.id}
                    className="flex items-center gap-3 rounded-2xl bg-[#F6EADF] px-3 py-2.5"
                  >
                    <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-brand text-xs font-bold text-white">
                      {index + 1}
                    </span>
                    <span className="font-semibold text-ink">
                      {flavor.name.replace(/\s*¡Nuevo Sabor!\s*/gi, '').trim()}
                    </span>
                  </li>
                ))}
              </ol>
            </div>

            <div className="rounded-[1.75rem] bg-white/90 p-5 shadow-sm ring-1 ring-brand/10 sm:p-8">
              <h2 className="text-xl font-bold text-ink">¿Querés agregar extras?</h2>
              <p className="mt-1 text-sm text-ink/65">Opcional · sumá conos para acompañar tu balde</p>
              <ul className="mt-5 grid gap-3 sm:grid-cols-2">
                {BUCKET_EXTRAS.map((extra) => {
                  const qty = extraQuantities[extra.id];
                  return (
                    <li
                      key={extra.id}
                      className="flex flex-col gap-3 rounded-2xl bg-[#F6EADF]/70 p-3 ring-1 ring-ink/5 sm:p-4"
                    >
                      <div className="flex items-center gap-3">
                        <div className="flex h-20 w-20 shrink-0 items-center justify-center overflow-hidden rounded-xl bg-white sm:h-24 sm:w-24">
                          <img
                            src={BUCKET_EXTRA_IMAGES[extra.id]}
                            alt={extra.name}
                            className="h-full w-full object-contain p-1.5"
                            loading="lazy"
                          />
                        </div>
                        <div className="min-w-0 flex-1">
                          <p className="font-bold text-ink">{extra.name}</p>
                          <p className="mt-0.5 text-sm font-semibold text-brand">
                            ARS {formatPrice(extra.price)} c/u
                          </p>
                        </div>
                      </div>
                      <div className="flex justify-end">
                        <Stepper
                          value={qty}
                          decrementDisabled={qty === 0}
                          onDecrement={() => setExtraQuantity(extra.id, qty - 1)}
                          onIncrement={() => setExtraQuantity(extra.id, qty + 1)}
                        />
                      </div>
                    </li>
                  );
                })}
              </ul>
            </div>

            <div className="rounded-[1.75rem] bg-white/90 p-5 shadow-sm ring-1 ring-brand/10 sm:p-8">
              <div className="flex flex-wrap items-center justify-between gap-4">
                <h2 className="text-xl font-bold text-ink">Cantidad de baldes</h2>
                <Stepper
                  value={quantity}
                  decrementDisabled={quantity === 1}
                  onDecrement={() => setQuantity(Math.max(1, quantity - 1))}
                  onIncrement={() => setQuantity(quantity + 1)}
                />
              </div>
              <div className="mt-6 border-t border-peach/50 pt-6">
                <p className="text-sm font-semibold tracking-wide text-ink/60 uppercase">Total</p>
                <p className="font-display text-4xl text-brand">ARS {formatPrice(total)}</p>
              </div>
            </div>
          </section>
        ) : null}
      </div>

      {currentSize ? (
        <BucketStickyBar
          step={step}
          selectedCount={selectedFlavors.length}
          maxFlavors={currentSize.maxFlavors}
          selectedFlavors={selectedFlavorDetails}
          total={total}
          canContinue={selectedFlavors.length >= 1}
          onBack={() => goToStep(step === 3 ? 2 : 1)}
          onContinue={() => goToStep(3)}
          onAddToCart={addBucketToCart}
        />
      ) : null}
    </div>
  );
}
