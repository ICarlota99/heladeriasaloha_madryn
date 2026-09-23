import { useState } from 'react';

const imageModules = import.meta.glob('../assets/flavors/*.{jpg,png,webp}');

const SimpleProductCard = ({ product, className = '', ...props }) => {
  const [visibleDescriptions, setVisibleDescriptions] = useState(false);
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

  const { id, name, description } = product;

  const toggleDescription = (productId) => {
    setVisibleDescriptions((prev) => ({
      ...prev,
      [productId]: !prev[productId],
    }));
  };

  const descriptionVisible = Boolean(visibleDescriptions[id]);

  return (
    <article
      className={`group flex h-full flex-col overflow-hidden rounded-3xl bg-white text-left shadow-md transition duration-300 hover:-translate-y-1 hover:shadow-xl ${className}`}
      {...props}
    >
      <div className="cursor-pointer" onClick={() => toggleDescription(id)}>
        <div className="relative aspect-square overflow-hidden bg-peach-light">
          {imageSrc && (
            <img
              src={imageSrc}
              alt={name}
              className="h-full w-full object-cover"
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
        <h3 className="px-4 py-4 text-center text-lg font-bold text-ink">{name}</h3>
      </div>
    </article>
  );
};

export default SimpleProductCard;
