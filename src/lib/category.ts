import { CATEGORY_COPY, CATEGORY_IDS, CATEGORY_TITLES } from './constants';
import type { CategorySlug } from '@/types';

const SLUGS: CategorySlug[] = ['cakes', 'cones', 'desserts', 'flavors', 'pints'];

export function isCategorySlug(value: string | undefined): value is CategorySlug {
  return Boolean(value && SLUGS.includes(value as CategorySlug));
}

export function getCategoryId(slug: CategorySlug): number {
  return CATEGORY_IDS[slug];
}

export function getCategoryTitle(slug: string | undefined): string {
  if (isCategorySlug(slug)) return CATEGORY_TITLES[slug];
  return (slug ?? 'Productos').replace(/_/g, ' ');
}

export function getCategoryCopy(slug: string | undefined): string {
  if (isCategorySlug(slug)) return CATEGORY_COPY[slug];
  return 'Explorá nuestra selección de helados.';
}
