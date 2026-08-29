import * as React from 'react';
import { type StyleProp, type ViewProps, type ViewStyle } from 'react-native';
import type { CardVariant } from '../primitives/Card';
import type { SectionCardV4Empty } from './SectionCardV4';
export type { SectionCardV4Empty as SettingsSectionV4Empty };
export interface SettingsSectionV4Props extends ViewProps {
    /**
     * Group heading above the rows.
     *
     * Sentence case, `size="sm" weight="semibold" tone="mutedText"`. The base
     * sets `xs` + `textTransform: 'uppercase'` — that is admin styling, and
     * HIG's grouped-list headers are sentence case (§5).
     */
    title?: string;
    /** Footnote under the group — the "why this setting exists" line. */
    footnote?: string;
    /**
     * Inset the separators to clear the rows' 44 leading slot. Default `false` —
     * the flush rule, which is what rows without a leading slot want.
     *
     * §4.4: where the rows carry an avatar or a tinted badge (`SettingsRowV4`
     * gains a `leading` slot in this pass) the rule starts at `44 + spacing.md`,
     * so it aligns with the labels above and below it instead of cutting the
     * badges in half. The number belongs to `ListSeparatorV4` and
     * `internal/row-v4.ts`; this prop is only the question of whether the rows
     * have a slot to clear, which the caller knows and the container cannot.
     */
    insetSeparators?: boolean;
    /**
     * Surface treatment, forwarded to {@link CardV4}. Default `'elevated'`:
     * §4.2's hairline plus `elevation.card`.
     *
     * §4.6 allows a shadow on a card sitting on the page and on nothing else, so
     * a settings group nested inside another card passes `'flat'` or
     * `'outlined'`. On a `depth: 'flat'` seed the token is already inert.
     */
    variant?: CardVariant;
    /**
     * What to show when there are no rows (§4.5). Routed through `EmptyStateV4`.
     *
     * With no rows and no empty state the whole component renders `null` — an
     * empty grouped card is the "blank bordered box" §4.5 forbids, and a group
     * heading over nothing is worse.
     */
    empty?: SectionCardV4Empty;
    style?: StyleProp<ViewStyle>;
    /** {@link SettingsRow}s (or any rows) — separators are drawn between them. */
    children?: React.ReactNode;
}
/**
 * **V4 settings section** — HIG's inset-grouped list, and the container that
 * makes a settings row look right.
 *
 * ## What V4 changes
 *
 * 1. **The ground is `colors.card`, not `colors.surface`.** Same headline fix
 *    as `SectionCardV4`: a grouped list painted the colour of the page is a
 *    border with rows in it, and `card` is the slot the shadcn pass added so a
 *    raised surface reads as raised in both schemes.
 * 2. **The separators are `ListSeparatorV4`.** Both twins hand-roll a
 *    `<View style={{ height: 1 }} />` today, which is how the leading inset
 *    went missing in the first place. They are drawn **between** the rows, so
 *    the last row gets none and the list ends on the card's own edge (§4.4).
 * 3. **The uppercase `xs` heading is gone.** Admin styling; HIG's grouped
 *    headers are sentence case. It becomes `size="sm" weight="semibold"
 *    tone="mutedText"` — `mutedText`, never the `muted` **fill**, which is what
 *    both base twins paint their heading and footnote with.
 * 4. **The heading and footnote pay the row gutter.** `rowMetrics().padX`, read
 *    off `internal/row-v4.ts` rather than retyped, not the base's `spacing.sm`
 *    — so the heading sits over the row labels rather than near them.
 * 5. **It renders nothing for zero rows.** §4.5, and the base's exact bug: an
 *    empty `SettingsSection` today is a bordered rectangle with a heading over
 *    it.
 *
 * The card is `overflow: 'hidden'` and pays no padding of its own: the rows own
 * their gutters (`internal/row-v4.ts`), so they run flush to the card edge and
 * clip to `radius.lg`. §4.3 in one sentence — **a list of rows is one card with
 * rows in it, not a stack of cards.**
 *
 * ### Platform divergence
 *
 * None. Same props, same names, same defaults as the web twin.
 */
export declare function SettingsSectionV4({ title, footnote, insetSeparators, variant, empty, style, children, ...rest }: SettingsSectionV4Props): React.ReactElement | null;
//# sourceMappingURL=SettingsSectionV4.d.ts.map