import { focusElement, prefersReducedMotion } from '../lib/router';

export function Footer() {
  const backToTop = () => {
    window.scrollTo({ top: 0, behavior: prefersReducedMotion() ? 'auto' : 'smooth' });
    focusElement(document.querySelector<HTMLElement>('.wordmark'), false);
  };

  return (
    <footer className="site-footer">
      <div className="wrap site-footer__inner">
        <div>
          <p className="site-footer__title">Beyond the Talk</p>
          <p className="site-footer__byline">A learning journal by Shaswati Das</p>
        </div>
        <button type="button" className="text-button" onClick={backToTop}>
          Return to top
          <svg aria-hidden="true" width="16" height="16" viewBox="0 0 16 16">
            <path d="M8 13V3M3.5 7.5 8 3l4.5 4.5" fill="none" stroke="currentColor" strokeWidth="1.6" />
          </svg>
        </button>
      </div>
    </footer>
  );
}
