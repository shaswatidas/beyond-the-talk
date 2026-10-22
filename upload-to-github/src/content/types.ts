import type { IdeaToLaunchConfig } from '../activities/idea-to-launch/config';

/** A guest speaker. Set `image` to null when no photograph is available; an initial tile is shown instead. */
export interface Speaker {
  name: string;
  /** Public path under /public, for example "/images/rishabh-modi.jpg", or null. */
  image: string | null;
  /** Shown on the tile when there is no image. */
  initials: string;
  /** CSS object-position for the portrait crop, for example "50% 30%". */
  imagePosition?: string;
  /** Public LinkedIn profile URL, supplied by the site owner. Shown on the session page. */
  linkedin?: string;
}

export interface Slide {
  /** Public path to the slide image (16:9). */
  src: string;
  title: string;
  /** The slide's wording, or a description for image-only slides. Used as the text alternative. */
  text: string;
}

export interface SlideDeck {
  title: string;
  /** Short credit line shown under the viewer. */
  credit: string;
  /** Public path to a downloadable PDF, or null to offer no download. */
  pdf: string | null;
  pdfLabel?: string;
  slides: Slide[];
}

export interface SessionSummary {
  /** Section heading, for example "The session in brief". */
  heading: string;
  /** Optional words of the heading set in the script face, for example "in brief". */
  headingAccent?: string;
  intro: string;
  /** Factual outline of what the session covered, in the order it was presented. */
  parts: { title: string; text: string }[];
  closing?: string;
}

export interface LearningPoint {
  title: string;
  /** Always visible. */
  summary: string;
  /** Optional paragraphs revealed by "Explore this idea". */
  detail?: string[];
}

/**
 * Every activity type the site knows how to render.
 * Add a new member here (and a component in the activity registry) for a genuinely new game.
 */
export type SessionActivity = {
  type: 'idea-to-launch';
  config: IdeaToLaunchConfig;
};

export interface Session {
  /** Used in the address, for example #session/launchlab. Lowercase letters, numbers, and hyphens. */
  id: string;
  /** Position in the journal; also produces the visible number (1 → "01"). */
  order: number;
  /** Short name for the session tab, for example "LaunchLab". */
  navLabel: string;
  title: string;
  /** Short context line in the session collection. */
  collectionContext: string;
  /** Supporting topic label under the session title. */
  topicLabel: string;
  /** ISO date (YYYY-MM-DD) once confirmed. Leave null if unconfirmed; it is then not shown. */
  date: string | null;
  /** Organisation or context the speakers are credited with, if supported by the source. */
  speakerContext?: string;
  speakers: Speaker[];
  /** Short takeaway shown on the homepage entry. */
  previewSummary: string;
  /** The prominent first-person takeaway at the top of the session. */
  takeaway: string;
  /** Short invitation that leads from the takeaway into the activity. */
  activityInvitation: string;
  /** Small indicator in the collection, for example "Two-minute challenge". */
  activityLabel: string;
  /** Optional factual summary of the session, shown after the speakers. */
  summary?: SessionSummary;
  /** Optional slides from the session, shown in a viewer before the activity. */
  slides?: SlideDeck;
  learningPoints: LearningPoint[];
  reflection: string[];
  /** Maintainer-only notes about sources and unconfirmed facts. Never rendered. */
  sourceNotes: string[];
  activity: SessionActivity;
}
