import { useState } from 'react';
import { useCart } from '../context/useCart';
import Button from './ui/Button';

const imageModules = import.meta.glob('../assets/products/**/*.{jpg,png,webp}');

const ProductCard = ({ product, className, ...props }) => {
  const [quantity, setQuantity] = useState(1);
  const [visibleDescriptions, setVisibleDescriptions] = useState(false);
  const { addToCart } = useCart();
  const [imageSrc, setImageSrc] = useState('');

  useState(() => {
    if (product?.image) {
      const loadImage = async () => {
        try {
          const cleanPath = product.image.replace(/^\.+\//, '');
          const imagePath = `../assets/${cleanPath}`;
          const module = await imageModules[imagePath]();
          setImageSrc(module.default);
        } catch (err) {
          console.error('Error loading image:', err);
          setImageSrc('');
        }
      };
      loadImage();
    }
  }, [product?.image]);

  if (!product) {
    console.error('Product is undefined or null');
    return <div>No product data available.</div>;
  }

  const { id, name, description, price } = product;

  const handleIncrement = () => {
    setQuantity((prev) => prev + 1);
  };

  const handleDecrement = () => {
    if (quantity > 1) {
      setQuantity((prev) => prev - 1);
    }
  };

  const handleAddToCart = () => {
    addToCart(product, quantity);
    setQuantity(1);
  };

  const toggleDescription = (productId) => {
    setVisibleDescriptions((prev) => ({
      ...prev,
      [productId]: !prev[productId],
    }));
  };

  const descriptionVisible = Boolean(visibleDescriptions[id]);

  return (
    <div className={`h-full ${className ?? ''}`} {...props}>
      <article className="group flex h-full flex-col overflow-hidden rounded-3xl bg-white shadow-md transition duration-300 hover:scale-[1.03] hover:shadow-xl">
        <div className="flex flex-1 cursor-pointer flex-col" onClick={() => toggleDescription(id)}>
          <div className="relative aspect-square w-full shrink-0 overflow-hidden bg-white">
            {imageSrc && (
              <img
                src={imageSrc}
                alt={name}
                className="h-full w-full object-contain"
                loading="lazy"
              />
            )}
            <i className="fa-solid fa-circle-info absolute right-3 top-3 text-2xl text-white drop-shadow-[0_0_2px_#F48D68]"></i>
            <div
              className={`absolute inset-x-0 bottom-0 bg-white/85 p-3 text-ink transition duration-300 ${
                descriptionVisible ? 'translate-y-0' : 'translate-y-full group-hover:translate-y-0'
              }`}
            >
              <p className="text-center text-sm font-semibold leading-snug">{description}</p>
            </div>
          </div>
          <div className="flex flex-1 flex-col px-4 pb-2 pt-4 text-center">
            <h3 className="text-lg font-bold">{name}</h3>
            <p className="mt-auto pt-3 font-semibold text-brand">Precio: ARS {price}</p>
          </div>
        </div>
        <div className="flex flex-wrap items-center justify-center gap-2 px-4 pb-5">
          <button
            onClick={handleDecrement}
            className="h-9 w-9 rounded-full bg-ink text-lg text-white"
            aria-label="Decrease quantity"
            type="button"
          >
            -
          </button>
          <input
            type="number"
            value={quantity}
            readOnly
            className="w-12 rounded-xl border border-peach bg-cream/40 py-1 text-center"
            aria-label="Quantity"
          />
          <button
            onClick={handleIncrement}
            className="h-9 w-9 rounded-full bg-ink text-lg text-white"
            aria-label="Increase quantity"
            type="button"
          >
            +
          </button>
          <Button className="px-4 py-2 text-sm" onClick={handleAddToCart}>
            Añadir <i className="fa-solid fa-cart-shopping"></i>
          </Button>
        </div>
      </article>
    </div>
  );
};

ProductCard.defaultProps = {
  product: {
    image: '',
    name: 'Product Name',
    description: 'Product Description',
    price: 0,
  },
  onAddToCart: () => {},
};

export default ProductCard;
