import { useCallback, useEffect, useMemo, useState } from 'react';
import { toast } from 'react-toastify';
import { useCart } from '@/hooks/useCart';
import { BUCKET_EXTRA_IMAGES } from '@/lib/bucketImages';
import { BUCKET_EXTRAS, BUCKET_SIZES, type BucketExtraId } from '@/lib/constants';
import { POPULAR_FLAVOR_IDS, type BrowseMode } from '@/lib/popularFlavors';
import type { Flavor, FlavorCategory, Product } from '@/types';

export type WizardStep = 1 | 2 | 3;

const EMPTY_EXTRA_QTY: Record<BucketExtraId, number> = {
  'cono-pasta': 0,
  'cucurucho-dulce': 0,
};

export function useBucketBuilder() {
  const [step, setStep] = useState<WizardStep>(1);
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [selectedFlavors, setSelectedFlavors] = useState<string[]>([]);
  const [quantity, setQuantity] = useState(1);
  const [extraQuantities, setExtraQuantities] =
    useState<Record<BucketExtraId, number>>(EMPTY_EXTRA_QTY);
  const [browseMode, setBrowseMode] = useState<BrowseMode>('popular');
  const [query, setQuery] = useState('');
  const [saboresData, setSaboresData] = useState<FlavorCategory[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { addToCart } = useCart();

  useEffect(() => {
    let cancelled = false;
    fetch('/data/sabores.json')
      .then((response) => {
        if (!response.ok) throw new Error('No se pudieron cargar los sabores');
        return response.json() as Promise<FlavorCategory[]>;
      })
      .then((data) => {
        if (!cancelled) {
          setSaboresData(data);
          setLoading(false);
        }
      })
      .catch((err: Error) => {
        if (!cancelled) {
          setError(err.message);
          setLoading(false);
        }
      });
    return () => {
      cancelled = true;
    };
  }, []);

  const currentSize = useMemo(
    () => BUCKET_SIZES.find((size) => size.size === selectedSize) ?? null,
    [selectedSize],
  );

  const allFlavors = useMemo(() => {
    const list: Flavor[] = [];
    saboresData.forEach((category) => {
      category.flavors.forEach((flavor) => list.push(flavor));
    });
    return list;
  }, [saboresData]);

  const flavorById = useMemo(() => {
    const map = new Map<string, Flavor>();
    allFlavors.forEach((flavor) => map.set(flavor.id, flavor));
    return map;
  }, [allFlavors]);

  const selectedFlavorDetails = useMemo(
    () =>
      selectedFlavors
        .map((id) => flavorById.get(id))
        .filter((flavor): flavor is Flavor => Boolean(flavor)),
    [flavorById, selectedFlavors],
  );

  const popularFlavors = useMemo(() => {
    const fromIds = POPULAR_FLAVOR_IDS.map((id) => flavorById.get(id)).filter(
      (flavor): flavor is Flavor => Boolean(flavor),
    );
    const popularSet = new Set<string>(POPULAR_FLAVOR_IDS);
    const news = allFlavors.filter((flavor) => flavor.new && !popularSet.has(flavor.id));
    const merged = [...fromIds];
    news.forEach((flavor) => {
      if (!merged.some((item) => item.id === flavor.id)) merged.push(flavor);
    });
    return merged.slice(0, 8);
  }, [allFlavors, flavorById]);

  const visibleFlavors = useMemo(() => {
    const normalized = query.trim().toLowerCase();
    if (normalized) {
      return allFlavors.filter((flavor) => flavor.name.toLowerCase().includes(normalized));
    }
    if (browseMode === 'popular') return popularFlavors;
    if (browseMode === 'all') return allFlavors;
    const category = saboresData.find((item) => item.category === browseMode);
    return category?.flavors ?? [];
  }, [allFlavors, browseMode, popularFlavors, query, saboresData]);

  const total = useMemo(() => {
    if (!currentSize) return 0;
    const extrasTotal = BUCKET_EXTRAS.reduce(
      (sum, extra) => sum + extra.price * (extraQuantities[extra.id] ?? 0),
      0,
    );
    return currentSize.price * quantity + extrasTotal;
  }, [currentSize, extraQuantities, quantity]);

  const setExtraQuantity = useCallback((id: BucketExtraId, value: number) => {
    setExtraQuantities((prev) => ({ ...prev, [id]: Math.max(0, value) }));
  }, []);

  const selectSize = useCallback((size: string) => {
    setSelectedSize(size);
    setSelectedFlavors([]);
    setBrowseMode('popular');
    setQuery('');
    setStep(2);
  }, []);

  const toggleFlavor = useCallback(
    (flavorId: string) => {
      if (!currentSize) return;
      setSelectedFlavors((prev) => {
        if (prev.includes(flavorId)) {
          return prev.filter((id) => id !== flavorId);
        }
        if (prev.length >= currentSize.maxFlavors) {
          toast.info(`Ya elegiste ${currentSize.maxFlavors} sabores para este balde`);
          return prev;
        }
        return [...prev, flavorId];
      });
    },
    [currentSize],
  );

  const removeFlavor = useCallback((flavorId: string) => {
    setSelectedFlavors((prev) => prev.filter((id) => id !== flavorId));
  }, []);

  const resetBuilder = useCallback(() => {
    setSelectedSize(null);
    setSelectedFlavors([]);
    setQuantity(1);
    setExtraQuantities(EMPTY_EXTRA_QTY);
    setBrowseMode('popular');
    setQuery('');
    setStep(1);
  }, []);

  const addBucketToCart = useCallback(() => {
    if (!currentSize || !selectedSize || selectedFlavorDetails.length === 0) return;

    const product: Product = {
      id: `balde-${selectedSize}-${Date.now()}`,
      name: `Balde ${selectedSize} (${selectedFlavorDetails.map((f) => f.name).join(', ')})`,
      price: currentSize.price,
      image: currentSize.image,
      flavors: selectedFlavorDetails,
      size: selectedSize,
      description: selectedFlavorDetails.map((f) => f.name).join(', '),
    };

    addToCart(product, quantity);

    const stamp = Date.now();
    BUCKET_EXTRAS.forEach((extra) => {
      const qty = extraQuantities[extra.id] ?? 0;
      if (qty <= 0) return;
      addToCart(
        {
          id: `${extra.id}-${stamp}`,
          name: extra.name,
          price: extra.price,
          image: BUCKET_EXTRA_IMAGES[extra.id],
          type: extra.id,
        },
        qty,
      );
    });

    resetBuilder();
  }, [
    addToCart,
    currentSize,
    extraQuantities,
    quantity,
    resetBuilder,
    selectedFlavorDetails,
    selectedSize,
  ]);

  return {
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
    popularFlavors,
    total,
    selectSize,
    toggleFlavor,
    removeFlavor,
    addBucketToCart,
  };
}
