import type { SessionActivity } from '../content/types';
import { IdeaToLaunchChallenge } from './idea-to-launch/IdeaToLaunchChallenge';

/**
 * Maps each activity type to the component that renders it.
 * To add a new kind of game: add its type to `SessionActivity` in content/types.ts, build its component,
 * and add a case here. Sessions reusing an existing type only need a data entry.
 */
interface ActivityRendererProps {
  activity: SessionActivity;
  onReadReflection: () => void;
  /** Present when the session has slides: shows a given slide (1-based) in the session's slide viewer. */
  onShowSlide?: (slideNumber: number) => void;
}

export function ActivityRenderer({ activity, onReadReflection, onShowSlide }: ActivityRendererProps) {
  switch (activity.type) {
    case 'idea-to-launch':
      return <IdeaToLaunchChallenge config={activity.config} onReadReflection={onReadReflection} onShowSlide={onShowSlide} />;
    default:
      return null;
  }
}
