import * as React from 'react';
import { type StyleProp, type ViewProps, type ViewStyle } from 'react-native';
import type { SpacingScale } from '../../theme/types';
export type SpaceKey = keyof SpacingScale;
/**
 * Where a V4 divider starts.
 *
 * The `SpaceKey` values are the base's, unchanged — a symmetric inset off the
 * cross axis. `'leading'` is the one addition (BRIEF §4.4): the separator
 * starts where a row's *text* starts, so it clears the row's leading slot
 * instead of cutting across an avatar or a tinted badge.
 */
export type DividerV4Inset = SpaceKey | 'leading';
export interface DividerV4Props extends ViewProps {
    orientation?: 'horizontal' | 'vertical';
    /**
     * Inset the divider from the cross axis by a spacing token, or by
     * `'leading'` to clear a row's 44 leading slot (BRIEF §4.3/§4.4).
     *
     * A `SpaceKey` insets both ends, as it always has. `'leading'` insets only
     * the leading end — a separator between rows is meant to line up with the
     * titles above and below it and still run out to the container edge.
     *
     * Rows *without* a leading slot get a flush separator: leave `inset` unset.
     */
    inset?: DividerV4Inset;
    style?: StyleProp<ViewStyle>;
}
/**
 * **V4 divider** — the native twin of the web `DividerV4`, at prop parity, in
 * the V4 design line.
 *
 * Visually it is the base: BRIEF §4.4 settles that a separator is **1 unit of
 * `colors.border` and nothing else** — never two weights, never a tinted rule
 * — and the base already draws exactly that. So this file is structure plus
 * the one new capability the row family needs.
 *
 * **`inset="leading"`.** Where a list's rows carry a 44 leading slot, a flush
 * rule runs underneath the avatar or badge and makes the list read as a table.
 * Inset by `LEADING_SLOT + spacing.md` it starts at the title, which is what
 * turns a stack of rows into one grouped container. Rows with no leading slot
 * keep the flush rule — that is the default, so every existing caller renders
 * exactly as it does today (§1.4).
 *
 * **Where a divider belongs.** Inside a grouped container only — between the
 * rows of a `SettingsSection`, or between a card header and a body that is a
 * list. Between free-standing blocks the separator is space, not a rule
 * (§4.4); a hairline under every block is admin styling and fights the airy
 * ground §3 asks for.
 *
 * No label variant — `AuthDividerV4` owns that.
 */
export declare function DividerV4({ orientation, inset, style, ...rest }: DividerV4Props): React.ReactElement;
//# sourceMappingURL=DividerV4.d.ts.map