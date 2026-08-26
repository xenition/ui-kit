import * as React from 'react';
import { Text, View } from 'react-native';
import { useXenitionTheme } from '../theme';
import type { ChatBubbleProps } from './ChatBubble';

export type { ChatBubbleProps as ChatBubbleV4Props };

/**
 * `ChatBubble`, V4 — the same props, and both directions legible on their own
 * fill.
 *
 * ## Only compiler-guaranteed pairs
 *
 * A message must clear AA against the bubble it is printed on, in both
 * directions and both schemes. That is not something a component can eyeball,
 * so V4 spends only pairs the compiler derives together and measures:
 *
 * - **sent** — `primary` filled with `onPrimary`;
 * - **received** — `surface` inked with `onSurface`, plus the `border` hairline
 *   that separates it from the page it is sitting on.
 *
 * Neither side reaches for `tokens.ramps`, which carries the light orientation
 * in both schemes — the mistake the web twin shipped, where `bg-neutral-100`
 * under a dark theme is one of the *lightest* steps there is and `on-surface`
 * is near-white, giving a near-white message on a near-white bubble.
 *
 * ## Direction without a tail
 *
 * Three of the bubble's four corners are `radius.lg`; the one nearest the
 * author is `radius.sm`. That asymmetry is what makes a thread readable at a
 * glance without a tail or an avatar: the tightened corner points at whoever
 * spoke, so direction survives even where both sides are the same colour, and
 * it costs nothing but two token references. On a `sharp` seed both radii
 * compile to 0 and the bubble is simply square — the signal degrades, it does
 * not break.
 *
 * Alignment and fill say the same thing twice more. Three signals for one fact,
 * which is what makes a thread scannable (§33) rather than decorated.
 *
 * ## Everything else
 *
 * The `meta` line moves from `muted` to `mutedText`: an author name and a
 * timestamp are text, and `muted` carries no contrast promise. The two base
 * twins disagreed about the message's own size — `text-sm` on the web, `base`
 * here — and V4 settles on `base` on both: a message is the content of the
 * screen, not a caption on something else.
 */
export function ChatBubbleV4({
  side = 'them',
  meta,
  style,
  children,
}: ChatBubbleProps): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();
  const me = side === 'me';

  return (
    <View style={[{ gap: tokens.spacing.xs, alignItems: me ? 'flex-end' : 'flex-start' }, style]}>
      {meta != null ? (
        typeof meta === 'string' ? (
          <Text
            style={{
              // `mutedText`, not `muted`: an author and a timestamp are text.
              color: colors.mutedText,
              fontFamily: tokens.typography.fontBody,
              fontSize: tokens.typography.scale.xs,
              paddingHorizontal: tokens.spacing.xs,
            }}
          >
            {meta}
          </Text>
        ) : (
          meta
        )
      ) : null}
      <View
        style={{
          maxWidth: '75%',
          paddingHorizontal: tokens.spacing.md,
          paddingVertical: tokens.spacing.sm,
          // Three corners round, the one nearest the author tight — direction
          // without a tail.
          borderTopLeftRadius: tokens.radius.lg,
          borderTopRightRadius: tokens.radius.lg,
          borderBottomLeftRadius: me ? tokens.radius.lg : tokens.radius.sm,
          borderBottomRightRadius: me ? tokens.radius.sm : tokens.radius.lg,
          // Compiler-guaranteed pairs in both directions.
          backgroundColor: me ? colors.primary : colors.surface,
          borderWidth: me ? 0 : 1,
          borderColor: colors.border,
        }}
      >
        {typeof children === 'string' ? (
          <Text
            style={{
              color: me ? colors.onPrimary : colors.onSurface,
              fontFamily: tokens.typography.fontBody,
              fontSize: tokens.typography.scale.base,
            }}
          >
            {children}
          </Text>
        ) : (
          children
        )}
      </View>
    </View>
  );
}
