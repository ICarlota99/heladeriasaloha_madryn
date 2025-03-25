import { useState } from 'react';
import styles from '../styles/ProductCard.module.css';
import { useCart } from '../components/CartContext';

const ProductCard = ({ product, ...props }) => {
  const [quantity, setQuantity] = useState(1);
  const [visibleDescriptions, setVisibleDescriptions] = useState(false);
  const { addToCart } = useCart();


  // Ensure product is defined and has the required properties
  if (!product) {
    console.error('Product is undefined or null');
    return <div>No product data available.</div>;
  }

  const { id, image, name, description, price } = product;

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
    setQuantity(1); // Reset quantity after adding to cart
  };

  const toggleDescription = (id) => {
    setVisibleDescriptions((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  return (
    <div {...props}>
      <div className={`card my-3 ${styles.productCard}`}>
        <div
          // onClick={toggleDescription}
          onClick={() => toggleDescription(id)}
          style={{ cursor: 'pointer' }}
        >
          <div className={styles.imageContainer}>
            <img
              src={image}
              alt={name}
              className={`card-img-top ${styles.productImage}`}
            />
            {/* Info Icon */}
            <i className={`fa-solid fa-info-circle fa-2x ${styles.infoIcon}`}></i>

            {(visibleDescriptions[id] || styles.overlayHover) && (
              <div
                className={`${styles.overlay} ${
                  visibleDescriptions[id] ? styles.overlayVisible : ''
                }`}
              >
                <p className={styles.description}>{description}</p>
              </div>
            )}
          </div>
          <div className="card-body pt-3">
            <h5 className="card-title">{name}</h5>
            <p className="card-text">Precio: ARS {price}</p>
          </div>
        </div>
        <div className='pb-3'>
          <button onClick={handleDecrement} className={styles.quantityButton} aria-label="Decrease quantity">
            -
          </button>
          <input
            type="number"
            value={quantity}
            readOnly
            className={styles.quantityInput}
            aria-label="Quantity"
          />
          <button onClick={handleIncrement} className={styles.quantityButton} aria-label="Increase quantity">
            +
          </button>
          <button
            className='btn btn-dark hvr-grow-shadow mx-2'
            onClick={handleAddToCart}
          >
            Añadir <i className="fa-solid fa-cart-shopping"></i>
          </button>
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
  },
  onAddToCart: () => {},
};

export default ProductCard;