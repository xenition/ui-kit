import * as React from 'react';
import { View, type StyleProp, type ViewProps, type ViewStyle } from 'react-native';
import type { SpacingScale } from '../../theme/types';
import { useXenitionTheme } from '../theme';

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
 * The row's leading slot: **44**.
 *
 * The HIG tap-target floor and the house §8 badge size, and the size BRIEF
 * §4.3 gives the row's leading slot. It is one of the two bare numbers §1
 * allows in this file; the other is {@link HAIRLINE}. It is not on the spacing
 * scale, which is exactly why it is declared once here with its provenance
 * rather than retyped at a use site.
 */
const LEADING_SLOT = 44;

/**
 * The hairline's thickness. `1` is the other bare number §1 names outright,
 * and it is the same `1` the web twin gets from `border-t`, so the two
 * platforms draw the same weight of line.
 */
const HAIRLINE = 1;

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
export function DividerV4({
  orientation = 'horizontal',
  inset,
  style,
  ...rest
}: DividerV4Props): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();

  const horizontal = orientation === 'horizontal';
  const leading = inset === 'leading';
  // The token inset, as the base computes it. `'leading'` is handled apart
  // because it is one-ended.
  const insetPx = inset !== undefined && !leading ? tokens.spacing[inset] : 0;
  // 44 (the leading slot) + the slot-to-text gap = the row title's leading
  // edge. Composed from the scale, so the two halves cannot drift apart.
  const leadingPx = LEADING_SLOT + tokens.spacing.md;

  const base: ViewStyle = horizontal
    ? {
        height: HAIRLINE,
        alignSelf: 'stretch',
        marginHorizontal: insetPx,
        ...(leading ? { marginLeft: leadingPx } : null),
      }
    : {
        width: HAIRLINE,
        alignSelf: 'stretch',
        marginVertical: insetPx,
        ...(leading ? { marginTop: leadingPx } : null),
      };

  return (
    <View
      accessibilityRole="none"
      accessible={false}
      style={[{ backgroundColor: colors.border }, base, style]}
      {...rest}
    />
  );
}
