import type { IdeaToLaunchConfig } from './config';

export type StageNumber = 1 | 2 | 3;
export type Stage = StageNumber | 'complete';

export interface BriefState {
  selected: string[];
  /** Result of the last check. Cleared whenever the selection changes. */
  result: 'correct' | 'incorrect' | null;
  hint: boolean;
}

export interface ToolsState {
  /** Task id → chosen tool ('' when nothing is chosen). */
  answers: Record<string, string>;
  /** Task id → whether the checked answer was right. A task loses its entry when its answer changes. */
  checked: Record<string, boolean>;
  solved: boolean;
  hint: boolean;
}

export interface LaunchState {
  order: string[];
  /** Index of the first position that is wrong, or -1 when the whole order is right. Null until checked. */
  firstError: number | null;
  hint: boolean;
}

export interface ChallengeState {
  version: 1;
  stage: Stage;
  brief: BriefState;
  tools: ToolsState;
  launch: LaunchState;
}

export type ChallengeAction =
  | { type: 'toggleChoice'; id: string }
  | { type: 'checkBrief' }
  | { type: 'setTool'; taskId: string; tool: string }
  | { type: 'checkTools' }
  | { type: 'moveStep'; id: string; direction: -1 | 1 }
  | { type: 'checkOrder' }
  | { type: 'showHint'; stage: StageNumber }
  /** `from` guards against stale or repeated clicks: it is ignored unless it matches the current stage. */
  | { type: 'continue'; from: StageNumber }
  | { type: 'reset' };

export function createInitialState(config: IdeaToLaunchConfig): ChallengeState {
  return {
    version: 1,
    stage: 1,
    brief: { selected: [], result: null, hint: false },
    tools: {
      answers: Object.fromEntries(config.tools.tasks.map((task) => [task.id, ''])),
      checked: {},
      solved: false,
      hint: false,
    },
    launch: { order: [...config.launch.initialOrder], firstError: null, hint: false },
  };
}

export function isBriefCorrect(config: IdeaToLaunchConfig, selected: string[]): boolean {
  const helpful = config.brief.choices.filter((choice) => choice.helpful).map((choice) => choice.id);
  return selected.length === helpful.length && helpful.every((id) => selected.includes(id));
}

export function firstOrderError(config: IdeaToLaunchConfig, order: string[]): number {
  return config.launch.steps.findIndex((step, index) => order[index] !== step.id);
}

export function isStageSolved(state: ChallengeState, stage: StageNumber): boolean {
  if (stage === 1) return state.brief.result === 'correct';
  if (stage === 2) return state.tools.solved;
  return state.launch.firstError === -1;
}

export function createReducer(config: IdeaToLaunchConfig) {
  return function reducer(state: ChallengeState, action: ChallengeAction): ChallengeState {
    switch (action.type) {
      case 'toggleChoice': {
        if (state.stage !== 1 || state.brief.result === 'correct') return state;
        if (!config.brief.choices.some((choice) => choice.id === action.id)) return state;
        const isSelected = state.brief.selected.includes(action.id);
        if (!isSelected && state.brief.selected.length >= config.brief.requiredSelections) return state;
        const selected = isSelected
          ? state.brief.selected.filter((id) => id !== action.id)
          : [...state.brief.selected, action.id];
        return { ...state, brief: { ...state.brief, selected, result: null } };
      }
      case 'checkBrief': {
        if (state.stage !== 1 || state.brief.result === 'correct') return state;
        if (state.brief.selected.length !== config.brief.requiredSelections) return state;
        const result = isBriefCorrect(config, state.brief.selected) ? 'correct' : 'incorrect';
        return { ...state, brief: { ...state.brief, result } };
      }
      case 'setTool': {
        if (state.stage !== 2 || state.tools.solved) return state;
        if (!(action.taskId in state.tools.answers)) return state;
        const checked = { ...state.tools.checked };
        delete checked[action.taskId];
        return {
          ...state,
          tools: { ...state.tools, answers: { ...state.tools.answers, [action.taskId]: action.tool }, checked },
        };
      }
      case 'checkTools': {
        if (state.stage !== 2 || state.tools.solved) return state;
        const tasks = config.tools.tasks;
        if (tasks.some((task) => !state.tools.answers[task.id])) return state;
        const checked = Object.fromEntries(tasks.map((task) => [task.id, state.tools.answers[task.id] === task.answer]));
        const solved = tasks.every((task) => checked[task.id]);
        return { ...state, tools: { ...state.tools, checked, solved } };
      }
      case 'moveStep': {
        if (state.stage !== 3 || state.launch.firstError === -1) return state;
        const order = [...state.launch.order];
        const from = order.indexOf(action.id);
        const to = from + action.direction;
        if (from < 0 || to < 0 || to >= order.length) return state;
        [order[from], order[to]] = [order[to], order[from]];
        return { ...state, launch: { ...state.launch, order, firstError: null } };
      }
      case 'checkOrder': {
        if (state.stage !== 3 || state.launch.firstError === -1) return state;
        return { ...state, launch: { ...state.launch, firstError: firstOrderError(config, state.launch.order) } };
      }
      case 'showHint': {
        if (action.stage === 1) return { ...state, brief: { ...state.brief, hint: true } };
        if (action.stage === 2) return { ...state, tools: { ...state.tools, hint: true } };
        return { ...state, launch: { ...state.launch, hint: true } };
      }
      case 'continue': {
        if (state.stage !== action.from || !isStageSolved(state, action.from)) return state;
        const next: Stage = action.from === 3 ? 'complete' : ((action.from + 1) as StageNumber);
        return { ...state, stage: next };
      }
      case 'reset':
        return createInitialState(config);
      default:
        return state;
    }
  };
}

