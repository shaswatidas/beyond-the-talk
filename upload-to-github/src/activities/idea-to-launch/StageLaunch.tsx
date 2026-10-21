import { useLayoutEffect, useRef, type Dispatch } from 'react';
import type { IdeaToLaunchConfig } from './config';
import type { ChallengeAction, ChallengeState } from './state';
import { firstOrderError } from './state';
import { ArrowIcon, CheckIcon, CrossIcon, HintIcon } from '../../components/Icons';

interface StageProps {
  config: IdeaToLaunchConfig;
  state: ChallengeState;
  dispatch: Dispatch<ChallengeAction>;
  announce: (message: string) => void;
}

export function StageLaunch({ config, state, dispatch, announce }: StageProps) {
  const { launch } = config;
  const { order, firstError, hint } = state.launch;
  const solved = firstError === -1;
  const stepById = (id: string) => launch.steps.find((step) => step.id === id)!;
  const listRef = useRef<HTMLOListElement>(null);
  const pendingFocus = useRef<{ id: string; direction: 'up' | 'down' } | null>(null);

  // After a move, keep focus on the moved step, switching to its other button if this one is now at an end.
  useLayoutEffect(() => {
    const pending = pendingFocus.current;
    if (!pending || !listRef.current) return;
    pendingFocus.current = null;
    const item = listRef.current.querySelector<HTMLElement>(`[data-step="${pending.id}"]`);
    const preferred = item?.querySelector<HTMLButtonElement>(`[data-direction="${pending.direction}"]`);
    const other = item?.querySelector<HTMLButtonElement>(`[data-direction="${pending.direction === 'up' ? 'down' : 'up'}"]`);
    (preferred && !preferred.disabled ? preferred : other)?.focus();
  }, [order]);

  const move = (id: string, direction: 'up' | 'down') => {
    const from = order.indexOf(id);
    const to = direction === 'up' ? from - 1 : from + 1;
    pendingFocus.current = { id, direction };
    dispatch({ type: 'moveStep', id, direction: direction === 'up' ? -1 : 1 });
    announce(`Moved to position ${to + 1} of ${order.length}.`);
  };

  const check = () => {
    const error = firstOrderError(config, order);
    dispatch({ type: 'checkOrder' });
    announce(error === -1 ? 'The route is in order.' : `Position ${error + 1} needs another look. The explanation is below the steps.`);
  };

  const errorStep = firstError !== null && firstError >= 0 ? launch.steps[firstError] : null;

  return (
    <>
      <p className="stage-note">
        <strong>{launch.framing}</strong> Put the five steps in the order they would happen, using the Move up and Move
        down buttons.
      </p>

      <ol className="sequence" ref={listRef}>
        {order.map((id, index) => {
          const step = stepById(id);
          const flagged = firstError === index;
          return (
            <li key={id} data-step={id} className={`sequence__item${flagged ? ' is-flagged' : ''}${solved ? ' is-done' : ''}`}>
              <span className="sequence__position" aria-hidden="true">
                {index + 1}
              </span>
              <span className="sequence__text">
                {step.text}
                {flagged && <span className="sequence__flag"> (check this position)</span>}
              </span>
              {!solved && (
                <span className="sequence__controls">
                  <button
                    type="button"
                    className="icon-button"
                    data-direction="up"
                    disabled={index === 0}
                    aria-label={`Move up: ${step.text}`}
                    onClick={() => move(id, 'up')}
                  >
                    <ArrowIcon direction="up" />
                  </button>
                  <button
                    type="button"
                    className="icon-button"
                    data-direction="down"
                    disabled={index === order.length - 1}
                    aria-label={`Move down: ${step.text}`}
                    onClick={() => move(id, 'down')}
                  >
                    <ArrowIcon direction="down" />
                  </button>
                </span>
              )}
            </li>
          );
        })}
      </ol>

      {hint && !solved && (
        <p className="hint">
          <HintIcon />
          <span>
            <strong>Hint.</strong> {launch.hint}
          </span>
        </p>
      )}

      {errorStep && (
        <p className="status status--off">
          <CrossIcon />
          <span>
            <strong>Not quite yet.</strong> Position {firstError! + 1} should be &ldquo;{errorStep.text}&rdquo;{' '}
            {errorStep.dependency} Your order is kept, so you can adjust it and check again.
          </span>
        </p>
      )}

      {solved ? (
        <div className="result">
          <p className="status status--good">
            <CheckIcon />
            <span>The route is in order, from the first brief to checking the live experience.</span>
          </p>
          <div className="actions">
            <button type="button" className="button button--primary" onClick={() => dispatch({ type: 'continue', from: 3 })}>
              See the finished example
            </button>
          </div>
        </div>
      ) : (
        <div className="actions">
          <button type="button" className="button button--primary" disabled={firstError !== null} onClick={check}>
            Check order
          </button>
          {!hint && (
            <button type="button" className="button button--quiet" onClick={() => dispatch({ type: 'showHint', stage: 3 })}>
              Show a hint
            </button>
          )}
        </div>
      )}
    </>
  );
}
