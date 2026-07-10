import * as React from 'react';
import {
  Modal,
  Pressable,
  Text,
  View,
  type StyleProp,
  type ViewStyle,
} from 'react-native';
import { useXenitionTheme } from '../theme';

export interface DatePickerProps {
  /** Selected date — an ISO `YYYY-MM-DD` string or a `Date`. */
  value?: string | Date | null;
  /** Fires with the chosen civil date as an ISO `YYYY-MM-DD` string. */
  onChange?: (value: string) => void;
  /** Earliest selectable date (ISO `YYYY-MM-DD` or `Date`). */
  min?: string | Date;
  /** Latest selectable date (ISO `YYYY-MM-DD` or `Date`). */
  max?: string | Date;
  /** Shown on the trigger when no date is selected. */
  placeholder?: string;
  /** Renders the danger border state. */
  invalid?: boolean;
  disabled?: boolean;
  /** Locale for the month/weekday labels and the trigger's long date. */
  locale?: string;
  accessibilityLabel?: string;
  style?: StyleProp<ViewStyle>;
}

const WEEKDAY_KEYS = [
  '2023-01-01', // Sun
  '2023-01-02',
  '2023-01-03',
  '2023-01-04',
  '2023-01-05',
  '2023-01-06',
  '2023-01-07', // Sat
];

/** Parse an ISO `YYYY-MM-DD` (or pass a `Date`) into a local-midnight `Date`. */
function toDate(input: string | Date | null | undefined): Date | null {
  if (!input) return null;
  if (input instanceof Date) return Number.isNaN(input.getTime()) ? null : input;
  const m = /^(\d{4})-(\d{2})-(\d{2})/.exec(input);
  if (!m) {
    const d = new Date(input);
    return Number.isNaN(d.getTime()) ? null : d;
  }
  return new Date(Number(m[1]), Number(m[2]) - 1, Number(m[3]));
}

/** Civil `YYYY-MM-DD` for a local `Date`. */
function toKey(d: Date): string {
  const y = d.getFullYear();
  const mo = String(d.getMonth() + 1).padStart(2, '0');
  const da = String(d.getDate()).padStart(2, '0');
  return `${y}-${mo}-${da}`;
}

function startOfMonth(d: Date): Date {
  return new Date(d.getFullYear(), d.getMonth(), 1);
}

/** 6×7 grid of dates covering the month `viewDate` sits in (Sunday-first). */
function monthGrid(viewDate: Date): Date[][] {
  const first = startOfMonth(viewDate);
  const gridStart = new Date(first);
  gridStart.setDate(first.getDate() - first.getDay());
  const weeks: Date[][] = [];
  const cursor = new Date(gridStart);
  for (let w = 0; w < 6; w += 1) {
    const row: Date[] = [];
    for (let i = 0; i < 7; i += 1) {
      row.push(new Date(cursor));
      cursor.setDate(cursor.getDate() + 1);
    }
    weeks.push(row);
  }
  return weeks;
}

/**
 * Zero-asset date field — the native mirror of the web `DatePicker`. RN has no
 * `<input type="date">`, so this is a token-bound `Pressable` showing the
 * formatted date that opens a `Modal` with a dependency-free month grid (plain
 * `Date` math; no external date lib) and prev/next month chevrons. Same
 * `value`/`min`/`max`/`invalid`/`disabled` contract; the web `onChange(string)`
 * is preserved (fires the picked day as ISO `YYYY-MM-DD`). Adds a `placeholder`.
 * Days outside `min`/`max` are muted and disabled. No literal colors.
 */
