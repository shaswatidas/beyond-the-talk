import { useEffect, useRef } from 'react';
import { findSession, sortedSessions } from './content/sessions';
import { focusElement, hrefs, useRoute } from './lib/router';
import type { Route } from './lib/router';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { HomePage } from './pages/HomePage';
import { SessionPage } from './pages/SessionPage';

const sessionIds = sortedSessions.map((session) => session.id);

const sectionHeadings: Record<string, string> = {
  sessions: 'sessions-title',
  about: 'about-title',
};

function routeKey(route: Route): string {
  if (route.name === 'home') return `home:${route.section}`;
  if (route.name === 'session') return `session:${route.id}`;
  return `notFound:${route.requested}`;
}

export function App() {
  const route = useRoute(sessionIds);
  const firstRender = useRef(true);
  const key = routeKey(route);

  // On every navigation, bring the right place into view and move focus to its heading.
  useEffect(() => {
    const isFirst = firstRender.current;
    firstRender.current = false;
    if (route.name === 'home' && route.section !== 'top') {
      focusElement(document.getElementById(sectionHeadings[route.section]));
      return;
    }
    window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior });
    if (!isFirst) focusElement(document.getElementById('page-title'), false);
    document.title =
      route.name === 'session'
        ? `${findSession(route.id)?.title ?? 'Session'} · Beyond the Talk`
        : route.name === 'notFound'
          ? 'Session not found · Beyond the Talk'
          : 'Beyond the Talk · A guest speaker learning journal by Shaswati Das';
  }, [key]);

  const skipToContent = (event: React.MouseEvent) => {
    event.preventDefault();
    focusElement(document.getElementById('main-content'));
  };

  const session = route.name === 'session' ? findSession(route.id) : undefined;

  return (
    <>
      <a className="skip-link" href="#main-content" onClick={skipToContent}>
        Skip to content
      </a>
      <Header route={route} sessions={sortedSessions} />
      <main id="main-content" tabIndex={-1}>
        {route.name === 'home' && <HomePage sessions={sortedSessions} />}
        {session && <SessionPage key={session.id} session={session} />}
        {route.name === 'notFound' && <NotFound />}
      </main>
      <Footer />
    </>
  );
}

function NotFound() {
  return (
    <section className="not-found wrap" aria-labelledby="page-title">
      <p className="eyebrow">Page not found</p>
      <h1 id="page-title" tabIndex={-1}>
        This session is not in the journal yet.
      </h1>
      <p>The link may be mistyped, or the session may have moved.</p>
      <a className="button button--primary" href={hrefs.sessions}>
        See all sessions
      </a>
    </section>
  );
}
