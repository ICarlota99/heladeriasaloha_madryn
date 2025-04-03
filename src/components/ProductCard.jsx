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
    if (product.flavors && product.flavors.length > 0) {
      setShowFlavorModal(true);
    } else {
      addToCart({ ...product }, quantity);
      setQuantity(1);
    }
  };

  const confirmFlavorSelection = () => {
    addToCart({ 
      ...product,
      selectedFlavor: selectedFlavor 
    }, quantity);
    setShowFlavorModal(false);
    setQuantity(1);
  };

  if (!product) {
    return <div>No product data available.</div>;
  }

  const { id, name, description, price, flavors } = product;

  return (
    <div {...props}>
      <div className={`card my-3 ${styles.productCard}`}>
        {/* Product Image and Info */}
        <div 
          onClick={() => setVisibleDescriptions(!visibleDescriptions)} 
          style={{ cursor: 'pointer' }}
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
          <div className="card-body pt-3">
            <h5 className="card-title">{name}</h5>
            <p className="card-text">Precio: ARS {price}</p>
            {flavors && (
              <p className="text-muted small">
                {flavors.length} {flavors.length === 1 ? 'sabor' : 'sabores'} disponible{flavors.length > 1 ? 's' : ''}
              </p>
            )}
          </div>
        </div>
        
        {/* Quantity and Add to Cart */}
        <div className='pb-3 d-flex align-items-center justify-content-center'>
          <button 
            onClick={() => setQuantity(q => Math.max(1, q - 1))} 
            className={`btn btn-outline-secondary ${styles.quantityButton}`}
          >
            -
          </button>
          <input
            type="number"
            value={quantity}
            readOnly
            className={`text-center mx-2 ${styles.quantityInput}`}
            style={{ width: '50px' }}
          />
          <button 
            onClick={() => setQuantity(q => q + 1)} 
            className={`btn btn-outline-secondary ${styles.quantityButton}`}
          >
            +
          </button>
          <button
            className='btn btn-dark ms-2 hvr-grow-shadow'
            onClick={handleAddToCart}
          >
            Añadir <i className="fa-solid fa-cart-shopping ms-1"></i>
          </button>
        </div>
      </div>

      {/* Flavor Selection Modal */}
      <div 
        className={`modal fade ${showFlavorModal ? 'show' : ''}`} 
        style={{ display: showFlavorModal ? 'block' : 'none', backgroundColor: 'rgba(0,0,0,0.5)' }}
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
                {flavors?.map((flavor, index) => (
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
              
              <div className="d-flex align-items-center justify-content-between mt-3">
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
                  disabled={!selectedFlavor}
                >
                  Confirmar
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

ProductCard.defaultProps = {
  product: {
    image: '',
    name: 'Product Name',
    description: 'Product Description',
    price: 0,
    flavors: []
  },
};

export default ProductCard;