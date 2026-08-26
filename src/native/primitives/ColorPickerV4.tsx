import * as React from 'react';
import { Pressable, View } from 'react-native';
import { useXenitionTheme } from '../theme';
import type { ColorPickerProps, ColorSwatch } from './ColorPicker';
import { tapTarget } from './internal/picker-v4';

export type { ColorPickerProps as ColorPickerV4Props, ColorSwatch };

/**
 * **V4 swatch picker** — the same props as {@link ColorPicker}, a different
 * design line.
 *
 * ## Two problems, both about the selected chip
 *
 * 1. **The tick had no contrast guarantee.** The base draws a ✓ in
 *    `colors.onPrimary` on top of the chosen swatch — but the swatch is an
 *    arbitrary colour supplied by the caller, and `onPrimary` promises AA
 *    against `primary` and against nothing else. Pick a pale swatch and the
 *    tick is invisible; pick the brand and it happens to work. A mark whose
 *    legibility depends on which colour you chose is not a selection state.
 *
 *    So the selection is a **ring around the chip**, not a mark on top of it.
 *    A ring never lands on the swatch, so its contrast is against the page —
 *    known, and the same for every swatch. It is also a shape cue rather than
 *    only a colour one, which is what §46 asks for.
 *
 * 2. **The chip was too small to hit.** 36px in a wrapping grid, where the
 *    neighbouring target is a different colour. Every swatch here is
 *    `tapTarget()` — `spacing['2xl']`, 48px — with the coloured chip drawn
 *    smaller inside it, so the thing you can hit is comfortably larger than the
 *    thing you are aiming at.
 *
 * ## Two rings, deliberately
 *
 * The chip always carries a `colors.border` hairline, so a swatch the same
 * colour as the page (there is one in the default palette: `surface`) still has
 * an edge. The selection ring is a second, thicker ring outside it, and its
 * space is **always reserved** — transparent when unselected — so choosing a
 * colour never reflows the grid (§36.11).
 *
 * No depth at all. A swatch grid is a set of colours; a shadow on each one
 * would be one more thing competing with the only thing the control is about.
 */
export function ColorPickerV4({
  value,
  onChange,
  swatches,
  disabled = false,
  accessibilityLabel = 'Choose a color',
  style,
}: ColorPickerProps): React.ReactElement {
  const theme = useXenitionTheme();
  const { colors, tokens } = theme;

  const palette: ColorSwatch[] = React.useMemo(
    () =>
      swatches ?? [
        { label: 'Primary', value: colors.primary },
        { label: 'Accent', value: colors.accent },
        { label: 'Success', value: colors.success },
        { label: 'Warning', value: colors.warn },
        { label: 'Danger', value: colors.danger },
        { label: 'Foreground', value: colors.onSurface },
        { label: 'Muted', value: colors.muted },
        { label: 'Border', value: colors.border },
        { label: 'Surface', value: colors.surface },
        { label: 'Neutral 300', value: tokens.ramps.neutral[300] },
        { label: 'Neutral 500', value: tokens.ramps.neutral[500] },
        { label: 'Neutral 700', value: tokens.ramps.neutral[700] },
      ],
    [swatches, colors, tokens]
  );

  const target = tapTarget(theme);
  // The chip, inset far enough that the selection ring has somewhere to live.
  const chip = target - tokens.spacing.md;

  return (
    <View
      accessibilityRole="radiogroup"
      accessibilityLabel={accessibilityLabel}
      style={[
        {
          flexDirection: 'row',
          flexWrap: 'wrap',
          gap: tokens.spacing.sm,
          opacity: disabled ? theme.state.disabledContent : 1,
        },
        style,
      ]}
    >
      {palette.map((sw) => {
        const active = value === sw.value;
        return (
          <Pressable
            key={`${sw.label}-${sw.value}`}
            accessibilityRole="radio"
            accessibilityLabel={sw.label}
            accessibilityState={{ selected: active, disabled }}
            disabled={disabled}
            onPress={() => onChange?.(sw.value)}
            style={{
              width: target,
              height: target,
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: tokens.radius.full,
              // Always two points of ring, so selecting never reflows the grid.
              borderWidth: 2,
              borderColor: active ? colors.primary : 'transparent',
            }}
          >
            <View
              style={{
                width: chip,
                height: chip,
                borderRadius: tokens.radius.full,
                backgroundColor: sw.value,
                // A swatch the same colour as the page still needs an edge.
                borderWidth: 1,
                borderColor: colors.border,
              }}
            />
          </Pressable>
        );
      })}
    </View>
  );
}
