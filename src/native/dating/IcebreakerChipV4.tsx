import * as React from 'react';
import { Pressable, View } from 'react-native';
import { useXenitionTheme } from '../theme';
import { TextV4 } from '../primitives/TextV4';
import { mixToken } from '../../primitives/internal/v4-depth';
import { disabledOpacity, minTap } from '../primitives/internal/chrome-v4';
import { pressOver } from '../primitives/internal/state-v4';
import type { IcebreakerChipProps } from './IcebreakerChip';

export type { IcebreakerChipProps as IcebreakerChipV4Props };

/** The tint behind a `soft` chip, composited once so it owns its ground. */
const SOFT_MIX = 0.12;
/** The tint behind a `solid` chip is not a tint — `solid` fills. */
const SELECTED_MARK = '✓';

/**
 * **V4 icebreaker chip** — the same props as {@link IcebreakerChip}, nothing
 * added.
 *
 * ## Four changes
 *
 * 1. **The chip is big enough to hit.** `sm` measured about 22px tall and `md`
 *    about 30 — and `ProfileCard` renders *every* interest chip at `sm`, so an
 *    entire profile's worth of tappable chips sat under half the minimum
 *    target. Both sizes now clear 44 through `minTap`, with the padding still
 *    doing the visual work.
 * 2. **`solid` is solid.** The base drew `solid` as a 20% tint and `soft` as a
 *    12% tint — two washes four points apart, which is not a difference a
 *    person can see, and neither of them is what "solid" means. `solid` now
 *    fills `primary` and inks it `onPrimary`; `soft` is the tint, opaque.
 * 3. **Brand ink on a tint is the corrected slot.** A `soft` chip drew its
 *    label in `colors.primary` — the fill token — over a 12% wash of itself.
 *    That is the lowest-contrast pairing in the palette. It is `primaryText`
 *    now, which is the slot the compiler measured for exactly this.
 * 4. **Selection is a mark, not a colour.** The base expressed `selected`
 *    purely as a background flip; it now carries a check glyph as well, so it
 *    survives greyscale and CVD (§ "nothing is carried by colour alone").
 *    Press is a state layer over the chip's own ground rather than `opacity`,
 *    and disabled is M3's 0.38 rather than the base's 0.5.
 */
export function IcebreakerChipV4({
  label,
  value,
  selected = false,
  disabled = false,
  variant = 'soft',
  size = 'md',
  glyph,
  onPress,
  style,
}: IcebreakerChipProps): React.ReactElement {
  const theme = useXenitionTheme();
  const { colors, tokens } = theme;

  const padV = size === 'sm' ? tokens.spacing.xs : tokens.spacing.sm;
  const padH = size === 'sm' ? tokens.spacing.sm : tokens.spacing.md;
  const textSize = size === 'sm' ? 'xs' : 'sm';

  let ground: string;
  let ink: string;
  let borderColor = 'transparent';
  let borderWidth = 0;

  if (selected || variant === 'solid') {
    ground = colors.primary;
    ink = colors.onPrimary;
  } else if (variant === 'soft') {
    // Composited, not `withAlpha`: the same chip sits on a card, on a photo
    // scrim and on the page, and a translucent tint is a different colour on
    // each of the three while its label promises contrast against only one.
    ground = mixToken(colors.card, colors.primary, SOFT_MIX);
    ink = colors.primaryText;
  } else {
    ground = colors.card;
    ink = colors.onCard;
    borderWidth = 1;
    borderColor = colors.border;
  }

  const body = (pressed: boolean): React.ReactElement => (
    <View
      style={[
        {
          alignSelf: 'flex-start',
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
          gap: tokens.spacing.xs,
          minHeight: minTap(tokens.spacing),
          backgroundColor: pressed ? pressOver(theme, ground, ink) : ground,
          borderColor,
          borderWidth,
          borderRadius: tokens.radius.full,
          paddingVertical: padV,
          paddingHorizontal: padH,
          opacity: disabledOpacity(theme.state, disabled),
        },
        style,
      ]}
    >
      {selected ? (
        <TextV4 size={textSize} weight="bold" style={{ color: ink }}>
          {SELECTED_MARK}
        </TextV4>
      ) : null}
      {glyph ? (
        <TextV4 size={textSize} allowFontScaling={false}>
          {glyph}
        </TextV4>
      ) : null}
      <TextV4 size={textSize} weight="semibold" style={{ color: ink }}>
        {label}
      </TextV4>
    </View>
  );

  return (
    <Pressable
      accessibilityRole="button"
      accessibilityState={{ selected, disabled }}
      accessibilityLabel={label}
      disabled={disabled}
      onPress={() => onPress?.(value ?? label)}
      style={{ alignSelf: 'flex-start' }}
    >
      {({ pressed }) => body(pressed)}
    </Pressable>
  );
}
