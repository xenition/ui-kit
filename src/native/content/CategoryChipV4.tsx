import * as React from 'react';
import { Pressable, View } from 'react-native';
import { useXenitionTheme } from '../theme';
import { TextV4 } from '../primitives/TextV4';
import { pressOver } from '../primitives/internal/state-v4';
import { minTap } from '../primitives/internal/chrome-v4';
import { toneInk } from './internal/reading-v4';
import type { CategoryChipProps, CategoryChipVariant } from './CategoryChip';

export interface CategoryChipV4Props extends CategoryChipProps {
  /** The chip's accessible name. Default ``(label) => `Category ${label}` ``. */
  formatLabel?: (label: string) => string;
}

/**
 * **V4 category chip** — same props as {@link CategoryChip} plus
 * `formatLabel`.
 *
 * ## Five changes
 *
 * 1. **The `soft` chip gets a ground of its own.** It was painted `surface` —
 *    and an `ArticleCard` renders it inside a `Card`, which is also `surface`.
 *    The chip was exactly the colour of the thing it sat on, so there was no
 *    chip. It now takes `card`, the token the theme added for a raised
 *    surface.
 * 2. **`accent` as ink becomes `accentText`.** That pairing was measured at
 *    1.32:1 and corrected in `Tag` some time ago; this component never got the
 *    correction, and it is the smallest type in the module.
 * 3. **`active` is not colour alone.** A one-pixel accent ring was the whole
 *    signal on a filter control. The active chip now takes weight as well, and
 *    both twins draw the ring on every variant rather than this one drawing it
 *    on `solid` and the web twin skipping it.
 * 4. **It announces as a toggle**, with the selected state on both platforms
 *    rather than a name that says "Category Sport" and stops.
 * 5. **A pressable chip clears 44 and presses as a state layer**, not
 *    `opacity: 0.7` — which, on a chip whose entire content is one small word,
 *    reads as unavailable.
 *
 * **Renders nothing without a label** (§4.5).
 */
export function CategoryChipV4({
  label,
  variant = 'solid',
  onPress,
  active = false,
  formatLabel = (value: string) => `Category ${value}`,
  style,
}: CategoryChipV4Props): React.ReactElement | null {
  const theme = useXenitionTheme();
  const { colors, tokens } = theme;
  if (!label) return null;

  // `card`, not `surface`: the soft chip is drawn on a card and has to differ
  // from it. `onPair` is not reached for here because only `solid` is a fill.
  const ground: Record<CategoryChipVariant, string> = {
    solid: colors.accent,
    soft: colors.card,
    outline: 'transparent',
  };
  const ink: Record<CategoryChipVariant, string> = {
    solid: colors.onAccent,
    soft: toneInk(theme, 'accent'),
    outline: toneInk(theme, 'accent'),
  };

  const fill = ground[variant];
  // A transparent chip still needs something to mix the layer into; the page
  // is what is behind it.
  const layerGround = fill === 'transparent' ? colors.surface : fill;

  const chip = (pressed: boolean): React.ReactElement => (
    <View
      style={[
        {
          alignSelf: 'flex-start',
          borderRadius: tokens.radius.sm,
          paddingVertical: tokens.spacing.xs,
          paddingHorizontal: tokens.spacing.sm,
          backgroundColor: pressed ? pressOver(theme, layerGround, ink[variant]) : fill,
          borderWidth: variant === 'outline' || active ? 1 : 0,
          borderColor: active ? colors.accent : colors.border,
        },
        style,
      ]}
    >
      <TextV4
        size="xs"
        // Weight, not only the ring — a filter's chosen state has to survive
        // greyscale and CVD.
        weight={active ? 'bold' : 'semibold'}
        style={{ color: ink[variant], textTransform: 'uppercase' }}
      >
        {label}
      </TextV4>
    </View>
  );

  if (!onPress) return chip(false);

  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={formatLabel(label)}
      accessibilityState={{ selected: active }}
      onPress={onPress}
      style={{
        alignSelf: 'flex-start',
        justifyContent: 'center',
        minHeight: minTap(tokens.spacing),
      }}
    >
      {({ pressed }) => chip(pressed)}
    </Pressable>
  );
}
