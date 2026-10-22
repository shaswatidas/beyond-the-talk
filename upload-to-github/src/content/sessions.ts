import type { Session } from './types';
import { launchLabActivity } from './launchlab-activity';
import { launchLabSlides } from './launchlab-slides';

/**
 * The session collection. Add a new real session by appending an entry here.
 * The homepage collection, the session tabs, and the session routes are all generated from this list.
 */
export const sessions: Session[] = [
  {
    id: 'launchlab',
    order: 1,
    navLabel: 'LaunchLab',
    title: 'From idea to website',
    collectionContext: 'LaunchLab · Building with artificial intelligence',
    topicLabel: 'LaunchLab: designing, building, and publishing with artificial intelligence',
    date: null,
    speakerContext: 'LaunchLab',
    speakers: [
      {
        name: 'Yibo Yang',
        image: '/images/yibo-yang.jpg',
        initials: 'Y',
        imagePosition: '50% 40%',
        linkedin: 'https://www.linkedin.com/in/yiboyang8/',
      },
      {
        name: 'Rishabh Modi',
        image: '/images/rishabh-modi.jpg',
        initials: 'R',
        imagePosition: '50% 35%',
        linkedin: 'https://www.linkedin.com/in/rishabh-modi-2b0b06307/',
      },
      {
        name: 'Nirvan Anand',
        image: null,
        initials: 'N',
        linkedin: 'https://www.linkedin.com/in/nirvan-anand-597133407/',
      },
    ],
    summary: {
      heading: 'The session in brief',
      headingAccent: 'in brief',
      intro: 'LaunchLab walked us through one route from an idea to a live website, in three parts.',
      parts: [
        {
          title: 'Design and build.',
          text: 'Claude Design shapes how a website looks from a written description, without code. The speakers showed how much a detailed prompt helps: naming a role, a goal, an audience, the pages, a style, the key features, and the expected output. The finished design is handed to Claude Code, which works inside a project to build, change, and debug it.',
        },
        {
          title: 'Store and publish.',
          text: 'GitHub keeps a project\'s files and their history in a repository, using commits, pushes, pull requests, and merges. Vercel connects to that repository, builds the website, and hosts it at a public link, with a preview for each pull request. tiiny.host and Lovable were presented as simpler alternatives.',
        },
        {
          title: 'What a basic website cannot do.',
          text: 'On its own, a website does not remember its visitors and cannot show live information. Logging in depends on a database of users and temporary tokens, and Supabase was presented as one way to add both.',
        },
      ],
      closing:
        'The session ended with a task: build a website with a tab for each guest speaker session, using these tools. Beyond the Talk is my response to that task.',
    },
    previewSummary:
      'Building a website no longer has to begin with knowing how to code. From a nontechnical starting point, a clear idea and an understanding of how the tools connect can be enough to begin.',
    takeaway:
      'I did not need to know everything about coding to begin. I needed a clear idea of what I wanted to build and an understanding of how the tools fit together.',
    activityInvitation:
      'Browse the slides from the session, then try the challenge to take an example portfolio from a first idea to a simulated launch, using the same workflow.',
    activityLabel: 'Two-minute challenge',
    slides: launchLabSlides,
    learningPoints: [
      {
        title: 'A clear brief shapes the result.',
        summary:
          'A useful prompt specifies the audience, purpose, content, visual direction, and expected behaviour. The more of that you decide up front, the less the tool has to guess.',
        detail: [
          'The session contrasted a one-line request, such as asking for a website for a course, with a structured brief. The structured version named a role, a goal, a target audience, the pages required, a design style, the key features, and the output expected.',
          'A strong brief is still a starting point rather than a guarantee. What comes back needs to be reviewed, tested, and refined.',
        ],
      },
      {
        title: 'The tools play different roles.',
        summary:
          'Design and coding tools help create the experience; GitHub stores and tracks the source; a hosting service makes it accessible online.',
        detail: [
          'In the workflow presented, Claude Design shapes the visual direction, Claude Code turns it into working files, GitHub keeps the source and its history in a repository, and Vercel builds and hosts the website from that repository. Lovable and tiiny.host were also discussed as other routes.',
          'One distinction I want to remember: pushing code to GitHub does not publish a website by itself. A website goes live when a hosting service is connected to the repository and configured to deploy it.',
          'These products can do more than this one workflow, and the interfaces shown in the session may change over time.',
        ],
      },
      {
        title: 'Features should follow the need.',
        summary:
          'A public learning journal does not automatically need accounts or a database. User identity, saved information across devices, and other persistent features introduce additional requirements.',
        detail: [
          'The session explained that a simple website does not remember its visitors and can only show what is in its own files. Signing up, logging in, and keeping information across devices need a backend service; Supabase was presented as one option for authentication and a database.',
          'Smaller needs can have smaller solutions. The challenge on this page remembers your progress in this browser only, with no account. That information stays on this device and can be cleared at any time.',
          'Authentication is a separate decision, worth making when a website genuinely needs to know who its visitors are.',
        ],
      },
    ],
    reflection: [
      'Coming from a nontechnical background, I had assumed that building a website meant knowing how to code before I could begin. What surprised me was how much Claude could help with, from shaping an idea to creating the website itself.',
      'The session made the process feel more approachable. I still had to think carefully about what I wanted to create, but I could see a way to begin. Beyond the Talk is my first application of that learning.',
    ],
    sourceNotes: [
      'Source presentation: "VIBE COding_9 Oct_ESSEC x LaunchLab Presentation(4).pdf" (31 slides).',
      'The filename suggests 9 October; the slides do not state a date or year. Date kept as null until confirmed.',
      'The slides credit the speakers only by first name on the closing slide ("Yibo", "Nirvan", "Rishabh"). Full names supplied by Shaswati Das. No roles or biographies are given, so none are shown.',
      'Original photographs are kept in assets-source/. No photograph was supplied for Nirvan Anand.',
      'Slides 1 to 29 are published. Slide 30 (a feedback form QR code) and slide 31 (QR codes to the speakers\' personal contacts) are left out of both the viewer and the PDF download. Check with LaunchLab before publishing the deck publicly.',
    ],
    activity: { type: 'idea-to-launch', config: launchLabActivity },
  },
];

export const sortedSessions = [...sessions].sort((a, b) => a.order - b.order);

export function findSession(id: string): Session | undefined {
  return sessions.find((session) => session.id === id);
}

export function sessionNumber(session: Session): string {
  return String(session.order).padStart(2, '0');
}
