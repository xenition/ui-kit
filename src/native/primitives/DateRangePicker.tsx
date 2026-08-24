import * as React from 'react';
import { Text, View, type StyleProp, type ViewStyle } from 'react-native';
import { useXenitionTheme } from '../theme';
import { DatePicker } from './DatePicker';

export interface DateRange {
  /** Range start as ISO `YYYY-MM-DD` (or null when unset). */
  start: string | null;
  /** Range end as ISO `YYYY-MM-DD` (or null when unset). */
  end: string | null;
}

export interface DateRangePickerProps {
  /** Controlled `{ start, end }` range. */
  value?: DateRange;
  /** Fires with the updated range whenever either end changes. */
  onChange?: (value: DateRange) => void;
  /** Earliest selectable date (ISO `YYYY-MM-DD`). */
  min?: string;
  /** Latest selectable date (ISO `YYYY-MM-DD`). */
  max?: string;
  /** Labels above each end. */
  startLabel?: string;
  endLabel?: string;
  /** Locale for the two inner pickers. */
  locale?: string;
  /** Renders the danger border state on both ends. */
  invalid?: boolean;
  disabled?: boolean;
  style?: StyleProp<ViewStyle>;
}

/**
 * Two-ended date range — composes two native {@link DatePicker}s (start + end)
 * and keeps them consistent: the start's `max` is bounded by the chosen end and
 * the end's `min` by the chosen start, so an invalid crossing can't be picked.
 * Labels, gaps, and text all read from `useXenitionTheme()`. No literal colors.
 */
export function DateRangePicker({
  value = { start: null, end: null },
  onChange,
  min,
  max,
  startLabel = 'Start',
  endLabel = 'End',
  locale,
  invalid = false,
  disabled = false,
  style,
}: DateRangePickerProps): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();

  const setStart = (start: string): void => {
    // Clear a now-invalid end (earlier than the new start).
    const end = value.end && start > value.end ? null : value.end;
    onChange?.({ start, end });
  };
  const setEnd = (end: string): void => {
    const start = value.start && end < value.start ? null : value.start;
    onChange?.({ start, end });
  };

  const labelStyle = {
    color: colors.onSurface,
    fontSize: tokens.typography.scale.sm,
    fontWeight: '600' as const,
    marginBottom: tokens.spacing.xs,
  };

  return (
    <View style={[{ gap: tokens.spacing.md }, style]}>
      <View>
        <Text style={labelStyle}>{startLabel}</Text>
        <DatePicker
          value={value.start}
          onChange={setStart}
          min={min}
          max={value.end ?? max}
          locale={locale}
          invalid={invalid}
          disabled={disabled}
          accessibilityLabel={startLabel}
          placeholder="Start date"
        />
      </View>
      <View>
        <Text style={labelStyle}>{endLabel}</Text>
        <DatePicker
          value={value.end}
          onChange={setEnd}
          min={value.start ?? min}
          max={max}
          locale={locale}
          invalid={invalid}
          disabled={disabled}
          accessibilityLabel={endLabel}
          placeholder="End date"
        />
      </View>
    </View>
  );
}
