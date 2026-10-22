import { useEffect, useRef, useState } from 'react';
import type { Route } from '../lib/router';
import { hrefs } from '../lib/router';
import type { Session } from '../content/types';
import { sessionNumber } from '../content/sessions';

interface HeaderProps {
  route: Route;
  sessions: Session[];
}

export function Header({ route, sessions }: HeaderProps) {
  return (
    <header className="site-header">
      <div className="masthead">
        <div className="masthead__bar container">
          <a className="wordmark" href={hrefs.home}>
            Beyond the <em>Talk</em>
          </a>
          <nav className="primary-nav" aria-label="Main">
            <a href={hrefs.sessions}>Sessions</a>
            <a href={hrefs.about}>About this journal</a>
          </nav>
        </div>
      </div>
      {route.name === 'home' && (
        <div className="issue-strip">
          <ul className="issue-strip__inner container">
            <li>A guest-speaker learning journal</li>
            <li>Vol. 01</li>
            <li>Singapore · 2026</li>
          </ul>
        </div>
      )}
      <SessionStrip route={route} sessions={sessions} />
    </header>
  );
}

function SessionStrip({ route, sessions }: HeaderProps) {
  const scroller = useRef<HTMLDivElement>(null);
  const [overflow, setOverflow] = useState({ start: false, end: false });

  // Keep the selected tab in view and show an edge cue when more tabs are hidden.
  useEffect(() => {
    const element = scroller.current;
    if (!element) return;
    const current = element.querySelector<HTMLElement>('[aria-current="page"]');
    if (current) {
      const left = current.offsetLeft - element.offsetLeft;
      const right = left + current.offsetWidth;
      if (left < element.scrollLeft || right > element.scrollLeft + element.clientWidth) {
        element.scrollLeft = left - 24;
      }
    }
    const update = () =>
      setOverflow({
        start: element.scrollLeft > 2,
        end: element.scrollLeft + element.clientWidth < element.scrollWidth - 2,
      });
    update();
    element.addEventListener('scroll', update, { passive: true });
    window.addEventListener('resize', update);
    return () => {
      element.removeEventListener('scroll', update);
      window.removeEventListener('resize', update);
    };
  }, [route]);

  const isHome = route.name === 'home';
  return (
    <nav className="session-strip" aria-label="Session tabs">
      <div className="container session-strip__inner">
        <span className="session-strip__label" aria-hidden="true">
          Sessions
        </span>
        <div
          ref={scroller}
          className={`session-strip__scroller${overflow.start ? ' has-start' : ''}${overflow.end ? ' has-end' : ''}`}
        >
          <ul>
            <li>
              <a href={hrefs.home} aria-current={isHome ? 'page' : undefined}>
                Home
              </a>
            </li>
            {sessions.map((session) => (
              <li key={session.id}>
                <a
                  href={hrefs.session(session.id)}
                  aria-current={route.name === 'session' && route.id === session.id ? 'page' : undefined}
                >
                  <span className="session-strip__number">{sessionNumber(session)}</span>
                  <span aria-hidden="true">{'\u00a0·\u00a0'}</span>
                  {session.navLabel}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </nav>
  );
}
