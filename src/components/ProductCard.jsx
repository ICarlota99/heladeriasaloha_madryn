import { useState, useEffect } from 'react';
import styles from '../styles/ProductCard.module.css';
import { useCart } from '../context/useCart';

const imageModules = import.meta.glob('../assets/products/**/*.{jpg,png,webp}');

const ProductCard = ({ product, ...props }) => {
  const [quantity, setQuantity] = useState(1);
  const [showFlavorModal, setShowFlavorModal] = useState(false);
  const [selectedFlavor, setSelectedFlavor] = useState('');
  const [imageSrc, setImageSrc] = useState('');
  const { addToCart } = useCart();

  // Load image dynamically
  useEffect(() => {
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

  const handleAddToCart = () => {
    if (product.flavors?.length > 0) {
      setShowFlavorModal(true);
    } else {
      addToCart(product, quantity);
      setQuantity(1);
    }
  };

  const confirmFlavorSelection = () => {
    addToCart({
      ...product,
      selectedFlavor: selectedFlavor || product.flavors[0]
    }, quantity);
    setShowFlavorModal(false);
    setQuantity(1);
  };

  return (
    <div {...props} className="col-md-4 mb-4">
      <div className={`card h-100 ${styles.productCard}`}>
        {/* Product Image */}
        {imageSrc && (
          <img 
            src={imageSrc} 
            alt={product.name} 
            className="card-img-top"
            style={{ height: '200px', objectFit: 'cover' }}
          />
        )}

        <div className="card-body d-flex flex-column">
          <h5 className="card-title">{product.name}</h5>
          {product.flavors && (
            <p className="text-muted small mb-2">
              {product.flavors.length} sabores disponibles
            </p>
          )}
          <p className="card-text">ARS {product.price.toLocaleString('es-AR')}</p>
          
          <div className="mt-auto">
            <div className="d-flex align-items-center mb-3">
              <button 
                className="btn btn-outline-secondary" 
                onClick={() => setQuantity(q => Math.max(1, q - 1))}
              >
                -
              </button>
              <span className="mx-3">{quantity}</span>
              <button 
                className="btn btn-outline-secondary" 
                onClick={() => setQuantity(q => q + 1)}
              >
                +
              </button>
            </div>
            
            <button
              className="btn btn-dark w-100"
              onClick={handleAddToCart}
              disabled={!product.in_stock}
            >
              {product.in_stock ? 'Añadir al carrito' : 'Agotado'}
            </button>
          </div>
        </div>
      </div>

      {/* Flavor Selection Offcanvas */}
      <div 
        className={`offcanvas offcanvas-bottom ${showFlavorModal ? 'show' : ''}`} 
        tabIndex="-1"
        style={{ 
          visibility: showFlavorModal ? 'visible' : 'hidden',
          height: 'auto'
        }}
      >
        <div className="offcanvas-header">
          <h5 className="offcanvas-title">Seleccionar sabor</h5>
          <button 
            type="button" 
            className="btn-close" 
            onClick={() => setShowFlavorModal(false)}
          ></button>
        </div>
        <div className="offcanvas-body">
          <div className="list-group">
            {product.flavors?.map((flavor, index) => (
              <button
                key={index}
                type="button"
                className={`list-group-item list-group-item-action ${selectedFlavor === flavor ? 'active' : ''}`}
                onClick={() => setSelectedFlavor(flavor)}
              >
                {flavor}
              </button>
            ))}
          </div>
          
          <div className="d-flex justify-content-between mt-3">
            <div className="d-flex align-items-center">
              <button 
                className="btn btn-outline-secondary" 
                onClick={() => setQuantity(q => Math.max(1, q - 1))}
              >
                -
              </button>
              <span className="mx-3">{quantity}</span>
              <button 
                className="btn btn-outline-secondary" 
                onClick={() => setQuantity(q => q + 1)}
              >
                +
              </button>
            </div>
            <button 
              className="btn btn-primary"
              onClick={confirmFlavorSelection}
            >
              Confirmar
            </button>
          </div>
        </div>
      </div>
      
      {/* Backdrop when offcanvas is open */}
      {showFlavorModal && (
        <div 
          className="offcanvas-backdrop fade show"
          onClick={() => setShowFlavorModal(false)}
        ></div>
      )}
    </div>
  );
};

export default ProductCard;