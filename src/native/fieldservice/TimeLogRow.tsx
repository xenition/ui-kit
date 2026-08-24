import * as React from 'react';
import { Pressable, Text, View, type StyleProp, type ViewStyle } from 'react-native';
import { useXenitionTheme, Icon, Badge, type BadgeTone } from '../primitives';
import { withAlpha, formatDuration, formatMoney, type MoneyFormatter } from './internal/format';

/** Clock state — text + glyph + color (never color-alone). */
export type TimeLogStatus = 'running' | 'stopped' | 'approved' | 'rejected';

interface StatusDescriptor {
  label: string;
  glyph: string;
  tone: BadgeTone;
  /** Semantic slot for the tinted disc + icon; `neutral` maps to `muted`. */
  slot: 'success' | 'danger' | 'primary' | 'muted';
}

const TIME_LOG_STATUS: Record<TimeLogStatus, StatusDescriptor> = {
  running: { label: 'Running', glyph: '⏱', tone: 'primary', slot: 'primary' },
  stopped: { label: 'Logged', glyph: '■', tone: 'neutral', slot: 'muted' },
  approved: { label: 'Approved', glyph: '✓', tone: 'success', slot: 'success' },
  rejected: { label: 'Rejected', glyph: '✕', tone: 'danger', slot: 'danger' },
};

export interface TimeLogRowProps {
  /** Activity / task label (e.g. "On-site diagnostics"). */
  label: string;
  /** Elapsed time in whole minutes. */
  minutes: number;
  /** Clock / approval state — text + glyph + color. */
  status: TimeLogStatus;
  /** Localized clock-in–out window (e.g. "8:00–10:15 AM"). */
  window?: string;
  /** Marks the entry as billable, shown as a chip. */
  billable?: boolean;
  /** Billing rate in integer **cents per hour**; when set, shows the line total. */
  rateCentsPerHour?: number;
  /** ISO 4217 currency code (default `USD`). */
  currency?: string;
  /** Override the cents → string formatter. */
  formatMoney?: MoneyFormatter;
  /** Fires on row press (e.g. edit the entry). */
  onPress?: () => void;
  style?: StyleProp<ViewStyle>;
}

/**
 * One line in a time-log / timesheet: a tinted status glyph disc, a
 * label/window stack with an optional billable chip, and a right-aligned
 * duration + computed line total. Duration comes from whole minutes via
 * `formatDuration`; the total is `minutes/60 * rate` in integer cents through
 * `formatMoney` (guarded against a missing rate). Status is text + glyph + a
 * color that traces to a `SemanticColors` slot — never color alone. Becomes a
 * button only when `onPress` is supplied. No literals.
 */
export function TimeLogRow({
  label,
  minutes,
  status,
  window,
  billable = false,
  rateCentsPerHour,
  currency = 'USD',
  formatMoney: format = formatMoney,
  onPress,
  style,
}: TimeLogRowProps): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();
  const sd = TIME_LOG_STATUS[status] ?? TIME_LOG_STATUS.stopped;
  const tint = sd.slot === 'muted' ? colors.muted : colors[sd.slot];
  const safeMinutes = Number.isFinite(minutes) ? Math.max(0, Math.trunc(minutes)) : 0;
  const totalCents =
    rateCentsPerHour != null && Number.isFinite(rateCentsPerHour)
      ? Math.round((safeMinutes / 60) * Math.max(0, rateCentsPerHour))
      : undefined;

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
        <Icon glyph={sd.glyph} color={sd.slot} accessibilityLabel={sd.label} />
      </View>
      <View style={{ flex: 1, gap: 2 }}>
        <Text
          numberOfLines={1}
          style={{ color: colors.onSurface, fontSize: tokens.typography.scale.base, fontWeight: '600' }}
        >
          {label}
        </Text>
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.xs }}>
          {window != null ? (
            <Text style={{ color: colors.muted, fontSize: tokens.typography.scale.xs }}>{window}</Text>
          ) : null}
          <Badge tone={sd.tone} variant="soft" size="sm">{`${sd.glyph} ${sd.label}`}</Badge>
          {billable ? (
            <Badge tone="accent" variant="outline" size="sm">$ Billable</Badge>
          ) : null}
        </View>
      </View>
      <View style={{ alignItems: 'flex-end', gap: 2 }}>
        <Text style={{ color: colors.onSurface, fontSize: tokens.typography.scale.base, fontWeight: '700' }}>
          {formatDuration(safeMinutes)}
        </Text>
        {totalCents != null ? (
          <Text style={{ color: colors.muted, fontSize: tokens.typography.scale.xs }}>
            {format(totalCents, currency)}
          </Text>
        ) : null}
      </View>
    </View>
  );

  if (!onPress) return row;
  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={`${label}, ${formatDuration(safeMinutes)}, ${sd.label}`}
      onPress={onPress}
      style={({ pressed }) => ({ opacity: pressed ? 0.7 : 1 })}
    >
      {row}
    </Pressable>
  );
}
