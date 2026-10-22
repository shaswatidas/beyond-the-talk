import type { ReactNode } from 'react';

/** The four full-bleed grounds. Each sets its own text, label, rule, focus, and button colours in CSS. */
export type Ground = 'cream' | 'oat' | 'wine' | 'bordeaux';

interface SectionProps {
  ground: Ground;
  /** Vertical margin label in the 64px rail. Decorative: the section's heading carries the meaning. */
  rail?: string;
  id?: string;
  labelledBy?: string;
  className?: string;
  children: ReactNode;
}

/** A full-bleed coloured band with the [rail | content] editorial grid. */
export function Section({ ground, rail, id, labelledBy, className = '', children }: SectionProps) {
  return (
    <section id={id} className={`ground ground--${ground} ${className}`.trim()} aria-labelledby={labelledBy}>
      <div className="frame">
        <div className="rail" aria-hidden="true">
          {rail && <span className="rail__label">{rail}</span>}
        </div>
        <div className="frame__content">{children}</div>
      </div>
    </section>
  );
}

/** Sets the `accent` part of `text` in the script face. Screen readers read the sentence unchanged. */
export function Flourish({ text, accent }: { text: string; accent?: string }) {
  const at = accent ? text.lastIndexOf(accent) : -1;
  if (!accent || at < 0) return <>{text}</>;
  return (
    <>
      {text.slice(0, at)}
      <span className="script">{accent}</span>
      {text.slice(at + accent.length)}
    </>
  );
}

/** Huge outlined index numeral placed behind a heading. */
export function Ghost({ children, className = '' }: { children: ReactNode; className?: string }) {
  return (
    <span className={`ghost ${className}`.trim()} aria-hidden="true">
      {children}
    </span>
  );
}
