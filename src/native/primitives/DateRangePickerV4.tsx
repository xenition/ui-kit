import * as React from 'react';
import { Animated, Modal, Pressable, Text, View } from 'react-native';
import { useXenitionTheme } from '../theme';
import type { DateRange, DateRangePickerProps } from './DateRangePicker';
import {
  monthGrid,
  outOfRange,
  rangePosition,
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
  rangeFill,
  ringWrap,
  scrimColor,
  tapTarget,
} from './internal/picker-v4';
import { useReducedMotion } from './internal/useReducedMotion';
import { EASING_ENTER } from './internal/motion-v4';

export type { DateRangePickerProps as DateRangePickerV4Props, DateRange };

/** Which end of the range the next tap will set. */
type Editing = 'start' | 'end';

/**
 * **V4 date range** — the same props as {@link DateRangePicker}, a different
 * design line.
 *
 * ## One range, one calendar
 *
 * The base composes two independent `DatePicker`s and keeps them from crossing.
 * That is correct and it is not a range: the user picks a date, closes a
 * calendar, opens a second calendar, and has to hold the first date in their
 * head while doing it — §32's "recognition over recall", failed twice over.
 * Worse, at no point do they ever see the span they are choosing.
 *
 * V4 is the pattern every booking flow has settled on, which is exactly why
 * §31 points at it: **one field with two segments, one calendar, tap start then
 * tap end.** The span fills in as you go, so the thing being chosen is the
 * thing on screen. A caption under the grid says which end the next tap sets,
 * so the mode is never a guess (§37 — make system status visible).
 *
 * ## The span has to survive dark mode
 *
 * The two ends are filled `primary` discs with `onPrimary` ink — the pair the
 * compiler contrast-checks. The days between them get `rangeFill`, which is the
 * brand composited ONCE against `colors.surface` into an opaque colour.
 *
 * That last part is the whole reason the helper exists. `ramps.primary[50]` —
 * the obvious "lighter primary" — carries the light orientation in BOTH
 * schemes, so on a dark page the band is near-white and the range reads as a
 * hole punched through the calendar. A translucent primary is scheme-correct
 * but composites against whatever ground it lands on, and this band lands on
 * the panel, on glass, and over a scrimmed page. Compositing once, against the
 * panel's own surface, is the only version that is right in all three.
 *
 * The band is drawn as a full-bleed layer behind the day, half-width on the two
 * ends, so the span is one continuous shape rather than seven separate chips.
 *
 * ## Everything else
 *
 * The field wears `InputV4`'s treatment and halo, day cells are at
 * `tapTarget()`, the scrim is black from the elevation token rather than
 * `colors.onSurface`, and the panel takes `elevation.sheet` — glass only when
 * the seed asked for it. Under "Reduce Motion" the panel is simply there.
 */
