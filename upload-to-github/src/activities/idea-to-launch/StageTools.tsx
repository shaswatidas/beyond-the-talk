import type { Dispatch } from 'react';
import type { IdeaToLaunchConfig } from './config';
import type { ChallengeAction, ChallengeState } from './state';
import { CheckIcon, CrossIcon, HintIcon } from '../../components/Icons';

interface StageProps {
  config: IdeaToLaunchConfig;
  state: ChallengeState;
  dispatch: Dispatch<ChallengeAction>;
  announce: (message: string) => void;
}

export function StageTools({ config, state, dispatch, announce }: StageProps) {
  const { tools } = config;
  const { answers, checked, solved, hint } = state.tools;
  const allAnswered = tools.tasks.every((task) => answers[task.id]);
  const hasUncheckedChange = tools.tasks.some((task) => !(task.id in checked));
  const checkedCount = Object.keys(checked).length;
  const rightCount = tools.tasks.filter((task) => checked[task.id]).length;

  const check = () => {
    const right = tools.tasks.filter((task) => answers[task.id] === task.answer).length;
    dispatch({ type: 'checkTools' });
    announce(
      right === tools.tasks.length
        ? 'All four matches are right.'
        : `${right} of ${tools.tasks.length} matches are right. The notes explain the others.`,
    );
  };

  return (
    <>
      <p className="stage-note">{tools.framing}</p>

      <ul className="matches">
        {tools.tasks.map((task, index) => {
          const id = `tool-${task.id}`;
          const status = checked[task.id];
          return (
            <li key={task.id} className="match">
              <label htmlFor={id} className="match__task">
                <span className="match__index" aria-hidden="true">
                  {index + 1}
                </span>
                {task.task}
              </label>
              <select
                id={id}
                value={answers[task.id]}
                disabled={solved}
                aria-describedby={status === undefined ? undefined : `${id}-feedback`}
                onChange={(event) => dispatch({ type: 'setTool', taskId: task.id, tool: event.target.value })}
              >
                <option value="">Choose a tool</option>
                {tools.tools.map((tool) => (
                  <option key={tool} value={tool}>
                    {tool}
                  </option>
                ))}
              </select>
              {status !== undefined && (
                <p id={`${id}-feedback`} className={`feedback ${status ? 'feedback--good' : 'feedback--off'}`}>
                  {status ? <CheckIcon /> : <CrossIcon />}
                  <span>{status ? 'Right match.' : `Not this one. ${task.correction}`}</span>
                </p>
              )}
            </li>
          );
        })}
      </ul>

      <details className="disclosure disclosure--inline">
        <summary>
          <span>Another route from the session</span>
          <svg aria-hidden="true" width="14" height="14" viewBox="0 0 14 14">
            <path d="M3 5.5 7 9.5l4-4" fill="none" stroke="currentColor" strokeWidth="1.6" />
          </svg>
        </summary>
        <div className="disclosure__content">
          <p>{tools.alternativeNote}</p>
        </div>
      </details>

      {hint && !solved && (
        <p className="hint">
          <HintIcon />
          <span>
            <strong>Hint.</strong> {tools.hint}
          </span>
        </p>
      )}

      {!solved && checkedCount === tools.tasks.length && rightCount < tools.tasks.length && (
        <p className="status status--off">
          <CrossIcon />
          <span>
            {rightCount} of {tools.tasks.length} matches are right. Your correct matches are kept; change the others and
            check again.
          </span>
        </p>
      )}

      {solved ? (
        <div className="result">
          <p className="status status--good">
            <CheckIcon />
            <span>
              <strong>All four connected.</strong> {tools.recap}
            </span>
          </p>
          <div className="actions">
            <button type="button" className="button button--primary" onClick={() => dispatch({ type: 'continue', from: 2 })}>
              Continue to stage three
            </button>
          </div>
        </div>
      ) : (
        <div className="actions">
          <button type="button" className="button button--primary" disabled={!allAnswered || !hasUncheckedChange} onClick={check}>
            Check matches
          </button>
          {!hint && (
            <button type="button" className="button button--quiet" onClick={() => dispatch({ type: 'showHint', stage: 2 })}>
              Show a hint
            </button>
          )}
        </div>
      )}
    </>
  );
}
