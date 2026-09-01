import * as React from 'react';
import { Pressable } from 'react-native';
import { useXenitionTheme } from '../theme';
import { IconV4 } from '../primitives/IconV4';
import { TextV4 } from '../primitives/TextV4';
import { pressFill } from '../primitives/internal/state-v4';
import { disabledOpacity, minTap } from '../primitives/internal/chrome-v4';
import type { BookmarkButtonProps } from './BookmarkButton';

export interface BookmarkButtonV4Props extends BookmarkButtonProps {
  /** Word shown in the `labeled` variant when the article is not saved. Default `'Save'`. */
  saveLabel?: string;
  /** Word shown in the `labeled` variant when it is saved. Default `'Saved'`. */
  savedLabel?: string;
  /** Announced when pressing would save. Default `'Bookmark article'`. */
  addLabel?: string;
  /** Announced when pressing would unsave. Default `'Remove bookmark'`. */
  removeLabel?: string;
}

/**
 * **V4 bookmark toggle** — same props as {@link BookmarkButton} plus
 * `saveLabel`, `savedLabel`, `addLabel` and `removeLabel`.
 *
 * ## Five changes
 *
 * 1. **One tone, one control.** The web twin drew the saved star in `primary`
 *    and the word beside it in `accent` — two brand colours inside a single
 *    button — and this twin drew the star in `accent`, so the same saved
 *    article was a different colour on a phone and on a laptop. Both are now
 *    the primary tone, taken as *ink* (`primaryText`) rather than as the fill
 *    slot, which measured as low as 1.32:1 on a pale seed.
 * 2. **It is a real target.** The button was roughly 26px, rescued here by
 *    `hitSlop` and on the web by nothing at all. It now clears 44 outright, so
 *    the thing a user sees is the thing they can hit.
 * 3. **Press is a state layer.** `opacity: 0.7` fades the star itself, which
 *    is close enough to M3's 0.38 disabled band to read as "unavailable"
 *    rather than "heard you".
 * 4. **Disabled is 0.38**, the band that actually means unavailable, not the
 *    invented 0.5.
 * 5. **The `labeled` variant's English is a prop**, and the dead zero-size
 *    `View` the `icon` branch rendered instead of nothing is gone.
 */
export function BookmarkButtonV4({
  bookmarked,
  onToggle,
  variant = 'icon',
  disabled = false,
  saveLabel = 'Save',
  savedLabel = 'Saved',
  addLabel = 'Bookmark article',
  removeLabel = 'Remove bookmark',
  style,
}: BookmarkButtonV4Props): React.ReactElement {
  const theme = useXenitionTheme();
  const { colors, tokens } = theme;
  const labeled = variant === 'labeled';
  const tap = minTap(tokens.spacing);

  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={bookmarked ? removeLabel : addLabel}
      accessibilityState={{ selected: bookmarked, disabled }}
      disabled={disabled}
      onPress={() => onToggle(!bookmarked)}
      style={({ pressed }) => [
        {
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
          gap: tokens.spacing.xs,
          minWidth: tap,
          minHeight: tap,
          paddingHorizontal: labeled ? tokens.spacing.md : tokens.spacing.xs,
          borderRadius: tokens.radius.full,
          borderWidth: labeled ? 1 : 0,
          borderColor: colors.border,
          // The container takes the layer; the star keeps its full strength.
          backgroundColor: pressed && !disabled ? pressFill(theme) : 'transparent',
          opacity: disabledOpacity(theme.state, disabled),
        },
        style,
      ]}
    >
      <IconV4
        glyph={bookmarked ? '★' : '☆'}
        size="lg"
        color={bookmarked ? 'primaryText' : 'mutedText'}
      />
      {labeled ? (
        <TextV4 size="sm" weight="semibold" tone={bookmarked ? 'primaryText' : 'onSurface'}>
          {bookmarked ? savedLabel : saveLabel}
        </TextV4>
      ) : null}
    </Pressable>
  );
}
