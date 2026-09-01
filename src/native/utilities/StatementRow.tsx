import * as React from 'react';
import { Pressable, Text, View, type StyleProp, type ViewStyle } from 'react-native';
import { useXenitionTheme } from '../primitives';
import { Icon, Badge } from '../primitives';
import { formatMoney, type MoneyFormatter } from './internal/format';
import { billStatus, type BillStatus } from './internal/status';
import { GradientSurface } from './internal/GradientSurface';
import { brandDisc, brandInk } from './internal/brand';

export type { BillStatus };

export interface StatementRowProps {
  /** Localized statement period (e.g. "March 2026"). */
  period: string;
  /** Statement total in integer **cents**. */
  amountCents: number;
  /** ISO 4217 currency code (default `USD`). */
  currency?: string;
  /** Optional bill lifecycle — renders a status `Badge` when supplied. */
  status?: BillStatus;
  /** Override the cents → string formatter (locale control). */
  formatMoney?: MoneyFormatter;
  /** Fires when the download action is pressed; the icon button renders only then. */
  onDownload?: () => void;
  /** Fires on row press (e.g. open statement); becomes a button when supplied. */
  onPress?: () => void;
  style?: StyleProp<ViewStyle>;
}

/**
 * One line in a statement history — the clean V4 look: a brand-gradient disc with
 * a document glyph (the signature touch), the period with an optional status pill
 * carrying text + glyph + color, and the total in integer cents via `formatMoney`.
 * An optional download icon button renders only when `onDownload` is supplied, and
 * the whole row becomes a button when `onPress` is set. Token-only colors.
 */
export function StatementRow({
  period,
  amountCents,
  currency = 'USD',
  status,
  formatMoney: format = formatMoney,
  onDownload,
  onPress,
  style,
}: StatementRowProps): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();
  const r = tokens.ramps;
  const sd = status != null ? billStatus(status) : null;
  const amount = Math.max(0, Math.trunc(amountCents || 0));

  const card = {
    backgroundColor: colors.card,
    borderRadius: tokens.radius.lg,
    padding: tokens.spacing.lg,
    shadowColor: colors.onSurface,
    shadowOpacity: 0.1,
    shadowRadius: 14,
    shadowOffset: { width: 0, height: 6 },
    elevation: 3,
  } as const;

  const row = (
    <View style={[card, { flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.md }, style]}>
      <GradientSurface
        colors={brandDisc(r)}
        style={{
          width: 44,
          height: 44,
          borderRadius: tokens.radius.md,
          alignItems: 'center',
          justifyContent: 'center',
          overflow: 'hidden',
        }}
      >
        <Icon glyph="📄" size="lg" accessibilityLabel="Statement" style={{ color: brandInk(r) }} />
      </GradientSurface>

      <View style={{ flex: 1, gap: tokens.spacing.xs }}>
        <Text
          numberOfLines={1}
          style={{ color: colors.onSurface, fontSize: tokens.typography.scale.base, fontWeight: '700' }}
        >
          {period}
        </Text>
        {sd != null ? (
          <View style={{ flexDirection: 'row' }}>
            <Badge tone={sd.tone} variant="soft" size="sm">
              {`${sd.glyph} ${sd.label}`}
            </Badge>
          </View>
        ) : null}
      </View>

      <View style={{ flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.sm }}>
        <Text style={{ color: colors.onSurface, fontSize: tokens.typography.scale.base, fontWeight: '700' }}>
          {format(amount, currency)}
        </Text>
        {onDownload != null ? (
          <Pressable
            accessibilityRole="button"
            accessibilityLabel="Download statement"
            onPress={onDownload}
            style={({ pressed }) => ({
              width: 36,
              height: 36,
              borderRadius: tokens.radius.full,
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: colors.muted,
              opacity: pressed ? 0.7 : 1,
            })}
          >
            <Icon glyph="⬇" color="onSurface" />
          </Pressable>
        ) : null}
      </View>
    </View>
  );

  if (!onPress) return row;
  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={`Statement ${period}, ${format(amount, currency)}${sd != null ? `, ${sd.label}` : ''}`}
      onPress={onPress}
      style={({ pressed }) => ({ opacity: pressed ? 0.85 : 1 })}
    >
      {row}
    </Pressable>
  );
}
