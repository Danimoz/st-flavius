---
target: homepage
total_score: 21
p0_count: 0
p1_count: 3
timestamp: 2026-08-10T16-46-43Z
slug: src-app-page-tsx
---
Method: dual-agent (A: homepage_design_assessment · B: homepage_evidence_assessment)

## Design Health Score

| # | Heuristic | Score | Key issue |
|---|---|---:|---|
| 1 | Visibility of System Status | 2/4 | The hero changes automatically without position, pause, or transition status; dropdown state is not announced. |
| 2 | Match System / Real World | 3/4 | Parish language is mostly natural, but “Welcome” hides unrelated destinations, RCIA is unexplained, and “Catechesim” is misspelled. |
| 3 | User Control and Freedom | 2/4 | Visitors cannot pause, select, or return to a hero slide; external-link behavior is not disclosed. |
| 4 | Consistency and Standards | 2/4 | The orange, rounded homepage and charcoal/gold Gothic footer look like separate design systems; heading and time formatting are inconsistent. |
| 5 | Error Prevention | 2/4 | Schedule information has no freshness reassurance or fallback instruction, and vague navigation labels encourage wrong-path clicks. |
| 6 | Recognition Rather Than Recall | 3/4 | Schedules are visible, but directions, contact, team, and fault reporting are hidden under “Welcome” or deferred to the footer. |
| 7 | Flexibility and Efficiency | 1/4 | No jump links, today-focused Mass view, directions shortcut, or compact alternative to the long mobile page. |
| 8 | Aesthetic and Minimalist Design | 2/4 | Strong church imagery and footer craft are undermined by an oversized hero, dense schedule block, generic treatments, and an abrupt stylistic shift. |
| 9 | Error Recognition and Recovery | 2/4 | Few error states exist, but there is no guidance for stale schedules or unavailable external resources. |
| 10 | Help and Documentation | 2/4 | Contact information exists, but there is no first-visit guidance, accessibility information, or contextual explanation of parish terms. |
| **Total** | | **21/40** | **Acceptable — significant improvement needed** |

## Anti-Patterns Verdict

**LLM assessment:** The homepage looks template-assembled and plausibly AI-generated. The full-bleed image, enormous centered greeting, floating rounded schedule card, image-card pair, gradient slogan banner, and circular mission image are familiar defaults. Authentic parish photography prevents it from feeling entirely synthetic, but the page lacks a distinctive St. Flavius point of view. The Gothic footer is the strongest authored element and simultaneously exposes how generic the sections above it feel.

**Deterministic scan:** The bundled detector returned `[]` with exit code 0 across `src/app/page.tsx`, `Hero.tsx`, `layout.tsx`, `Navbar.tsx`, and `Footer.tsx`: zero rule hits and no false positives. Browser evidence revealed detector blind spots rather than contradicting the scan: 12 `h1` elements, missing menu ARIA state, a 25.39×25.39px mobile menu target, automatic carousel changes, failing gradient contrast, and image aspect-ratio warnings.

**Visual overlays:** No user-visible overlay was created. The available browser evaluation surface is read-only and exposes no mutable script-injection capability. Desktop/mobile screenshots, DOM snapshots, computed measurements, interaction checks, contrast calculations, and runtime logs were used instead.

## Overall Impression

The homepage is useful but not yet compelling. It answers “when are services?” better than many parish sites, yet it does not confidently answer “what should I do next?” or “what makes St. Flavius alive today?” The single biggest opportunity is to reorganize the page around visitor intent—worship, visit, belong, and serve—while extending the footer’s ecclesial visual language across the whole experience.

## What’s Working

1. **Practical information appears early.** Mass, confession, baptism, catechism, and office times are not buried behind marketing copy.
2. **The imagery is faith-specific.** Church, Bible, homily, and Eucharist photography grounds the page in worship rather than generic community imagery.
3. **The footer provides a credible brand foundation.** Charcoal, restrained gold, arch-shaped details, local address information, and fault reporting feel reverent, crafted, and dependable.

## Cognitive Load

The homepage fails 6 of 8 cognitive-load checks: single focus, chunking, visual hierarchy, one-thing-at-a-time, minimal choices, and progressive disclosure. The schedule panel exposes six top-level topics at once. On mobile it becomes a 2,077px-tall block, contributing to a 5,676px page. Grouping and low working-memory demand are the two clear passes.

## Emotional Journey

The church photograph creates a reverent entrance, but the generic oversized greeting offers no action. The dense schedule card becomes the emotional and visual low point. Devotional resource imagery restores some warmth; the footer is the strongest ending and the clearest expression of parish identity. The middle lacks people, current parish life, participation, or pastoral reassurance.

## Priority Issues

### [P1] No clear primary action or parish-life information architecture

**Why it matters:** A newcomer cannot quickly choose Mass Times, Plan a Visit, Join Parish Life, or Contact the Parish. “Welcome” hides three unrelated destinations, while ministries, societies, announcements, and participation are absent.

