import * as React from 'react';
import { Pressable } from 'react-native';
import { useXenitionTheme } from '../theme';
import { IconV4 } from '../primitives/IconV4';
import { TextV4 } from '../primitives/TextV4';
import { mixToken } from '../../primitives/internal/v4-depth';
import { disabledOpacity, minTap } from '../primitives/internal/chrome-v4';
import { pressLayer, pressOver } from '../primitives/internal/state-v4';
import type { ReadUnreadToggleProps } from './ReadUnreadToggle';

export interface ReadUnreadToggleV4Props extends ReadUnreadToggleProps {
  /** Action announced while the message is unread. Default `'Mark as read'`. */
  readLabel?: string;
  /** Action announced while it is read. Default `'Mark as unread'`. */
  unreadLabel?: string;
}

/**
 * How much brand the labelled chip carries — the same 14% `BadgeV4` mixes, so
 * a toggle and a badge sitting in one toolbar are the same family rather than
 * two nearly-equal tints.
 */
const SOFT_MIX = 0.14;

/**
 * **V4 read / unread toggle** — same props as {@link ReadUnreadToggle} plus
 * `readLabel` and `unreadLabel`.
 *
 * ## Four changes
 *
 * 1. **The zero-size `View` is gone.** The base shipped a `0 × 0` element
 *    carrying the comment "current state exposed as plain text for AT" — with
 *    no text in it, `accessibilityElementsHidden`, and
 *    `importantForAccessibility="no"`. It provided exactly nothing, and the
 *    comment is worse than the omission because it stops anyone looking again.
 * 2. **The state is actually announced.** `accessibilityState.selected` says
 *    whether the message is read; the label stays the *action*. That is the
 *    same pair the web twin spells as `aria-pressed` plus the action label, so
 *    the two twins say the same thing.
 * 3. **It clears 44.** The base was two `spacing.xs` paddings around a `base`
 *    glyph — roughly 24 points — with a `hitSlop` of 6 standing in for the
 *    rest.
 * 4. **The chip ground is opaque and press is a state layer.**
 *    `withAlpha(colors.primary, 0.1)` borrowed whatever was behind it, so the
 *    same toggle was a different colour on a card and on the page; and
 *    `opacity: pressed ? 0.7` dimmed the content instead of tinting the
 *    container. Disabled is 0.38, not 0.5.
 */
export function ReadUnreadToggleV4({
  read = false,
  onToggle,
  iconOnly = false,
  disabled = false,
  readLabel = 'Mark as read',
  unreadLabel = 'Mark as unread',
  style,
}: ReadUnreadToggleV4Props): React.ReactElement {
  const theme = useXenitionTheme();
  const { colors, tokens } = theme;
  // Tapping toggles: if currently read → mark unread, and vice-versa.
  const nextRead = !read;
  const actionLabel = nextRead ? readLabel : unreadLabel;

  // Opaque, so the chip decides its own colour instead of inheriting one from
  // whatever it happens to be sitting on. Icon-only keeps the base's bare
  // ground and therefore takes the translucent layer instead.
  const ground = iconOnly ? 'transparent' : mixToken(colors.surface, colors.primary, SOFT_MIX);
  const ink = read ? 'mutedText' : 'primaryText';

  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={actionLabel}
      accessibilityState={{ selected: read, disabled }}
      disabled={disabled}
      onPress={() => onToggle?.(nextRead)}
      style={({ pressed }) => [
        {
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
          gap: tokens.spacing.xs,
          minHeight: minTap(tokens.spacing),
          minWidth: iconOnly ? minTap(tokens.spacing) : undefined,
          paddingVertical: tokens.spacing.xs,
          paddingHorizontal: iconOnly ? tokens.spacing.xs : tokens.spacing.sm,
          borderRadius: tokens.radius.md,
          // The labelled chip owns its ground, so the layer is composited into
          // it; the icon-only one owns nothing and floats the layer instead.
          backgroundColor: pressed
            ? iconOnly
              ? pressLayer(theme)
              : pressOver(theme, ground, colors.onSurface)
            : ground,
          opacity: disabledOpacity(theme.state, disabled),
        },
        style,
      ]}
    >
      <IconV4 glyph={read ? '✉️' : '📩'} size="base" color={ink} />
      {iconOnly ? null : (
        <TextV4 size="sm" weight="semibold" tone={ink}>
          {actionLabel}
        </TextV4>
      )}
    </Pressable>
  );
}
