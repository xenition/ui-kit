import * as React from 'react';
import type { IconColor } from '../primitives/Icon';
import type { IconName } from '../primitives/icon-names';
import type { EmptyDashboardProps } from './EmptyDashboard';
/**
 * The semantic family the badge and the action belong to.
 *
 * A subset of `IconColor` — the four *fills* that name a family — rather than
 * the full ten, because the other six are `on*` pairs and a badge tinted with
 * an on-colour is a mistake the type should not allow. `primary` by default:
 * brief §4.7, "its colour comes from the semantic family the row belongs to;
 * `primary` by default".
 */
export type EmptyDashboardV4Tone = Extract<IconColor, 'primary' | 'success' | 'warn' | 'danger'>;
export interface EmptyDashboardV4Props extends EmptyDashboardProps {
    /**
     * Named glyph for the 64 tinted circular badge — brief §4.5's illustration
     * slot, expressed as a token rather than as a caller-drawn picture.
     *
     * Optional, and ignored when `icon` is given: `icon` is the pre-existing
     * escape hatch for an illustration this kit has no name for, and the
     * additive rule says a caller who passes one keeps getting exactly it.
     */
    iconName?: IconName;
    /**
     * Semantic family of the badge. Default `'primary'`.
     *
     * The action stays the brand primary in every case — brief §3 gives a screen
     * one loud thing, and a `danger`-toned CTA on an empty dashboard would be
     * shouting about a state that is merely quiet.
     */
    tone?: EmptyDashboardV4Tone;
}
/**
 * **V4 empty dashboard** — the web twin of the native `EmptyDashboardV4`, a
 * thin opinionated wrapper over {@link EmptyStateV4} rather than a second
 * implementation of it.
 *
 * ## The whole point is that it is not its own thing
 *
 * Brief §4.5: "every empty state routes through `EmptyStateV4`". The base
 * `EmptyDashboard` hand-rolls the anatomy — its own centred column, its own
 * `text-xl font-bold` headline, its own `text-muted` body, its own
 * `max-w-[340px]` measure — so an empty dashboard and an empty list are two
 * different objects that happen to look similar. V4 deletes all of that and
 * hands the three parts to the primitive. What is left here is the two
 * decisions the primitive cannot make for a *dashboard*:
 *
 * 1. **The illustration is a 64 tinted circular badge** (§4.5, §4.7), built
 *    from `IconV4` so it is the same disc the feature rows and the activity
 *    feed wear, at the one size the empty state gets.
 * 2. **The action is a full-width pill, inset from the screen edge** — HIG's
 *    "full-width buttons must be inset from the screen edge, aligned with
 *    adjacent safe areas" and the house sticky-CTA shape, which agree. The
 *    base ships a shrink-wrapped `Button` in the middle of the column.
 *
 * ## Why the CTA is a sibling of the empty state and not its `action` slot
 *
 * `EmptyStateV4` centres its column (`items-center`), so every child is sized
 * to its own content. A button inside that column cannot be full-width —
 * `w-full` resolves against a parent whose width is itself resolved from the
 * button. Stretching the slot from outside would need either a `:has()` rule or
 * an alignment override that also un-centres the measure on the description,
 * and the native twin has no equivalent lever at all. So the CTA sits below the
 * state, in this component's own `lg` gutter, which is *also* the more literal
 * reading of "inset from the screen edge": the inset is the page gutter, and
 * the page gutter belongs to the container, not to the copy above it.
 *
 * The block above it is still `EmptyStateV4`, node for node.
 *
 * ## What is deliberately NOT overridden
 *
 * The headline and body **keep the primitive's type ramp** (`lg`/semibold over
 * `sm`/`muted-text`) rather than being wrapped in a `TextV4` at brief §4.5's
 * `xl`/`base`. Overriding it here would recreate, one level up, precisely the
 * divergence §4.5 exists to remove — an empty dashboard that is a *different
 * size* from an empty list is not "the same object". If the empty-state ramp is
 * to move, it moves in `EmptyStateV4` and every empty state moves with it.
 *
 * `max-w-[340px]` is gone; the measure is the primitive's, off the spacing
 * scale.
 *
 * The native twin takes `style` and `onAction`; every other prop, name and
 * default is identical.
 */
export declare const EmptyDashboardV4: React.ForwardRefExoticComponent<EmptyDashboardV4Props & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=EmptyDashboardV4.d.ts.map