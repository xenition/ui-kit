import * as React from 'react';
import { Animated, Modal, Pressable, Text, View } from 'react-native';
import { useXenitionTheme } from '../theme';
import type { DatePickerProps } from './DatePicker';
import {
  monthGrid,
  outOfRange,
  startOfMonth,
  toDate,
  toKey,
  weekdayLabels,
} from '../../primitives/internal/date-v4';
import {
  PICKER_MOTION,
  fieldSkin,
  pressFill,
  popoverSkin,
  ringWrap,
  scrimColor,
  tapTarget,
} from './internal/picker-v4';
import { useReducedMotion } from './internal/useReducedMotion';
import { EASING_ENTER } from './internal/motion-v4';

export type { DatePickerProps as DatePickerV4Props };

/**
 * **V4 date field** — the same props as {@link DatePicker}, a different design
 * line.
 *
 * ## The field belongs in the form
 *
 * The base trigger is `radius.sm` with `sm/md` padding — visibly a different
 * control from the `InputV4` sitting above it in the same form. This one takes
 * `InputV4`'s treatment exactly: the same `2xl` minimum height (which is also
 * the tap-target floor, so a field is never smaller than the smallest thing you
 * are allowed to touch), the same `md` radius, and the same brand halo, whose
 * space is reserved whether or not it is showing so opening the picker never
 * nudges the layout (§36.11). While the calendar is open the field stays
 * ringed, because the popover belongs to it and should look like it does.
 *
 * ## The calendar is a calendar
 *
 * §31: a month grid, seven columns, chevrons to page. The changes are all
 * about the hand rather than the metaphor:
 *
 *   - **Day cells at `tapTarget()`.** The base gives its day a 44px box inside
 *     a 44px column, so a cell edge and a target edge are the same line and
 *     there is no slack for a thumb. Here the target is `spacing['2xl']` and
 *     the visible disc sits inside it.
 *   - **A selection that survives dark mode.** A filled `primary` disc with
 *     `onPrimary` ink, both resolved for the active scheme. `ramps.primary[50]`
 *     would keep the light orientation in both and paint a near-white hole in a
 *     dark grid.
 *   - **Today, marked.** A `primary` ring on today's cell, so "where am I" is
 *     answerable before you have selected anything (§32 — recognition over
 *     recall).
 *   - **Blocked days that say so.** A day outside `min`/`max` is muted, struck
 *     from the tab order and reported disabled, rather than merely faded.
 *
 * ## The overlay
 *
 * `elevation.sheet` and — only when the seed asked for `depth: 'glass'` — the
 * glass pair, both through `popoverSkin`. The scrim is `elevation.sheet.color`
 * at a fixed alpha: **never `colors.onSurface`**, which inverts with the scheme
 * and paints a white veil over a dark page, which is what the base picker does
 * today. A shadow colour does not invert, because a shadow does not.
 *
 * The panel fades and lifts in over `PICKER_MOTION.popover`, and under the OS
 * "Reduce Motion" setting it is simply there (§36.10).
 */
