import * as React from 'react';
import { Pressable, Text, View, type StyleProp, type ViewStyle } from 'react-native';
import { useXenitionTheme } from '../primitives';
import { Icon, Badge } from '../primitives';
import { formatMoney, type MoneyFormatter, withAlpha } from './internal/format';
import { claimStatus, type ClaimStatus } from './internal/status';

export type { ClaimStatus };

export interface ClaimRowProps {
  /** Claim reference / number (e.g. "CLM-20481"). */
  claimNumber: string;
  /** Short description of the claim (e.g. "Windshield replacement"). */
  title: string;
  /** Claim lifecycle status — conveyed by text + glyph + color. */
  status: ClaimStatus;
  /** Claimed / settled amount in integer **cents**. */
  amountCents?: number;
  /** ISO 4217 currency code (default `USD`). */
  currency?: string;
  /** Localized date string (already formatted by the caller). */
  date?: string;
  /** Override the cents → string formatter (locale control). */
  formatMoney?: MoneyFormatter;
  /** Fires on row press (e.g. open claim detail / continue filing). */
  onPress?: () => void;
  style?: StyleProp<ViewStyle>;
}

/**
 * One line in a claims list: a tinted status glyph disc, a title/number stack,
 * a status pill, and an optional right-aligned amount + date. The status is
 * conveyed redundantly (glyph + label + a color that traces to a
 * `SemanticColors` slot: approved → success, denied → danger) so it is never
 * color-alone. Amount is integer cents via `formatMoney`. Becomes a button only
 * when `onPress` is supplied.
 */
export function ClaimRow({
  claimNumber,
  title,
  status,
  amountCents,
  currency = 'USD',
  date,
  formatMoney: format = formatMoney,
  onPress,
  style,
}: ClaimRowProps): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();
  const sd = claimStatus(status);
  const tint = sd.tone === 'neutral' ? colors.muted : colors[sd.tone];

  const row = (
    <View
      style={[
        {
          flexDirection: 'row',
          alignItems: 'center',
          gap: tokens.spacing.md,
          paddingVertical: tokens.spacing.sm,
        },
        style,
      ]}
    >
      <View
        style={{
          width: 40,
          height: 40,
          borderRadius: tokens.radius.full,
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: withAlpha(tint, 0.14),
        }}
      >
        <Icon glyph={sd.glyph} accessibilityLabel={sd.label} />
      </View>
      <View style={{ flex: 1, gap: 2 }}>
        <Text
          numberOfLines={1}
          style={{ color: colors.onSurface, fontSize: tokens.typography.scale.base, fontWeight: '600' }}
        >
          {title}
        </Text>
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.xs }}>
          <Text style={{ color: colors.muted, fontSize: tokens.typography.scale.xs }}>{claimNumber}</Text>
          <Badge tone={sd.tone} variant="soft" size="sm">
            {`${sd.glyph} ${sd.label}`}
          </Badge>
        </View>
      </View>
      <View style={{ alignItems: 'flex-end', gap: 2 }}>
        {amountCents != null ? (
          <Text style={{ color: colors.onSurface, fontSize: tokens.typography.scale.base, fontWeight: '700' }}>
            {format(Math.max(0, Math.trunc(amountCents)), currency)}
          </Text>
        ) : null}
        {date != null ? (
          <Text style={{ color: colors.muted, fontSize: tokens.typography.scale.xs }}>{date}</Text>
        ) : null}
      </View>
    </View>
  );

  if (!onPress) return row;
  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={`Claim ${claimNumber}, ${title}, ${sd.label}`}
      onPress={onPress}
      style={({ pressed }) => ({ opacity: pressed ? 0.7 : 1 })}
    >
      {row}
    </Pressable>
  );
}