**Fix:** Give the hero one primary CTA such as **View today’s Mass times** or **Plan your visit**, plus one secondary action. Replace “Welcome” with task-based navigation: **Mass & Sacraments**, **Parish Life**, **Visit**, and **Contact**. Surface current announcements or participation before generic mission copy.

**Suggested command:** `$impeccable shape homepage task hierarchy`

### [P1] The schedule is dense and degrades badly on mobile

**Why it matters:** The desktop panel is 772px tall and overlaps the hero; the mobile panel is 2,077px tall. Six fully expanded categories make a common task needlessly tiring.

**Fix:** Make Mass times the dominant block with semantic day/time rows. Move confession, adoration, baptism, catechism, and office hours into a compact secondary list or disclosures. Standardize time formatting and add a last-confirmed date plus parish-contact fallback.

**Suggested command:** `$impeccable adapt homepage schedule`

### [P1] The uncontrolled hero carousel creates accessibility and trust problems

**Why it matters:** The heading changes every 6.543 seconds without pause, previous/next controls, position indicators, or a live-region state. The image alt text is only “Slideshow.” Visitors can lose content while reading it.

**Fix:** Prefer one decisive static hero image. If the carousel remains, add previous/next, pause, current-slide status, meaningful alt text, and reduced-motion behavior. Reduce the 96px heading and add a practical CTA.

**Suggested command:** `$impeccable harden hero carousel`

### [P2] The homepage and footer use incompatible visual systems

**Why it matters:** Orange accents, beige gradients, large radii, heavy shadow, and a circular image transition abruptly into the refined charcoal/gold footer. The site feels stitched together rather than trustworthy and intentional.

**Fix:** Extend the wine/gold/stone system upward. Use Gothic cues through proportion, typography, image framing, and rhythm—not decorative grids. Remove the beige gradient, generic floating-card treatment, circular Eucharist crop, and footer grid background.

**Suggested command:** `$impeccable bolder homepage`

### [P2] Content semantics, contrast, and interaction details feel unfinished

**Why it matters:** Twelve `h1`s flatten document hierarchy. “Catechesim,” unexplained RCIA, inconsistent time styles, duplicate resource accessible names, a 25px menu target, missing `aria-expanded`, and white text dropping to 1.75:1 on the banner reduce trust and accessibility. Homily and Bible images also generate aspect-ratio warnings.

**Fix:** Keep one page `h1`; establish logical `h2`/`h3` structure. Correct and explain copy, normalize times, announce menu state, enlarge touch targets to at least 44px, repair image sizing, and replace the failing gradient with a solid contrast-safe surface.

**Suggested commands:** `$impeccable audit homepage` then `$impeccable typeset homepage`

## Persona Red Flags

**Jordan — first-time visitor**

- The first fold says “Welcome” but provides no obvious next action.
- “Welcome” in navigation conceals Contact, Team, and Report a Fault.
- RCIA and initiation language lack contextual explanation.
- No Plan a Visit flow, directions CTA, accessibility details, or “what to expect” content exists.

**Riley — deliberate stress tester**

- The carousel cannot be paused or returned to a previous slide.
- Schedules have no effective date or contingency instruction.
- Time formats, naming, and office-day information are inconsistent.
- External resources open new tabs without announcing that behavior.

**Casey — distracted mobile visitor**

- The 633px hero consumes most of the first viewport before useful information.
- The menu toggle is approximately 25px square, below the 44px touch target recommendation.
- Contact, directions, and reporting require opening a top-of-screen menu or scrolling far down.
- The schedule is a 2,077px text corridor with no jump links or today-focused view.

**Tunde — parishioner and society leader**

- No calendar, bulletin, announcements, ministries, or society directory makes the homepage poor for repeat visits.
- Static schedules communicate logistics but not current parish life.
- There is no clear route to submit an event, update society information, or reach the appropriate staff member.

## Minor Observations

- The hero’s `alt="Slideshow"` does not describe the church interior.
- Resource accessible names duplicate, such as “Daily Homilies Daily Homilies.”
- The white slogan text falls to 1.75:1 on the light side of its gradient.
- “Every Last Friday of the Month” should be “The last Friday of every month.”
- Footer office hours say Mon–Fri while the homepage office schedule excludes Thursday.
- The mobile menu exposes no `aria-expanded`, `aria-controls`, or `aria-haspopup` state.
- The two resource images render at a different aspect ratio from their declarations and trigger runtime warnings.
- The normally below-fold Eucharist LCP warning was a reload-at-scroll-position test artifact, not a normal top-load defect.

## Questions to Consider

- If a visitor had ten seconds, should they leave knowing the parish slogan—or exactly when Mass is and how to get there?
- What if **worship, visit, belong, and serve** became the homepage’s four organizing verbs?
- Why is the most distinctive and trustworthy brand expression reserved for the footer?
- What current parish-life content would make a regular parishioner return next week?
