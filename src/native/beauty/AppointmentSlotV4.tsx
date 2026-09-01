import * as React from 'react';
import { Pressable, View } from 'react-native';
import { useXenitionTheme } from '../theme';
import { TextV4 } from '../primitives/TextV4';
import { disabledOpacity, minTap } from '../primitives/internal/chrome-v4';
import { pressOver } from '../primitives/internal/state-v4';
import type { AppointmentSlotProps, AppointmentSlotStatus } from './AppointmentSlot';

export interface AppointmentSlotV4Props extends AppointmentSlotProps {
  /**
   * Override the status words. Defaults `'Available'` / `'Selected'` /
   * `'On hold'` / `'Booked'` — four English words that lived inside the
   * component and only ever reached assistive tech, never the screen.
   */
  statusLabels?: Partial<Record<AppointmentSlotStatus, string>>;
}

/** What each status looks like and whether it can be taken. */
const STATUS_META: Record<
  AppointmentSlotStatus,
  { label: string; disabled: boolean }
> = {
  available: { label: 'Available', disabled: false },
  selected: { label: 'Selected', disabled: false },
  held: { label: 'On hold', disabled: true },
  booked: { label: 'Booked', disabled: true },
};

/**
 * **V4 appointment slot** — same props as {@link AppointmentSlot} plus
 * `statusLabels`.
 *
 * ## Four changes
 *
 * 1. **It clears 44.** A slot grid is the densest tap target in a booking
 *    flow and the base sized it by its padding, so a compact seed produced a
 *    chip a thumb could miss.
 * 2. **A booked or held slot cannot be pressed**, and dims at M3's 0.38. The
 *    base kept them pressable and reported the press.
 * 3. **The time is tabular**, so a column of slots has an edge to scan.
 * 4. **Press is a state layer over the chip's own fill**, not an opacity that
 *    fades its content.
 *
 * **Renders nothing without a `time`** (§4.5).
 */
export function AppointmentSlotV4({
  time,
  status = 'available',
  meta,
  statusLabels,
  onPress,
  style,
}: AppointmentSlotV4Props): React.ReactElement | null {
  const theme = useXenitionTheme();
  const { colors, tokens } = theme;
  if (!time) return null;

  const info = STATUS_META[status];
  const word = statusLabels?.[status] ?? info.label;
  const selected = status === 'selected';
  const blocked = info.disabled;

  const fill = selected ? colors.primary : colors.card;
  const ink = selected ? colors.onPrimary : colors.onCard;

  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={[time, word, meta].filter(Boolean).join(', ')}
      accessibilityState={{ selected, disabled: blocked }}
      disabled={blocked || !onPress}
      onPress={onPress}
      style={({ pressed }) => [
        {
          minHeight: minTap(tokens.spacing),
          alignItems: 'center',
          justifyContent: 'center',
          gap: tokens.spacing.xs / 2,
          borderRadius: tokens.radius.md,
          borderWidth: 1,
          borderColor: selected ? colors.primary : colors.border,
          backgroundColor: pressed && !blocked ? pressOver(theme, fill, ink) : fill,
          paddingHorizontal: tokens.spacing.md,
          paddingVertical: tokens.spacing.sm,
          opacity: disabledOpacity(theme.state, blocked),
        },
        style,
      ]}
    >
      <TextV4 size="sm" weight="semibold" numeric="tabular" style={{ color: ink }}>
        {time}
      </TextV4>
      {meta ? (
        <TextV4 size="xs" style={{ color: selected ? colors.onPrimary : colors.mutedText }}>
          {meta}
        </TextV4>
      ) : null}
    </Pressable>
  );
}
