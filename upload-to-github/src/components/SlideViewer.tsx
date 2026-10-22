import { useEffect, useId } from 'react';
import type { SlideDeck } from '../content/types';

interface SlideViewerProps {
  deck: SlideDeck;
  /** Zero-based index of the slide on show. */
  index: number;
  onChange: (index: number) => void;
  /** Shown when the visitor arrived here from the challenge. */
  onReturnToChallenge?: () => void;
}

export function SlideViewer({ deck, index, onChange, onReturnToChallenge }: SlideViewerProps) {
  const id = useId();
  const total = deck.slides.length;
  const slide = deck.slides[index];
  const go = (next: number) => onChange(Math.min(total - 1, Math.max(0, next)));

  // Warm the cache for the neighbouring slides so paging feels instant.
  useEffect(() => {
    [index - 1, index + 1].forEach((neighbour) => {
      const nextSlide = deck.slides[neighbour];
      if (nextSlide) new Image().src = nextSlide.src;
    });
  }, [deck.slides, index]);

  const onKeyDown = (event: React.KeyboardEvent) => {
    if (event.target instanceof HTMLSelectElement) return;
    if (event.key === 'ArrowLeft') {
      event.preventDefault();
      go(index - 1);
    } else if (event.key === 'ArrowRight') {
      event.preventDefault();
      go(index + 1);
    }
  };

  return (
    <div className="deck" role="group" aria-roledescription="slide viewer" aria-label={deck.title} onKeyDown={onKeyDown}>
      <figure className="deck__figure">
        <div className="deck__plate">
          <span className="deck__ghost" aria-hidden="true">
            {String(index + 1).padStart(2, '0')}
          </span>
          <div className="deck__caption" aria-live="polite">
            <span className="deck__count">
              Slide {index + 1} of {total}
            </span>
            <span className="deck__title">{slide.title}</span>
          </div>
          <div className="deck__frame">
            <img
              key={slide.src}
              src={slide.src}
              alt={`Slide ${index + 1}: ${slide.title}`}
              width={1600}
              height={900}
              decoding="async"
              aria-describedby={`${id}-text`}
            />
          </div>
        </div>
      </figure>

      <div className="deck__controls">
        <button type="button" className="button button--quiet deck__prev" onClick={() => go(index - 1)} disabled={index === 0}>
          <span aria-hidden="true">←</span> Previous
        </button>
        <label className="deck__jump">
          <span className="visually-hidden">Go to slide</span>
          <select value={index} onChange={(event) => go(Number(event.target.value))}>
            {deck.slides.map((item, itemIndex) => (
              <option key={item.src} value={itemIndex}>
                {itemIndex + 1}. {item.title}
              </option>
            ))}
          </select>
        </label>
        <button type="button" className="button button--quiet" onClick={() => go(index + 1)} disabled={index === total - 1}>
          Next <span aria-hidden="true">→</span>
        </button>
      </div>

      <details className="disclosure">
        <summary>
          <span>Read this slide as text</span>
          <svg aria-hidden="true" width="14" height="14" viewBox="0 0 14 14">
            <path d="M3 5.5 7 9.5l4-4" fill="none" stroke="currentColor" strokeWidth="1.6" />
          </svg>
        </summary>
        <div className="disclosure__content">
          <p id={`${id}-text`} className="deck__text">
            {slide.text}
          </p>
        </div>
      </details>

      <div className="deck__footer">
        <p>{deck.credit}</p>
        <div className="deck__links">
          {onReturnToChallenge && (
            <button type="button" className="button button--primary" onClick={onReturnToChallenge}>
              Return to the challenge
            </button>
          )}
          {deck.pdf && (
            <a className="text-button" href={deck.pdf} target="_blank" rel="noopener">
              Open the full slides{deck.pdfLabel ? ` (${deck.pdfLabel})` : ''}
              <span className="visually-hidden"> in a new tab</span>
            </a>
          )}
        </div>
      </div>
    </div>
  );
}
