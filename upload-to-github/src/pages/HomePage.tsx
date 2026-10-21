import type { Session } from '../content/types';
import { sessionNumber } from '../content/sessions';
import { hrefs } from '../lib/router';
import { SpeakerLine } from '../components/Speakers';

export function HomePage({ sessions }: { sessions: Session[] }) {
  return (
    <>
      <section className="hero wrap" aria-labelledby="page-title">
        <span className="hero__mark" aria-hidden="true">
          &ldquo;
        </span>
        <p className="eyebrow">A guest speaker learning journal</p>
        <h1 id="page-title" className="hero__title" tabIndex={-1}>
          Beyond the <em>Talk</em>
        </h1>
        <div className="hero__footer">
          <p className="hero__lede">Ideas from the room, explored beyond it.</p>
          <a className="button button--primary" href={hrefs.sessions}>
            Explore the sessions
            <svg aria-hidden="true" width="16" height="16" viewBox="0 0 16 16">
              <path d="M8 3v10M3.5 8.5 8 13l4.5-4.5" fill="none" stroke="currentColor" strokeWidth="1.6" />
            </svg>
          </a>
        </div>
      </section>

      <section id="about" className="intro wrap" aria-labelledby="about-title">
        <div className="section-label">
          <h2 id="about-title" tabIndex={-1}>
            About this journal
          </h2>
        </div>
        <div className="intro__body">
          <figure className="intro__photo">
            <img
              src="/images/shaswati-das.jpg"
              alt="Portrait of Shaswati Das"
              width={320}
              height={400}
              decoding="async"
            />
          </figure>
          <div>
            <p className="intro__name">Shaswati Das</p>
            <p className="intro__text">
              Some ideas stay with you long after a talk ends. I am Shaswati Das, studying for an MSc in Marketing
              Management and Digital at ESSEC Business School in Singapore, and I am drawn to the places where
              creativity meets evidence: advertising, storytelling, brand strategy, and analytics. Guest speakers
              have a way of opening doors into those worlds, sometimes with a single remark I keep turning over for
              days.
            </p>
            <p className="intro__text">
              Beyond the Talk is where I follow those ideas further. It is a record of what each speaker shared, what
              I took from it, and how, little by little, it is shaping the marketer I am becoming.
            </p>
          </div>
        </div>
      </section>

      <section id="sessions" className="collection wrap" aria-labelledby="sessions-title">
        <div className="section-label">
          <h2 id="sessions-title" tabIndex={-1}>
            The conversations so far
          </h2>
        </div>
        <ol className="collection__list">
          {sessions.map((session) => (
            <li key={session.id} className="entry">
              <span className="entry__number" aria-hidden="true">
                {sessionNumber(session)}
              </span>
              <div className="entry__body">
                <p className="entry__context">
                  <span className="visually-hidden">Session {sessionNumber(session)}. </span>
                  {session.collectionContext}
                </p>
                <h3 className="entry__title" id={`entry-${session.id}`}>
                  {session.title}
                </h3>
                <SpeakerLine speakers={session.speakers} />
                <p className="entry__summary">{session.previewSummary}</p>
                <div className="entry__actions">
                  <a
                    className="button button--primary"
                    href={hrefs.session(session.id)}
                    aria-describedby={`entry-${session.id}`}
                  >
                    Explore the session
                    <Arrow />
                  </a>
                  <span className="entry__activity">
                    <svg aria-hidden="true" width="16" height="16" viewBox="0 0 16 16">
                      <circle cx="8" cy="8" r="6.2" fill="none" stroke="currentColor" strokeWidth="1.4" />
                      <path d="M8 4.6V8l2.2 1.6" fill="none" stroke="currentColor" strokeWidth="1.4" />
                    </svg>
                    {session.activityLabel}
                  </span>
                </div>
              </div>
            </li>
          ))}
        </ol>
      </section>
    </>
  );
}

function Arrow() {
  return (
    <svg aria-hidden="true" width="16" height="16" viewBox="0 0 16 16">
      <path d="M3 8h10M8.5 3.5 13 8l-4.5 4.5" fill="none" stroke="currentColor" strokeWidth="1.6" />
    </svg>
  );
}
