import balde025 from '@/assets/products/baldes/0.25kg.webp';
import balde1kg from '@/assets/products/baldes/1kg.webp';
import baldesGeneric from '@/assets/products/baldes/baldes.webp';

/** Local bundled images for bucket size cards (public /assets/baldes may be missing). */
export const BUCKET_SIZE_IMAGES: Record<string, string> = {
  '1kg': balde1kg,
  '3/4kg': baldesGeneric,
  '1/2kg': baldesGeneric,
  '1/4kg': balde025,
};
