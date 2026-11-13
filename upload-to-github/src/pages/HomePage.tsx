import type { Session } from '../content/types';
import { sessionNumber } from '../content/sessions';
import { hrefs } from '../lib/router';
import { Portrait } from '../components/Speakers';
import { Section } from '../components/Section';

function speakerNames(session: Session): string {
  const names = session.speakers.map((speaker) => speaker.name);
  return names.length > 1 ? `${names.slice(0, -1).join(', ')} & ${names[names.length - 1]}` : (names[0] ?? '');
}

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

      <Section ground="cream" rail="The Sessions" id="sessions" className="sessions" labelledBy="sessions-title">
        <h2 id="sessions-title" className="display-2" tabIndex={-1}>
          The conversations <span className="script">so far</span>
        </h2>
        <ol className="scards">
          {sessions.map((session) => {
            const number = sessionNumber(session);
            return (
              <li key={session.id} className="scard">
                <a className="scard__link" href={hrefs.session(session.id)} aria-describedby={`entry-${session.id}`}>
                  <span className="scard__cover">
                    {session.coverImage ? (
                      <img src={session.coverImage} alt="" loading="lazy" decoding="async" />
                    ) : (
                      <span className="scard__cover--plain" aria-hidden="true" />
                    )}
                    <span className="scard__num" aria-hidden="true">
                      {number}
                    </span>
                  </span>
                  <span className="scard__body">
                    <span className="eyebrow scard__eyebrow">
                      <span className="visually-hidden">Session {number}. </span>
                      {session.collectionContext}
                    </span>
                    <span className="scard__title" id={`entry-${session.id}`}>
                      {session.title}
                    </span>
                    <span className="scard__speakers">
                      <span className="speaker-line__faces" aria-hidden="true">
                        {session.speakers.map((speaker) => (
                          <Portrait key={speaker.name} speaker={speaker} size="small" />
                        ))}
                      </span>
                      <span>
                        <span className="visually-hidden">Speakers: </span>
                        {speakerNames(session)}
                      </span>
                    </span>
                    <span className="scard__excerpt">{session.previewSummary}</span>
                    <span className="scard__go">
                      Explore the session <span aria-hidden="true">→</span>
                    </span>
                  </span>
                </a>
              </li>
            );
          })}
        </ol>
      </Section>
    </>
  );
}
