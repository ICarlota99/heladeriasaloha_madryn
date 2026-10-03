import { useLayoutEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';

function getHeaderOffset(): number {
  return (
    parseFloat(
      getComputedStyle(document.documentElement).getPropertyValue('--header-offset'),
    ) || 0
  );
}

function scrollToHash(id: string, behavior: ScrollBehavior) {
  const el = document.getElementById(id);
  if (!el) return false;

  const top = el.getBoundingClientRect().top + window.scrollY - getHeaderOffset();
  window.scrollTo({ top, left: 0, behavior });
  return true;
}

/**
 * Restores window scroll on client-side navigations.
 * Instant reset avoids the mid-page "ghost scroll" flash when routes swap.
 */
export default function ScrollToTop() {
  const { pathname, hash, key } = useLocation();
  const prevPathname = useRef(pathname);

  useLayoutEffect(() => {
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual';
    }
  }, []);

  useLayoutEffect(() => {
    const pathnameChanged = prevPathname.current !== pathname;
    prevPathname.current = pathname;

    if (hash) {
      const id = decodeURIComponent(hash.slice(1));
      if (!id) return;

      // Kill inherited Y before paint when arriving from another route.
      if (pathnameChanged) {
        window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
      }

      let cancelled = false;
      let attempts = 0;
      const maxAttempts = 30;

      const tryScroll = () => {
        if (cancelled) return;
        if (scrollToHash(id, 'smooth')) return;
        if (attempts++ < maxAttempts) {
          requestAnimationFrame(tryScroll);
        }
      };

      requestAnimationFrame(() => requestAnimationFrame(tryScroll));

      return () => {
        cancelled = true;
      };
    }

    if (pathnameChanged) {
      window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
    }
  }, [pathname, hash, key]);

  return null;
}
