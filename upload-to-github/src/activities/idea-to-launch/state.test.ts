import { describe, expect, it } from 'vitest';
import { launchLabActivity as config } from '../../content/launchlab-activity';
import { createInitialState, createReducer, firstOrderError, parseSavedState, previewLevel } from './state';
import type { ChallengeAction, ChallengeState } from './state';

const reducer = createReducer(config);
const run = (actions: ChallengeAction[], from: ChallengeState = createInitialState(config)) =>
  actions.reduce(reducer, from);

const correctBrief: ChallengeAction[] = ['audience', 'content', 'design'].map((id) => ({ type: 'toggleChoice', id }));
const correctTools: ChallengeAction[] = config.tools.tasks.map((task) => ({ type: 'setTool', taskId: task.id, tool: task.answer }));

function solveOrder(state: ChallengeState): ChallengeState {
  // Bubble each step into place using only the public move action.
  let next = state;
  config.launch.steps.forEach((step, target) => {
    while (next.launch.order.indexOf(step.id) > target) next = reducer(next, { type: 'moveStep', id: step.id, direction: -1 });
  });
  return next;
}

describe('stage one: the brief', () => {
  it('allows at most three selections', () => {
    const state = run([...correctBrief, { type: 'toggleChoice', id: 'praise' }]);
    expect(state.brief.selected).toEqual(['audience', 'content', 'design']);
  });

  it('marks a wrong brief incorrect, keeps the selection, and clears feedback on change', () => {
    let state = run([
      { type: 'toggleChoice', id: 'audience' },
      { type: 'toggleChoice', id: 'praise' },
      { type: 'toggleChoice', id: 'design' },
      { type: 'checkBrief' },
    ]);
    expect(state.brief.result).toBe('incorrect');
    expect(state.brief.selected).toHaveLength(3);
    state = reducer(state, { type: 'toggleChoice', id: 'praise' });
    expect(state.brief.result).toBeNull();
  });

  it('does not continue before the brief is correct, and ignores repeated continue clicks', () => {
    expect(run([{ type: 'continue', from: 1 }]).stage).toBe(1);
    const solved = run([...correctBrief, { type: 'checkBrief' }]);
    expect(solved.brief.result).toBe('correct');
    const once = reducer(solved, { type: 'continue', from: 1 });
    const twice = reducer(once, { type: 'continue', from: 1 });
    expect(once.stage).toBe(2);
    expect(twice.stage).toBe(2);
  });
});

describe('stage two: the tools', () => {
  const atStageTwo = run([...correctBrief, { type: 'checkBrief' }, { type: 'continue', from: 1 }]);

  it('keeps correct matches and clears only the edited answer feedback', () => {
    let state = run(
      [
        { type: 'setTool', taskId: 'visual', tool: 'Claude Design' },
        { type: 'setTool', taskId: 'code', tool: 'GitHub' },
        { type: 'setTool', taskId: 'source', tool: 'Claude Code' },
        { type: 'setTool', taskId: 'host', tool: 'Vercel' },
        { type: 'checkTools' },
      ],
      atStageTwo,
    );
    expect(state.tools.solved).toBe(false);
    expect(state.tools.checked).toEqual({ visual: true, code: false, source: false, host: true });
    state = reducer(state, { type: 'setTool', taskId: 'code', tool: 'Claude Code' });
    expect(state.tools.checked.code).toBeUndefined();
    expect(state.tools.checked.visual).toBe(true);
    expect(reducer(state, { type: 'continue', from: 2 }).stage).toBe(2);
  });

  it('solves when every match is right', () => {
    const state = run([...correctTools, { type: 'checkTools' }], atStageTwo);
    expect(state.tools.solved).toBe(true);
    expect(previewLevel(state)).toBe(2);
  });
});

describe('stage three: the launch order', () => {
  const atStageThree = run(
    [...correctBrief, { type: 'checkBrief' }, { type: 'continue', from: 1 }, ...correctTools, { type: 'checkTools' }, { type: 'continue', from: 2 }],
  );

  it('starts in a nontrivial order', () => {
    expect(firstOrderError(config, atStageThree.launch.order)).toBe(0);
  });

  it('reports the first wrong position and clears it after a move', () => {
    let state = reducer(atStageThree, { type: 'checkOrder' });
    expect(state.launch.firstError).toBe(0);
    state = reducer(state, { type: 'moveStep', id: 'brief', direction: -1 });
    expect(state.launch.firstError).toBeNull();
  });

  it('completes only after a correct check', () => {
    const ordered = solveOrder(atStageThree);
    expect(reducer(ordered, { type: 'continue', from: 3 }).stage).toBe(3);
    const checked = reducer(ordered, { type: 'checkOrder' });
    expect(checked.launch.firstError).toBe(-1);
    const done = reducer(checked, { type: 'continue', from: 3 });
    expect(done.stage).toBe('complete');
    expect(previewLevel(done)).toBe(3);
    expect(reducer(done, { type: 'reset' })).toEqual(createInitialState(config));
  });
});

describe('saved progress', () => {
  it('restores a valid saved state', () => {
    const state = run([...correctBrief, { type: 'checkBrief' }, { type: 'continue', from: 1 }]);
    expect(parseSavedState(config, JSON.parse(JSON.stringify(state)))).toEqual(state);
  });

  it('rejects corrupted or unearned saved data', () => {
    expect(parseSavedState(config, null)).toBeNull();
    expect(parseSavedState(config, 'nonsense')).toBeNull();
    expect(parseSavedState(config, { version: 2 })).toBeNull();
    const fake = { ...createInitialState(config), stage: 'complete' };
    expect(parseSavedState(config, fake)).toBeNull();
    const bogusChoice = { ...createInitialState(config), brief: { selected: ['hack'], result: null, hint: false } };
    expect(parseSavedState(config, bogusChoice)).toBeNull();
  });
});
