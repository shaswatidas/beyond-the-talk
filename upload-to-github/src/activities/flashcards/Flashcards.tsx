import { useEffect, useState } from 'react';
import type { FlashcardsConfig } from './config';
import { progressStore } from '../../lib/storage';
import { Flourish, Section } from '../../components/Section';

interface FlashcardsProps {
  config: FlashcardsConfig;
  onReadReflection: () => void;
}

/**
 * A small deck of flip cards. Front shows a term; the back shows what it does and what it hands on.
 * Uses the shared `#challenge` / `#challenge-title` anchor so the session's "go to the activity" link works.
 */
export function Flashcards({ config, onReadReflection }: FlashcardsProps) {
  const total = config.cards.length;
  const [index, setIndex] = useState(() => {
    const saved = progressStore.load(config.storageKey);
    return typeof saved === 'number' && saved >= 0 && saved < total ? saved : 0;
  });
  const [flipped, setFlipped] = useState(false);

  useEffect(() => {
    progressStore.save(config.storageKey, index);
  }, [config.storageKey, index]);

  const card = config.cards[index];
  const go = (next: number) => {
    setIndex(Math.min(total - 1, Math.max(0, next)));
    setFlipped(false);
  };

  return (
    <Section ground="bordeaux" rail="Flashcards" id="challenge" className="flashcards" labelledBy="challenge-title">
      <p className="eyebrow flashcards__eyebrow">{config.eyebrow}</p>
      <h2 id="challenge-title" className="challenge__title" tabIndex={-1}>
        <Flourish text={config.heading} accent={config.headingAccent} />
      </h2>
      <p className="flashcards__intro">{config.intro}</p>

      <div className="flashcards__stage">
        <button
          type="button"
          className={`flashcard${flipped ? ' is-flipped' : ''}`}
          onClick={() => setFlipped((value) => !value)}
          aria-pressed={flipped}
          aria-label={`${card.term}. ${flipped ? 'Showing what it does. Activate to flip back.' : 'Activate to flip and see what it does.'}`}
        >
          <span className="flashcard__inner">
            <span className="flashcard__face flashcard__face--front">
              <span className="eyebrow flashcard__team">{card.team} team</span>
              <span className="flashcard__term">{card.term}</span>
              <span className="eyebrow flashcard__hint">{flipped ? 'Flip back' : 'Tap to flip'} <span aria-hidden="true">↻</span></span>
            </span>
            <span className="flashcard__face flashcard__face--back">
              <span className="eyebrow flashcard__label">What it does</span>
              <span className="flashcard__def">{card.definition}</span>
              <span className="eyebrow flashcard__out">Hands on - {card.output}</span>
            </span>
          </span>
        </button>

        <p className="visually-hidden" aria-live="polite">
          {flipped ? `${card.term}. ${card.definition} Hands on: ${card.output}.` : `${card.term}, ${card.team} team.`}
        </p>

        <div className="flashcards__controls">
          <button type="button" className="button button--quiet" onClick={() => go(index - 1)} disabled={index === 0}>
            <span aria-hidden="true">←</span> Previous
          </button>
          <span className="flashcards__counter" aria-live="polite">
            Card {index + 1} of {total}
          </span>
          <button type="button" className="button button--quiet" onClick={() => go(index + 1)} disabled={index === total - 1}>
            Next <span aria-hidden="true">→</span>
          </button>
        </div>
      </div>

      <p className="flashcards__after">
        <button type="button" className="text-button text-button--cream" onClick={onReadReflection}>
          Read my reflection <span aria-hidden="true">↓</span>
        </button>
      </p>
    </Section>
  );
}