export function DatePicker({
  value,
  onChange,
  min,
  max,
  placeholder = 'Select a date',
  invalid = false,
  disabled = false,
  locale,
  accessibilityLabel,
  style,
}: DatePickerProps): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();
  const [open, setOpen] = React.useState(false);

  const selected = toDate(value);
  const minDate = toDate(min ?? null);
  const maxDate = toDate(max ?? null);
  const selectedKey = selected ? toKey(selected) : null;

  const [viewDate, setViewDate] = React.useState<Date>(() =>
    startOfMonth(selected ?? new Date())
  );

  const shiftMonth = (months: number): void =>
    setViewDate((d) => new Date(d.getFullYear(), d.getMonth() + months, 1));

  const weeks = monthGrid(viewDate);

  const weekdayLabels = React.useMemo(() => {
    const fmt = new Intl.DateTimeFormat(locale, { weekday: 'short' });
    return WEEKDAY_KEYS.map((k) => fmt.format(new Date(`${k}T12:00:00`)));
  }, [locale]);

  const monthLabel = new Intl.DateTimeFormat(locale, {
    month: 'long',
    year: 'numeric',
  }).format(viewDate);
  const longDate = new Intl.DateTimeFormat(locale, {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  });

  const outOfRange = (d: Date): boolean => {
    const k = toKey(d);
    if (minDate && k < toKey(minDate)) return true;
    if (maxDate && k > toKey(maxDate)) return true;
    return false;
  };

  const chevron = (label: string, delta: number): React.ReactElement => (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={label}
      onPress={() => shiftMonth(delta)}
      style={({ pressed }) => ({
        width: 32,
        height: 32,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: tokens.radius.sm,
        opacity: pressed ? 0.6 : 1,
      })}
    >
      <Text style={{ color: colors.onSurface, fontSize: tokens.typography.scale.lg }}>
        {delta < 0 ? '‹' : '›'}
      </Text>
    </Pressable>
  );

  return (
    <>
      <Pressable
        accessibilityRole="button"
        accessibilityState={{ disabled, expanded: open }}
        accessibilityLabel={accessibilityLabel}
        disabled={disabled}
        onPress={() => {
          setViewDate(startOfMonth(selected ?? new Date()));
          setOpen(true);
        }}
        style={({ pressed }) => [
          {
            width: '100%',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            backgroundColor: colors.surface,
            borderWidth: 1,
            borderColor: invalid ? colors.danger : colors.border,
            borderRadius: tokens.radius.sm,
            paddingVertical: tokens.spacing.sm,
            paddingHorizontal: tokens.spacing.md,
            opacity: disabled ? 0.5 : pressed ? 0.85 : 1,
          },
          style,
        ]}
      >
        <Text
          style={{
            color: selected ? colors.onSurface : colors.muted,
            fontSize: tokens.typography.scale.base,
          }}
        >
          {selected ? longDate.format(selected) : placeholder}
        </Text>
        <Text style={{ color: colors.muted, fontSize: tokens.typography.scale.sm }}>▾</Text>
      </Pressable>

      <Modal visible={open} transparent animationType="fade" onRequestClose={() => setOpen(false)}>
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', padding: tokens.spacing.lg }}>
          <Pressable
            accessibilityLabel="Close"
            onPress={() => setOpen(false)}
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              backgroundColor: tokens.ramps.neutral[950],
              opacity: 0.5,
            }}
          />
          <View
            style={{
              backgroundColor: colors.surface,
              borderColor: colors.border,
              borderWidth: 1,
              borderRadius: tokens.radius.lg,
              padding: tokens.spacing.md,
              gap: tokens.spacing.sm,
            }}
          >
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}
            >
              {chevron('Previous month', -1)}
              <Text
                style={{
                  color: colors.onSurface,
                  fontSize: tokens.typography.scale.sm,
                  fontWeight: '600',
                }}
              >
                {monthLabel}
              </Text>
              {chevron('Next month', 1)}
            </View>

            <View accessibilityLabel={`Choose a date — ${monthLabel}`}>
              <View style={{ flexDirection: 'row' }}>
                {weekdayLabels.map((label) => (
                  <View
                    key={label}
                    style={{ width: 40, alignItems: 'center', paddingVertical: tokens.spacing.xs }}
                  >
                    <Text
                      style={{
                        color: colors.muted,
                        fontSize: tokens.typography.scale.xs,
                        fontWeight: '500',
                      }}
                    >
                      {label}
                    </Text>
                  </View>
                ))}
              </View>

              {weeks.map((row, wi) => (
                <View key={wi} style={{ flexDirection: 'row' }}>
                  {row.map((date) => {
                    const key = toKey(date);
                    const inMonth = date.getMonth() === viewDate.getMonth();
                    const isSelected = selectedKey === key;
                    const blocked = outOfRange(date);
                    const dayColor = isSelected
                      ? colors.onPrimary
                      : !inMonth || blocked
                        ? colors.muted
                        : colors.onSurface;

                    return (
                      <View key={key} style={{ width: 40, alignItems: 'center', padding: 2 }}>
                        <Pressable
                          accessibilityRole="button"
                          accessibilityLabel={longDate.format(date)}
                          accessibilityState={{ selected: isSelected, disabled: blocked }}
                          disabled={blocked}
                          onPress={() => {
                            onChange?.(key);
                            setOpen(false);
                          }}
                          style={({ pressed }) => ({
                            width: 36,
                            height: 36,
                            alignItems: 'center',
                            justifyContent: 'center',
                            borderRadius: tokens.radius.md,
                            opacity: blocked ? 0.4 : 1,
                            backgroundColor: isSelected
                              ? colors.primary
                              : pressed && !blocked
                                ? tokens.ramps.neutral[100]
                                : 'transparent',
                          })}
                        >
                          <Text
                            style={{
                              color: dayColor,
                              fontSize: tokens.typography.scale.sm,
                              fontWeight: isSelected ? '700' : '400',
                            }}
                          >
                            {date.getDate()}
                          </Text>
                        </Pressable>
                      </View>
                    );
                  })}
                </View>
              ))}
            </View>
          </View>
        </View>
      </Modal>
    </>
  );
}
