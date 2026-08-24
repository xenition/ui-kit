import * as React from 'react';
import { Pressable, Text, View, type StyleProp, type ViewStyle } from 'react-native';
import { useXenitionTheme } from '../theme';
import { Card, EmptyState } from '../primitives';
import { withAlpha } from '../primitives/internal/color';
import { StatusPill } from './StatusPill';
import { toneColor, SHIFT_STATUS_META, type ShiftStatus } from './internal';

export interface Shift {
  id: string;
  /** Start time label (e.g. "09:00"). */
  start: string;
  /** End time label (e.g. "17:00"). */
  end: string;
  /** Role / position for the shift. */
  role?: string;
  /** Location / station. */
  location?: string;
  /** Assigned employee name (absent → open shift). */
  assignee?: string;
  /** Scheduling state — glyph + word pill. */
  status?: ShiftStatus;
}

export type ShiftScheduleVariant = 'default' | 'compact';

export interface ShiftScheduleProps {
  /** The day's / week's shifts, in display order. */
  shifts: Shift[];
  /** Header label for the schedule (e.g. "Mon Aug 24"). */
  dateLabel?: string;
  /** Density. */
  variant?: ShiftScheduleVariant;
  /** Fires with the tapped shift. */
  onSelectShift?: (shift: Shift) => void;
  /** Message for the empty state. */
  emptyLabel?: string;
  testID?: string;
  style?: StyleProp<ViewStyle>;
}

/**
 * A shift roster for a day (or period): a header date and a list of shift rows,
 * each showing time range, role / location, assignee, and a scheduling-status
 * pill (open → warn, confirmed → success — glyph + word, never color alone).
 * Open (unassigned) shifts are tinted and labelled. Renders a token-styled
 * empty state when there are no shifts. All colors are theme tokens — no
 * literals.
 */
export function ShiftSchedule({
  shifts,
  dateLabel,
  variant = 'default',
  onSelectShift,
  emptyLabel = 'No shifts scheduled',
  testID,
  style,
}: ShiftScheduleProps): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();
  const compact = variant === 'compact';

  if (shifts.length === 0) {
    return (
      <View testID={testID} style={style}>
        {dateLabel ? (
          <Text style={{ color: colors.onSurface, fontSize: tokens.typography.scale.sm, fontWeight: '700', marginBottom: tokens.spacing.sm }}>
            {dateLabel}
          </Text>
        ) : null}
        <View accessibilityLabel={emptyLabel}>
          <EmptyState title={emptyLabel} description="Shifts you add will appear here." />
        </View>
      </View>
    );
  }

  return (
    <Card variant="outlined" padding={compact ? 'sm' : 'md'} style={[{ gap: tokens.spacing.sm }, style]} testID={testID}>
      {dateLabel ? (
        <Text style={{ color: colors.onSurface, fontSize: tokens.typography.scale.sm, fontWeight: '700' }}>{dateLabel}</Text>
      ) : null}
      <View style={{ gap: tokens.spacing.xs }}>
        {shifts.map((shift) => {
          const meta = SHIFT_STATUS_META[shift.status ?? (shift.assignee ? 'scheduled' : 'open')];
          const isOpen = !shift.assignee;
          const row = (
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                gap: tokens.spacing.sm,
                paddingVertical: tokens.spacing.xs,
                paddingHorizontal: tokens.spacing.sm,
                borderRadius: tokens.radius.md,
                backgroundColor: isOpen ? withAlpha(toneColor(colors, meta.tone), 0.08) : 'transparent',
              }}
            >
              <View style={{ width: 96 }}>
                <Text style={{ color: colors.onSurface, fontSize: tokens.typography.scale.sm, fontWeight: '600' }}>
                  {shift.start}–{shift.end}
                </Text>
                {shift.role ? (
                  <Text numberOfLines={1} style={{ color: colors.muted, fontSize: tokens.typography.scale.xs }}>
                    {shift.role}
                  </Text>
                ) : null}
              </View>
              <View style={{ flex: 1, gap: 2 }}>
                <Text numberOfLines={1} style={{ color: isOpen ? colors.muted : colors.onSurface, fontSize: tokens.typography.scale.sm }}>
                  {shift.assignee ?? 'Unassigned'}
                </Text>
                {!compact && shift.location ? (
                  <Text numberOfLines={1} style={{ color: colors.muted, fontSize: tokens.typography.scale.xs }}>
                    {shift.location}
                  </Text>
                ) : null}
              </View>
              <StatusPill meta={meta} size="sm" />
            </View>
          );

          return onSelectShift ? (
            <Pressable
              key={shift.id}
              accessibilityRole="button"
              accessibilityLabel={`Shift ${shift.start} to ${shift.end}, ${meta.label}`}
              onPress={() => onSelectShift(shift)}
            >
              {row}
            </Pressable>
          ) : (
            <View key={shift.id}>{row}</View>
          );
        })}
      </View>
    </Card>
  );
}
