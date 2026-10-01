/** Popular / classic flavor IDs from sabores.json for guided discovery */
export const POPULAR_FLAVOR_IDS = [
  'dl-01', // Dulce de leche
  'dl-06', // Chocorrica
  'cr-09', // Americana
  'cr-11', // Crema Óreo
  'ch-01', // Chocolate
  'ch-06', // Mousse de chocolate y frutilla
  'fr-10', // Frutilla a la reina
  'es-13', // Crema Unicornio (nuevo)
] as const;

export type BrowseMode = 'popular' | 'all' | string;
