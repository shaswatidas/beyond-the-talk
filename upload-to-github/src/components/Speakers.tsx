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
