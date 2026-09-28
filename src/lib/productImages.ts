type ImageModule = { default: string };

const productModules = import.meta.glob<ImageModule>('../assets/products/**/*.{jpg,png,webp}', {
  eager: true,
});

const flavorModules = import.meta.glob<ImageModule>('../assets/flavors/*.{jpg,png,webp}', {
  eager: true,
});

function resolveFromGlob(
  modules: Record<string, ImageModule>,
  relativePath: string,
): string | undefined {
  const cleanPath = relativePath.replace(/^\.+\//, '');
  const key = `../assets/${cleanPath}`;
  return modules[key]?.default;
}

export function getProductImageSrc(imagePath?: string): string | undefined {
  if (!imagePath) return undefined;
  if (imagePath.startsWith('http') || imagePath.startsWith('/')) return imagePath;
  return resolveFromGlob(productModules, imagePath);
}

export function getFlavorImageSrc(imagePath?: string): string | undefined {
  if (!imagePath) return undefined;
  if (imagePath.startsWith('http') || imagePath.startsWith('/')) return imagePath;
  return resolveFromGlob(flavorModules, imagePath);
}
