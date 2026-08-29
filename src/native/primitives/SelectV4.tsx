import * as React from 'react';
import { Animated, Modal, Pressable, ScrollView, Text, View } from 'react-native';
import { useXenitionTheme } from '../theme';
import { useReducedMotion } from './internal/useReducedMotion';
import { FIELD_MOTION, fieldAccent, fieldBorder, fieldMetrics, haloStyle } from './internal/field-v4';
import { elevationStyle, panelSkin, scrimColor } from './internal/surface-v4';
import type { SelectOption, SelectProps } from './Select';
import { pressLayer } from './internal/state-v4';

export type { SelectProps as SelectV4Props, SelectOption };

/**
 * **V4 select** — the same props as {@link Select}, a different design line.
 *
 * The trigger is a **field**, not a button: `2xl` tall, `md` radius, `md`
 * horizontal padding — the same numbers `InputV4` takes, from the same shared
 * `fieldMetrics`. That is the whole point. A form where the text field is 48pt
 * and the select is 34pt reads as two components that happen to be near each
 * other; matching them is the single cheapest thing a kit can do to make a
 * screen look considered (§13, reusable components rather than one-off UI).
 *
 * §8 bans excessive pill-shaped controls, so unlike the `SwitchV4` track this
 * takes `radius.md` straight off the seed and a `sharp` brand gets a square
 * select. A select is a box; only the switch is a pill.
 *
 * What makes it feel like a control rather than a label:
 *
 * - **A ring that was always there.** The halo's space is reserved whether or
 *   not it is showing, so opening the sheet — or holding the trigger — never
 *   nudges the field or the label above it (§36.11).
 * - **A caret that answers.** It rotates through half a turn as the sheet
 *   opens, which is the disclosure explaining itself rather than a decoration
 *   (§36.1); it runs on the native driver and is skipped entirely under Reduce
 *   Motion (§36.10).
 * - **A sheet that is genuinely a layer.** The option list takes `panelSkin`
 *   and `elevation.sheet` from the shared surface plumbing, so it is the one
 *   place in this component where depth is honest — an overlay really is above
 *   the page. Its scrim is built from the elevation colour rather than a
 *   neutral ramp step, so it stays dark in dark mode instead of becoming the
 *   white veil the base select paints there.
 *
 * The rows inside are flat. §8's "cards inside cards inside cards" is the same
 * mistake as a raised row inside a raised sheet: the sheet is the layer, and
 * everything in it belongs to that layer.
 */
export function SelectV4({
  options,
  value,
  onValueChange,
  placeholder = 'Select…',
  invalid = false,
  disabled = false,
  accessibilityLabel,
  style,
}: SelectProps): React.ReactElement {
  const theme = useXenitionTheme();
  const { colors, tokens, elevation } = theme;
  const metrics = fieldMetrics(theme);
  const reduced = useReducedMotion();
  const [open, setOpen] = React.useState(false);
  const [held, setHeld] = React.useState(false);

  const selected = options.find((o) => o.value === value);
  const accent = fieldAccent(theme, invalid);

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
              paddingHorizontal: metrics.padX,
              borderRadius: metrics.radius,
              backgroundColor: colors.surface,
              opacity: disabled ? theme.state.disabledContent : 1,
              ...fieldBorder(theme, { invalid, focused: open }),
            },
            style,
          ]}
        >
          <Text
            numberOfLines={1}
            style={{
              flex: 1,
              color: selected ? colors.onSurface : colors.mutedText,
              fontSize: tokens.typography.scale.base,
              fontFamily: tokens.typography.fontBody,
            }}
          >
            {selected ? selected.label : placeholder}
          </Text>
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

      <Modal
        visible={open}
        transparent
        animationType="fade"
        onRequestClose={() => setOpen(false)}
      >
        <View style={{ flex: 1, justifyContent: 'center', padding: tokens.spacing.lg }}>
          {/*
            The scrim is built from the elevation colour, which does not invert
            with the scheme — a shadow does not. A scrim built from a neutral
            ramp step becomes a white veil over a dark page, which is exactly
            what the base select does today.
          */}
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
              {
                maxHeight: '70%',
                borderRadius: tokens.radius.lg,
                overflow: 'hidden',
              },
              panelSkin(theme),
              elevationStyle(elevation.sheet),
            ]}
          >
            <ScrollView>
              {options.map((option) => {
                const active = option.value === value;
                return (
                  <Pressable
                    key={option.value}
                    accessibilityRole="menuitem"
                    accessibilityState={{ selected: active }}
                    onPress={() => {
                      onValueChange?.(option.value);
                      setOpen(false);
                    }}
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
                    {/*
                      The chosen row is marked as well as tinted. Colour alone
                      is not a state (§46) — and `primaryText` rather than
                      `primary` because this is text on `surface`, which is the
                      pair the compiler measured.
                    */}
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
          </View>
        </View>
      </Modal>
    </>
  );
}
