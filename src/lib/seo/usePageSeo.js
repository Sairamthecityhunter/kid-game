import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

function upsertMeta(attr, key, content) {
  if (typeof document === 'undefined') return;
  const selector = attr === 'name' ? `meta[name="${key}"]` : `meta[property="${key}"]`;
  let el = document.head.querySelector(selector);
  if (!el) {
    el = document.createElement('meta');
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  el.setAttribute('content', content);
}

/**
 * Sets document title and core meta / Open Graph / Twitter tags for the current route.
 *
 * @param {object} opts
 * @param {string} opts.title - Full page title (no site suffix unless you include it)
 * @param {string} opts.description - Short plain-language description for search & shares
 */
export function usePageSeo({ title, description }) {
  const { pathname } = useLocation();

  useEffect(() => {
    document.title = title;
    upsertMeta('name', 'description', description);
    upsertMeta('property', 'og:title', title);
    upsertMeta('property', 'og:description', description);
    upsertMeta('property', 'og:type', 'website');
    upsertMeta('name', 'twitter:card', 'summary_large_image');
    upsertMeta('name', 'twitter:title', title);
    upsertMeta('name', 'twitter:description', description);

    const origin = typeof window !== 'undefined' ? window.location.origin : '';
    upsertMeta('property', 'og:url', `${origin}${pathname}`);
  }, [title, description, pathname]);
}
