import { useState, useEffect } from 'react';
import styles from '../styles/ProductCard.module.css';
import { useCart } from '../context/useCart';

const imageModules = import.meta.glob('../assets/products/**/*.{jpg,png,webp}');

const ProductCard = ({ product, ...props }) => {
  const [quantity, setQuantity] = useState(1);
  const [visibleDescriptions, setVisibleDescriptions] = useState(false);
  const { addToCart } = useCart();
  const [imageSrc, setImageSrc] = useState('');
  const [showFlavorModal, setShowFlavorModal] = useState(false);
  const [selectedFlavor, setSelectedFlavor] = useState('');

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

  useEffect(() => {
    // Set default flavor when modal opens
    if (showFlavorModal && product.flavors?.length > 0) {
      setSelectedFlavor(product.flavors[0]);
    }
  }, [showFlavorModal, product.flavors]);

  const handleAddToCart = () => {
    if (product.flavors && product.flavors.length > 1) {
      setShowFlavorModal(true);
    } else {
      // If only one flavor or no flavors, add directly to cart
      addToCart({ 
        ...product,
        selectedFlavor: product.flavors?.[0] || null
      }, quantity);
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

  if (!product || !product.in_stock) {
    return null; // Don't render out-of-stock products
  }

  const { id, name, description, price, flavors } = product;

  return (
    <div {...props} className="col-md-4 mb-4">
      <div className={`card h-100 ${styles.productCard}`}>
        {/* Product Image and Info */}
        <div 
          onClick={() => setVisibleDescriptions(!visibleDescriptions)} 
          style={{ cursor: 'pointer' }}
          className="h-100 d-flex flex-column"
        >
          <div className={styles.imageContainer}>
            {imageSrc && (
              <img
                src={imageSrc}
                alt={name}
                className={`card-img-top ${styles.productImage}`}
              />
            )}
            <i className={`fa-solid fa-info-circle fa-2x ${styles.infoIcon}`}></i>
            
            {visibleDescriptions && (
              <div className={`${styles.overlay} ${visibleDescriptions ? styles.overlayVisible : ''}`}>
                <p className={styles.description}>{description}</p>
              </div>
            )}
          </div>
          <div className="card-body pt-3 d-flex flex-column">
            <h5 className="card-title">{name}</h5>
            <p className="card-text">ARS {price.toLocaleString('es-AR')}</p>
            {flavors?.length > 1 && (
              <p className="text-muted small mb-2">
                {flavors.length} sabores disponibles
              </p>
            )}
            
            <div className="mt-auto">
              <div className="d-flex align-items-center justify-content-center mb-3">
                <button 
                  onClick={() => setQuantity(q => Math.max(1, q - 1))} 
                  className="btn btn-outline-secondary"
                >
                  -
                </button>
                <span className="mx-3">{quantity}</span>
                <button 
                  onClick={() => setQuantity(q => q + 1)} 
                  className="btn btn-outline-secondary"
                >
                  +
                </button>
              </div>
              
              <button
                className='btn btn-dark w-100'
                onClick={handleAddToCart}
              >
                Añadir <i className="fa-solid fa-cart-shopping ms-1"></i>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Flavor Selection Modal */}
      {flavors?.length > 1 && (
        <div 
          className={`modal fade ${showFlavorModal ? 'show' : ''}`} 
          style={{ 
            display: showFlavorModal ? 'block' : 'none', 
            backgroundColor: 'rgba(0,0,0,0.5)' 
          }}
          tabIndex="-1"
        >
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Selecciona un sabor</h5>
                <button 
                  type="button" 
                  className="btn-close" 
                  onClick={() => setShowFlavorModal(false)}
                ></button>
              </div>
              <div className="modal-body">
                <div className="list-group">
                  {flavors.map((flavor, index) => (
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
                      onClick={() => setQuantity(q => Math.max(1, q - 1))} 
                      className="btn btn-outline-secondary"
                    >
                      -
                    </button>
                    <span className="mx-3">{quantity}</span>
                    <button 
                      onClick={() => setQuantity(q => q + 1)} 
                      className="btn btn-outline-secondary"
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
          </div>
        </div>
      )}
    </div>
  );
};

ProductCard.defaultProps = {
  product: {
    image: '',
    name: 'Product Name',
    description: 'Product Description',
    price: 0,
    flavors: [],
    in_stock: true
  },
};

export default ProductCard;