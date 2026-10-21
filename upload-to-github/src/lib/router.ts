import { useEffect, useState } from 'react';

/**
 * Hash-based routes, so the site works on any static host without rewrite rules.
 *   #home                → homepage
 *   #sessions, #about    → homepage, scrolled to that section
 *   #session/<id>        → a session view
 */
export type HomeSection = 'top' | 'sessions' | 'about';

export type Route =
  | { name: 'home'; section: HomeSection }
  | { name: 'session'; id: string }
  | { name: 'notFound'; requested: string };

export const hrefs = {
  home: '#home',
  sessions: '#sessions',
  about: '#about',
  session: (id: string) => `#session/${id}`,
};

export function parseHash(hash: string, knownSessionIds: string[]): Route {
  const value = decodeURIComponent(hash.replace(/^#\/?/, '')).trim();
  if (value === '' || value === 'home') return { name: 'home', section: 'top' };
  if (value === 'sessions') return { name: 'home', section: 'sessions' };
  if (value === 'about') return { name: 'home', section: 'about' };
  const match = /^session\/([a-z0-9-]+)\/?$/i.exec(value);
  if (match) {
    const id = match[1].toLowerCase();
    return knownSessionIds.includes(id) ? { name: 'session', id } : { name: 'notFound', requested: value };
  }
  return { name: 'notFound', requested: value };
}

export function useRoute(knownSessionIds: string[]): Route {
  const [route, setRoute] = useState(() => parseHash(window.location.hash, knownSessionIds));
  useEffect(() => {
    const update = () => setRoute(parseHash(window.location.hash, knownSessionIds));
    window.addEventListener('hashchange', update);
    return () => window.removeEventListener('hashchange', update);
  }, [knownSessionIds]);
  return route;
}

export function prefersReducedMotion(): boolean {
  return typeof window !== 'undefined' && window.matchMedia?.('(prefers-reduced-motion: reduce)').matches === true;
}

/** Scrolls an element into view and moves keyboard focus to it without a second jump. */
export function focusElement(element: HTMLElement | null, scroll = true): void {
  if (!element) return;
  if (scroll) element.scrollIntoView({ behavior: prefersReducedMotion() ? 'auto' : 'smooth', block: 'start' });
  element.focus({ preventScroll: true });
}
