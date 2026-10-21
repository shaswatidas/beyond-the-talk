# Beyond the Talk

A guest speaker learning journal by Shaswati Das (ESSEC Business School, Singapore). Each session has its own tab, a short written takeaway, three learning points, a personal reflection, and one interactive challenge.

Built with React, TypeScript, and Vite. No backend, no accounts, no cookies, no network calls. The only stored data is challenge progress, kept in the visitor's own browser (`localStorage`).

## Run it locally

Requires Node.js 18 or newer (developed with Node.js 22 LTS).

```bash
npm install        # once
npm run dev        # development server at http://localhost:5173
npm test           # challenge logic, routing, storage, and content checks
npm run build      # type check and production build into dist/
npm run preview    # serve the production build locally
```

## Deploying (GitHub and Vercel)

The site is fully static. On Vercel, import the repository; it detects Vite automatically (build command `npm run build`, output directory `dist`). Any static host works.

Routes use the address hash (`#home`, `#sessions`, `#about`, `#session/launchlab`), so **no rewrite or fallback rules are needed** on any host. Unknown session links show a friendly "not found" view with a route back to the collection.

## Project structure

```
public/images/            Optimised portraits served to the browser
assets-source/            Original photographs and slide text (kept locally only; excluded from Git)
src/content/types.ts      Session, Speaker, LearningPoint, and activity types
src/content/sessions.ts   The session collection (the only file most updates touch)
src/content/launchlab-activity.ts   Challenge wording for the LaunchLab session
src/activities/registry.tsx         Maps an activity type to its component
src/activities/idea-to-launch/      The three-stage challenge (state machine, stages, preview)
src/components/           Header with session tabs, footer, speakers, learning points
src/pages/                Homepage and session view
src/lib/                  Hash router and safe progress storage
src/styles/global.css     Design tokens and all styles
```

## Adding the next session

1. **Portraits.** Crop each speaker photograph to a square face-and-shoulders image (about 280 by 280 pixels is plenty) and save it as `public/images/first-last.jpg`. Keep the original in `assets-source/`. If there is no photograph, use `image: null` and the site shows a designed initial tile instead.
2. **Content.** Append an entry to the `sessions` array in `src/content/sessions.ts`, with a new `id` (used in the link, for example `#session/brand-strategy`) and the next `order` number. Fill in the title, labels, speakers, takeaway, learning points, and reflection. Use `date: null` until the date is confirmed; it is only displayed once set (format `YYYY-MM-DD`). Put anything maintainers should know in `sourceNotes`; it is never shown on the site.
3. **Slides (optional).** Render the session's slides to 16:9 JPEG images in `public/slides/<session-id>/`, then describe them in a file like `src/content/launchlab-slides.ts` (image path, title, and the slide's text as its text alternative) and set `slides` on the session. Leave out slides with personal contact details or feedback-form QR codes. The viewer appears automatically before the activity, and an activity can link to specific slides (see `stageSlides` in `launchlab-activity.ts`).
4. **Activity.** Set `activity` to a type the site already supports (today: `idea-to-launch`) with its own configuration file, modelled on `src/content/launchlab-activity.ts`. Give it its own `storageKey` (for example `beyond-the-talk:brand-strategy:idea-to-launch:v1`).

That is all a content-only session needs: the homepage collection, the session tab, the session route, the page layout, and a "Next session" link (shown only when a later session exists) are all generated from the data.

## Registering a different kind of activity

A genuinely new game needs code, not only data:

1. Create a folder in `src/activities/your-activity/` with its configuration type and component. Reuse `progressStore` from `src/lib/storage.ts` with a versioned, session-specific key, and validate saved data before using it (see `parseSavedState` in `idea-to-launch/state.ts`).
2. Add the type to the `SessionActivity` union in `src/content/types.ts`, for example `| { type: 'campaign-match'; config: CampaignMatchConfig }`.
3. Add a `case` for it in `src/activities/registry.tsx`.
4. Use the new type in the session entry.

## Design notes

- Palette tokens live at the top of `global.css`. Contrast was measured: base gold (#A8874F, 2.9:1 on parchment) and sage (#788574, 3.4:1) are used only for rules and decoration; text uses darker variants (gold text #7A5F2F, 5.2:1; sage text #525C4F, 6.1:1).
- Fonts (Libre Baskerville and Manrope) are self-hosted through Fontsource, with Georgia and system sans-serif fallbacks.
- Motion is limited to short transitions and is disabled when the visitor prefers reduced motion.

## Source notes for the LaunchLab session

- Source presentation: `VIBE COding_9 Oct_ESSEC x LaunchLab Presentation(4).pdf` (31 slides).
- The filename suggests 9 October, but the slides do not state a date or year, so the date is stored as `null` and not shown.
- The slides name the speakers by first name only; full names were supplied by Shaswati Das. No roles or biographies are shown.
- No photograph was supplied for Nirvan Anand; the site shows an "N" tile.
- Slides 1 to 29 are shown and offered as a PDF (`public/launchlab-presentation.pdf`). Slide 30 (feedback form QR code) and slide 31 (QR codes to the speakers' personal contacts) are left out of both.
- The deck is LaunchLab's work, including third-party images such as a meme on slide 5. Confirm with the speakers that they are happy for it to be public before deploying.