export function DatePickerV4({
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
  const theme = useXenitionTheme();
  const { colors, tokens } = theme;
  const reduced = useReducedMotion();
  const [open, setOpen] = React.useState(false);

  const selected = toDate(value);
  const selectedKey = selected ? toKey(selected) : null;

  const [viewDate, setViewDate] = React.useState<Date>(() =>
    startOfMonth(selected ?? new Date())
  );
  const shiftMonth = (months: number): void =>
    setViewDate((d) => new Date(d.getFullYear(), d.getMonth() + months, 1));

  const weeks = monthGrid(viewDate);
  const labels = React.useMemo(() => weekdayLabels(locale), [locale]);
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

  const todayKey = toKey(new Date());
  const target = tapTarget(theme);
  const disc = target - tokens.spacing.xs;
  const press = pressFill(theme);

  // Fades and lifts the panel; the value is read straight into the style so a
  // reduced-motion user simply gets the panel, with no timing function at all.
  const enter = React.useRef(new Animated.Value(0)).current;
  React.useEffect(() => {
    if (!open) {
      enter.setValue(0);
      return;
    }
    if (reduced) {
      enter.setValue(1);
      return;
    }
    const anim = Animated.timing(enter, {
      toValue: 1,
      duration: PICKER_MOTION.popover,
      easing: EASING_ENTER,
      useNativeDriver: true,
    });
    anim.start();
    return () => anim.stop();
  }, [enter, open, reduced]);

  const chevron = (label: string, glyph: string, delta: number): React.ReactElement => (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={label}
      onPress={() => shiftMonth(delta)}
      style={({ pressed }) => ({
        width: target,
        height: target,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: tokens.radius.full,
        backgroundColor: pressed ? press : 'transparent',
      })}
    >
      <Text style={{ color: colors.onSurface, fontSize: tokens.typography.scale.xl }}>{glyph}</Text>
    </Pressable>
  );

  return (
    <>
      <View style={[ringWrap(theme, { focused: open, invalid }), style]}>
        <Pressable
          accessibilityRole="button"
          accessibilityState={{ disabled, expanded: open }}
          accessibilityLabel={accessibilityLabel}
          disabled={disabled}
          onPress={() => {
            setViewDate(startOfMonth(selected ?? new Date()));
            setOpen(true);
          }}
          style={fieldSkin(theme, { focused: open, invalid, disabled })}
        >
          <Text
            numberOfLines={1}
            style={{
              flex: 1,
              color: selected ? colors.onSurface : colors.mutedText,
              fontFamily: tokens.typography.fontBody,
              fontSize: tokens.typography.scale.base,
            }}
          >
            {selected ? longDate.format(selected) : placeholder}
          </Text>
          <Text
            accessibilityElementsHidden
            importantForAccessibility="no"
            style={{ color: colors.mutedText, fontSize: tokens.typography.scale.base }}
          >
            ▾
          </Text>
        </Pressable>
      </View>

      <Modal visible={open} transparent animationType="none" onRequestClose={() => setOpen(false)}>
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            padding: tokens.spacing.lg,
          }}
        >
          {/*
            Black at a fixed alpha, from the elevation token. `colors.onSurface`
            would invert with the scheme and veil a dark page in white.
          */}
          <Pressable
            accessibilityRole="button"
            accessibilityLabel="Close"
            onPress={() => setOpen(false)}
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              backgroundColor: scrimColor(theme),
            }}
          />

          <Animated.View
            accessibilityViewIsModal
            accessibilityLabel={`Choose a date — ${monthLabel}`}
            style={[
              popoverSkin(theme, 'sheet'),
              {
                padding: tokens.spacing.md,
                gap: tokens.spacing.xs,
                opacity: enter,
                transform: [
                  {
                    translateY: enter.interpolate({
                      inputRange: [0, 1],
                      outputRange: [tokens.spacing.sm, 0],
                    }),
                  },
                ],
              },
            ]}
          >
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}
            >
              {chevron('Previous month', '‹', -1)}
              <Text
                style={{
                  color: colors.onSurface,
                  fontFamily: tokens.typography.fontHeading,
                  fontSize: tokens.typography.scale.lg,
                  fontWeight: '600',
                }}
              >
                {monthLabel}
              </Text>
              {chevron('Next month', '›', 1)}
            </View>

            <View>
              <View style={{ flexDirection: 'row' }}>
                {labels.map((label) => (
                  <View
                    key={label}
                    style={{
                      width: target,
                      alignItems: 'center',
                      paddingVertical: tokens.spacing.xs,
                    }}
                  >
                    <Text
                      style={{
                        color: colors.mutedText,
                        fontFamily: tokens.typography.fontBody,
                        fontSize: tokens.typography.scale.xs,
                        fontWeight: '600',
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
                    const isToday = key === todayKey;
                    const blocked = outOfRange(key, min, max);

                    return (
                      <Pressable
                        key={key}
                        accessibilityRole="button"
                        accessibilityLabel={longDate.format(date)}
                        accessibilityState={{ selected: isSelected, disabled: blocked }}
                        disabled={blocked}
                        onPress={() => {
                          onChange?.(key);
                          setOpen(false);
                        }}
                        style={{
                          width: target,
                          height: target,
                          alignItems: 'center',
                          justifyContent: 'center',
                        }}
                      >
                        {({ pressed }) => (
                          <View
                            style={{
                              width: disc,
                              height: disc,
                              alignItems: 'center',
                              justifyContent: 'center',
                              borderRadius: tokens.radius.full,
                              backgroundColor: isSelected
                                ? colors.primary
                                : pressed && !blocked
                                  ? press
                                  : 'transparent',
                              borderWidth: isToday && !isSelected ? 1 : 0,
                              borderColor: colors.primary,
                            }}
                          >
                            <Text
                              style={{
                                color: isSelected
                                  ? colors.onPrimary
                                  : !inMonth || blocked
                                    ? colors.mutedText
                                    : colors.onSurface,
                                fontFamily: tokens.typography.fontBody,
                                fontSize: tokens.typography.scale.base,
                                fontWeight: isSelected || isToday ? '700' : '400',
                              }}
                            >
                              {date.getDate()}
                            </Text>
                          </View>
                        )}
                      </Pressable>
                    );
                  })}
                </View>
              ))}
            </View>
          </Animated.View>
        </View>
      </Modal>
    </>
  );
}
