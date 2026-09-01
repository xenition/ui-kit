import * as React from 'react';
import type { IconName } from '../primitives/icon-names';
import type { PageHeaderProps } from './PageHeader';
/**
 * The display steps a screen title is allowed to take. `3xl` is the default and
 * the one the brief asks for; the smaller two exist for a sheet or a secondary
 * screen where a 30px headline would shout.
 */
export type PageHeaderV4Size = 'xl' | '2xl' | '3xl';
export interface PageHeaderV4Props extends PageHeaderProps {
    /**
     * Draw a hairline under the block. **Default `false` — this is the one
     * default V4 deliberately changes.** See the note on the component.
     */
    divided?: boolean;
    /** Headline step. Default `'3xl'`. */
    size?: PageHeaderV4Size;
    /**
     * Optional leading mark, in a 44 tinted circular badge (§4.7). A string is
     * read as a name from the kit's icon set; any other node is rendered exactly
     * as given, so a caller wanting a different tone, an avatar or its own
     * artwork passes its own element.
     */
    icon?: IconName | React.ReactElement | null;
    /** Clamp the headline to N lines. Off by default — see the note below. */
    titleLines?: number;
    /** Clamp the subtitle to N lines. Off by default. */
    subtitleLines?: number;
}
/**
 * `PageHeader`, V4 — the screen title block, drawn as the product's own opening
 * line rather than as an admin page banner.
 *
 * ## ⚠️ The default changed: there is no bottom border any more
 *
 * The base `PageHeader` paints `border-b border-border` unconditionally, so
 * every screen in the product opens with a hairline under its title.
 * `LAYOUT-DASHBOARD-V4-BRIEF.md` §4.4 rules that out in as many words: a
 * separator is for grouping rows *inside* a container, and **between
 * free-standing blocks the structuring device is space, not a rule** — "a
 * hairline under every screen title is admin styling", and it fights the warm,
 * airy ground §3 describes.
 *
 * So {@link PageHeaderV4Props.divided} defaults to **`false`**. This is the
 * single place the V4 rules' "additive only, defaults preserve today's
 * rendering" clause is knowingly set aside, because the brief asks for exactly
 * this change by name. The rule is still available — `divided` puts it back
 * verbatim, same 1px, same `colors.border` — for the rare surface (a split
 * view, a header pinned above a scrolling list) that genuinely needs the edge.
 *
 * Everything else follows §5's `PageHeader` note and §4.1's rhythm:
 *
 * 1. **The title is a real headline.** `text-2xl font-bold` becomes `TextV4`
 *    at `3xl`, `weight="bold"`, `tone="onSurface"` — the loudest thing on the
 *    screen, which is what a page title is meant to be.
 * 2. **The face is asked for, not painted over.** Like `AuthHeadingV4`, the
 *    title asks `TextV4` for `face="heading"` and the subtitle for
 *    `face="body"`, so a seed that chose a display face gets it here and the
 *    pairing is stated rather than inherited from whatever wrapper the header
 *    was dropped into.
 * 3. **The subtitle is a sentence, so it gets a text colour.** `text-sm
 *    text-muted` becomes `size="base" tone="mutedText"`. `muted` is a
 *    decorative fill with no contrast promise; `mutedText` is the same
 *    quietness walked until it clears AA. `AuthHeadingV4` and `EmptyStateV4`
 *    made the same move for the same reason.
 * 4. **Room below.** The block pads by `spacing.lg` rather than `spacing.md`
 *    (§5), with `spacing.xs` between the title and its supporting line (§4.1).
 * 5. **Actions wrap instead of crushing the title.** §5: "an `actions` node
 *    longer than an icon wraps below the title on a narrow screen rather than
 *    crushing it." See {@link TITLE_BASIS}.
 * 6. **An optional leading badge.** `icon` renders through `IconV4`'s
 *    `badge="soft"` — §4.7's 44 tinted circle, `primary` by default — for a
 *    screen whose title names a kind of thing. Absent unless asked for.
 *
 * **It does not clamp by default.** {@link PageHeaderV4Props.titleLines} and
 * {@link PageHeaderV4Props.subtitleLines} are offered and never applied
 * unasked: silently eliding a screen title a caller actually passed is worse
 * than a title that wraps to two lines.
 *
 * **It renders nothing when it has nothing** (§4.5): no title, no subtitle, no
 * actions and no icon produces `null`, not an empty block holding `spacing.lg`
 * of padding open.
 *
 * No motion and no state layer: a header has no states to transition between
 * and is not interactive (that is `ProfileHeader`'s job).
 */
export declare const PageHeaderV4: React.ForwardRefExoticComponent<PageHeaderV4Props & React.RefAttributes<HTMLElement>>;
//# sourceMappingURL=PageHeaderV4.d.ts.map