export function DateRangePickerV4({
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
  const theme = useXenitionTheme();
  const { colors, tokens } = theme;
  const reduced = useReducedMotion();
  const [open, setOpen] = React.useState(false);
  const [editing, setEditing] = React.useState<Editing>('start');

  const startDate = toDate(value.start);
  const endDate = toDate(value.end);

  const [viewDate, setViewDate] = React.useState<Date>(() =>
    startOfMonth(startDate ?? new Date())
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
  const shortDate = new Intl.DateTimeFormat(locale, { month: 'short', day: 'numeric' });

  const target = tapTarget(theme);
  const disc = target - tokens.spacing.xs;
  const band = rangeFill(theme);
  const press = pressFill(theme);

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

  const openAt = (which: Editing): void => {
    setEditing(which);
    setViewDate(startOfMonth((which === 'end' ? endDate : startDate) ?? new Date()));
    setOpen(true);
  };

  /**
   * Tap-to-tap range building.
   *
   * Starting over is always allowed and never an error: a tap before the
   * current start, or a tap when the range is already complete, begins a new
   * range rather than refusing (§24 — make experimentation safe). The only
   * thing that can never happen is a crossed range.
   */
  const pick = (key: string): void => {
    if (editing === 'start' || !value.start || value.end || key < value.start) {
      onChange?.({ start: key, end: null });
      setEditing('end');
      return;
    }
    onChange?.({ start: value.start, end: key });
    setEditing('start');
    setOpen(false);
  };

  const segment = (
    label: string,
    date: Date | null,
    which: Editing,
    placeholder: string
  ): React.ReactElement => (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={label}
      accessibilityState={{ disabled, expanded: open && editing === which }}
      disabled={disabled}
      onPress={() => openAt(which)}
      style={{ flex: 1, minHeight: target, justifyContent: 'center' }}
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
      <Text
        numberOfLines={1}
        style={{
          color: date ? colors.onSurface : colors.mutedText,
          fontFamily: tokens.typography.fontBody,
          fontSize: tokens.typography.scale.base,
        }}
      >
        {date ? shortDate.format(date) : placeholder}
      </Text>
    </Pressable>
  );

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
        <View style={fieldSkin(theme, { focused: open, invalid, disabled })}>
          {segment(startLabel, startDate, 'start', 'Add date')}
          <Text
            accessibilityElementsHidden
            importantForAccessibility="no"
            style={{ color: colors.mutedText, fontSize: tokens.typography.scale.base }}
          >
            →
          </Text>
          {segment(endLabel, endDate, 'end', 'Add date')}
        </View>
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
          {/* Black at a fixed alpha from the elevation token — `onSurface`
              would invert with the scheme and veil a dark page in white. */}
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
            accessibilityLabel={`Choose a date range — ${monthLabel}`}
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
                  const blocked = outOfRange(key, min, max);
                  const pos = rangePosition(key, value.start, value.end);
                  const capped = pos === 'start' || pos === 'end' || pos === 'only';

                  return (
                    <Pressable
                      key={key}
                      accessibilityRole="button"
                      accessibilityLabel={longDate.format(date)}
                      accessibilityState={{ selected: pos !== 'none', disabled: blocked }}
                      disabled={blocked}
                      onPress={() => pick(key)}
                      style={{
                        width: target,
                        height: target,
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                    >
                      {({ pressed }) => (
                        <>
                          {/*
                            The span, drawn behind the day as one continuous
                            shape: full-bleed in the middle, half-width under
                            each cap, so seven days read as one band and not as
                            seven chips.
                          */}
                          {pos === 'middle' || pos === 'start' || pos === 'end' ? (
                            <View
                              accessibilityElementsHidden
                              importantForAccessibility="no"
                              style={{
                                position: 'absolute',
                                top: tokens.spacing.xs / 2,
                                bottom: tokens.spacing.xs / 2,
                                left: pos === 'start' ? '50%' : 0,
                                right: pos === 'end' ? '50%' : 0,
                                backgroundColor: band,
                              }}
                            />
                          ) : null}
                          <View
                            style={{
                              width: disc,
                              height: disc,
                              alignItems: 'center',
                              justifyContent: 'center',
                              borderRadius: tokens.radius.full,
                              backgroundColor: capped
                                ? colors.primary
                                : pressed && !blocked
                                  ? press
                                  : 'transparent',
                            }}
                          >
                            <Text
                              style={{
                                color: capped
                                  ? colors.onPrimary
                                  : !inMonth || blocked
                                    ? colors.mutedText
                                    : colors.onSurface,
                                fontFamily: tokens.typography.fontBody,
                                fontSize: tokens.typography.scale.base,
                                fontWeight: capped ? '700' : '400',
                              }}
                            >
                              {date.getDate()}
                            </Text>
                          </View>
                        </>
                      )}
                    </Pressable>
                  );
                })}
              </View>
            ))}

            {/*
              Which end the next tap sets. A two-tap control with no visible
              mode is a control the user has to keep score in their head for.
            */}
            <Text
              accessibilityLiveRegion="polite"
              style={{
                color: colors.mutedText,
                fontFamily: tokens.typography.fontBody,
                fontSize: tokens.typography.scale.sm,
                paddingTop: tokens.spacing.xs,
              }}
            >
              {editing === 'start' || !value.start
                ? `Choose the ${startLabel.toLowerCase()} date`
                : `Choose the ${endLabel.toLowerCase()} date`}
            </Text>
          </Animated.View>
        </View>
      </Modal>
    </>
  );
}
