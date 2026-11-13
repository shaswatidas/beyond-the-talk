import type { FlashcardsConfig } from '../activities/flashcards/config';

/** The six roles from Nick Goh's workflow, as a small deck of flip cards. */
export const nickGohFlashcards: FlashcardsConfig = {
  storageKey: 'btt:flashcards:ai-marketing-team:v1',
  eyebrow: 'Review the team',
  heading: 'Six roles, six cards',
  headingAccent: 'six cards',
  intro: 'Tap a card to flip it — the front names the role; the back is what it does and what it hands on.',
  cards: [
    {
      team: 'Planning',
      term: 'Brief Writer',
      definition: 'Drafts the brief from the Project context.',
      output: 'a draft brief',
    },
    {
      team: 'Planning',
      term: 'Brief Validator',
      definition: 'Critiques the brief in a fresh chat — objective, audience, message, metric.',
      output: 'a verdict and the top fixes',
    },
    {
      team: 'Planning',
      term: 'Strategist',
      definition: 'Digests the validated brief and shapes the Big Idea.',
      output: 'a Big Idea one-pager',
    },
    {
      team: 'Production',
      term: 'Designer / Art Director',
      definition: 'Turns the Big Idea into key visuals, animated in Higgsfield.',
      output: 'key-visual concepts and assets',
    },
    {
      team: 'Production',
      term: 'Copywriter',
      definition: 'Builds the messaging hierarchy — one Big Idea, adapted for each platform.',
      output: 'channel-by-channel copy',
    },
    {
      team: 'Production',
      term: 'Reviewer',
      definition: 'Checks every piece against the brand voice before it ships.',
      output: 'edits and sign-off',
    },
  ],
};
