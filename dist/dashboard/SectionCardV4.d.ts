import * as React from 'react';
import type { CardPadding, CardVariant } from '../primitives/Card';
/**
 * The id of the one sheet the V4 dashboard containers inject.
 *
 * Exported so `SettingsSectionV4` can inject the same sheet rather than declare
 * a second copy of the card ground, and so both specs can read it back.
 */
export declare const DASHBOARD_CARD_V4_STYLE_ID = "xen-v4-dashboard-card-styles";
/**
 * The attribute that marks a `CardV4` as painting the **card** ground rather
 * than the page ground.
 *
 * Brief §4.2: "the most visible bug in the dashboard module today is that every
 * card paints `bg-surface` — the same colour as the page." `colors.card` was
 * split out in the shadcn pass so a raised card reads as raised in *both*
 * schemes (it lightens in dark, where a shadow alone does nothing), and this
 * module never adopted it.
 *
 * It is an attribute and a sheet rather than a `bg-card` class because
 * {@link CardV4} writes `bg-surface` into its own `className`, and two utility
 * classes setting the same property are resolved by the order Tailwind emitted
 * them in — not by the order this component joined them in. The selector below
 * carries **two** attributes, so its specificity (0-2-0) beats a single utility
 * class (0-1-0) whichever way round the stylesheet happens to be built. That is
 * the same argument `internal/row-v4.ts` makes for its own state-ground rule,
 * and it is also why the ground is not an inline `style`: an inline `var()`
 * colour is dropped by every CSS parser that cannot resolve it, so the one rule
 * that matters most in this pass would be the one rule nothing could assert.
 */
export declare const DASHBOARD_CARD_V4_GROUND_ATTR = "data-xen-v4-card-ground";
/**
 * The card ground and its ink, and nothing else.
 *
 * No border and no shadow live here: {@link CardV4} already owns both, and §4.2
 * is explicit that the house look is a **hairline plus a soft shadow** — never
 * a heavy border *and* a heavy shadow. Adding a weight here would be exactly
 * that mistake.
 */
export declare const DASHBOARD_CARD_V4_CSS = "\n[data-xen-v4-card][data-xen-v4-card-ground=\"card\"] {\n  background-color: var(--xen-card);\n  color: var(--xen-on-card);\n}\n";
/**
 * What a container renders when it has nothing to put in itself.
 *
 * The four slots of `EmptyStateV4` and not one more — deliberately *not*
 * `EmptyStateProps`, which extends `HTMLAttributes` on web and carries a
 * `style` on native, so a shared prop typed as it could never be at parity.
 * §4.5: every empty state routes through the primitive, and every one of the 32
 * must survive its empty case.
 */
