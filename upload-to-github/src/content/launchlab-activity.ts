import type { IdeaToLaunchConfig } from '../activities/idea-to-launch/config';

export const launchLabActivity: IdeaToLaunchConfig = {
  storageKey: 'beyond-the-talk:launchlab:idea-to-launch:v1',
  intro:
    'This is a short learning simulation, not a real website builder. In three stages, you will help an example portfolio move from a vague request to a launch route. Nothing is generated or published.',
  brief: {
    startingPrompt: 'Create a portfolio website for me.',
    question: 'Which three additions would make this brief more useful?',
    requiredSelections: 3,
    choices: [
      {
        id: 'audience',
        label: 'Audience and goal',
        text: 'Marketing recruiters should understand my work and thinking.',
        helpful: true,
        feedback: 'Helps. Naming who the website is for, and what they should take away, gives every later decision a purpose.',
        promptSentence: 'It is for marketing recruiters, who should come away understanding my work and how I think.',
      },
      {
        id: 'content',
        label: 'Content',
        text: 'Include a short introduction, selected projects, and clear project explanations.',
        helpful: true,
        feedback: 'Helps. Listing the content tells the tool which sections to build, instead of leaving it to invent them.',
        promptSentence: 'Include a short introduction, a selection of projects, and a clear explanation of each project.',
      },
      {
        id: 'design',
        label: 'Design and behaviour',
        text: 'Use an editorial layout, readable typography, and navigation that works on mobile.',
        helpful: true,
        feedback: 'Helps. A visual direction and expected behaviour describe how the website should look and work, not only what it contains.',
        promptSentence: 'Use an editorial layout with readable typography, and make the navigation work well on mobile.',
      },
      {
        id: 'praise',
        label: 'Vague praise',
        text: 'Make it amazing, beautiful, and the best website ever.',
        helpful: false,
        feedback: 'Does not help much. Words like "amazing" express a hope, but they do not tell the tool what to build or who it is for.',
      },
      {
        id: 'accounts',
        label: 'Unnecessary requirements',
        text: 'Require every visitor to create an account before viewing any work.',
        helpful: false,
        feedback:
          'Does not fit this goal. Some websites need accounts, but a portfolio for recruiters works best when the work is easy to see, and accounts add a backend and extra steps.',
      },
    ],
    hint: 'Look for the additions that answer three questions: who is this for, what should it contain, and how should it look and behave?',
    improvedPromptLead: 'Create a portfolio website for me.',
  },
  tools: {
    framing:
      'Match each task to the tool used for it in the workflow from the session. These products can do more than this, and other tools could do these jobs too.',
    tools: ['Claude Design', 'Claude Code', 'GitHub', 'Vercel'],
    tasks: [
      {
        id: 'visual',
        task: 'Shape the visual direction',
        answer: 'Claude Design',
        correction: 'In this workflow, the look of the website is shaped first, before any code is written.',
      },
      {
        id: 'code',
        task: 'Implement and refine the website code',
        answer: 'Claude Code',
        correction: 'In this workflow, the design is handed to a coding tool that writes and refines the actual files.',
      },
      {
        id: 'source',
        task: 'Store the source code and track changes',
        answer: 'GitHub',
        correction: 'This task needs a repository: a place that keeps every file and the history of its changes.',
      },
      {
        id: 'host',
        task: 'Build and host the website from a connected repository',
        answer: 'Vercel',
        correction: 'This task needs a hosting service that reads a connected repository and serves the result at a public address.',
      },
    ],
    hint: 'Think in order: first how it looks, then the code that makes it work, then where the code is kept, and finally what puts it online.',
    alternativeNote:
      'Lovable was also discussed as another building route. It can create a project and keep it connected to GitHub, which changes how some of these steps happen.',
    recap: 'Design shapes the look, code makes it work, the repository keeps the source safe, and hosting makes it reachable.',
  },
  launch: {
    framing: 'For this challenge, use the GitHub-to-Vercel route discussed in the session.',
    steps: [
      {
        id: 'brief',
        text: 'Write the brief and establish the design direction.',
        dependency: 'Everything later depends on knowing what you are building and how it should look, so the brief comes first.',
      },
      {
        id: 'build',
        text: 'Build and check the website locally.',
        dependency: 'There needs to be a working website, checked on your own computer, before there is source code worth saving.',
      },
      {
        id: 'push',
        text: 'Commit the source and push it to GitHub.',
        dependency: 'Vercel deploys from a repository, so the source has to be committed and pushed to GitHub before it can be connected.',
      },
      {
        id: 'deploy',
        text: 'Connect the repository to Vercel and deploy.',
        dependency: 'There is no live link to open until the repository is connected and a deployment has run.',
      },
      {
        id: 'verify',
        text: 'Open the deployed link and check the live experience.',
        dependency: 'Checking the live experience is the final step, once a deployment exists.',
      },
    ],
    initialOrder: ['push', 'verify', 'brief', 'deploy', 'build'],
    hint: 'Building creates the files. GitHub stores them. Vercel builds and hosts the website from what GitHub stores. Only then is there a live link to check.',
  },
  stageSlides: { 1: [5, 6], 2: [12, 19], 3: [20, 21] },
  completion: {
    recap: ['Clear brief.', 'Connected tools.', 'A route from idea to launch.'],
    note: 'The example portfolio is a simulation. No real website was built or published.',
  },
};
