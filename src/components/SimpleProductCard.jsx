import styles from '../styles/ProductCard.module.css';
import { useState } from 'react';

// Dynamic import all images from assets folder at build time
const imageModules = import.meta.glob('../assets/**/*.{jpg,png,webp}');

const SimpleProductCard = ({ product, ...props }) => {
    const [visibleDescriptions, setVisibleDescriptions] = useState(false);
    const [imageSrc, setImageSrc] = useState('');

    // Load image dynamically
    useState(() => {
    if (product?.image) {
        const loadImage = async () => {
        try {
            // Remove any leading dots/slashes from the path
            const cleanPath = product.image.replace(/^\.+\//, '');
            const imagePath = `../assets/${cleanPath}`;
            const module = await imageModules[imagePath]();
            setImageSrc(module.default);
        } catch (err) {
            console.error('Error loading image:', err);
            setImageSrc(''); // Fallback to empty or placeholder
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
                    onClick={() => toggleDescription(id)}
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
                </div>
                <div className="card-body pt-3">
                    <h5 className="card-title">{name}</h5>
                </div>
            </div>
    </div>
    );
};

export default SimpleProductCard;