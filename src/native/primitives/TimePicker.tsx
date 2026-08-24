import * as React from 'react';
import {
  Modal,
  Pressable,
  ScrollView,
  Text,
  View,
  type StyleProp,
  type ViewStyle,
} from 'react-native';
import { useXenitionTheme } from '../theme';

export interface TimeValue {
  /** Hour of day, 0–23. */
  h: number;
  /** Minute, 0–59. */
  m: number;
}

export interface TimePickerProps {
  /** Controlled time. */
  value?: TimeValue | null;
  /** Fires with the chosen `{ h, m }`. */
  onChange?: (value: TimeValue) => void;
  /** Minute granularity for the minute column (default 5). */
  minuteStep?: number;
  /** Shown on the trigger when no time is selected. */
  placeholder?: string;
  /** Renders the danger border state. */
  invalid?: boolean;
  disabled?: boolean;
  accessibilityLabel?: string;
  style?: StyleProp<ViewStyle>;
}

const pad = (n: number): string => String(n).padStart(2, '0');

/**
 * Zero-asset time field — a token-bound `Pressable` showing `HH:MM` that opens a
 * `Modal` with side-by-side hour (0–23) and minute (stepped by `minuteStep`)
 * scroll columns. Same controlled `value`/`onChange` shape as the other native
 * pickers; `invalid` swaps the border to `danger`. No literal colors.
 */
export function TimePicker({
  value,
  onChange,
  minuteStep = 5,
  placeholder = 'Select a time',
  invalid = false,
  disabled = false,
  accessibilityLabel,
  style,
}: TimePickerProps): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();
  const [open, setOpen] = React.useState(false);

  const hours = React.useMemo(() => Array.from({ length: 24 }, (_, i) => i), []);
  const minutes = React.useMemo(() => {
    const step = Math.max(1, Math.min(60, Math.round(minuteStep)));
    const out: number[] = [];
    for (let m = 0; m < 60; m += step) out.push(m);
    return out;
  }, [minuteStep]);

  const current: TimeValue = value ?? { h: 0, m: 0 };

  const pick = (next: TimeValue): void => onChange?.(next);

  const column = (
    label: string,
    items: number[],
    active: number,
    onPick: (n: number) => void
  ): React.ReactElement => (
    <View style={{ flex: 1 }}>
      <Text
        style={{
          color: colors.muted,
          fontSize: tokens.typography.scale.xs,
          fontWeight: '600',
          textAlign: 'center',
          paddingBottom: tokens.spacing.xs,
        }}
      >
        {label}
      </Text>
      <ScrollView style={{ maxHeight: 200 }} showsVerticalScrollIndicator={false}>
        {items.map((n) => {
          const isActive = n === active;
          return (
            <Pressable
              key={n}
              accessibilityRole="button"
              accessibilityLabel={`${label} ${n}`}
              accessibilityState={{ selected: isActive }}
              onPress={() => onPick(n)}
              style={({ pressed }) => ({
                paddingVertical: tokens.spacing.sm,
                alignItems: 'center',
                borderRadius: tokens.radius.md,
                backgroundColor: isActive
                  ? colors.primary
                  : pressed
                    ? colors.border
                    : 'transparent',
              })}
            >
              <Text
                style={{
                  color: isActive ? colors.onPrimary : colors.onSurface,
                  fontSize: tokens.typography.scale.base,
                  fontWeight: isActive ? '700' : '400',
                }}
              >
                {pad(n)}
              </Text>
            </Pressable>
          );
        })}
      </ScrollView>
    </View>
  );

  return (
    <>
      <Pressable
        accessibilityRole="button"
        accessibilityState={{ disabled, expanded: open }}
        accessibilityLabel={accessibilityLabel}
        disabled={disabled}
        onPress={() => setOpen(true)}
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
            color: value ? colors.onSurface : colors.muted,
            fontSize: tokens.typography.scale.base,
          }}
        >
          {value ? `${pad(current.h)}:${pad(current.m)}` : placeholder}
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
              width: 240,
              backgroundColor: colors.surface,
              borderColor: colors.border,
              borderWidth: 1,
              borderRadius: tokens.radius.lg,
              padding: tokens.spacing.md,
            }}
          >
            <View style={{ flexDirection: 'row', gap: tokens.spacing.md }}>
              {column('Hour', hours, current.h, (h) => pick({ h, m: current.m }))}
              {column('Min', minutes, current.m, (m) => pick({ h: current.h, m }))}
            </View>
            <Pressable
              accessibilityRole="button"
              accessibilityLabel="Done"
              onPress={() => setOpen(false)}
              style={({ pressed }) => ({
                marginTop: tokens.spacing.md,
                alignItems: 'center',
                paddingVertical: tokens.spacing.sm,
                borderRadius: tokens.radius.md,
                backgroundColor: colors.primary,
                opacity: pressed ? 0.85 : 1,
              })}
            >
              <Text
                style={{
                  color: colors.onPrimary,
                  fontSize: tokens.typography.scale.base,
                  fontWeight: '600',
                }}
              >
                Done
              </Text>
            </Pressable>
          </View>
        </View>
      </Modal>
    </>
  );
}
