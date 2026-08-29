import * as React from 'react';
import { View, type StyleProp, type ViewProps, type ViewStyle } from 'react-native';
import type { SpacingScale } from '../../theme/types';
import { useXenitionTheme } from '../theme';

export type SpaceKey = keyof SpacingScale;

/**
 * Where a V4 list separator starts.
 *
 * The `SpaceKey` values are the base's, unchanged. `'leading'` is the addition
 * (BRIEF §4.4): the rule starts where the row's *text* starts, clearing the
 * row's 44 leading slot.
 */
export type ListSeparatorV4Inset = SpaceKey | 'leading';

export interface ListSeparatorV4Props extends ViewProps {
  /**
   * Leading inset — a spacing token, or `'leading'` to clear a row's 44
   * leading slot (BRIEF §4.3/§4.4).
   *
   * Use `'leading'` when the rows either side carry an avatar or a tinted
   * badge; leave it unset for a flush rule when they do not. Unset is the
   * default, so every existing caller renders exactly as it does today.
   */
  inset?: ListSeparatorV4Inset;
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
 * The hairline's thickness — the same `1` the web twin gets from `h-px`, so
 * the two platforms draw the same weight of line.
 */
const HAIRLINE = 1;

/**
 * **V4 list separator** — the native twin, at prop parity with the new web
 * `ListSeparatorV4`.
 *
 * It is a hairline: 1 unit of `colors.border` and nothing else (BRIEF §4.4).
 * It is **not** a second `Divider` — it exists so `SettingsSection` and any
 * list of `ListRow`s stop hand-rolling their own rule, which is how the
 * leading inset went missing in the first place. Ideal as a `FlatList`'s
 * `ItemSeparatorComponent`, which is also its own empty state: a list of zero
 * or one item draws no separator at all.
 *
 * `inset="leading"` starts the rule at `LEADING_SLOT + spacing.md`, clearing
 * the row's leading slot so the line aligns with the titles above and below
 * it. Rows with no leading slot take the flush rule (no `inset`).
 *
 * Decorative by construction: the rows either side already carry the list's
 * structure, so the rule stays out of the accessibility tree rather than being
 * announced between every pair of items. When a rule genuinely *is* the
 * boundary between two regions, that is `DividerV4`.
 */
export function ListSeparatorV4({
  inset,
  style,
  ...rest
}: ListSeparatorV4Props): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();

  // 44 (the leading slot) + the slot-to-text gap = the row title's leading
  // edge. Composed from the scale, so the two halves cannot drift apart.
  const insetPx =
    inset === 'leading'
      ? LEADING_SLOT + tokens.spacing.md
      : inset !== undefined
        ? tokens.spacing[inset]
        : 0;

  return (
    <View
      accessibilityRole="none"
      accessible={false}
      style={[
        {
          height: HAIRLINE,
          backgroundColor: colors.border,
          marginLeft: insetPx,
        },
        style,
      ]}
      {...rest}
    />
  );
}
