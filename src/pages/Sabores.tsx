import { useEffect, useMemo, useState } from 'react';
import Button from '@/components/ui/Button';
import IceCreamLoader from '@/components/ui/IceCreamLoader';
import Stepper from '@/components/ui/Stepper';
import { useCart } from '@/hooks/useCart';
import { BUCKET_SIZES, EMPTY_CONE_PRICE } from '@/lib/constants';
import { formatPrice } from '@/lib/formatPrice';
import type { Flavor, FlavorCategory, Product } from '@/types';

type WizardStep = 1 | 2 | 3;

export default function Sabores() {
  const [step, setStep] = useState<WizardStep>(1);
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [selectedFlavors, setSelectedFlavors] = useState<string[]>([]);
  const [quantity, setQuantity] = useState(1);
  const [coneQuantity, setConeQuantity] = useState(0);
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [saboresData, setSaboresData] = useState<FlavorCategory[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { addToCart } = useCart();

  useEffect(() => {
    fetch('/data/sabores.json')
      .then((response) => {
        if (!response.ok) throw new Error('No se pudieron cargar los sabores');
        return response.json() as Promise<FlavorCategory[]>;
      })
      .then((data) => {
        setSaboresData(data);
        setLoading(false);
      })
      .catch((err: Error) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  const currentSize = BUCKET_SIZES.find((size) => size.size === selectedSize);

  const selectedFlavorDetails = useMemo(() => {
    const details: Flavor[] = [];
    saboresData.forEach((category) => {
      category.flavors.forEach((flavor) => {
        if (selectedFlavors.includes(flavor.id)) details.push(flavor);
      });
    });
    return details;
  }, [saboresData, selectedFlavors]);

  const total = useMemo(() => {
    if (!currentSize) return 0;
    return currentSize.price * quantity + EMPTY_CONE_PRICE * coneQuantity;
  }, [coneQuantity, currentSize, quantity]);

  const handleFlavorSelect = (flavorId: string) => {
    if (!currentSize) return;
    if (selectedFlavors.includes(flavorId)) {
      setSelectedFlavors(selectedFlavors.filter((id) => id !== flavorId));
      return;
    }
    if (selectedFlavors.length < currentSize.maxFlavors) {
      setSelectedFlavors([...selectedFlavors, flavorId]);
    }
  };

  const handleAddToCart = () => {
    if (!currentSize || selectedFlavors.length === 0) return;

    const product: Product = {
      id: `balde-${selectedSize}-${Date.now()}`,
      name: `Balde ${selectedSize} (${selectedFlavorDetails.map((f) => f.name).join(', ')})`,
      price: currentSize.price,
      image: currentSize.image,
      flavors: selectedFlavorDetails,
      size: selectedSize ?? undefined,
      description: selectedFlavorDetails.map((f) => f.name).join(', '),
    };

    addToCart(product, quantity);

    if (coneQuantity > 0) {
      const coneProduct: Product = {
        id: `cono-vacio-${Date.now()}`,
        name: 'Cono vacío (para llevar)',
        price: EMPTY_CONE_PRICE,
        image: '/assets/baldes/cono.jpg',
        type: 'cono-vacio',
      };
      addToCart(coneProduct, coneQuantity);
    }

    setSelectedSize(null);
    setSelectedFlavors([]);
    setQuantity(1);
    setConeQuantity(0);
    setActiveCategory(null);
    setStep(1);
  };

  if (loading) return <IceCreamLoader label="Cargando sabores..." />;
  if (error) return <div className="py-24 text-center text-lg text-red-600">Error: {error}</div>;

  return (
    <div id="buckets" className="mx-auto max-w-6xl px-4 py-12 pb-36 md:pb-12">
      <div className="mb-8 text-center">
        <h1 className="font-display text-5xl text-ink">Armá tu balde de helado</h1>
        <p className="mt-3 text-ink/80">Elegí el tamaño, combiná sabores y llevátelo a casa.</p>
      </div>

      <ol className="mb-8 flex flex-wrap justify-center gap-2">
        {[
          { id: 1 as const, label: 'Tamaño' },
          { id: 2 as const, label: 'Sabores' },
          { id: 3 as const, label: 'Extras' },
        ].map((item) => (
          <li key={item.id}>
            <button
              type="button"
              disabled={item.id === 2 && !selectedSize}
              onClick={() => {
                if (item.id === 2 && !selectedSize) return;
                if (item.id === 3 && selectedFlavors.length === 0) return;
                setStep(item.id);
              }}
              className={`rounded-full px-4 py-2 text-sm font-bold transition disabled:opacity-40 ${
                step === item.id ? 'bg-brand text-white' : 'bg-white text-ink shadow-sm'
              }`}
            >
              {item.id}. {item.label}
            </button>
          </li>
        ))}
      </ol>

      {step === 1 ? (
        <section className="rounded-3xl bg-white p-6 text-center shadow-md md:p-8">
          <h2 className="text-2xl font-bold">Seleccioná el tamaño</h2>
          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {BUCKET_SIZES.map((size) => {
              const active = selectedSize === size.size;
              return (
                <button
                  key={size.size}
                  type="button"
                  className={`rounded-2xl border-2 px-5 py-5 text-center transition ${
                    active
                      ? 'border-brand bg-brand text-white shadow-md'
                      : 'border-peach bg-white text-ink hover:border-brand hover:bg-peach-light'
                  }`}
                  onClick={() => {
                    setSelectedSize(size.size);
                    setSelectedFlavors([]);
                    setStep(2);
                  }}
                >
                  <div className="font-bold">{size.label}</div>
                  <div className="mt-1 text-sm">{size.maxFlavors} sabores</div>
                  <div className="mt-1 text-sm font-semibold">ARS {formatPrice(size.price)}</div>
                </button>
              );
            })}
          </div>
        </section>
      ) : null}

      {step === 2 && currentSize ? (
        <section className="rounded-3xl bg-white p-6 shadow-md md:p-8">
          <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
            <h2 className="text-2xl font-bold">
              Elegí hasta {currentSize.maxFlavors} sabores
              {selectedFlavors.length > 0 ? (
                <span className="ml-2 rounded-full bg-brand px-3 py-1 text-sm font-bold text-white">
                  {selectedFlavors.length} seleccionados
                </span>
              ) : null}
            </h2>
            <p className="text-ink/60">
              {selectedFlavors.length}/{currentSize.maxFlavors}
            </p>
          </div>

          <div className="mb-6 flex flex-wrap gap-2">
            <button
              type="button"
              className={`rounded-full px-4 py-2 text-sm font-bold transition ${
                activeCategory === null ? 'bg-brand text-white' : 'bg-peach-light text-ink hover:bg-peach'
              }`}
              onClick={() => setActiveCategory(null)}
            >
              Todos
            </button>
            {saboresData.map((category) => (
              <button
                key={category.category}
                type="button"
                className={`rounded-full px-4 py-2 text-sm font-bold transition ${
                  activeCategory === category.category
                    ? 'bg-brand text-white'
                    : 'bg-peach-light text-ink hover:bg-peach'
                }`}
                onClick={() => setActiveCategory(category.category)}
              >
                {category.category}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-4">
            {saboresData
              .filter((category) => !activeCategory || category.category === activeCategory)
              .flatMap((category) =>
                category.flavors.map((flavor) => {
                  const selected = selectedFlavors.includes(flavor.id);
                  return (
                    <button
                      key={flavor.id}
                      type="button"
                      className={`flex h-full min-h-28 flex-col items-center justify-center rounded-2xl border-2 p-4 text-center shadow-sm transition hover:-translate-y-1 hover:shadow-md ${
                        selected ? 'border-brand bg-peach-light' : 'border-transparent bg-cream/50'
                      }`}
                      onClick={() => handleFlavorSelect(flavor.id)}
                    >
                      <span className="font-bold text-ink">{flavor.name}</span>
                      {flavor.new ? (
                        <span className="mt-2 rounded-full bg-brand px-2 py-0.5 text-xs font-bold text-white">
                          Nuevo
                        </span>
                      ) : null}
                      {selected ? (
                        <span className="mt-2 text-sm font-semibold text-brand">
                          <i className="fa-solid fa-circle-check" aria-hidden /> Seleccionado
                        </span>
                      ) : null}
                    </button>
                  );
                }),
              )}
          </div>

          <div className="mt-8 flex flex-wrap justify-between gap-3">
            <Button variant="secondary" onClick={() => setStep(1)}>
              Volver
            </Button>
            <Button disabled={selectedFlavors.length === 0} onClick={() => setStep(3)}>
              Continuar
            </Button>
          </div>
        </section>
      ) : null}

      {step === 3 && currentSize ? (
        <section className="space-y-6">
          <div className="rounded-3xl bg-white p-6 shadow-md md:p-8">
            <h2 className="text-2xl font-bold">¿Querés agregar conos vacíos?</h2>
            <div className="mt-4 flex flex-wrap items-center justify-between gap-4">
              <p>
                <span className="font-bold">Conos vacíos</span>{' '}
                <span className="text-ink/60">(ARS {formatPrice(EMPTY_CONE_PRICE)} c/u)</span>
              </p>
              <Stepper
                value={coneQuantity}
                decrementDisabled={coneQuantity === 0}
                onDecrement={() => setConeQuantity(Math.max(0, coneQuantity - 1))}
                onIncrement={() => setConeQuantity(coneQuantity + 1)}
              />
            </div>
          </div>

          <div className="rounded-3xl bg-white p-6 shadow-md md:p-8">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <h2 className="text-xl font-bold">Cantidad de baldes</h2>
              <Stepper
                value={quantity}
                decrementDisabled={quantity === 1}
                onDecrement={() => setQuantity(Math.max(1, quantity - 1))}
                onIncrement={() => setQuantity(quantity + 1)}
              />
            </div>
            <p className="mt-4 text-sm text-ink/70">
              Sabores: {selectedFlavorDetails.map((f) => f.name).join(', ')}
            </p>
            <div className="mt-6 flex flex-wrap items-center justify-between gap-4 border-t border-peach/60 pt-6">
              <div>
                <p className="text-sm font-semibold uppercase tracking-wide text-ink/60">Total</p>
                <p className="font-display text-4xl text-brand">ARS {formatPrice(total)}</p>
              </div>
              <div className="flex flex-wrap gap-3">
                <Button variant="secondary" onClick={() => setStep(2)}>
                  Volver
                </Button>
                <Button onClick={handleAddToCart}>
                  <i className="fa-solid fa-cart-shopping" aria-hidden />
                  Agregar al carrito
                </Button>
              </div>
            </div>
          </div>
        </section>
      ) : null}

      {selectedSize && selectedFlavors.length > 0 ? (
        <div className="fixed inset-x-0 bottom-0 z-30 border-t border-peach/50 bg-white/95 px-4 py-3 shadow-lg backdrop-blur md:hidden">
          <div className="mx-auto flex max-w-6xl items-center justify-between gap-3">
            <div>
              <p className="text-xs uppercase tracking-wide text-ink/60">Total</p>
              <p className="font-bold text-brand">ARS {formatPrice(total)}</p>
            </div>
            {step < 3 ? (
              <Button onClick={() => setStep(3)}>Continuar</Button>
            ) : (
              <Button onClick={handleAddToCart}>Agregar</Button>
            )}
          </div>
        </div>
      ) : null}
    </div>
  );
}
