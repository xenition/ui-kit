import * as React from 'react';
import type { IconName } from '../primitives/icon-names';
import type { StatCardProps } from './StatCard';
/**
 * Direction of a `delta`. `'flat'` is new in V4: the base had no word for "the
 * number did not move", so a delta with no `trend` rendered in `muted` with no
 * mark at all — which reads as an unstyled string rather than as a deliberate
 * "no change".
 */
export type StatCardV4Trend = 'up' | 'down' | 'flat';
/**
 * The semantic family a stat belongs to, which is the only thing that decides
 * its badge hue (brief §4.7: `primary` by default, `success` for positive
 * money, `warn` / `danger` only when the metric genuinely is a warning).
 *
 * Deliberately the four *tone* slots and not the ten `IconColor` slots — a
 * badge tinted `onPrimary` or `onDanger` is a mistake, not an option.
 */
export type StatCardV4Tone = 'primary' | 'success' | 'warn' | 'danger';
export interface StatCardV4Props extends Omit<StatCardProps, 'trend'> {
    /** Direction of `delta`. Drives the trend glyph and the `*Text` ink. */
    trend?: StatCardV4Trend;
    /**
     * A name from the kit's icon set, drawn in the **tinted circular badge**
     * above the label — brief §3's "soft tinted circular badge naming what the
     * number is about", §4.7's categorical leading slot.
     *
     * This is the house path and the one to reach for: it renders through
     * `IconV4 badge="soft"`, so the wash, the 44 circle and the glyph's measured
     * contrast against that wash all come from the primitive that already owns
     * them. {@link StatCardV4Props.icon} stays for parity and for callers with
     * their own artwork; it takes the same 44 slot but is drawn untinted,
     * because a caller's illustration is theirs to colour.
     */
    iconName?: IconName;
    /**
     * The semantic family the badge is tinted from. Default `'primary'`.
     * Ignored when there is no `iconName`.
     */
    tone?: StatCardV4Tone;
    /**
     * The quiet line under the delta — "vs last month", "last 30 days". The
     * reference screens carry one on every stat and the base had nowhere to put
     * it, so apps were appending it to `label` and getting it at the wrong size
     * above the number instead of below it.
     */
    caption?: string;
    /**
     * Whether the card carries `elevation.card`. Default `true` — a `StatCard`
     * is the on-page card (brief §5: "`StatCard` is the on-page card;
     * `MetricTile` is the tile inside a card").
     *
     * Pass `false` when the card sits **inside** another card: brief §4.6 is
     * explicit that a `StatCard` inside a `SectionCard` is flat, and never
     * nesting a shadow in a shadow is the whole point of that section.
     */
    raised?: boolean;
}
/** The one `<style>` id this component injects from. Idempotent. */
export declare const STAT_CARD_V4_STYLE_ID = "xen-v4-stat-card-styles";
/**
 * Two rules, and each needs something a utility class bound to a token cannot
 * say.
 *
 * 1. **The card ground.** Brief §4.2's headline fix: this card paints
 *    `--xen-card`, not `--xen-surface`, so a white card reads as raised on the
 *    warm page. `CardV4` hard-codes `bg-surface text-on-surface` in its own
 *    class list, and `cn()` is a plain string join with no `tailwind-merge`
 *    behind it — so passing `bg-card` in `className` would put **both**
 *    utilities on the element and let the generated stylesheet's ordering pick
 *    the winner. Tailwind sorts background utilities alphabetically inside the
 *    plugin, which puts `.bg-card` *before* `.bg-surface`: the override would
 *    lose, silently, and the module's most visible bug would survive the pass
 *    that exists to fix it.
 *
 *    So the override is made by **specificity** instead of by order. The
 *    selector is two attributes (0-2-0) against a single class (0-1-0), which
 *    wins wherever the sheets happen to land — the same trick
 *    `internal/row-v4.ts` uses to beat `V4_STATE_CSS` without the two agreeing
 *    on injection order.
 *
 * 2. **The trend glyph's ink.** `IconV4`'s `color` takes the ten `IconColor`
 *    slots and none of them is `successText` — the contrast-corrected text
 *    forms are a `TextTone` idea. Rather than tint the glyph with the *fill*
 *    (the exact bug §5 records against the web `MetricTile`), the glyph
 *    inherits from the delta line, which is already the right `*Text` colour.
 *    A descendant selector is 0-2-0, so it beats the `text-on-surface` class
 *    `IconV4` writes for its default slot.
 */
export declare const STAT_CARD_V4_CSS = "\n[data-xen-v4-card][data-xen-v4-stat-card] {\n  background-color: var(--xen-card);\n  color: var(--xen-on-card);\n}\n[data-xen-v4-stat-delta] [data-xen-v4-icon] {\n  color: inherit;\n}\n";
/**
 * **V4 stat card** — the on-page KPI card, and where brief §3's decision lands.
 *
 * The base is a bordered box the same colour as the page with a `2xl` number in
 * it. §3 names that for what it is — a spreadsheet cell — and describes what
 * this product's stat actually is: a white card floating on the warm ground,
 * generous, one loud thing in it. Five changes, in the order they matter.
 *
 * 1. **The ground is `card`, not `surface`.** This is the single most visible
 *    change in the whole dashboard pass. `colors.card` was split out in the
 *    shadcn pass precisely so a raised surface reads as raised in *both*
 *    schemes, and this module never adopted it — every card in it paints the
 *    same colour as the page it sits on, which is why the border was doing all
 *    the work. See {@link STAT_CARD_V4_CSS} for why the override is a sheet.
 * 2. **The value is the loudest thing on the block.** `3xl`, bold, on the
 *    display face, in tabular figures — the treatment `StatisticV4` already
 *    typesets a hero number with, reused rather than re-invented. `2xl` ties
 *    the page title, and a KPI that ties the page title has no hierarchy.
 *    Tabular figures are what stop a ticking value from reflowing and a column
 *    of cards from failing to line up.
 * 3. **The label is above the value, small and calm.** `sm` / `mutedText` —
 *    `mutedText`, never the `muted` *fill*, which carries no contrast promise
 *    as ink. HIG's charting guidance is the argument for the order: a short
 *    descriptive headline first, so the number underneath is graspable at a
 *    glance.
 * 4. **The delta is not colour alone.** Green and red are the whole signal in
 *    the base, which fails for the ~8% of men who cannot separate them. V4
 *    pairs the `successText` / `dangerText` ink with a real direction glyph
 *    from the named icon set. The sign is already in the delta *string*
 *    ("+12%"), so the announcement carries the direction without this file
 *    inventing an English word for a screen reader to read.
 * 5. **The icon became a badge.** It floated at the top-right of the base,
 *    competing with the label; §3 and §4.7 put a categorical glyph in a soft
 *    tinted 44 circle at the top of the block, naming what the number is
 *    about. `iconName` gets that treatment for free from `IconV4`.
 *
 * Composes `CardV4`, `TextV4` and `IconV4` (§10.5 — a V4 composite composes V4
 * children). It renders **nothing** when it has neither a label nor a value:
 * brief §4.5, a component with nothing to show is never a blank bordered box.
 */
export declare const StatCardV4: React.ForwardRefExoticComponent<StatCardV4Props & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=StatCardV4.d.ts.map