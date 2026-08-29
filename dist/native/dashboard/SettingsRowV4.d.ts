import * as React from 'react';
import type { IconName } from '../../primitives/icon-names';
import type { RowBadgeTone } from './ListRowV4';
import type { SettingsRowProps } from './SettingsRow';
export type { RowBadgeTone };
export interface SettingsRowV4Props extends SettingsRowProps {
    /**
     * Custom leading slot — §4.3's 44 square. `SettingsRow` had none at all,
     * which is why a settings list and a people list did not read as the same
     * product: one had a left column and the other did not.
     */
    leading?: React.ReactNode;
    /**
     * A named glyph for the leading slot, drawn as §4.3's **tinted circular
     * badge** (`IconV4 badge="soft"`, already the §4.7 44 circle). A settings
     * group is categorical — "Notifications", "Privacy", "Billing" — so this is
     * the badge case §4.7 describes rather than the avatar case.
     * `leading` wins over it.
     */
    icon?: IconName;
    /** Semantic family of the {@link SettingsRowV4Props.icon} badge. Default `'primary'`. */
    iconTone?: RowBadgeTone;
    /**
     * Draw the trailing chevron. Defaults to **`true` when `onPress` is set and
     * no `rightSlot` was given**, `false` otherwise.
     *
     * The `rightSlot` clause is the row's own rule and matters: a settings row
     * whose trailing slot is a `SwitchV4` *toggles*, it does not navigate, and
     * §4.3 gives a toggling row a control rather than a chevron. Shipping both
     * would be the row promising a screen it never pushes.
     */
    chevron?: boolean;
    /**
     * Paint the §4.3 `selected` ground — the one exception to the row's
     * transparent ground. Default `false`.
     */
    selected?: boolean;
}
/**
 * **V4 settings row** — the row family's short variant, the same object as
 * `ListRowV4` wearing a settings label.
 *
 * The base `SettingsRow` and the base `ListRow` were measurably different
 * components: `paddingHorizontal: spacing.lg` against `spacing.md`,
 * `minHeight: 48` against `minHeight: 56`, a `›` typed as a character against
 * no affordance at all, and `colors.muted` — a *fill* — used as the ink for
 * three separate runs of text. §4.3 calls that mismatch out by name as the
 * reason a settings list and a people list do not look related. Every one of
 * those decisions now comes from `internal/row-v4.ts`, so the two files cannot
 * drift again without the module moving underneath both.
 *
 * What changes:
 *
 * 1. **The metric is the family's.** `minHeight: 48` and the `lg` horizontal
 *    padding — both brief §1 violations — become {@link rowContainerStyle}.
 *    The padding drops to `md` because the row sits *inside* a card already
 *    inset by `lg`; paying the page gutter twice pushed every label into a
 *    narrow channel down the middle.
 *
 *    The height turns on the supporting line: 56 (`2xl + sm`) with a label
 *    alone, 72 (`2xl + lg`) with a `description`. §5's note sends a row with a
 *    leading slot to 72 as well; that is not adopted, because it would put a
 *    settings row wearing a badge at 72 next to a people row wearing an avatar
 *    at 56 — the family seam §4.3 exists to close. The 44 slot grows the row
 *    past 56 by itself; the metric is a floor, not a size.
 *
 * 2. **`›` becomes an `IconV4`.** A literal chevron character renders in
 *    whatever the platform's text face has for U+203A, at the text baseline,
 *    at whatever weight the font decided — brief §1.2 retires every one of
 *    them. And it now appears **only when the row navigates**: a row whose
 *    trailing slot is a switch gets the switch and no chevron.
 *
 * 3. **A leading slot.** Optional, so nothing existing changes, but present —
 *    the reference settings screens are a column of tinted badges beside their
 *    labels, and the base row could not draw one.
 *
 * 4. **`muted` stops being an ink.** Description and value are
 *    `tone="mutedText"`, the slot that carries an actual contrast promise.
 *
 * 5. **Press is the state layer.** `opacity: pressed ? 0.7 : 1` is deleted,
 *    not translated: {@link rowGround} returns `stateMix(card, onCard,
 *    'pressed')`, so the layer tints the container while the label stays at
 *    full strength instead of fading toward M3's disabled signal.
 *
 * The label keeps `weight="medium"` rather than the family's `semibold`, per
 * §5: a settings screen is a column of twenty labels and semibold across all
 * of them is a wall, where a people list has an avatar carrying the weight
 * instead.
 *
 * Renders `null` when there is nothing to show (§4.5) — no label, no
 * description, no value, no leading slot, no trailing control.
 */
export declare function SettingsRowV4({ label, value, description, rightSlot, onPress, style, leading, icon, iconTone, chevron, selected, }: SettingsRowV4Props): React.ReactElement | null;
//# sourceMappingURL=SettingsRowV4.d.ts.map