import type { Session } from '../content/types';
import { sessionNumber } from '../content/sessions';
import { hrefs } from '../lib/router';
import { SpeakerLine } from '../components/Speakers';
import { Ghost, Section } from '../components/Section';

export function HomePage({ sessions }: { sessions: Session[] }) {
  return (
    <>
      <Section ground="bordeaux" rail="A Guest-Speaker Learning Journal" className="hero" labelledBy="page-title">
        <span className="glyph glyph--close" aria-hidden="true">
          &rdquo;
        </span>
        <h1 id="page-title" className="hero__title" tabIndex={-1}>
          Beyond <span className="script">the</span> <em>Talk</em>
        </h1>
        <p className="hero__lede">
          Ideas from the room, <em>explored beyond it.</em>
        </p>
        <a className="button button--primary" href={hrefs.sessions}>
          Explore the sessions <span aria-hidden="true">↓</span>
        </a>
      </Section>

      <Section ground="oat" rail="The Author" id="about" className="about" labelledBy="about-title">
        <h2 id="about-title" className="script-title" tabIndex={-1}>
          About this journal
        </h2>
        <div className="about__body">
          <figure className="arch">
            <div className="arch__plate">
              <img
                src="/images/shaswati-das.jpg"
                alt="Portrait of Shaswati Das"
                width={320}
                height={400}
                decoding="async"
              />
            </div>
            <figcaption className="arch__caption">Fig. 01 — Shaswati Das</figcaption>
          </figure>
          <div className="about__text">
            <p className="about__name">Shaswati Das</p>
            <p className="dropcap">
              Some ideas stay with you long after a talk ends. I am Shaswati Das, studying for an MSc in Marketing
              Management and Digital at ESSEC Business School in Singapore, and I am drawn to the places where
              creativity meets evidence: advertising, storytelling, brand strategy, and analytics. Guest speakers
              have a way of opening doors into those worlds, sometimes with a single remark I keep turning over for
              days.
            </p>
            <p>
              Beyond the Talk is where I follow those ideas further. It is a record of what each speaker shared, what
              I took from it, and how, little by little, it is shaping the marketer I am becoming.
            </p>
          </div>
        </div>
      </Section>

      <Section ground="cream" id="sessions" className="collection" labelledBy="sessions-title">
        <h2 id="sessions-title" className="display-2" tabIndex={-1}>
          The conversations <span className="script">so far</span>
        </h2>
        <ol className="collection__list">
          {sessions.map((session) => (
            <li key={session.id} className="feature">
              <Ghost className="feature__ghost">{sessionNumber(session)}</Ghost>
              <div className="feature__grid">
                <div className="rail" aria-hidden="true">
                  <span className="rail__label">Session {sessionNumber(session)}</span>
                </div>
                <div className="feature__body">
                  <p className="eyebrow">
                    <span className="visually-hidden">Session {sessionNumber(session)}. </span>
                    {session.collectionContext}
                  </p>
                  <h3 className="feature__title" id={`entry-${session.id}`}>
                    {session.title}
                  </h3>
                  <SpeakerLine speakers={session.speakers} />
                  <p className="feature__summary">{session.previewSummary}</p>
                  <div className="actions">
                    <a
                      className="button button--primary"
                      href={hrefs.session(session.id)}
                      aria-describedby={`entry-${session.id}`}
                    >
                      Explore the session <span aria-hidden="true">→</span>
                    </a>
                    <span className="feature__activity">
                      <svg aria-hidden="true" width="16" height="16" viewBox="0 0 16 16">
                        <circle cx="8" cy="8" r="6.2" fill="none" stroke="currentColor" strokeWidth="1.4" />
                        <path d="M8 4.6V8l2.2 1.6" fill="none" stroke="currentColor" strokeWidth="1.4" />
                      </svg>
                      {session.activityLabel}
                    </span>
                  </div>
                </div>
              </div>
            </li>
          ))}
        </ol>
      </Section>
    </>
  );
}
