import type { SlideDeck } from './types';

/**
 * Slides 1 to 29 of the LaunchLab presentation, rendered from the PDF.
 * Slides 30 (feedback form QR code) and 31 (speakers' personal contact QR codes) are deliberately left out.
 * `text` is the slide's own wording, extracted from the PDF, offered as a text alternative.
 */
export const launchLabSlides: SlideDeck = {
  title: 'The session slides',
  credit: 'From the LaunchLab presentation, shown as it was presented.',
  pdf: '/launchlab-presentation.pdf',
  pdfLabel: 'PDF, 5.8 MB',
  slides: [
    {
      "src": "/slides/launchlab/slide-01.jpg",
      "title": "LaunchLab: Claude Design, Claude Code, GitHub, and Vercel",
      "text": "LaunchLab: Claude Design, Claude Code, GitHub, and Vercel"
    },
    {
      "src": "/slides/launchlab/slide-02.jpg",
      "title": "Who we are",
      "text": "Who We Are. An illustration of a school campus beside an eagle crest."
    },
    {
      "src": "/slides/launchlab/slide-03.jpg",
      "title": "Part 1",
      "text": "Section divider: Part 1."
    },
    {
      "src": "/slides/launchlab/slide-04.jpg",
      "title": "Design your front end first",
      "text": "Design Your Front End First\n- Claude Design allows you to build the visual shell of your site\n- Describe how you want it to look without any code!"
    },
    {
      "src": "/slides/launchlab/slide-05.jpg",
      "title": "The art of prompting: bad prompting",
      "text": "The Art of Prompting Bad prompting:\n- “Create a website for my course\n- “Create a modern website for my coding course with a homepage and lessons.”"
    },
    {
      "src": "/slides/launchlab/slide-06.jpg",
      "title": "The art of prompting: a detailed prompt",
      "text": "The Art of Prompting Design style:\nRole: You are an expert educational web designer and full-stack developer.\nGoal: Create a responsive website for a 15-lesson course called “Vibe Coding:\nBuild Apps with Lovable & GitHub.”\nTarget audience: High-school and early-college students with little to no coding experience.\nCore pages required:\n1. Landing page (course overview + value proposition)\n2. Curriculum page 15 lessons with goals and agendas)\n3. Lesson page template (objectives, agenda, exercises)\n4. About page (instructor + course philosophy)\n5. Resources page GitHub links, tools, templates)\n1. Modern, playful, and approachable\n2. Light background, bold headings\n3. Friendly typography (not corporate) Output required:\n4. Folder structure\n5. Core page code\n6. Reusable lesson template\n7. Brief explanation of design decisions\n8. Build the site so it can be easily expanded with more lessons later.\nKey features:\n1. Clean, student-friendly UI\n2. Clear call-to-action buttons Enroll / Start Lesson)\n3. Mobile-first design\n4. Easy navigation between lessons"
    },
    {
      "src": "/slides/launchlab/slide-07.jpg",
      "title": "Export your design",
      "text": "Export Your Design\n- When your design is done, open the Share menu in the top right\n- Find \"Handoff to Claude Code…\" in the export options — this is the bridge that connects the two tools\n- It sends your finished design straight into Claude Code, which turns it into a real, working site\n- Locate this button before you start building — you'll need it, and it's easy to miss in the menu"
    },
    {
      "src": "/slides/launchlab/slide-08.jpg",
      "title": "What is Claude Code?",
      "text": "What is Claude Code?\nAgentic Coding System Claude Code is an agentic, terminal-based coding system. It goes beyond simple autocompletion by reading entire codebases, executing system shell commands, running pipelines, and proactively debugging failures.\nFor Product Designers Democratizing engineering workflows. Builders can specify features in high-level prose to rapidly prototype, build functional microservices, and deploy complete interactive experiences without auditing code manually."
    },
    {
      "src": "/slides/launchlab/slide-09.jpg",
      "title": "What can you build? A Chrome extension",
      "text": "What Can You Build?\nApps, chrome extensions, websites, trading algorithms, etc.\nExample: Snapiq chrome extension https://snapiq.tools/"
    },
    {
      "src": "/slides/launchlab/slide-10.jpg",
      "title": "What can you build? A competition finder",
      "text": "What Can You Build?\nDoq.world:\nCompetition finder for high school students https://doq.world/"
    },
    {
      "src": "/slides/launchlab/slide-11.jpg",
      "title": "What Claude Code can do",
      "text": "What It Can Do Integrated EnvironmentsRoutines Refactoring Set automated background loops, schedule daily test checks, or configure customized multi-stage file tasks that operate directly inside the local sandboxed environment.\nSeamlessly rename variables, update file layouts, and change package versions globally. Claude handles complex directory structures and maintains absolute syntax integrity.\n- “Check this folder for errors every hour.”\n- “Run a multi-step process: clean the files, test the code, then generate a report.”\n- Key idea: Claude Code can handle repeated background workflows inside your local project environment.\n- “Rename this variable everywhere it appears.”\n- “Make this code easier to read while keeping the same functionality.”\n- Key idea: Claude Code can help clean up or reorganize existing code without changing what the code actually does.\nSession Context Maintain continuous context memory trees across terminal cycles. Enables quick rollbacks, instant code explanations, and natural-language pipeline query states.\n- Key Idea: Claude Code can keep track of\n- What commands were run.\n- What errors happened earlier.\n- What files were changed.\n- What you were trying to fix."
    },
    {
      "src": "/slides/launchlab/slide-12.jpg",
      "title": "Part 1 summary: the whole workflow",
      "text": "Part 1 Summary: The Whole Workflow\n1. Design Use Claude Design to make your website look like how you want it to without any code.\n2. Build Use Claude Code to build the actual file by handing off the design you made in Claude Design.\n3. Deploy Use localhost or tiiny.host to launch your final website!\nIf using tiiny.host, put this prompt into Claude Code once you are done:\n“Put all my website files into one folder and zip it, with index.html at the top level, so I can upload it to tiiny.host.”"
    },
    {
      "src": "/slides/launchlab/slide-13.jpg",
      "title": "Part 2",
      "text": "Section divider: Part 2."
    },
    {
      "src": "/slides/launchlab/slide-14.jpg",
      "title": "What is GitHub?",
      "text": "What is GitHub\n1. Store Keep all your project files and their history in one location. This place is called the repository.\n2. Share Make your work accessible. You can make it public so that anyone can see, use, and learn from what you have created.\n3. Collaborate Work with your friends or coworkers without overwriting each other’s codebase."
    },
    {
      "src": "/slides/launchlab/slide-15.jpg",
      "title": "Key terms",
      "text": "Key Terms\n1. Grab an existing project\nFork: Make your own copy of someone else's repo on your GitHub account, so you can change it without affecting the original.\nClone: Copy a repo from GitHub down onto your computer so you can edit the files locally.\n2. Save and upload your work\nCommit: Save a snapshot of your current changes, along with a short note describing what you did. This will save locally and NOT on GitHub.\nPush: Send the commits you saved on your computer up to GitHub, so the online copy is up to date.\n3. Combine work with a team Pull Request PR: Propose your changes and ask teammates to review them before they get added to the main project.\nMerge: Approve the changes from a pull request and combine them into the main version of the project."
    },
    {
      "src": "/slides/launchlab/slide-16.jpg",
      "title": "How it works",
      "text": "How It Works. A diagram with two sides. Your computer, where you edit files: your files plus saved snapshots. Commit saves a snapshot, which stays on your computer, not on GitHub. GitHub, the project’s online home (the repository): a remote repository shared by everyone. Push sends commits up to GitHub. Clone copies the repository down to your computer. Fork makes a copy on GitHub. Team review happens on GitHub: pull request, then merge. Most Git actions just move your work between these two copies."
    },
    {
      "src": "/slides/launchlab/slide-17.jpg",
      "title": "How a repository looks",
      "text": "How a Repository Looks. Screenshots of a GitHub repository’s list of files and folders, and of its branches page."
    },
    {
      "src": "/slides/launchlab/slide-18.jpg",
      "title": "Push and pull request",
      "text": "Push vs Pull Request\n⬆ Push\n🔀 Pull Request Direct Action:\nUploads your commits straight to repo - no waiting, no approval.\nNo Review:\nChanges go live immediately on whatever branch you push to.\nUse When:\nWorking solo or on your own branch and you’re confident in your changes.\nRequest for Review:\nPropose your changes and asks teammates to look before anything is merged.\nDiscussion:\nOthers can comment, suggest edits, and approve or reject the changes.\nUse When:\nWorking on a team or contributing to someone else’s project."
    },
    {
      "src": "/slides/launchlab/slide-19.jpg",
      "title": "Introduction to Vercel",
      "text": "Intro to Vercel This is similar to tiiny.host!\n1. Connect\n2. Deploy\n3. Preview Link your GitHub repo to Vercel once.\nFrom then on, Vercel watches that repo for you.\nEvery time you push, Vercel grabs the new code and updates your live site in seconds. No manual uploading, ever.\nEvery pull request gets its own preview link, so your team can see the changes before merging them.\nWhat’s the difference between GitHub and Vercel?\nGitHub stores your code: every file, every version, shared with your team. But nothing there is a website yet.\nVercel turns that code into one. It reads your repo, builds the site, and hosts it at a public link that updates every time you push."
    },
    {
      "src": "/slides/launchlab/slide-20.jpg",
      "title": "Step 1: get your code into GitHub",
      "text": "Step 1: Get Your Code Into GitHub\n1. Make A Repo Type This Into Claude Code Sign in to github.com → click the green New repository button. Name it, keep it Public, click Create.\n“Push this project to Github. Initialise a git repo, commit everything with a clear message, and push it to ‹paste your repo URL.”\n2. Let Claude Code Push It If it asks you to sign in to GitHub, follow its instructions in the terminal.\nCopy your new repo's URL, then paste the prompt on the right into Claude Code. It runs the git commands for you.\nUsing Lovable Instead?\n3. Check It Worked Refresh your repo page. Your files should be there - that's your first commit and push.\nYou don't need any of this. Open your project - Settings - GitHub - Connect. Lovable creates the repo, pushes your code automatically, and keeps it in sync from then on. Skip to Step 2."
    },
    {
      "src": "/slides/launchlab/slide-21.jpg",
      "title": "Step 2: connect to Vercel",
      "text": "Step 2: Connect To Vercel\n1. Sign In With Github\n2. Import Your Repo\n3. Deploy Go to vercel.com and sign up using your GitHub account. This is what lets Vercel see your repos.\nOn your dashboard, click New Project → Import Git Repository → pick the repo you pushed in Step 1. Authorize Vercel when GitHub asks.\nVercel auto-detects your setup.\nClick Deploy, wait a few seconds, and you get a live public link.\nFrom now on, you never upload anything again.\nEvery time you push to GitHub, Vercel rebuilds and updates your live site automatically. And every pull request gets its own preview link, so your team can see changes before merging."
    },
    {
      "src": "/slides/launchlab/slide-22.jpg",
      "title": "GitHub to Vercel",
      "text": "GitHub → Vercel. Screenshots of the Vercel log-in page with a Continue with GitHub option, the new project screen, and the Import Git Repository list with an Import button beside each repository."
    },
    {
      "src": "/slides/launchlab/slide-23.jpg",
      "title": "Claude to GitHub",
      "text": "Claude → GitHub. Screenshots of connecting GitHub to Claude: the connectors settings, the GitHub page to install and authorise the Claude app, and choosing a repository before describing a task."
    },
    {
      "src": "/slides/launchlab/slide-24.jpg",
      "title": "Some file types to remember",
      "text": "Some File Types To Remember index.html styles.css script.js The words, structure, every heading, button and paragraph people actually read.\nThe look: colours, fonts, spacing, and how it changes on a phone versus a laptop.\nThe behaviour: what happens when somebody clicks, types, or hits submit.\nWho can tell me\n1. Which file do you open to change the text on your main button?\n2. Which file do you open to make that button orange?\n3. Which file do you open to make it do something when clicked?"
    },
    {
      "src": "/slides/launchlab/slide-25.jpg",
      "title": "Part 3",
      "text": "Section divider: Part 3."
    },
    {
      "src": "/slides/launchlab/slide-26.jpg",
      "title": "Two things your site still cannot do",
      "text": "Two Things Your Site Still Can’t Do\n1. It Forgets Everyone\n2. It Knows Only Its Own Files For example, if you were to create a clone of Wordle, when you close the tab, it has no idea who you were. It can’t keep track of users or saved games It can’t tell you anything that is live. This could be the weather, temperature, etc. It can only display what you typed in the original code."
    },
    {
      "src": "/slides/launchlab/slide-27.jpg",
      "title": "How logging in works",
      "text": "How Logging In Works Sign Up Log In Log Out When someone signs up on a website or app, it creates a new row in the user table. This table includes your email and a scrambled version of your password.\nWhen you try to log in, it verifies if your email and password match what is registered in the user table. If they match, it will hand your browser a token.\nLogging out throws your token away.\nThis means the site stops recognizing you until you log in again.\nWhat A Token Is Notice What All 3 Actions Are A token is a temporary sticker that says “this is James”. Your browser shows it on every request, so the site doesn’t ask for your password on every single click. It expires on its own.\nYour site is sending a request to another computer and getting an answer back. Logging in is just an API call!"
    },
    {
      "src": "/slides/launchlab/slide-28.jpg",
      "title": "Supabase",
      "text": "Supabase\n1. It Forgets Everyone Supabase Sign Up Supabase is an open-source backend-as-a-service BaaS) platform that allows you to create authentication, verification, and a database system for your users. It’s heavily connected to GitHub, Vercel, and an automatic installation to Lovable.\nIt also allows you to see your statistics Log Out"
    },
    {
      "src": "/slides/launchlab/slide-29.jpg",
      "title": "Task",
      "text": "Task Create a website that will contain a tab from each guest speaker session this semester. Each tab can be an interactive game to consolidate what you learned in that session. Use the tools we talked about today to do it!"
    }
  ],
};
