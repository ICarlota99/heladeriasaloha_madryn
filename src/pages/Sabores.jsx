import { useState, useEffect } from 'react';
import { useCart } from '../context/CartContext';
import styles from '../styles/Sabores.module.css';

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
    // Fetch data
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

  // Bucket size options
  const bucketSizes = [
    { 
      size: '1kg', 
      label: 'Balde 1kg', 
      maxFlavors: 4, 
      price: 13000, 
      image: '/assets/baldes/1kg.jpg'
    },
    {
      size: '3/4kg',
      label: 'Balde 3/4kg',
      maxFlavors: 4,
      price: 11000,
      image: '/assets/baldes/3/4kg.jpg'
    },
    { 
      size: '1/2kg', 
      label: 'Balde 1/2kg', 
      maxFlavors: 3, 
      price: 7500, 
      image: '/assets/baldes/0.5kg.jpg' 
    },
    { 
      size: '1/4kg', 
      label: 'Balde 1/4kg', 
      maxFlavors: 2, 
      price: 5000, 
      image: '/assets/baldes/0.25kg.jpg' 
    },
  ];

  // Handle flavor selection
  const handleFlavorSelect = (flavorId) => {
    if (selectedFlavors.includes(flavorId)) {
      setSelectedFlavors(selectedFlavors.filter(id => id !== flavorId));
    } else if (selectedFlavors.length < bucketSizes.find(s => s.size === selectedSize)?.maxFlavors) {
      setSelectedFlavors([...selectedFlavors, flavorId]);
    }
  };

  // Add to cart handler
  const handleAddToCart = () => {
    if (!selectedSize || selectedFlavors.length === 0) return;

    const sizeInfo = bucketSizes.find(s => s.size === selectedSize);
    
    // Find all selected flavors from all categories
    const selectedFlavorsInfo = [];
    saboresData.forEach(category => {
      category.flavors?.forEach(flavor => {
        if (selectedFlavors.includes(flavor.id)) {
          selectedFlavorsInfo.push(flavor);
        }
      });
    });

    // Add bucket to cart
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

    // Add cones to cart if selected
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

    // Reset selection
    setSelectedSize(null);
    setSelectedFlavors([]);
    setQuantity(1);
    setConeQuantity(0);
    setActiveCategory(null);
  };

  // Cone options (empty cones to go with buckets)
  const coneOptions = {
    price: 250,
    label: 'Conos vacíos'
  };

  // Calculate total price
  const calculateTotal = () => {
    if (!selectedSize) return 0;
    const sizeInfo = bucketSizes.find(s => s.size === selectedSize);
    return (sizeInfo.price * quantity) + (coneOptions.price * coneQuantity);
  };

  if (loading) return <div className="text-center my-5">Cargando sabores...</div>;
  if (error) return <div className="text-center my-5 text-danger">Error: {error}</div>;

  return (
    <div id='buckets' className={`container my-5 ${styles.saboresContainer}`}>
      <h2 className="text-center mb-4">Armá tu balde de helado</h2>
      
      {/* Size Selection */}
      <div className={`mb-4 text-center ${styles.sizeSelection}`}>
        <h4 className="mb-3">Seleccioná el tamaño:</h4>
        <div className="d-flex flex-wrap gap-3 justify-content-center">
          {bucketSizes.map((size) => (
            <button
              key={size.size}
              className={`btn btn-lg ${selectedSize === size.size ? 'btn-dark' : 'btn-light'}`}
              onClick={() => {
                setSelectedSize(size.size);
                setSelectedFlavors([]);
              }}
            >
              <div className="fw-bold">{size.label}</div>
              <div className="small">{size.maxFlavors} sabores</div>
              <div className="small">ARS {size.price}</div>
            </button>
          ))}
        </div>
      </div>

      {/* Flavor Selection */}
      {selectedSize && (
        <div className={`mb-4 ${styles.flavorSelection}`}>
          <div className="d-flex justify-content-between align-items-center mb-3">
            <h4 className="mb-0">
              Elegí hasta {bucketSizes.find(s => s.size === selectedSize).maxFlavors} sabores:
              {selectedFlavors.length > 0 && (
                <span className="ms-2 badge dark-container">
                  {selectedFlavors.length} seleccionados
                </span>
              )}
            </h4>
            <div className="text-muted">
              {selectedFlavors.length}/{bucketSizes.find(s => s.size === selectedSize).maxFlavors}
            </div>
          </div>

          {/* Category Tabs */}
          <div className="mb-4">
            <ul className="nav nav-tabs">
              {saboresData.map((category) => (
                <li className="nav-item" key={category.category}>
                  <button
                    className={`nav-link text-dark ${activeCategory === category.category ? 'active' : ''}`}
                    onClick={() => setActiveCategory(category.category)}
                  >
                    {category.category}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Flavors Grid */}
          <div className="row row-cols-2 row-cols-md-3 row-cols-lg-4 g-3">
            {saboresData
              .filter(category => !activeCategory || category.category === activeCategory)
              .map(category => (
                category.flavors?.map(flavor => (
                  <div key={flavor.id} className="col">
                    <div
                      className={`card h-100 ${styles.flavorCard} ${
                        selectedFlavors.includes(flavor.id) ? styles.selected : ''
                      }`}
                      onClick={() => handleFlavorSelect(flavor.id)}
                    >
                      <div className="card-body text-center">
                        <h5 className="card-title">
                          {flavor.name}
                          {flavor.new && (
                            <span className="badge bg-success ms-2">Nuevo</span>
                          )}
                        </h5>
                        {selectedFlavors.includes(flavor.id) && (
                          <div className="text-primary mt-2">
                            <i className="bi bi-check-circle-fill"></i> Seleccionado
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ))
              ))}
          </div>
        </div>
      )}

      {/* Cone Selection */}
      {selectedSize && (
        <div className={`mb-4 p-3 bg-light rounded ${styles.coneSelection}`}>
          <h4 className="mb-3">¿Querés agregar conos vacíos para llevar?</h4>
          <div className="d-flex align-items-center justify-content-between">
            <div className="d-flex align-items-center">
              <span className="me-2 fw-bold">{coneOptions.label}</span>
              <span className="text-muted">(ARS {coneOptions.price} c/u)</span>
            </div>
            <div className="d-flex align-items-center">
              <button
                className="btn btn-outline-secondary"
                onClick={() => setConeQuantity(Math.max(0, coneQuantity - 1))}
                disabled={coneQuantity === 0}
              >
                -
              </button>
              <span className="mx-3 fs-5 fw-bold">{coneQuantity}</span>
              <button
                className="btn btn-outline-secondary"
                onClick={() => setConeQuantity(coneQuantity + 1)}
              >
                +
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Quantity and Add to Cart */}
      {selectedSize && selectedFlavors.length > 0 && (
        <div className={`mt-4 p-4 bg-light rounded ${styles.cartActions}`}>
          <div className="d-flex align-items-center justify-content-between mb-4">
            <h5 className="mb-0">Cantidad de baldes:</h5>
            <div className="d-flex align-items-center">
              <button
                className="btn btn-outline-secondary"
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                disabled={quantity === 1}
              >
                -
              </button>
              <span className="mx-3 fs-4 fw-bold">{quantity}</span>
              <button
                className="btn btn-outline-secondary"
                onClick={() => setQuantity(quantity + 1)}
              >
                +
              </button>
            </div>
          </div>

          <div className="d-flex justify-content-between align-items-center">
            <div>
              <h4 className="mb-0">Total:</h4>
              <h3 className="orange-color">ARS {calculateTotal()}</h3>
            </div>
            <button
              className="btn btn-dark btn-lg"
              onClick={handleAddToCart}
            >
                <i className="fas fa-shopping-cart me-3"></i> 
                Agregar al carrito
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Sabores;