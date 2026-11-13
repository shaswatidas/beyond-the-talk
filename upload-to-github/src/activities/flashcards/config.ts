/** Content for the "flashcards" activity: a small deck of flip cards. Kept as data so it can be reused. */

export interface Flashcard {
  /** Grouping shown as an eyebrow on the front, for example "Planning". */
  team: string;
  /** The term on the front of the card, for example a role name. */
  term: string;
  /** What it does, shown on the back. */
  definition: string;
  /** What it hands on to the next step, shown on the back. */
  output: string;
}

export interface FlashcardsConfig {
  /** Versioned localStorage key, specific to this session. Remembers the last card seen. */
  storageKey: string;
  eyebrow: string;
  heading: string;
  /** Optional words of the heading set in the script face. */
  headingAccent?: string;
  intro: string;
  cards: Flashcard[];
}
