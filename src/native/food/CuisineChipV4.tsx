import * as React from 'react';
import { Pressable, View, type ViewStyle } from 'react-native';
import { useXenitionTheme } from '../theme';
import { IconV4 } from '../primitives/IconV4';
import { TextV4 } from '../primitives/TextV4';
import { disabledOpacity, minTap } from '../primitives/internal/chrome-v4';
import { pressOver } from '../primitives/internal/state-v4';
import { onPair } from './internal/menu-v4';
import type { CuisineChipProps } from './CuisineChip';

export interface CuisineChipV4Props extends CuisineChipProps {
  /**
   * Whether the chip starts selected when `selected` is not given. Default
   * `false` — where the base always sat, and could never leave.
   */
  defaultSelected?: boolean;
}

/**
 * **V4 cuisine chip** — same props as {@link CuisineChip} plus
 * `defaultSelected`.
 *
 * ## Four changes
 *
 * 1. **It works uncontrolled.** A toggle with no internal state and a
 *    `selected` default of `false` is a filter that can never be applied:
 *    dropped in as `<CuisineChip label="Thai" onPress={…} />` it stayed
 *    unselected however many times it was tapped. `defaultSelected` gives the
 *    state somewhere to live; passing `selected` still drives it from outside.
 * 2. **The chip clears 44.** It was 24–30 tall depending on `size`, which is a
 *    filter rail that is hard to hit and easy to hit wrongly.
 * 3. **It is a toggle button, and both twins say so.** The base announced
 *    `accessibilityState.selected` while its own doc called the chip
 *    "radio-like" and the web twin used `aria-pressed`. It is a toggle: one
 *    chip's state says nothing about its neighbours'. `selected` is the native
 *    spelling of `aria-pressed`, and the doc no longer claims otherwise.
 * 4. **Disabled means the handler does not fire**, at M3's 0.38 band rather
 *    than a hand-picked 0.5 — and press is a state layer, so a pressed chip
 *    stops reading as an unavailable one.
 *
 * **Renders nothing without a `label`.**
 */
export function CuisineChipV4({
  label,
  glyph,
  selected,
  defaultSelected = false,
  onPress,
  disabled = false,
  size = 'md',
  style,
}: CuisineChipV4Props): React.ReactElement | null {
  const theme = useXenitionTheme();
  const { colors, tokens } = theme;

  // `undefined` is the only signal that means "you hold it".
  const controlled = selected !== undefined;
  const [held, setHeld] = React.useState<boolean>(defaultSelected);
  const isSelected = controlled ? selected === true : held;

  if (!label) return null;

  const tap = minTap(tokens.spacing);
  const fontSize = size === 'sm' ? 'xs' : 'sm';
  const padH = size === 'sm' ? tokens.spacing.sm : tokens.spacing.md;
  const ground = isSelected ? colors.primary : colors.card;
  const ink = isSelected ? onPair(theme, 'primary') : colors.onCard;

  const chipStyle = (pressed: boolean): ViewStyle => ({
    alignSelf: 'flex-start',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: tokens.spacing.xs,
    // A chip a thumb has to hit in a scrolling rail, not a label.
    minHeight: tap,
    paddingVertical: tokens.spacing.xs,
    paddingHorizontal: padH,
    borderRadius: tokens.radius.full,
    borderWidth: 1,
    borderColor: isSelected ? colors.primary : colors.border,
    backgroundColor: pressed ? pressOver(theme, ground, ink) : ground,
    opacity: disabledOpacity(theme.state, disabled),
  });

  const inner = (
    <>
      {glyph ? <IconV4 glyph={glyph} size="xs" style={{ color: ink }} /> : null}
      <TextV4 size={fontSize} weight="semibold" style={{ color: ink }}>
        {label}
      </TextV4>
    </>
  );

  if (!onPress) {
    return (
      <View accessible accessibilityLabel={label} style={[chipStyle(false), style]}>
        {inner}
      </View>
    );
  }

  const press = (): void => {
    if (!controlled) setHeld((value) => !value);
    onPress();
  };

  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={label}
      accessibilityState={{ selected: isSelected, disabled }}
      disabled={disabled}
      onPress={disabled ? undefined : press}
      style={({ pressed }) => [chipStyle(pressed), style]}
    >
      {inner}
    </Pressable>
  );
}
