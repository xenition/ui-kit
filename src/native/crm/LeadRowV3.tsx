import * as React from 'react';
import { Pressable, Text, View } from 'react-native';
import { useXenitionTheme } from '../theme';
import { formatMoney } from '../commerce/money';
import { TEMPERATURE_META, toneColor, clampPct } from './internal';
import type { LeadRowProps } from './LeadRow';

/** V3 accepts the exact same props as {@link LeadRow} — a drop-in replacement. */
export type LeadRowV3Props = LeadRowProps;

/**
 * LeadRow **design V3** — the *densest* single line: a leading temperature glyph
 * (🔥/☀/❄), the name, the value pushed right, and a small score. No avatar, no
 * second line of chrome — a maximum-density lead list for triage screens.
 * Temperature still pairs the glyph with an accessible word in the row label, so
 * meaning never rests on color. Same props as {@link LeadRow}. Token-pure.
 */
export function LeadRowV3({
  name,
  company,
  temperature,
  valueCents,
  currency = 'USD',
  score,
  selected = false,
  onPress,
  testID,
  style,
}: LeadRowV3Props): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();
  const meta = TEMPERATURE_META[temperature];
  const tempColor = toneColor(colors, meta.tone);

  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={`${meta.label} lead ${name}${company ? `, ${company}` : ''}`}
      disabled={!onPress}
      onPress={onPress}
      testID={testID}
      style={[
        {
          flexDirection: 'row',
          alignItems: 'center',
          gap: tokens.spacing.sm,
          paddingVertical: tokens.spacing.xs,
          paddingHorizontal: tokens.spacing.sm,
          borderLeftWidth: 3,
          borderLeftColor: selected ? colors.primary : tempColor,
          backgroundColor: colors.surface,
        },
        style,
      ]}
    >
      <Text allowFontScaling={false} style={{ fontSize: tokens.typography.scale.base, color: tempColor, width: 20, textAlign: 'center' }}>
        {meta.glyph}
      </Text>

      <Text numberOfLines={1} style={{ flex: 1, color: colors.onSurface, fontSize: tokens.typography.scale.sm, fontWeight: '600' }}>
        {name}
        {company ? (
          <Text style={{ color: colors.muted, fontSize: tokens.typography.scale.xs, fontWeight: '400' }}>{`  ${company}`}</Text>
        ) : null}
      </Text>

      {valueCents != null ? (
        <Text style={{ color: colors.onSurface, fontSize: tokens.typography.scale.sm, fontWeight: '700' }}>
          {formatMoney(valueCents, currency)}
        </Text>
      ) : null}
      {score != null ? (
        <Text style={{ color: tempColor, fontSize: tokens.typography.scale.xs, fontWeight: '700', minWidth: 20, textAlign: 'right' }}>
          {`${clampPct(score)}`}
        </Text>
      ) : null}
    </Pressable>
  );
}
