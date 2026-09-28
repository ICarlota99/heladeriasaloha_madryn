import type { BucketSize, CategorySlug } from '@/types';

export const BRAND_NAME = 'Heladerías Aloha';
export const BRAND_LOCATION = 'Puerto Madryn';

export const WHATSAPP_PHONE = '542804881974';
export const WHATSAPP_DISPLAY = '+54 280 4881974';
export const WHATSAPP_DEFAULT_MESSAGE = '¡Hola! Quiero hacer un pedido de helados.';

export const BUSINESS_HOURS = 'De 12 del mediodía a 12 de la noche';

export const LOCATIONS = [
  {
    label: '9 de Julio e Hipólito Yrigoyen',
    url: 'https://maps.app.goo.gl/SiwEx7UsUJ7tJw5t5',
  },
  {
    label: 'España y Lombardo',
    url: 'https://maps.app.goo.gl/9N6YKpCPyGiCABo78',
  },
] as const;

export const FACEBOOK_URL =
  'https://www.facebook.com/profile.php?id=61561618081490&mibextid=ZbWKwL';

export const CART_STORAGE_KEY = 'icecreamCart';

export const CATEGORY_IDS: Record<CategorySlug, number> = {
  cakes: 1,
  cones: 2,
  desserts: 3,
  flavors: 4,
  pints: 5,
};

export const CATEGORY_TITLES: Record<CategorySlug, string> = {
  cakes: 'Tortas Heladas',
  cones: 'Conos y Paletas',
  flavors: 'Sabores de Helados',
  desserts: 'Postres Helados',
  pints: 'Pintas y Baldes',
};

export const CATEGORY_COPY: Record<CategorySlug, string> = {
  cakes: 'Tortas heladas para compartir y celebrar.',
  cones: 'Conos y paletas para llevar y disfrutar al paso.',
  flavors: 'Sabores de helado para armar tu pedido.',
  desserts: 'Postres helados para el final perfecto.',
  pints: 'Pintas y baldes para llevar a casa.',
};

export const PRODUCT_NAV_LINKS = [
  { to: '/category/cones', label: 'Conos y paletas' },
  { to: '/category/desserts', label: 'Postres helados' },
  { to: '/category/pints', label: 'Pintas y baldes' },
  { to: '/category/cakes', label: 'Tortas heladas' },
] as const;

export const BUCKET_SIZES: BucketSize[] = [
  {
    size: '1kg',
    label: 'Balde 1kg',
    maxFlavors: 4,
    price: 22500,
    image: '/assets/baldes/1kg.jpg',
  },
  {
    size: '3/4kg',
    label: 'Balde 3/4kg',
    maxFlavors: 4,
    price: 18000,
    image: '/assets/baldes/3/4kg.jpg',
  },
  {
    size: '1/2kg',
    label: 'Balde 1/2kg',
    maxFlavors: 3,
    price: 12500,
    image: '/assets/baldes/0.5kg.jpg',
  },
  {
    size: '1/4kg',
    label: 'Balde 1/4kg',
    maxFlavors: 2,
    price: 6800,
    image: '/assets/baldes/0.25kg.jpg',
  },
];

export const EMPTY_CONE_PRICE = 500;
