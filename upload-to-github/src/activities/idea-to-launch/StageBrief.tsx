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

export function StageBrief({ config, state, dispatch, announce }: StageProps) {
  const { brief } = config;
  const { selected, result, hint } = state.brief;
  const solved = result === 'correct';
  const full = selected.length >= brief.requiredSelections;
  const helpfulCount = selected.filter((id) => brief.choices.find((choice) => choice.id === id)?.helpful).length;

  const check = () => {
    dispatch({ type: 'checkBrief' });
    const correct = helpfulCount === brief.requiredSelections;
    announce(
      correct
        ? 'All three additions help. The improved brief is shown below.'
        : `${helpfulCount} of your three additions help this brief. Read the notes under each choice, change one, and check again.`,
    );
  };

  const improvedPrompt = [
    brief.improvedPromptLead,
    ...brief.choices.filter((choice) => choice.helpful && selected.includes(choice.id)).map((choice) => choice.promptSentence),
  ].join(' ');

  return (
    <>
      <div className="prompt-card">
        <p className="prompt-card__label">Starting prompt</p>
        <p className="prompt-card__text">{brief.startingPrompt}</p>
      </div>

      <fieldset className="choices" disabled={solved}>
        <legend className="choices__legend">{brief.question}</legend>
        <p className="choices__count" id="brief-count">
          {selected.length} of {brief.requiredSelections} chosen
          {full && !solved && result === null ? '. Remove one to choose a different addition.' : ''}
        </p>
        <ul>
          {brief.choices.map((choice) => {
            const isSelected = selected.includes(choice.id);
            const showFeedback = result !== null && isSelected;
            return (
              <li key={choice.id} className={`choice${isSelected ? ' is-selected' : ''}`}>
                <label className="choice__label">
                  <input
                    type="checkbox"
                    checked={isSelected}
                    disabled={!isSelected && full}
                    aria-describedby="brief-count"
                    onChange={() => dispatch({ type: 'toggleChoice', id: choice.id })}
                  />
                  <span className="choice__box" aria-hidden="true" />
                  <span>
                    <strong>{choice.label}:</strong> {choice.text}
                  </span>
                </label>
                {showFeedback && (
                  <p className={`feedback ${choice.helpful ? 'feedback--good' : 'feedback--off'}`}>
                    {choice.helpful ? <CheckIcon /> : <CrossIcon />}
                    <span>{choice.feedback}</span>
                  </p>
                )}
              </li>
            );
          })}
        </ul>
      </fieldset>

      {hint && !solved && (
        <p className="hint">
          <HintIcon />
          <span>
            <strong>Hint.</strong> {brief.hint}
          </span>
        </p>
      )}

      {result === 'incorrect' && (
        <p className="status status--off">
          <CrossIcon />
          <span>
            {helpfulCount} of your three additions help this brief. Your choices are kept; swap one and check again.
          </span>
        </p>
      )}

      {solved ? (
        <div className="result">
          <p className="status status--good">
            <CheckIcon />
            <span>All three additions help. Here is the brief they create.</span>
          </p>
          <div className="prompt-card prompt-card--improved">
            <p className="prompt-card__label">Improved prompt</p>
            <p className="prompt-card__text">{improvedPrompt}</p>
          </div>
          <div className="actions">
            <button type="button" className="button button--primary" onClick={() => dispatch({ type: 'continue', from: 1 })}>
              Continue to stage two
            </button>
          </div>
        </div>
      ) : (
        <div className="actions">
          <button type="button" className="button button--primary" disabled={!full || result !== null} onClick={check}>
            Check brief
          </button>
          {!hint && (
            <button type="button" className="button button--quiet" onClick={() => dispatch({ type: 'showHint', stage: 1 })}>
              Show a hint
            </button>
          )}
        </div>
      )}
    </>
  );
}
