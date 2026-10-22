import { focusElement, prefersReducedMotion } from '../lib/router';

export function Footer() {
  const backToTop = () => {
    window.scrollTo({ top: 0, behavior: prefersReducedMotion() ? 'auto' : 'smooth' });
    focusElement(document.querySelector<HTMLElement>('.wordmark'), false);
  };

  return (
    <footer className="site-footer ground ground--wine">
      <div className="container site-footer__inner">
        <div>
          <p className="site-footer__title">
            Beyond the <em>Talk</em>
          </p>
          <p className="site-footer__byline">A learning journal by Shaswati Das</p>
        </div>
        <button type="button" className="text-button" onClick={backToTop}>
          Return to top <span aria-hidden="true">↑</span>
        </button>
      </div>
    </footer>
  );
}
