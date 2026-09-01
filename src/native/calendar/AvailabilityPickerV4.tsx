import * as React from 'react';
import { Pressable, View } from 'react-native';
import { useXenitionTheme } from '../theme';
import { TextV4 } from '../primitives/TextV4';
import { disabledOpacity, minTap } from '../primitives/internal/chrome-v4';
import { pressOver } from '../primitives/internal/state-v4';
import { skeletonFill } from './internal/grid-v4';
import type { AvailabilityPickerProps } from './AvailabilityPicker';

export interface AvailabilityPickerV4Props extends AvailabilityPickerProps {
  /** Locale for the slot times. Default: the device's. */
  locale?: string;
  /** Announced for a slot that cannot be taken. Default `'Unavailable'`. */
  unavailableLabel?: string;
}

/**
 * **V4 availability picker** — same props as {@link AvailabilityPicker} plus
 * `locale` and `unavailableLabel`.
 *
 * ## Four changes
 *
 * 1. **Every chip clears 44.** The base sized them by padding alone, so a
 *    compact seed produced a grid of targets a thumb could miss — on the one
 *    control this component is.
 * 2. **A disabled slot cannot be pressed**, dims at M3's 0.38 and says why.
 *    The base greyed it and reported the press.
 * 3. **The times are localized and tabular**, so a grid of slots lines up and
 *    reads correctly outside en-US.
 * 4. **Multi-select announces itself.** With `multiple`, the chips are
 *    checkboxes rather than buttons, so a reader hears what selecting does.
 */
export function AvailabilityPickerV4({
  slots = [],
  value,
  multiple = false,
  columns = 3,
  locale,
  unavailableLabel = 'Unavailable',
  onSelect,
  loading = false,
  emptyLabel = 'No times available.',
  style,
}: AvailabilityPickerV4Props): React.ReactElement {
  const theme = useXenitionTheme();
  const { colors, tokens } = theme;
  const tap = minTap(tokens.spacing);

  const timeFmt = React.useMemo(
    () => new Intl.DateTimeFormat(locale, { hour: 'numeric', minute: '2-digit' }),
    [locale]
  );

  if (loading) {
    return (
      <View style={[{ flexDirection: 'row', flexWrap: 'wrap', gap: tokens.spacing.sm }, style]}>
        {Array.from({ length: 6 }, (_, i) => (
          <View
            key={i}
            style={{
              height: tap,
              flexBasis: `${100 / columns - 4}%`,
              borderRadius: tokens.radius.md,
              backgroundColor: skeletonFill(theme),
            }}
          />
        ))}
      </View>
    );
  }

  if (slots.length === 0) {
    return (
      <View accessibilityRole="summary" style={[{ padding: tokens.spacing.md }, style]}>
        <TextV4 size="sm" tone="mutedText">
          {emptyLabel}
        </TextV4>
      </View>
    );
  }

  const chosen = Array.isArray(value) ? value : value ? [value] : [];
  const isChosen = (start: Date): boolean => chosen.some((d) => d.getTime() === start.getTime());

  return (
    <View
      accessibilityRole={multiple ? 'list' : 'radiogroup'}
      style={[{ flexDirection: 'row', flexWrap: 'wrap', gap: tokens.spacing.sm }, style]}
    >
      {slots.map((slot) => {
        const selected = isChosen(slot.start);
        const blocked = slot.disabled === true;
        const label = slot.label ?? timeFmt.format(slot.start);
        const fill = selected ? colors.primary : colors.card;
        const ink = selected ? colors.onPrimary : colors.onCard;

        return (
          <Pressable
            key={slot.start.toISOString()}
            accessibilityRole={multiple ? 'checkbox' : 'radio'}
            accessibilityLabel={[label, blocked ? unavailableLabel : null]
              .filter(Boolean)
              .join(', ')}
            accessibilityState={{ selected, checked: selected, disabled: blocked }}
            disabled={blocked}
            onPress={() => onSelect?.(slot.start, slot)}
            style={({ pressed }) => ({
              flexBasis: `${100 / columns - 4}%`,
              minHeight: tap,
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: tokens.radius.md,
              borderWidth: 1,
              borderColor: selected ? colors.primary : colors.border,
              backgroundColor: pressed && !blocked ? pressOver(theme, fill, ink) : fill,
              paddingHorizontal: tokens.spacing.sm,
              opacity: disabledOpacity(theme.state, blocked),
            })}
          >
            <TextV4 size="sm" weight="semibold" numeric="tabular" style={{ color: ink }}>
              {label}
            </TextV4>
          </Pressable>
        );
      })}
    </View>
  );
}
