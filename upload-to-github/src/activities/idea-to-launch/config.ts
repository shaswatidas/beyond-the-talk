/** Content for the three-stage "idea to launch" activity. Kept as data so it can be reused or adjusted. */

export interface BriefChoice {
  id: string;
  label: string;
  text: string;
  helpful: boolean;
  /** Shown after checking, explaining why this addition does or does not help this brief. */
  feedback: string;
  /** Sentence added to the improved prompt when this choice is part of the correct brief. */
  promptSentence?: string;
}

export interface ToolTask {
  id: string;
  task: string;
  answer: string;
  /** Shown when the match is wrong. */
  correction: string;
}

export interface LaunchStep {
  id: string;
  text: string;
  /** Explains why this step has to come at its position in the route. */
  dependency: string;
}

export interface IdeaToLaunchConfig {
  /** Versioned localStorage key, specific to this session. */
  storageKey: string;
  intro: string;
  brief: {
    startingPrompt: string;
    question: string;
    requiredSelections: number;
    choices: BriefChoice[];
    hint: string;
    improvedPromptLead: string;
  };
  tools: {
    framing: string;
    tools: string[];
    tasks: ToolTask[];
    hint: string;
    alternativeNote: string;
    recap: string;
  };
  launch: {
    framing: string;
    /** Steps in the correct order. */
    steps: LaunchStep[];
    /** Step ids in the order first shown to the visitor. */
    initialOrder: string[];
    hint: string;
  };
  completion: {
    recap: string[];
    note: string;
  };
  /** Optional slide numbers (1-based) from the session deck that each stage builds on. */
  stageSlides?: Partial<Record<1 | 2 | 3, number[]>>;
}
