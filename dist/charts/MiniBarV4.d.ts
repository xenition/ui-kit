import * as React from 'react';
import type { ChartToneV4 } from './LineChartV4';
export interface MiniBarV4Props extends Omit<React.HTMLAttributes<HTMLDivElement>, 'slot'> {
    /** Current value. */
    value: number;
    /** Value mapped to a full-width fill. Default `100`. */
    max?: number;
    /**
     * Which categorical slot the fill is painted from. Default `0` — the brand
     * hue itself, so a mini bar beside a stat matches the product rather than
     * introducing a colour of its own.
     */
    slot?: number;
    /**
     * Paint the fill with a **status** hue instead of its slot, because the
     * value genuinely means good or bad — budget overspend, an error rate. It
     * ships with a label from the figure the mark sits in, never colour alone
     * (brief §1 rule 3).
     */
    tone?: ChartToneV4;
    /**
     * Track height in px. Defaults to `spacing.sm` — the base's `6` is not on
     * any scale the kit owns, and brief §1 rule 1 makes no exception for a small
     * number.
     */
    height?: number;
    /** Show the loading placeholder at the mark's own footprint. */
    loading?: boolean;
    /** Play the entrance reveal. Default `true`. */
    animate?: boolean;
    /** How the value is spoken. Default `String`. */
    formatValue?: (value: number) => string;
    /** The spoken sentence. Derived when omitted (brief §1 rule 6). */
    'aria-label'?: string;
}
/** The one `<style>` id this component injects from. Idempotent. */
export declare const MINI_BAR_V4_STYLE_ID = "xen-v4-mini-bar-styles";
/**
 * The track and the fill, as a sheet rather than as inline styles.
 *
 * Every value here is a `var()`. A CSSOM that does not parse custom properties
 * — jsdom, and any SSR style extractor built on one — drops such a value from
 * an inline `style` **outright**, leaving the bar unpainted with no error;
 * `internal/nav-v4.ts` and `internal-v4.tsx` both record the same reason for
 * the same choice. The SVG members of this family escape it because a `fill`
 * is an attribute, not a declaration, and a mini bar is not an SVG (see the
 * component doc for why it stays two boxes).
 *
 * The track is `--xen-chart-grid`, the same derived neutral every grid line in
 * the module takes. The base painted it `colors.border` — a *hairline* colour
 * doing chart chrome's job, which is the defect brief §3.3 names against the
 * axes the base paints with `var(--xen-muted)`.
 */
export declare const MINI_BAR_V4_CSS: string;
/**
 * **V4 mini bar** — the web twin of a component that existed only on native
 * (brief §6), built as V4 from the start because there is no base to mirror.
 *
 * A **mark**, not a figure: one slot, no title, no legend, no axis (§5 Group
 * A). It is what goes beside a number in a row when the number alone does not
 * say "of how much" — a quota, a budget, a completion.
 *
 * ## What the native base got wrong, and what this twin fixes for both
 *
 * 1. **Colour was a semantic token.** `colors[color]` over the six-slot
 *    `ChartColor` vocabulary, which let a caller paint a neutral quota `warn`
 *    because it happened to be the fourth bar on the screen (§1 rule 2, rule
 *    3). It takes slot 1, or a declared `tone`, and nothing else.
 * 2. **The track was `colors.border`.** See {@link MINI_BAR_V4_CSS}.
 * 3. **`height = 6`.** Not on the spacing scale, so it is `spacing.sm` here —
 *    and the prop stays, so a caller who needs 6 can still say 6.
 *
 * ## Why it is two boxes and not an SVG
 *
 * Every other mark in this family is an SVG, which is what makes a stroke
 * width mean painted pixels in a responsive plot. A pill is the one shape that
 * is *worse* that way: a stretched viewBox turns an `rx` into an elongated
 * ellipse, so the cap of the bar would change shape with the width of the
 * column. A `border-radius` does not — it is resolved after layout — so the
 * mini bar stays two boxes and gets a true pill at any width.
 *
 * ## Why both ends are round
 *
 * Brief §4.4 puts `CHART_MARK.endRadius` at the **data end only**, "because a
 * bar rounded at the baseline floats off its axis". That rule is about a bar
 * standing on an axis. A mini bar is a **meter**: a pill track with a pill
 * fill inside it, sharing an edge with the track rather than sitting on a
 * baseline — the shape the kit's progress controls already take. So the fill
 * is `radius.full` at both ends, and §4.4 is untouched where it applies.
 *
 * ## Degenerate inputs
 *
 * `value / max` is the one division here and it is guarded at both ends: a
 * `max` of zero, negative or non-finite floors at 1, and a non-finite ratio
 * clamps to 0. The base floored `max` and did **not** clamp the ratio, so a
 * `NaN` value produced `width: "NaN%"` — a silently empty track with no error,
 * which is the divide-by-zero class §4.5 asks every spec in this pass to
 * assert against.
 */
export declare const MiniBarV4: React.ForwardRefExoticComponent<MiniBarV4Props & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=MiniBarV4.d.ts.map