import * as React from 'react';
import { Pressable, View } from 'react-native';
import { useXenitionTheme } from '../theme';
import { TextV4 } from '../primitives/TextV4';
import { MoneyAmount } from '../finance/MoneyAmount';
import { pressOver } from '../primitives/internal/state-v4';
import { metaLine } from '../primitives/internal/tone-v4';
import { rowContainerStyle, rowTextStyle, rowTrailingStyle } from '../dashboard/internal/row-v4';
import { formatMoney } from '../../commerce/money';
import { spokenLine } from './internal/market-v4';
import { formatToken } from './internal/format';
import type { GasFeeRowProps, GasSpeed } from './GasFeeRow';

export interface GasFeeRowV4Props extends GasFeeRowProps {
  /** Wording for the three tiers. Defaults `Slow` / `Average` / `Fast`. */
  speedLabels?: Partial<Record<GasSpeed, string>>;
}

/**
 * The tier's mark and its default word.
 *
 * The base's third field — a `slot` of `muted` / `primary` / `success` — is
 * gone. A fee tier is an identity, not a health reading, and spending the
 * success slot on "Fast" is exactly the substitution the tone rules forbid.
 * The glyph carries the identity instead.
 */
const SPEED_V4: Record<GasSpeed, { label: string; glyph: string }> = {
  slow: { label: 'Slow', glyph: '🐢' },
  average: { label: 'Average', glyph: '🚶' },
  fast: { label: 'Fast', glyph: '⚡' },
};

/**
 * **V4 gas-fee tier** — same props as {@link GasFeeRow} plus `speedLabels`.
 *
 * ## Four changes
 *
 * 1. **The radio announces whether it is chosen.** The base set
 *    `accessibilityState={{ selected }}`, and a radio's state key is
 *    `checked` — so all three tiers announced identically and a screen-reader
 *    user could not tell which fee they were about to pay.
 * 2. **The name carries the numbers.** `"Average gas"` was the whole
 *    announcement: the gwei price, the ETA and the fiat cost — the only things
 *    that distinguish one tier from another — were never spoken. The row is
 *    now one name built from all four.
 * 3. **A press is a state layer.** `opacity: pressed ? 0.8 : 1` faded the
 *    row's own content toward M3's disabled band; the layer tints the
 *    container and leaves the label at full strength.
 * 4. **The tier stops borrowing status colour**, the selected ground comes
 *    from `selected`/`onSelected` rather than a raw ramp step, and the row
 *    sits on the shared row metrics so a fee list and a settings list are one
 *    family.
 */
export function GasFeeRowV4({
  speed,
  gwei,
  costCents,
  currency = 'USD',
  eta,
  selected = false,
  speedLabels,
  onSelect,
  style,
}: GasFeeRowV4Props): React.ReactElement {
  const theme = useXenitionTheme();
  const { colors, tokens } = theme;
  const meta = SPEED_V4[speed];
  const label = speedLabels?.[speed] ?? meta.label;

  const gweiText = formatToken(gwei, { decimals: 2, symbol: 'gwei' });
  // The three figures a user is actually choosing between, in the order they
  // are drawn. Commas, because a reader says "middle dot" out loud.
  const name = spokenLine([
    label,
    gweiText,
    eta,
    costCents != null ? formatMoney(costCents, currency) : null,
  ]);

  const ground = selected ? colors.selected : colors.surface;
  const ink = selected ? colors.onSelected : colors.onSurface;

  const body = (pressed: boolean): React.ReactElement => (
    <View
      style={[
        rowContainerStyle(theme),
        {
          borderRadius: tokens.radius.md,
          borderWidth: 1,
          borderColor: selected ? colors.primary : colors.border,
          backgroundColor: pressed ? pressOver(theme, ground, ink) : ground,
        },
        style,
      ]}
    >
      {/* The tier's mark. The word beside it is the real label, so the glyph
          is decoration and stays out of the reader's way. */}
      <TextV4
        size="lg"
        accessibilityElementsHidden
        importantForAccessibility="no-hide-descendants"
      >
        {meta.glyph}
      </TextV4>

      <View style={rowTextStyle(theme)}>
        <TextV4 size="base" weight="semibold" numberOfLines={1} style={{ color: ink }}>
          {label}
        </TextV4>
        <TextV4 size="xs" tone="mutedText" numeric="tabular" numberOfLines={1}>
          {metaLine([gweiText, eta])}
        </TextV4>
      </View>

      {costCents != null ? (
        <View style={rowTrailingStyle(theme)}>
          <MoneyAmount cents={costCents} currency={currency} tone="neutral" size="sm" />
        </View>
      ) : null}
    </View>
  );

  if (!onSelect) {
    return (
      <View accessible accessibilityLabel={name}>
        {body(false)}
      </View>
    );
  }

  return (
    <Pressable
      accessibilityRole="radio"
      // `checked`, not `selected`. This is the whole defect.
      accessibilityState={{ checked: selected }}
      accessibilityLabel={name}
      onPress={() => onSelect(speed)}
      style={{ borderRadius: tokens.radius.md }}
    >
      {({ pressed }) => body(pressed)}
    </Pressable>
  );
}
