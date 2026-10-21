import { useState } from 'react';
import type { Session } from '../content/types';
import { sessionNumber, sortedSessions } from '../content/sessions';
import { focusElement, hrefs, prefersReducedMotion } from '../lib/router';
import { SpeakerList } from '../components/Speakers';
import { LearningPoints } from '../components/LearningPoints';
import { ActivityRenderer } from '../activities/registry';
import { SlideViewer } from '../components/SlideViewer';

function formatDate(iso: string): string {
  const date = new Date(`${iso}T12:00:00`);
  return Number.isNaN(date.getTime())
    ? ''
    : date.toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' });
}

export function SessionPage({ session }: { session: Session }) {
  const number = sessionNumber(session);
  const date = session.date ? formatDate(session.date) : '';
  const next = sortedSessions[sortedSessions.findIndex((item) => item.id === session.id) + 1];
  const readReflection = () => focusElement(document.getElementById('reflection-title'));
  const goToChallenge = (event: React.MouseEvent) => {
    event.preventDefault();
    focusElement(document.getElementById('challenge-title'));
  };
  const [slideIndex, setSlideIndex] = useState(0);
  const [cameFromChallenge, setCameFromChallenge] = useState(false);
  const deck = session.slides;
  const showSlide = deck
    ? (slideNumber: number) => {
        setSlideIndex(Math.min(deck.slides.length, Math.max(1, slideNumber)) - 1);
        setCameFromChallenge(true);
        focusElement(document.getElementById('slides-title'));
      }
    : undefined;
  const returnToChallenge = () => {
    setCameFromChallenge(false);
    document.querySelector('#challenge .panel')?.scrollIntoView({ behavior: prefersReducedMotion() ? 'auto' : 'smooth', block: 'start' });
    focusElement(document.querySelector<HTMLElement>('#challenge .panel__title'), false);
  };

  return (
    <article className="session">
      <header className="session-intro wrap">
        <a className="back-link" href={hrefs.sessions}>
          <svg aria-hidden="true" width="16" height="16" viewBox="0 0 16 16">
            <path d="M13 8H3M7.5 3.5 3 8l4.5 4.5" fill="none" stroke="currentColor" strokeWidth="1.6" />
          </svg>
          All sessions
        </a>
        <p className="session-intro__number">
          <span className="visually-hidden">Session </span>
          {number}
        </p>
        <h1 id="page-title" className="session-intro__title" tabIndex={-1}>
          {session.title}
        </h1>
        <p className="session-intro__topic">{session.topicLabel}</p>
        {date && (
          <p className="session-intro__date">
            <time dateTime={session.date!}>{date}</time>
          </p>
        )}
      </header>

      <section className="speakers wrap" aria-labelledby="speakers-title">
        <div className="section-label">
          <h2 id="speakers-title">The speakers</h2>
          {session.speakerContext && <p className="section-label__note">From {session.speakerContext}</p>}
        </div>
        <SpeakerList speakers={session.speakers} />
      </section>

      {session.summary && (
        <section className="brief wrap" aria-labelledby="brief-title">
          <div className="section-label">
            <h2 id="brief-title">{session.summary.heading}</h2>
          </div>
          <p className="brief__intro">{session.summary.intro}</p>
          <ol className="brief__parts">
            {session.summary.parts.map((part, index) => (
              <li key={part.title} className="brief__part">
                <span className="brief__number" aria-hidden="true">
                  Part {index + 1}
                </span>
                <h3 className="brief__title">{part.title}</h3>
                <p>{part.text}</p>
              </li>
            ))}
          </ol>
          {session.summary.closing && <p className="brief__closing">{session.summary.closing}</p>}
        </section>
      )}

      <section className="takeaway wrap" aria-labelledby="takeaway-title">
        <div className="section-label">
          <h2 id="takeaway-title">What stayed with me</h2>
          <p className="section-label__note">My interpretation</p>
        </div>
        <div className="takeaway__body">
          <p className="takeaway__statement">{session.takeaway}</p>
          <p className="takeaway__invite">
            {session.activityInvitation}{' '}
            <a href="#challenge" onClick={goToChallenge}>
              Go to the challenge
            </a>
          </p>
        </div>
      </section>

      {deck && (
        <section className="slides wrap" aria-labelledby="slides-title">
          <div className="section-label">
            <h2 id="slides-title" tabIndex={-1}>
              {deck.title}
            </h2>
            <p className="section-label__note">{deck.slides.length} slides</p>
          </div>
          <SlideViewer
            deck={deck}
            index={slideIndex}
            onChange={setSlideIndex}
            onReturnToChallenge={cameFromChallenge ? returnToChallenge : undefined}
          />
        </section>
      )}

      <ActivityRenderer activity={session.activity} onReadReflection={readReflection} onShowSlide={showSlide} />

      <section className="ideas-section wrap" aria-labelledby="ideas-title">
        <div className="section-label">
          <h2 id="ideas-title">Three ideas I took away</h2>
        </div>
        <LearningPoints points={session.learningPoints} />
      </section>

      <section className="reflection wrap" aria-labelledby="reflection-title">
        <div className="section-label">
          <h2 id="reflection-title" tabIndex={-1}>
            My reflection
          </h2>
        </div>
        <div className="reflection__body">
          {session.reflection.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </div>
      </section>

      <nav className="continue wrap" aria-label="Continue exploring">
        <p className="continue__label">Continue exploring</p>
        <div className="actions">
          <a className="button button--secondary" href={hrefs.sessions}>
            Back to all sessions
          </a>
          {next && (
            <a className="button button--primary" href={hrefs.session(next.id)}>
              Next session: {next.title}
            </a>
          )}
        </div>
      </nav>
    </article>
  );
}