export interface SectionCardV4Empty {
    /** Decorative slot — §4.5's 64 tinted circular badge, or the caller's own. */
    icon?: React.ReactNode;
    /** The headline. */
    title: React.ReactNode;
    /** One supporting line, at a comfortable measure. */
    description?: React.ReactNode;
    /** Exactly one action — §4.5 asks for one, and the primitive gives it room. */
    action?: React.ReactNode;
}
export interface SectionCardV4Props extends React.HTMLAttributes<HTMLDivElement> {
    /**
     * Section heading. Optional in V4 (the base requires it) so a card can be
     * body-only — see the header-collapse note in the component doc.
     */
    title?: string;
    /** Supporting line under the title. */
    subtitle?: string;
    /** Trailing header slot, e.g. a "See all" link — shadcn's `CardAction`. */
    action?: React.ReactNode;
    /**
     * Draw a hairline between the header and the body. Default `false` — the
     * base's rendering.
     *
     * §4.4 narrows what it is *for*: use it only when the body is a list of rows,
     * i.e. alongside {@link SectionCardV4Props.grouped}. Between a header and a
     * paragraph the answer is space, not a rule.
     */
    divided?: boolean;
    /**
     * The body is a list of rows, not a block of content. Default `false`.
     *
     * §4.3's structural consequence, and the reason this component exists: **a
     * list of rows is ONE card with rows in it, not a stack of cards.** When set,
     * the body gives up the card padding so the rows run flush to the card edge
     * and clip to `radius.lg` (the card is `overflow: hidden`), and a
     * {@link ListSeparatorV4} is drawn between each pair of rows — *between*, so
     * the last row gets none and the list ends on the card's own edge.
     */
    grouped?: boolean;
    /**
     * Inset the grouped separators to clear the rows' 44 leading slot. Default
     * `false` — the flush rule, which is what rows without a leading slot want.
     *
     * §4.4: where the rows carry an avatar or a tinted badge the rule starts at
     * `44 + spacing.md`, so it aligns with the titles above and below it instead
     * of cutting the badges in half. The number belongs to `ListSeparatorV4` and
     * `internal/row-v4.ts`; this prop is only the question of whether the rows
     * have a slot to clear, which the caller knows and the container cannot.
     */
    insetSeparators?: boolean;
    /**
     * Card padding, read by every slot from one variable (§4.2). Default `'lg'`
     * (24) — the base's, and §4.1's card outer padding.
     */
    padding?: CardPadding;
    /**
     * Surface treatment, forwarded to {@link CardV4}. Default `'elevated'`:
     * §4.2's hairline plus `elevation.card`.
     *
     * §4.6 allows a shadow on a card sitting on the page and on nothing else, so
     * a `SectionCardV4` nested inside another card passes `'flat'` or
     * `'outlined'`. On a `depth: 'flat'` seed the elevation token is already
     * inert, so no caller has to branch on the seed.
     */
    variant?: CardVariant;
    /**
     * What to show when there are no children (§4.5). Routed through
     * `EmptyStateV4` — the kit has one empty state and this is not a second one.
     *
     * With no children, no empty state and no header this renders `null`: a card
     * with nothing in it is the "blank bordered box" §4.5 forbids.
     */
    empty?: SectionCardV4Empty;
    children?: React.ReactNode;
}
/**
 * **V4 section card** — the canonical card, and where §4.2 lands.
 *
 * ## What V4 changes
 *
 * 1. **The ground is `card`, not `surface`.** The base paints `bg-surface`,
 *    which is the colour of the page it is sitting on, so the card is a
 *    rectangle of border with no card inside it. See
 *    {@link DASHBOARD_CARD_V4_GROUND_ATTR} for why that is a sheet rather than
 *    a class. The ink moves with it: `onCard`, not `onSurface`.
 * 2. **One padding variable.** shadcn/ui declares `--card-spacing` once on the
 *    card and has every slot read it; §4.2 asks for the same here, and it is
 *    what makes `grouped` safe — the header keeps the gutter at exactly the
 *    value the body gave up, because both are the same expression.
 * 3. **`grouped` and `overflow: hidden`.** A list of rows runs flush to the
 *    card edge and clips to `radius.lg`, with `ListSeparatorV4` between the
 *    rows. This is §4.3's container half: the rows are transparent and the card
 *    is the only ground, so a list reads as one object rather than a stack of
 *    little cards.
 * 4. **The header is on the type ramp, and it is `Section`'s anatomy.** Title
 *    `size="lg" weight="bold"`, subtitle `size="sm" tone="mutedText"`, trailing
 *    `action` — the same three slots `SectionV4` has, which is what makes a
 *    section and a section card look related instead of unrelated. `mutedText`,
 *    never the `muted` **fill**: the base subtitle uses the fill, which carries
 *    no contrast promise.
 * 5. **`gap-0.5` is gone.** §1 lists it as a violation; the title-to-supporting
 *    step is `spacing.xs` (§4.1).
 * 6. **It survives its empty case.** No children renders the `empty` state, or
 *    nothing at all — never a bordered box with a hole in it (§4.5).
 *
 * The header **collapses entirely** when there is no title, no subtitle and no
 * action: a padded empty row above the body is worse than no header, and the
 * `gap` it would leave behind is visible even when the row is not.
 *
 * ### Platform divergence
 *
 * None. The `<h3>` is the web's semantics for a section heading; the native
 * twin reaches the same place with `accessibilityRole="header"`. Same props,
 * same names, same defaults.
 */
export declare const SectionCardV4: React.ForwardRefExoticComponent<SectionCardV4Props & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=SectionCardV4.d.ts.map