import * as React from 'react';
import { Animated, Modal, Pressable, ScrollView, Text, View } from 'react-native';
import { useXenitionTheme } from '../theme';
import { useReducedMotion } from './internal/useReducedMotion';
import {
  FIELD_MOTION,
  fieldAccent,
  fieldBorder,
  fieldMetrics,
  haloStyle,
} from './internal/field-v4';
import { elevationStyle, panelSkin, scrimColor } from './internal/surface-v4';
import { mixToken } from '../../primitives/internal/v4-depth';
import type { MultiSelectOption, MultiSelectProps } from './MultiSelect';
import { pressLayer } from './internal/state-v4';

export type { MultiSelectProps as MultiSelectV4Props, MultiSelectOption };

/** How much brand a chip carries. Enough to read as chosen, not as a fill. */
const CHIP_MIX = 0.14;

/**
 * **V4 multi-select** — the same props as {@link MultiSelect}, a different
 * design line.
 *
 * The trigger is a **field**: `2xl` tall, `md` radius, `md` horizontal padding,
 * from the same shared `fieldMetrics` `InputV4` and `SelectV4` take. A form
 * whose controls disagree about their own height reads as parts that happened
 * to land near each other; matching them is the cheapest quality signal a kit
 * has (§13).
 *
 * Two things changed beyond the metrics, and both are about colour discipline:
 *
 * 1. **The chips are not a second brand colour.** The base fills every chip
 *    with `accent`, which puts the brand's secondary hue on screen once per
 *    selection — §35.5 asks for a limited number of simultaneous accents, and
 *    §35.2 says the accent exists for emphasis, not for repetition. A V4 chip
 *    is a 14% brand tint **composited into `surface`**, so it reads as chosen
 *    without shouting, and it is an opaque colour rather than a translucent
 *    one: a chip at 14% alpha is a different colour on a card, on glass and on
 *    the page, and its label only ever carried a contrast guarantee against
 *    one of the three.
 * 2. **The chips are not pills.** `radius.sm` from the seed, so a `sharp`
 *    brand gets square chips. §8 lists excessive pill-shaped controls among the
 *    tells of generic AI UI, and a row of capsules is exactly that shape.
 *
 * The sheet goes through the shared surface plumbing — `panelSkin` plus
 * `elevation.sheet` over a scrim built from the elevation colour, which does
 * not invert with the scheme the way the base's neutral ramp step does. The
 * rows inside it are flat: the sheet is the layer, and everything on it belongs
 * to that layer (§8, no cards inside cards).
 *
 * The caret rotates as the sheet opens, so the disclosure explains itself
 * (§36.1); it runs on the native driver and is skipped under Reduce Motion
 * (§36.10).
 */
