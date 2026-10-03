import balde025 from '@/assets/products/baldes/0.25kg.webp';
import balde05kg from '@/assets/products/baldes/0.5kg.webp';
import balde075kg from '@/assets/products/baldes/0.75kg.webp';
import balde1kg from '@/assets/products/baldes/1kg.webp';
import conoPasta from '@/assets/products/baldes/cono_pasta.webp';
import cucuruchoDulce from '@/assets/products/baldes/cucurucho_dulce.webp';
import type { BucketExtraId } from '@/lib/constants';

/** Local bundled images for bucket size cards (public /assets/baldes may be missing). */
export const BUCKET_SIZE_IMAGES: Record<string, string> = {
  '1kg': balde1kg,
  '3/4kg': balde075kg,
  '1/2kg': balde05kg,
  '1/4kg': balde025,
};

export const BUCKET_EXTRA_IMAGES: Record<BucketExtraId, string> = {
  'cono-pasta': conoPasta,
  'cucurucho-dulce': cucuruchoDulce,
};
