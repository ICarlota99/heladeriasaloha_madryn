export const formatPrice = (price) => {
    if (isNaN(price)) return '0.00';
    return Number(price).toLocaleString('es-AR', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    });
  };