export function MultiSelectV4({
  options,
  value = [],
  onChange,
  placeholder = 'Select…',
  invalid = false,
  disabled = false,
  accessibilityLabel,
  style,
}: MultiSelectProps): React.ReactElement {
  const theme = useXenitionTheme();
  const { colors, tokens, elevation } = theme;
  const metrics = fieldMetrics(theme);
  const reduced = useReducedMotion();
  const [open, setOpen] = React.useState(false);
  const [held, setHeld] = React.useState(false);

  const accent = fieldAccent(theme, invalid);
  const chosen = options.filter((o) => value.includes(o.value));

  // Composited once, so the chip owns its ground rather than borrowing it.
  const chipBg = mixToken(colors.surface, colors.primary, CHIP_MIX);

  const toggle = (v: string): void => {
    onChange?.(value.includes(v) ? value.filter((x) => x !== v) : [...value, v]);
  };

  const turn = React.useRef(new Animated.Value(0)).current;
  React.useEffect(() => {
    const to = open ? 1 : 0;
    if (reduced) {
      turn.setValue(to);
      return;
    }
    const anim = Animated.timing(turn, {
      toValue: to,
      duration: FIELD_MOTION,
      useNativeDriver: true,
    });
    anim.start();
    return () => anim.stop();
  }, [open, reduced, turn]);

  const rotate = turn.interpolate({ inputRange: [0, 1], outputRange: ['0deg', '180deg'] });

  return (
    <>
      <View style={haloStyle(theme, { showing: held || open, accent })}>
        <Pressable
          accessibilityRole="button"
          accessibilityState={{ disabled, expanded: open }}
          accessibilityLabel={accessibilityLabel}
          disabled={disabled}
          onPress={() => setOpen(true)}
          onPressIn={() => setHeld(true)}
          onPressOut={() => setHeld(false)}
          style={[
            {
              width: '100%',
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: metrics.inner,
              minHeight: metrics.height,
              paddingVertical: tokens.spacing.xs,
              paddingHorizontal: metrics.padX,
              borderRadius: metrics.radius,
              backgroundColor: colors.surface,
              opacity: disabled ? theme.state.disabledContent : 1,
              ...fieldBorder(theme, { invalid, focused: open }),
            },
            style,
          ]}
        >
          {chosen.length === 0 ? (
            <Text
              style={{
                flex: 1,
                color: colors.mutedText,
                fontSize: tokens.typography.scale.base,
                fontFamily: tokens.typography.fontBody,
              }}
            >
              {placeholder}
            </Text>
          ) : (
            <View
              style={{
                flex: 1,
                flexDirection: 'row',
                flexWrap: 'wrap',
                gap: tokens.spacing.xs,
              }}
            >
              {chosen.map((o) => (
                <View
                  key={o.value}
                  style={{
                    backgroundColor: chipBg,
                    borderRadius: tokens.radius.sm,
                    paddingVertical: tokens.spacing.xs / 2,
                    paddingHorizontal: tokens.spacing.sm,
                  }}
                >
                  <Text
                    style={{
                      color: colors.primaryText,
                      fontSize: tokens.typography.scale.sm,
                      fontFamily: tokens.typography.fontBody,
                      fontWeight: '500',
                    }}
                  >
                    {o.label}
                  </Text>
                </View>
              ))}
            </View>
          )}
          <Animated.Text
            style={{
              color: colors.mutedText,
              fontSize: tokens.typography.scale.sm,
              fontFamily: tokens.typography.fontBody,
              transform: [{ rotate }],
            }}
          >
            ▾
          </Animated.Text>
        </Pressable>
      </View>

      <Modal visible={open} transparent animationType="fade" onRequestClose={() => setOpen(false)}>
        <View style={{ flex: 1, justifyContent: 'center', padding: tokens.spacing.lg }}>
          <Pressable
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
          <View
            style={[
              { maxHeight: '70%', borderRadius: tokens.radius.lg, overflow: 'hidden' },
              panelSkin(theme),
              elevationStyle(elevation.sheet),
            ]}
          >
            <ScrollView>
              {options.map((option) => {
                const active = value.includes(option.value);
                return (
                  <Pressable
                    key={option.value}
                    accessibilityRole="checkbox"
                    accessibilityState={{ checked: active }}
                    onPress={() => toggle(option.value)}
                    style={({ pressed }) => ({
                      flexDirection: 'row',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      gap: metrics.inner,
                      minHeight: metrics.height,
                      paddingHorizontal: tokens.spacing.lg,
                      backgroundColor: pressed ? pressLayer(theme) : 'transparent',
                    })}
                  >
                    <Text
                      style={{
                        flex: 1,
                        color: active ? colors.primaryText : colors.onSurface,
                        fontSize: tokens.typography.scale.base,
                        fontFamily: tokens.typography.fontBody,
                        fontWeight: active ? '600' : '400',
                      }}
                    >
                      {option.label}
                    </Text>
                    {/* Marked as well as tinted — colour alone is not a state (§46). */}
                    {active ? (
                      <Text
                        style={{
                          color: colors.primaryText,
                          fontSize: tokens.typography.scale.base,
                          fontFamily: tokens.typography.fontBody,
                        }}
                      >
                        ✓
                      </Text>
                    ) : null}
                  </Pressable>
                );
              })}
            </ScrollView>
            {/*
              "Done" and not "Submit": §16 asks for action-specific labels, and
              this button closes a picker rather than submitting anything.
            */}
            <Pressable
              accessibilityRole="button"
              accessibilityLabel="Done"
              onPress={() => setOpen(false)}
              style={({ pressed }) => ({
                alignItems: 'center',
                justifyContent: 'center',
                minHeight: metrics.height,
                borderTopWidth: 1,
                borderTopColor: colors.border,
                backgroundColor: pressed ? pressLayer(theme) : 'transparent',
              })}
            >
              <Text
                style={{
                  color: colors.primaryText,
                  fontSize: tokens.typography.scale.base,
                  fontFamily: tokens.typography.fontBody,
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
