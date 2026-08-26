import * as React from 'react';
import { Animated, Modal, Pressable, ScrollView, Text, View } from 'react-native';
import { useXenitionTheme } from '../theme';
import type { TimePickerProps, TimeValue } from './TimePicker';
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
import { pressOver } from './internal/state-v4';
import { EASING_ENTER } from './internal/motion-v4';

export type { TimePickerProps as TimePickerV4Props, TimeValue };

const pad = (n: number): string => String(n).padStart(2, '0');

/**
 * **V4 time field** — the same props as {@link TimePicker}, a different design
 * line.
 *
 * ## Two columns, because that is what a time picker is
 *
 * §31 again: hours on the left, minutes on the right, scroll and tap. Every
 * platform's time picker is some version of this, and inventing a dial or a
 * text mask here would only mean the user has to learn our one. What changes
 * is the size of the things being tapped and how obviously the current time is
 * marked.
 *
 * ## The changes
 *
 * 1. **Rows you can hit.** The base row is `sm` vertical padding around a
 *    line of text — roughly 30px, well under the 44px floor, in a list where
 *    the neighbouring row is a different minute. Every row here is
 *    `tapTarget()` tall. That is the single change that makes the control stop
 *    feeling like a lottery.
 * 2. **A field that belongs in the form.** `InputV4`'s treatment: `2xl`
 *    minimum height, `md` radius, and the brand halo with its space reserved,
 *    so opening the picker never nudges the layout (§36.11). The field stays
 *    ringed while its popover is open.
 * 3. **A selection that survives dark mode.** The active hour and minute are
 *    filled `primary` with `onPrimary` ink — the pair the compiler
 *    contrast-checks — rather than a tinted row that dissolves on a dark page.
 * 4. **A confirm button that says what it does.** `Done` is `primary`, at the
 *    same `tapTarget()` height as everything else. §16 asks for
 *    action-specific labels, and for a picker whose two columns are already
 *    live, "Done" is genuinely what the button does.
 *
 * ## The overlay
 *
 * `elevation.sheet` through `popoverSkin`, glass only when the seed asked for
 * `depth: 'glass'`, and a scrim that is black from `elevation.sheet.color`
 * rather than `colors.onSurface` — which inverts with the scheme and veils a
 * dark page in white, as the base picker does today. Under "Reduce Motion" the
 * panel is simply there (§36.10).
 */
export function TimePickerV4({
  value,
  onChange,
  minuteStep = 5,
  placeholder = 'Select a time',
  invalid = false,
  disabled = false,
  accessibilityLabel,
  style,
}: TimePickerProps): React.ReactElement {
  const theme = useXenitionTheme();
  const { colors, tokens } = theme;
  const reduced = useReducedMotion();
  const [open, setOpen] = React.useState(false);

  const hours = React.useMemo(() => Array.from({ length: 24 }, (_, i) => i), []);
  const minutes = React.useMemo(() => {
    const step = Math.max(1, Math.min(60, Math.round(minuteStep)));
    const out: number[] = [];
    for (let m = 0; m < 60; m += step) out.push(m);
    return out;
  }, [minuteStep]);

  const current: TimeValue = value ?? { h: 0, m: 0 };
  const target = tapTarget(theme);
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

  const column = (
    label: string,
    items: number[],
    active: number,
    onPick: (n: number) => void
  ): React.ReactElement => (
    <View style={{ flex: 1 }}>
      <Text
        style={{
          color: colors.mutedText,
          fontFamily: tokens.typography.fontBody,
          fontSize: tokens.typography.scale.xs,
          fontWeight: '600',
          textAlign: 'center',
          paddingBottom: tokens.spacing.xs,
        }}
      >
        {label}
      </Text>
      {/*
        Five rows of visible list. Any less and the column reads as a stub; any
        more and the panel outgrows a small phone.
      */}
      <ScrollView style={{ maxHeight: target * 5 }} showsVerticalScrollIndicator={false}>
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
                height: target,
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: tokens.radius.md,
                backgroundColor: isActive ? colors.primary : pressed ? press : 'transparent',
              })}
            >
              <Text
                style={{
                  color: isActive ? colors.onPrimary : colors.onSurface,
                  fontFamily: tokens.typography.fontBody,
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
      <View style={[ringWrap(theme, { focused: open, invalid }), style]}>
        <Pressable
          accessibilityRole="button"
          accessibilityState={{ disabled, expanded: open }}
          accessibilityLabel={accessibilityLabel}
          disabled={disabled}
          onPress={() => setOpen(true)}
          style={fieldSkin(theme, { focused: open, invalid, disabled })}
        >
          <Text
            numberOfLines={1}
            style={{
              flex: 1,
              color: value ? colors.onSurface : colors.mutedText,
              fontFamily: tokens.typography.fontBody,
              fontSize: tokens.typography.scale.base,
            }}
          >
            {value ? `${pad(current.h)}:${pad(current.m)}` : placeholder}
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
            accessibilityLabel="Choose a time"
            style={[
              popoverSkin(theme, 'sheet'),
              {
                width: target * 5,
                padding: tokens.spacing.md,
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
            <View style={{ flexDirection: 'row', gap: tokens.spacing.md }}>
              {column('Hour', hours, current.h, (h) => onChange?.({ h, m: current.m }))}
              {column('Min', minutes, current.m, (m) => onChange?.({ h: current.h, m }))}
            </View>

            <Pressable
              accessibilityRole="button"
              accessibilityLabel="Done"
              onPress={() => setOpen(false)}
              style={({ pressed }) => ({
                marginTop: tokens.spacing.md,
                height: target,
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: tokens.radius.md,
                backgroundColor: pressed
                  ? pressOver(theme, colors.primary, colors.onPrimary)
                  : colors.primary,
              })}
            >
              <Text
                style={{
                  color: colors.onPrimary,
                  fontFamily: tokens.typography.fontBody,
                  fontSize: tokens.typography.scale.base,
                  fontWeight: '600',
                }}
              >
                Done
              </Text>
            </Pressable>
          </Animated.View>
        </View>
      </Modal>
    </>
  );
}
