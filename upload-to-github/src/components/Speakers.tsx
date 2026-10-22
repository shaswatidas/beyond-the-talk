import { useState } from 'react';
import type { Speaker } from '../content/types';

interface PortraitProps {
  speaker: Speaker;
  size: 'small' | 'medium';
}

/** A circular speaker portrait. Falls back to an initial tile when there is no image or it fails to load. */
export function Portrait({ speaker, size }: PortraitProps) {
  const [failed, setFailed] = useState(false);
  const showImage = speaker.image && !failed;
  return (
    <span className={`portrait portrait--${size}`} aria-hidden="true">
      {showImage ? (
        <img
          src={speaker.image!}
          alt=""
          loading="lazy"
          decoding="async"
          width={140}
          height={140}
          style={{ objectPosition: speaker.imagePosition ?? '50% 50%' }}
          onError={() => setFailed(true)}
        />
      ) : (
        <span className="portrait__initial">{speaker.initials}</span>
      )}
    </span>
  );
}

export function SpeakerList({ speakers }: { speakers: Speaker[] }) {
  return (
    <ul className="speaker-list">
      {speakers.map((speaker) => (
        <li key={speaker.name} className="speaker">
          <Portrait speaker={speaker} size="medium" />
          <span className="speaker__name">{speaker.name}</span>
          {speaker.linkedin && (
            <a className="speaker__link" href={speaker.linkedin} target="_blank" rel="noopener noreferrer">
              <svg aria-hidden="true" width="16" height="16" viewBox="0 0 16 16">
                <rect x="0.75" y="0.75" width="14.5" height="14.5" fill="none" stroke="currentColor" strokeWidth="1.5" />
                <path d="M4.5 6.5v5M4.5 4.2v.1M7.4 11.5v-5M7.4 8.6c0-1.3.8-2.2 1.9-2.2s1.7.8 1.7 2.1v3" fill="none" stroke="currentColor" strokeWidth="1.5" />
              </svg>
              LinkedIn
              <span className="visually-hidden">: {speaker.name} (opens in a new tab)</span>
            </a>
          )}
        </li>
      ))}
    </ul>
  );
}

/** Compact row of small portraits followed by names, for the homepage collection. */
export function SpeakerLine({ speakers }: { speakers: Speaker[] }) {
  const names = speakers.map((speaker) => speaker.name);
  const text =
    names.length > 1 ? `${names.slice(0, -1).join(', ')}, and ${names[names.length - 1]}` : (names[0] ?? '');
  return (
    <p className="speaker-line">
      <span className="speaker-line__faces">
        {speakers.map((speaker) => (
          <Portrait key={speaker.name} speaker={speaker} size="small" />
        ))}
      </span>
      <span>
        <span className="visually-hidden">Speakers: </span>
        {text}
      </span>
    </p>
  );
}
