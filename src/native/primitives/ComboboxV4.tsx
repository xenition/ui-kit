import * as React from 'react';
import { Animated, Modal, Pressable, ScrollView, Text, TextInput, View } from 'react-native';
import { useXenitionTheme } from '../theme';
import type { ComboboxOption, ComboboxProps } from './Combobox';
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

export type { ComboboxProps as ComboboxV4Props, ComboboxOption };

/**
 * **V4 combobox** — the same props as {@link Combobox}, a different design
 * line.
 *
 * ## The selected option has to be findable
 *
 * The base marks it by colouring the label `colors.primary`. That is the one
 * token in the palette with no contrast promise against `surface` — `primary`
 * is guaranteed against `onPrimary`, and `primaryText` is the slot the compiler
 * derives for exactly this case: brand-coloured text ON a surface. So the
 * selected row uses `primaryText`, and it also carries a ✓, because colour
 * alone is never the only cue (§46).
 *
 * ## Everything else is about size and honesty
 *
 * 1. **Rows at `tapTarget()`.** The base row is `md` padding around a line of
 *    text; in a filtered list the row above is a different answer.
 * 2. **A field that belongs in the form.** `InputV4`'s treatment — `2xl`
 *    minimum height, `md` radius, brand halo with its space reserved — and the
 *    field stays ringed while its sheet is open, because the sheet is its.
 * 3. **An empty state that says something.** "No matches for “x”", quoting the
 *    query back, rather than the base's bare "No matches" (§15, §37).
 * 4. **A scrim that is black.** The base scrims with `ramps.neutral[950]`,
 *    which the dark scheme re-emits inverted — a WHITE veil over a dark page.
 *    `elevation.sheet.color` does not invert, because a shadow does not.
 *
 * The search field inside the sheet is the same `InputV4` treatment as the
 * trigger, so the two do not look like different species; the sheet itself
 * takes `elevation.sheet` and glass only when the seed asked for it.
 */
export function ComboboxV4({
  options,
  value,
  onValueChange,
  onChange,
  placeholder = 'Search…',
  invalid = false,
  disabled = false,
  accessibilityLabel,
  style,
}: ComboboxProps): React.ReactElement {
  const theme = useXenitionTheme();
  const { colors, tokens } = theme;
  const reduced = useReducedMotion();

  // Two spellings, one callback: the original wins when both are passed, so a
  // caller who has migrated half a file never gets the change reported twice.
  const emit = onValueChange ?? onChange;

  const [open, setOpen] = React.useState(false);
  const [query, setQuery] = React.useState('');
  const selected = options.find((o) => o.value === value);

  const trimmed = query.trim();
  const filtered = React.useMemo(() => {
    if (!trimmed) return options;
    const q = trimmed.toLowerCase();
    return options.filter((o) => o.label.toLowerCase().includes(q));
  }, [options, trimmed]);

  const target = tapTarget(theme);
  const press = pressFill(theme);

  const close = (): void => {
    setOpen(false);
    setQuery('');
  };

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
              color: selected ? colors.onSurface : colors.mutedText,
              fontFamily: tokens.typography.fontBody,
              fontSize: tokens.typography.scale.base,
            }}
          >
            {selected ? selected.label : placeholder}
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

      <Modal visible={open} transparent animationType="none" onRequestClose={close}>
        <View style={{ flex: 1, justifyContent: 'center', padding: tokens.spacing.lg }}>
          {/* Black at a fixed alpha from the elevation token — `onSurface` and
              the neutral ramp both invert and veil a dark page in white. */}
          <Pressable
            accessibilityRole="button"
            accessibilityLabel="Close"
            onPress={close}
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
            accessibilityLabel="Choose an option"
            style={[
              popoverSkin(theme, 'sheet'),
              {
                maxHeight: '70%',
                overflow: 'hidden',
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
            <View style={{ padding: tokens.spacing.md }}>
              <View style={fieldSkin(theme, { focused: true })}>
                <TextInput
                  autoFocus
                  value={query}
                  onChangeText={setQuery}
                  placeholder={placeholder}
                  placeholderTextColor={colors.mutedText}
                  accessibilityLabel="Filter options"
                  style={{
                    flex: 1,
                    color: colors.onSurface,
                    fontFamily: tokens.typography.fontBody,
                    fontSize: tokens.typography.scale.base,
                    padding: 0,
                  }}
                />
              </View>
            </View>

            <ScrollView keyboardShouldPersistTaps="handled">
              {filtered.length === 0 ? (
                <Text
                  accessibilityLiveRegion="polite"
                  style={{
                    color: colors.mutedText,
                    fontFamily: tokens.typography.fontBody,
                    fontSize: tokens.typography.scale.sm,
                    paddingVertical: tokens.spacing.md,
                    paddingHorizontal: tokens.spacing.md,
                  }}
                >
                  {trimmed ? `No matches for “${trimmed}”` : 'Nothing to choose from yet'}
                </Text>
              ) : (
                filtered.map((opt) => {
                  const active = opt.value === value;
                  return (
                    <Pressable
                      key={opt.value}
                      accessibilityRole="menuitem"
                      accessibilityLabel={opt.label}
                      accessibilityState={{ selected: active }}
                      onPress={() => {
                        emit?.(opt.value);
                        close();
                      }}
                      style={({ pressed }) => ({
                        minHeight: target,
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        gap: tokens.spacing.sm,
                        paddingHorizontal: tokens.spacing.md,
                        backgroundColor: pressed ? press : 'transparent',
                      })}
                    >
                      <Text
                        numberOfLines={1}
                        style={{
                          flex: 1,
                          // `primaryText`, not `primary`: the compiler derives
                          // the former to read ON a surface. `primary` carries
                          // no such promise.
                          color: active ? colors.primaryText : colors.onSurface,
                          fontFamily: tokens.typography.fontBody,
                          fontSize: tokens.typography.scale.base,
                          fontWeight: active ? '600' : '400',
                        }}
                      >
                        {opt.label}
                      </Text>
                      {/* Colour is never the only cue (§46). */}
                      {active ? (
                        <Text
                          accessibilityElementsHidden
                          importantForAccessibility="no"
                          style={{
                            color: colors.primaryText,
                            fontSize: tokens.typography.scale.base,
                          }}
                        >
                          ✓
                        </Text>
                      ) : null}
                    </Pressable>
                  );
                })
              )}
            </ScrollView>
          </Animated.View>
        </View>
      </Modal>
    </>
  );
}
