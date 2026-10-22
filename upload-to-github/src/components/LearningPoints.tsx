import type { LearningPoint } from '../content/types';
import { Ghost } from './Section';

export function LearningPoints({ points }: { points: LearningPoint[] }) {
  return (
    <ol className="ideas">
      {points.map((point, index) => (
        <li key={point.title} className="idea">
          <Ghost className="idea__ghost">{String(index + 1).padStart(2, '0')}</Ghost>
          <div className="idea__body">
            <h3 className="idea__title">{point.title}</h3>
            <p>{point.summary}</p>
            {point.detail && point.detail.length > 0 && (
              <details className="disclosure">
                <summary>
                  <span>Explore this idea</span>
                  <svg aria-hidden="true" width="14" height="14" viewBox="0 0 14 14">
                    <path d="M3 5.5 7 9.5l4-4" fill="none" stroke="currentColor" strokeWidth="1.6" />
                  </svg>
                </summary>
                <div className="disclosure__content">
                  {point.detail.map((paragraph) => (
                    <p key={paragraph}>{paragraph}</p>
                  ))}
                </div>
              </details>
            )}
          </div>
        </li>
      ))}
    </ol>
  );
}
