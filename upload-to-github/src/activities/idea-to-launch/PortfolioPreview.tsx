/** A stylised, fictional miniature portfolio that develops as the visitor completes each stage. */

const captions = [
  'A vague request produces only a basic outline.',
  'A clearer brief gives it a real structure.',
  'Connected tools turn the structure into a designed, working page.',
  'Finished and checked. This is a simulated launch; nothing was published.',
];

const stageNames = ['Outline', 'Structured', 'Designed', 'Finished'];

const projects = [
  { title: 'Campaign concept', note: 'From audience insight to a launch idea.' },
  { title: 'Audience research', note: 'What the survey showed, and why it mattered.' },
  { title: 'Brand story', note: 'Rewriting a brand voice for a younger audience.' },
];

export function PortfolioPreview({ level }: { level: 0 | 1 | 2 | 3 }) {
  return (
    <figure className="preview" data-level={level}>
      <figcaption className="preview__caption">
        <span className="preview__label">Example portfolio</span>
        <span className="preview__stage">
          <span className="visually-hidden">Preview stage: </span>
          {stageNames[level]}
        </span>
      </figcaption>
      <div className="preview__frame" aria-hidden="true">
        <div className="preview__chrome">
          <span />
          <span />
          <span />
        </div>
        <div className="preview__page">
          {level === 0 ? (
            <div className="mini mini--outline">
              <p className="mini__plain-title">My portfolio</p>
              <span className="mini__line" />
              <span className="mini__line mini__line--short" />
              <span className="mini__box" />
              <span className="mini__line" />
            </div>
          ) : (
            <div className={`mini${level >= 2 ? ' mini--styled' : ' mini--structured'}`}>
              <div className="mini__nav">
                <span className="mini__brand">Jordan Lee</span>
                <span className="mini__links">
                  <span>Introduction</span>
                  <span>Projects</span>
                  <span>About</span>
                </span>
              </div>
              <div className="mini__hero">
                <p className="mini__kicker">Marketing portfolio</p>
                <p className="mini__title">Ideas that start with the audience.</p>
                <p className="mini__intro">A short introduction to my work and how I think about it.</p>
              </div>
              <p className="mini__section">Selected projects</p>
              <div className="mini__projects">
                {projects.map((project) => (
                  <div key={project.title} className="mini__project">
                    <span className="mini__thumb" />
                    <span className="mini__project-title">{project.title}</span>
                    {level >= 2 && <span className="mini__project-note">{project.note}</span>}
                  </div>
                ))}
              </div>
              {level === 3 && (
                <div className="mini__footer">
                  <span>Checked on desktop and mobile</span>
                  <span className="mini__badge">Simulated launch</span>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
      <p className="preview__note">{captions[level]}</p>
    </figure>
  );
}
