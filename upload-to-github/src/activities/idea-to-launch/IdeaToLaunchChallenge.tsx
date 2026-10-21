import { useCallback, useEffect, useMemo, useReducer, useRef, useState } from 'react';
import type { IdeaToLaunchConfig } from './config';
import type { ChallengeState, StageNumber } from './state';
import { createInitialState, createReducer, isStageSolved, parseSavedState, previewLevel } from './state';
import { progressStore } from '../../lib/storage';
import { prefersReducedMotion } from '../../lib/router';
import { StageBrief } from './StageBrief';
import { StageTools } from './StageTools';
import { StageLaunch } from './StageLaunch';
import { PortfolioPreview } from './PortfolioPreview';
import { CheckIcon } from '../../components/Icons';

const stageTitles: Record<StageNumber, string> = {
  1: 'Define the brief',
  2: 'Connect the tools',
  3: 'Put the launch in order',
};

function useChallenge(config: IdeaToLaunchConfig) {
  const reducer = useMemo(() => createReducer(config), [config]);
  const [state, dispatch] = useReducer(reducer, config, (cfg): ChallengeState => {
    return parseSavedState(cfg, progressStore.load(cfg.storageKey)) ?? createInitialState(cfg);
  });
  const [saved, setSaved] = useState(true);
  useEffect(() => {
    setSaved(progressStore.save(config.storageKey, state));
  }, [config.storageKey, state]);
  return { state, dispatch, saved };
}

function hasProgress(state: ChallengeState): boolean {
  return state.stage !== 1 || state.brief.selected.length > 0 || state.brief.hint;
}

interface ChallengeProps {
  config: IdeaToLaunchConfig;
  onReadReflection: () => void;
  onShowSlide?: (slideNumber: number) => void;
}

function slideList(numbers: number[]): string {
  return numbers.length > 1 ? `slides ${numbers.slice(0, -1).join(', ')} and ${numbers[numbers.length - 1]}` : `slide ${numbers[0]}`;
}

export function IdeaToLaunchChallenge({ config, onReadReflection, onShowSlide }: ChallengeProps) {
  const { state, dispatch, saved } = useChallenge(config);
  const [announcement, setAnnouncement] = useState('');
  const stageHeading = useRef<HTMLHeadingElement>(null);
  const previousStage = useRef(state.stage);

  const announce = useCallback((message: string) => {
    // Clear first so an identical message is still read out.
    setAnnouncement('');
    window.setTimeout(() => setAnnouncement(message), 60);
  }, []);

  // Move focus to the new stage heading when the stage changes (not on first render).
  useEffect(() => {
    if (previousStage.current !== state.stage) {
      previousStage.current = state.stage;
      showStageStart();
    }
  }, [state.stage]);

  function showStageStart() {
    const heading = stageHeading.current;
    if (!heading) return;
    heading.focus({ preventScroll: true });
    // Bring the top of the panel into view when the new stage starts out of sight.
    const panelTop = (heading.closest('.panel') ?? heading).getBoundingClientRect().top;
    if (panelTop < 0 || panelTop > window.innerHeight * 0.6) {
      window.scrollTo({ top: window.scrollY + panelTop - 24, behavior: prefersReducedMotion() ? 'auto' : 'smooth' });
    }
  }

  const reset = () => {
    progressStore.clear(config.storageKey);
    dispatch({ type: 'reset' });
    announce('The challenge has been reset to stage one.');
    // Stage might already be 1, so focus explicitly.
    window.setTimeout(showStageStart, 0);
  };

  const level = previewLevel(state);
  const stageNumbers: StageNumber[] = [1, 2, 3];

  return (
    <section id="challenge" className="challenge" aria-labelledby="challenge-title">
      <div className="wrap">
        <div className="challenge__header">
          <div>
            <p className="eyebrow eyebrow--light">Two-minute challenge · No timer</p>
            <h2 id="challenge-title" className="challenge__title" tabIndex={-1}>
              Take a portfolio from idea to launch
            </h2>
          </div>
          <p className="challenge__intro">{config.intro}</p>
        </div>

        <ol className="stepper" aria-label="Challenge progress">
          {stageNumbers.map((number) => {
            const done = state.stage === 'complete' || (number < state.stage && isStageSolved(state, number));
            const current = state.stage === number;
            return (
              <li key={number} className={`stepper__item${current ? ' is-current' : ''}${done ? ' is-done' : ''}`} aria-current={current ? 'step' : undefined}>
                <span className="stepper__marker" aria-hidden="true">
                  {done ? <CheckIcon /> : number}
                </span>
                <span>
                  <span className="stepper__label">Stage {number}</span>
                  <span className="stepper__title">{stageTitles[number]}</span>
                  <span className="visually-hidden">{done ? ', completed' : current ? ', current' : ''}</span>
                </span>
              </li>
            );
          })}
        </ol>

        <div className="challenge__grid">
          <div className="panel" key={String(state.stage)}>
            {state.stage === 'complete' ? (
              <div className="completion">
                <p className="panel__label">Challenge complete</p>
                <h3 ref={stageHeading} tabIndex={-1} className="panel__title">
                  From idea to launch
                </h3>
                <ul className="completion__recap">
                  {config.completion.recap.map((line) => (
                    <li key={line}>{line}</li>
                  ))}
                </ul>
                <p className="completion__note">{config.completion.note}</p>
                <div className="actions">
                  <button type="button" className="button button--primary" onClick={onReadReflection}>
                    Read my reflection
                  </button>
                  <button type="button" className="button button--secondary" onClick={reset}>
                    Try again
                  </button>
                </div>
              </div>
            ) : (
              <>
                <p className="panel__label">
                  Stage {state.stage} of 3
                </p>
                <h3 ref={stageHeading} tabIndex={-1} className="panel__title">
                  {stageTitles[state.stage]}
                </h3>
                {onShowSlide && config.stageSlides?.[state.stage] && (
                  <p className="slide-ref">
                    <span>From the session:</span>
                    <button type="button" className="text-button" onClick={() => onShowSlide(config.stageSlides![state.stage as StageNumber]![0])}>
                      Revisit {slideList(config.stageSlides[state.stage]!)}
                    </button>
                  </p>
                )}
                {state.stage === 1 && <StageBrief config={config} state={state} dispatch={dispatch} announce={announce} />}
                {state.stage === 2 && <StageTools config={config} state={state} dispatch={dispatch} announce={announce} />}
                {state.stage === 3 && <StageLaunch config={config} state={state} dispatch={dispatch} announce={announce} />}
              </>
            )}
          </div>

          <div className="challenge__preview">
            <PortfolioPreview level={level} />
          </div>
        </div>

        <div className="challenge__footer">
          <p>
            {saved
              ? 'Your progress in this challenge is saved in this browser only. No account, and nothing personal.'
              : 'Your progress is kept for this visit only, because this browser is not allowing local storage.'}
          </p>
          {hasProgress(state) && state.stage !== 'complete' && (
            <button type="button" className="text-button text-button--light" onClick={reset}>
              Start over
            </button>
          )}
        </div>

        <p className="visually-hidden" aria-live="polite" aria-atomic="true">
          {announcement}
        </p>
      </div>
    </section>
  );
}