/** How far the example portfolio preview has developed: 0 outline, 1 structured, 2 styled, 3 finished. */
export function previewLevel(state: ChallengeState): 0 | 1 | 2 | 3 {
  if (state.stage === 'complete') return 3;
  if (state.tools.solved) return 2;
  if (state.brief.result === 'correct') return 1;
  return 0;
}

/** Rebuilds a state from unknown saved data. Returns null when the data does not match this configuration. */
export function parseSavedState(config: IdeaToLaunchConfig, raw: unknown): ChallengeState | null {
  if (!raw || typeof raw !== 'object') return null;
  const data = raw as Record<string, unknown>;
  if (data.version !== 1) return null;
  const stage = data.stage;
  if (stage !== 1 && stage !== 2 && stage !== 3 && stage !== 'complete') return null;

  const brief = data.brief as Record<string, unknown> | undefined;
  const tools = data.tools as Record<string, unknown> | undefined;
  const launch = data.launch as Record<string, unknown> | undefined;
  if (!brief || !tools || !launch) return null;

  const choiceIds = config.brief.choices.map((choice) => choice.id);
  const selected = brief.selected;
  if (!Array.isArray(selected) || !selected.every((id) => choiceIds.includes(id))) return null;
  if (new Set(selected).size !== selected.length || selected.length > config.brief.requiredSelections) return null;
  const briefResult = brief.result === 'correct' || brief.result === 'incorrect' ? brief.result : null;

  const answers = tools.answers as Record<string, unknown> | undefined;
  if (!answers || typeof answers !== 'object') return null;
  const cleanAnswers: Record<string, string> = {};
  for (const task of config.tools.tasks) {
    const value = answers[task.id];
    if (value !== '' && !config.tools.tools.includes(value as string)) return null;
    cleanAnswers[task.id] = value as string;
  }

  const order = launch.order;
  const stepIds = config.launch.steps.map((step) => step.id);
  if (!Array.isArray(order) || order.length !== stepIds.length || !stepIds.every((id) => order.includes(id))) return null;

  // Recompute every result from the answers themselves, so saved data cannot claim progress it has not earned.
  const briefOk = briefResult === 'correct' ? isBriefCorrect(config, selected) : true;
  const checked: Record<string, boolean> = {};
  const savedChecked = (tools.checked ?? {}) as Record<string, unknown>;
  for (const task of config.tools.tasks) {
    if (task.id in savedChecked && cleanAnswers[task.id]) checked[task.id] = cleanAnswers[task.id] === task.answer;
  }
  const toolsSolved = config.tools.tasks.every((task) => cleanAnswers[task.id] === task.answer) && tools.solved === true;
  const orderError = typeof launch.firstError === 'number' ? firstOrderError(config, order) : null;

  const state: ChallengeState = {
    version: 1,
    stage,
    brief: { selected: [...selected], result: briefOk ? briefResult : null, hint: brief.hint === true },
    tools: { answers: cleanAnswers, checked, solved: toolsSolved, hint: tools.hint === true },
    launch: { order: [...order], firstError: orderError, hint: launch.hint === true },
  };

  // A saved stage is only valid if every earlier stage is genuinely solved.
  const stageIndex = stage === 'complete' ? 4 : stage;
  for (let earlier = 1; earlier < stageIndex; earlier += 1) {
    if (!isStageSolved(state, earlier as StageNumber)) return null;
  }
  return state;
}
