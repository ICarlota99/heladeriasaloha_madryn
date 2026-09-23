import { useState, useEffect } from 'react';
import { useCart } from '../context/CartContext';
import Button from '../components/ui/Button';

const formatPrice = (price) =>
  Number(price).toLocaleString('es-AR', {
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  });

function Stepper({ value, onDecrement, onIncrement, decrementDisabled }) {
  return (
    <div className="flex items-center gap-3">
      <button
        type="button"
        className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-brand text-lg font-bold text-brand disabled:opacity-40"
        onClick={onDecrement}
        disabled={decrementDisabled}
        aria-label="Restar"
      >
        -
      </button>
      <span className="min-w-8 text-center text-2xl font-bold">{value}</span>
      <button
        type="button"
        className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-brand text-lg font-bold text-brand"
        onClick={onIncrement}
        aria-label="Sumar"
      >
        +
      </button>
    </div>
  );
}

const Sabores = () => {
  const [selectedSize, setSelectedSize] = useState(null);
  const [selectedFlavors, setSelectedFlavors] = useState([]);
  const [quantity, setQuantity] = useState(1);
  const [coneQuantity, setConeQuantity] = useState(0);
  const [activeCategory, setActiveCategory] = useState(null);
  const [saboresData, setSaboresData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { addToCart } = useCart();

  useEffect(() => {
    fetch('/data/sabores.json')
      .then(response => {
        if (!response.ok) throw new Error('Failed to load flavors data');
        return response.json();
      })
      .then(data => {
        setSaboresData(data);
        setLoading(false);
      })
      .catch(err => {
        console.error('Error loading flavors:', err);
        setError(err.message);
        setLoading(false);
      });
  }, []);

  const bucketSizes = [
    {
      size: '1kg',
      label: 'Balde 1kg',
      maxFlavors: 4,
      price: 22500,
      image: '/assets/baldes/1kg.jpg'
    },
    {
      size: '3/4kg',
      label: 'Balde 3/4kg',
      maxFlavors: 4,
      price: 18000,
      image: '/assets/baldes/3/4kg.jpg'
    },
    {
      size: '1/2kg',
      label: 'Balde 1/2kg',
      maxFlavors: 3,
      price: 12500,
      image: '/assets/baldes/0.5kg.jpg'
    },
    {
      size: '1/4kg',
      label: 'Balde 1/4kg',
      maxFlavors: 2,
      price: 6800,
      image: '/assets/baldes/0.25kg.jpg'
    },
  ];

  const handleFlavorSelect = (flavorId) => {
    if (selectedFlavors.includes(flavorId)) {
      setSelectedFlavors(selectedFlavors.filter(id => id !== flavorId));
    } else if (selectedFlavors.length < bucketSizes.find(s => s.size === selectedSize)?.maxFlavors) {
      setSelectedFlavors([...selectedFlavors, flavorId]);
    }
  };

  const handleAddToCart = () => {
    if (!selectedSize || selectedFlavors.length === 0) return;

    const sizeInfo = bucketSizes.find(s => s.size === selectedSize);

    const selectedFlavorsInfo = [];
    saboresData.forEach(category => {
      category.flavors?.forEach(flavor => {
        if (selectedFlavors.includes(flavor.id)) {
          selectedFlavorsInfo.push(flavor);
        }
      });
    });

    const product = {
      id: `balde-${selectedSize}-${Date.now()}`,
      name: `Balde ${selectedSize} (${selectedFlavorsInfo.map(f => f.name).join(', ')})`,
      price: sizeInfo.price,
      quantity: quantity,
      image: sizeInfo.image,
      flavors: selectedFlavorsInfo,
      size: selectedSize
    };

    addToCart(product, quantity);

    if (coneQuantity > 0) {
      const coneProduct = {
        id: `cono-vacio-${Date.now()}`,
        name: `Cono vacío (para llevar)`,
        price: coneOptions.price,
        quantity: coneQuantity,
        image: '/assets/baldes/cono.jpg',
        type: 'cono-vacio'
      };
      addToCart(coneProduct, coneQuantity);
    }

    setSelectedSize(null);
    setSelectedFlavors([]);
    setQuantity(1);
    setConeQuantity(0);
    setActiveCategory(null);
  };

  const coneOptions = {
    price: 500,
    label: 'Conos vacíos'
  };

  const calculateTotal = () => {
    if (!selectedSize) return 0;
    const sizeInfo = bucketSizes.find(s => s.size === selectedSize);
    return (sizeInfo.price * quantity) + (coneOptions.price * coneQuantity);
  };

  if (loading) return <div className="py-24 text-center text-lg">Cargando sabores...</div>;
  if (error) return <div className="py-24 text-center text-lg text-red-600">Error: {error}</div>;

  const currentSize = bucketSizes.find(s => s.size === selectedSize);

  return (
    <div id="buckets" className="mx-auto max-w-6xl px-4 py-12">
      <div className="mb-10 text-center">
        <h1 className="font-display text-5xl text-ink">Armá tu balde de helado</h1>
        <p className="mt-3 text-ink/80">Elegí el tamaño, combiná sabores y llevátelo a casa.</p>
      </div>

      <section className="rounded-3xl bg-white p-6 text-center shadow-md md:p-8">
        <h2 className="text-2xl font-bold">Seleccioná el tamaño</h2>
        <div className="mt-6 flex flex-wrap justify-center gap-4">
          {bucketSizes.map((size) => {
            const active = selectedSize === size.size;
            return (
              <button
                key={size.size}
                type="button"
                className={`min-w-40 rounded-2xl border-2 px-5 py-4 text-center transition ${
                  active
                    ? 'border-brand bg-brand text-white shadow-md'
                    : 'border-peach bg-white text-ink hover:border-brand hover:bg-peach-light'
                }`}
                onClick={() => {
                  setSelectedSize(size.size);
                  setSelectedFlavors([]);
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

      {selectedSize && (
        <section className="mt-6 rounded-3xl bg-white p-6 shadow-md md:p-8">
          <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
            <h2 className="text-2xl font-bold">
              Elegí hasta {currentSize.maxFlavors} sabores
              {selectedFlavors.length > 0 && (
                <span className="ml-2 rounded-full bg-brand px-3 py-1 text-sm font-bold text-white">
                  {selectedFlavors.length} seleccionados
                </span>
              )}
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
              .filter(category => !activeCategory || category.category === activeCategory)
              .map(category => (
                category.flavors?.map(flavor => {
                  const selected = selectedFlavors.includes(flavor.id);
                  return (
                    <button
                      key={flavor.id}
                      type="button"
                      className={`flex h-full min-h-28 flex-col items-center justify-center rounded-2xl border-2 p-4 text-center shadow-sm transition hover:-translate-y-1 hover:shadow-md ${
                        selected
                          ? 'border-brand bg-peach-light'
                          : 'border-transparent bg-cream/50'
                      }`}
                      onClick={() => handleFlavorSelect(flavor.id)}
                    >
                      <span className="font-bold text-ink">{flavor.name}</span>
                      {flavor.new && (
                        <span className="mt-2 rounded-full bg-brand px-2 py-0.5 text-xs font-bold text-white">
                          Nuevo
                        </span>
                      )}
                      {selected && (
                        <span className="mt-2 text-sm font-semibold text-brand">
                          <i className="fa-solid fa-circle-check"></i> Seleccionado
                        </span>
                      )}
                    </button>
                  );
                })
              ))}
          </div>
        </section>
      )}

      {selectedSize && (
        <section className="mt-6 rounded-3xl bg-white p-6 shadow-md md:p-8">
          <h2 className="text-2xl font-bold">¿Querés agregar conos vacíos para llevar?</h2>
          <div className="mt-4 flex flex-wrap items-center justify-between gap-4">
            <p>
              <span className="font-bold">{coneOptions.label}</span>{' '}
              <span className="text-ink/60">(ARS {formatPrice(coneOptions.price)} c/u)</span>
            </p>
            <Stepper
              value={coneQuantity}
              decrementDisabled={coneQuantity === 0}
              onDecrement={() => setConeQuantity(Math.max(0, coneQuantity - 1))}
              onIncrement={() => setConeQuantity(coneQuantity + 1)}
            />
          </div>
        </section>
      )}

      {selectedSize && selectedFlavors.length > 0 && (
        <section className="sticky bottom-4 z-30 mt-6 rounded-3xl bg-white p-6 shadow-xl md:p-8">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <h2 className="text-xl font-bold">Cantidad de baldes</h2>
            <Stepper
              value={quantity}
              decrementDisabled={quantity === 1}
              onDecrement={() => setQuantity(Math.max(1, quantity - 1))}
              onIncrement={() => setQuantity(quantity + 1)}
            />
          </div>
          <div className="mt-6 flex flex-wrap items-center justify-between gap-4 border-t border-peach/60 pt-6">
            <div>
              <p className="text-sm font-semibold uppercase tracking-wide text-ink/60">Total</p>
              <p className="font-display text-4xl text-brand">ARS {formatPrice(calculateTotal())}</p>
            </div>
            <Button onClick={handleAddToCart}>
              <i className="fa-solid fa-cart-shopping"></i>
              Agregar al carrito
            </Button>
          </div>
        </section>
      )}
    </div>
  );
};

export default Sabores;
