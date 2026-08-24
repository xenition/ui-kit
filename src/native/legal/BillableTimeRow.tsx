import * as React from 'react';
import { Pressable, Text, View, type StyleProp, type ViewStyle } from 'react-native';
import { useXenitionTheme } from '../theme';
import { StatusPill } from './StatusPill';
import { Button } from '../primitives';
import {
  BILLABLE_STATUS_META,
  billableCents,
  formatHours,
  formatMoney,
  type BillableStatus,
} from './internal';

export type BillableTimeRowVariant = 'default' | 'compact';

export interface BillableTimeRowProps {
  /** Pre-formatted entry date (e.g. "Aug 24"). */
  date: string;
  /** Narrative / description of the work performed. */
  description: string;
  /** Time spent, in decimal hours (e.g. `1.5`). */
  hours: number;
  /** Hourly rate in integer **cents** (drives the computed amount). */
  rateCents?: number;
  /**
   * Amount in integer **cents**. When omitted it is computed from
   * `hours × rateCents`; either way it renders through `formatMoney` for a
   * stable 2-decimal string.
   */
  amountCents?: number;
  /** ISO 4217 currency (default USD). */
  currency?: string;
  /** Timekeeper initials / name. */
  timekeeper?: string;
  /** Billing state — glyph + word pill, never color alone. */
  status?: BillableStatus;
  /** Density. */
  variant?: BillableTimeRowVariant;
  /** Render the "Log time" action (when draft / unbilled). */
  actionable?: boolean;
  /** Commit the time entry (renders "Log time" when actionable + unbilled). */
  onLog?: () => void;
  /** Tap handler for the whole row (edit the entry). */
  onPress?: () => void;
  testID?: string;
  style?: StyleProp<ViewStyle>;
}

/**
 * One billable time entry: date, narrative, duration, and the computed amount.
 * Money is carried as integer **cents** (computed from `hours × rateCents` when
 * `amountCents` is absent) and rendered through the shared `formatMoney` for a
 * stable 2-decimal string. Billing status is a glyph + word pill so it never
 * rests on color alone. When `actionable` and not yet billed, a "Log time"
 * button fires `onLog`. All colors are theme tokens — no literals.
 */
export function BillableTimeRow({
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
}: BillableTimeRowProps): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();
  const compact = variant === 'compact';
  const amount = amountCents ?? billableCents(hours, rateCents);
  const canLog = actionable && (status === 'draft' || status === 'unbilled');

  const content = (
    <View
      style={[
        {
          gap: tokens.spacing.xs,
          paddingVertical: tokens.spacing.sm,
          paddingHorizontal: tokens.spacing.sm,
          borderRadius: tokens.radius.md,
          borderWidth: 1,
          borderColor: colors.border,
          backgroundColor: colors.surface,
        },
        style,
      ]}
    >
      <View style={{ flexDirection: 'row', alignItems: 'flex-start', gap: tokens.spacing.sm }}>
        <View style={{ flex: 1, gap: 2 }}>
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.xs }}>
            <Text style={{ color: colors.muted, fontSize: tokens.typography.scale.xs, fontWeight: '700' }}>{date}</Text>
            <Text style={{ color: colors.primary, fontSize: tokens.typography.scale.xs, fontWeight: '700' }}>{formatHours(hours)}</Text>
          </View>
          <Text numberOfLines={compact ? 1 : 2} style={{ color: colors.onSurface, fontSize: tokens.typography.scale.sm }}>
            {description}
          </Text>
          {!compact && timekeeper ? (
            <Text style={{ color: colors.muted, fontSize: tokens.typography.scale.xs }}>{timekeeper}</Text>
          ) : null}
        </View>
        <View style={{ alignItems: 'flex-end', gap: 2 }}>
          <Text style={{ color: colors.onSurface, fontSize: tokens.typography.scale.base, fontWeight: '700' }}>
            {formatMoney(amount, currency)}
          </Text>
          {status ? <StatusPill meta={BILLABLE_STATUS_META[status]} variant="inline" size="sm" /> : null}
        </View>
      </View>

      {canLog && onLog ? (
        <Button size="sm" variant="primary" onPress={onLog} style={{ alignSelf: 'flex-start' }}>
          Log time
        </Button>
      ) : null}
    </View>
  );

  if (onPress) {
    return (
      <Pressable accessibilityRole="button" accessibilityLabel={`Time entry ${date}, ${formatHours(hours)}`} onPress={onPress} testID={testID}>
        {content}
      </Pressable>
    );
  }
  return <View testID={testID}>{content}</View>;
}
