import { useState } from 'react';
import type { Session } from '../content/types';
import { sessionNumber, sortedSessions } from '../content/sessions';
import { focusElement, hrefs, prefersReducedMotion } from '../lib/router';
import { SpeakerList } from '../components/Speakers';
import { LearningPoints } from '../components/LearningPoints';
import { ActivityRenderer } from '../activities/registry';
import { SlideViewer } from '../components/SlideViewer';
import { Flourish, Ghost, Section } from '../components/Section';

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
      <Section ground="bordeaux" rail={`Session ${number}`} className="opener" labelledBy="page-title">
        <Ghost className="opener__ghost">{number}</Ghost>
        <a className="back-link" href={hrefs.sessions}>
          <span aria-hidden="true">←</span> All sessions
        </a>
        <p className="visually-hidden">Session {number}</p>
        <h1 id="page-title" className="opener__title" tabIndex={-1}>
          {session.title}
        </h1>
        <p className="opener__topic">{session.topicLabel}</p>
        {date && (
          <p className="opener__date">
            <time dateTime={session.date!}>{date}</time>
          </p>
        )}
      </Section>

      <Section ground="oat" rail="The Speakers" className="speakers" labelledBy="speakers-title">
        <div className="section-head">
          <h2 id="speakers-title">The speakers</h2>
          {session.speakerContext && <p className="eyebrow">From {session.speakerContext}</p>}
        </div>
        <SpeakerList speakers={session.speakers} />
      </Section>

      {session.summary && (
        <Section ground="cream" rail="The Brief" className="brief" labelledBy="brief-title">
          <h2 id="brief-title" className="display-2">
            <Flourish text={session.summary.heading} accent={session.summary.headingAccent} />
          </h2>
          <p className="brief__intro">{session.summary.intro}</p>
          <ol className="brief__parts">
            {session.summary.parts.map((part, index) => (
              <li key={part.title} className="brief__part">
                <span className="brief__number" aria-hidden="true">
                  {index + 1}
                </span>
                <h3 className="brief__title">{part.title}</h3>
                <p>{part.text}</p>
              </li>
            ))}
          </ol>
          {session.summary.closing && (
            <div className="callout ground--wine">
              <p className="eyebrow">The task</p>
              <p className="callout__text">{session.summary.closing}</p>
            </div>
          )}
        </Section>
      )}

      <Section ground="wine" rail="My Interpretation" className="takeaway" labelledBy="takeaway-title">
        <span className="glyph glyph--open" aria-hidden="true">
          &ldquo;
        </span>
        <h2 id="takeaway-title" className="script-title">
          What stayed with me
        </h2>
        <p className="takeaway__statement">{session.takeaway}</p>
        <p className="takeaway__invite">
          {session.activityInvitation}{' '}
          <a href="#challenge" onClick={goToChallenge}>
            Go to the challenge
          </a>
        </p>
      </Section>

      {deck && (
        <Section ground="oat" className="slides" labelledBy="slides-title">
          <div className="section-head">
            <h2 id="slides-title" tabIndex={-1}>
              {deck.title}
            </h2>
            <p className="eyebrow">{deck.slides.length} slides</p>
          </div>
          <SlideViewer
            deck={deck}
            index={slideIndex}
            onChange={setSlideIndex}
            onReturnToChallenge={cameFromChallenge ? returnToChallenge : undefined}
          />
        </Section>
      )}

      <ActivityRenderer activity={session.activity} onReadReflection={readReflection} onShowSlide={showSlide} />

      <Section ground="cream" rail="Takeaways" className="ideas-section" labelledBy="ideas-title">
        <h2 id="ideas-title" className="display-2">
          <Flourish text="Three ideas I took away" accent="I took away" />
        </h2>
        <LearningPoints points={session.learningPoints} />
      </Section>

      <Section ground="oat" rail="Reflection" className="reflection" labelledBy="reflection-title">
        <h2 id="reflection-title" className="display-2" tabIndex={-1}>
          My reflection
        </h2>
        <div className="reflection__layout">
          <div className="reflection__body">
            {session.reflection.map((paragraph, index) => (
              <p key={paragraph} className={index === 0 ? 'dropcap' : undefined}>
                {paragraph}
              </p>
            ))}
          </div>
          <svg className="eclipse" aria-hidden="true" viewBox="0 0 200 200" width="200" height="200">
            <circle cx="100" cy="100" r="96" />
            <circle cx="112" cy="100" r="78" />
            <circle cx="124" cy="100" r="60" />
            <circle cx="136" cy="100" r="42" />
            <circle cx="148" cy="100" r="24" />
          </svg>
        </div>
      </Section>

      <Section ground="cream" className="continue" labelledBy="continue-title">
        <nav className="continue__inner" aria-labelledby="continue-title">
          <p id="continue-title" className="continue__label">
            Continue exploring
          </p>
          <div className="actions">
            <a className="button button--secondary" href={hrefs.sessions}>
              Back to all sessions
            </a>
            {next && (
              <a className="button button--primary" href={hrefs.session(next.id)}>
                Next session: {next.title} <span aria-hidden="true">→</span>
              </a>
            )}
          </div>
        </nav>
      </Section>
    </article>
  );
}
