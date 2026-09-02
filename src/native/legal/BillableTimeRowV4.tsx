import * as React from 'react';
import { Pressable, Text, View, type ViewStyle } from 'react-native';
import { useXenitionTheme } from '../theme';
import { withAlpha } from '../primitives/internal/color';
import { Button } from '../primitives';
import { StatusPill } from './StatusPill';
import { BILLABLE_STATUS_META, billableCents, formatHours, formatMoney } from './internal';
import type { BillableTimeRowProps } from './BillableTimeRow';

/** Drop-in for {@link BillableTimeRowProps} — same props, the V4 "chambers" design. */
export type BillableTimeRowV4Props = BillableTimeRowProps;

/**
 * BillableTimeRow — **V4** "chambers" design (native twin of the web V4). An
 * elevated rounded row with a soft shadow, a date + **tabular-nums** duration
 * eyebrow, the narrative, the timekeeper, a big legible **tabular-nums** amount
 * (money carried as integer cents through the shared `formatMoney`), and a
 * labelled glyph + word billing status (never color alone). When `actionable`
 * and not yet billed, a "Log time" button fires `onLog`. Tappable when `onPress`
 * is set. Reuses the base `variant` (`default` / `compact`). Token-only colors
 * via `useXenitionTheme()`.
 */
export function BillableTimeRowV4({
  date,
  description,
  hours,
  rateCents,
  amountCents,
  currency = 'USD',
  timekeeper,
  status = 'draft',
  variant = 'default',
  actionable = false,
  onLog,
  onPress,
  testID,
  style,
}: BillableTimeRowV4Props): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();
  const compact = variant === 'compact';
  const amount = amountCents ?? billableCents(hours, rateCents);
  const canLog = actionable && (status === 'draft' || status === 'unbilled');
  const shell: ViewStyle = {
    backgroundColor: colors.card,
    borderColor: colors.border,
    borderWidth: 1,
    borderRadius: tokens.radius.lg,
    padding: tokens.spacing.md,
    gap: tokens.spacing.sm,
    shadowColor: colors.onSurface,
    shadowOpacity: 0.06,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },
    elevation: 2,
  };

  const content = (
    <>
      <View style={{ flexDirection: 'row', alignItems: 'flex-start', gap: tokens.spacing.md }}>
        <View style={{ flex: 1, minWidth: 0, gap: 2 }}>
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.xs }}>
            <Text style={{ color: colors.muted, fontSize: tokens.typography.scale.xs, fontWeight: '700', fontVariant: ['tabular-nums'] }}>{date}</Text>
            <View style={{ backgroundColor: withAlpha(colors.primary, 0.1), borderRadius: tokens.radius.full, paddingHorizontal: tokens.spacing.xs }}>
              <Text style={{ color: colors.primary, fontSize: tokens.typography.scale.xs, fontWeight: '700', fontVariant: ['tabular-nums'] }}>{formatHours(hours)}</Text>
            </View>
          </View>
          <Text numberOfLines={compact ? 1 : 2} style={{ color: colors.onSurface, fontSize: tokens.typography.scale.sm }}>{description}</Text>
          {!compact && timekeeper ? <Text style={{ color: colors.muted, fontSize: tokens.typography.scale.xs }}>{timekeeper}</Text> : null}
        </View>
        <View style={{ alignItems: 'flex-end', gap: 2 }}>
          <Text style={{ color: colors.onSurface, fontSize: tokens.typography.scale.lg, fontWeight: '700', fontVariant: ['tabular-nums'] }}>{formatMoney(amount, currency)}</Text>
          {status ? <StatusPill meta={BILLABLE_STATUS_META[status]} variant="soft" size="sm" /> : null}
        </View>
      </View>

      {canLog && onLog ? (
        <Button size="sm" variant="primary" onPress={onLog} style={{ alignSelf: 'flex-start' }}>
          Log time
        </Button>
      ) : null}
    </>
  );

  if (onPress) {
    return (
      <Pressable accessibilityRole="button" accessibilityLabel={`Time entry ${date}, ${formatHours(hours)}`} onPress={onPress} testID={testID} style={({ pressed }) => [shell, { opacity: pressed ? 0.8 : 1 }, style]}>
        {content}
      </Pressable>
    );
  }
  return <View testID={testID} style={[shell, style]}>{content}</View>;
}
