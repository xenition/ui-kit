import * as React from 'react';
import { Pressable, View } from 'react-native';
import { useXenitionTheme } from '../theme';
import { CardV4 } from '../primitives/CardV4';
import { TextV4 } from '../primitives/TextV4';
import { mixToken } from '../../primitives/internal/v4-depth';
import { minTap } from '../primitives/internal/chrome-v4';
import { pressOver } from '../primitives/internal/state-v4';
import { spokenLine } from './internal/profile-v4';
import type { ProfilePromptProps } from './ProfilePrompt';

export interface ProfilePromptV4Props extends ProfilePromptProps {
  /** Name for the heart control. Default `'Like this answer'`. */
  likeLabel?: string;
}

/** The rail and wash behind the `quote` variant. */
const QUOTE_TINT = 0.06;
const QUOTE_RAIL = 3;

/**
 * **V4 profile prompt** — same props as {@link ProfilePrompt} plus
 * `likeLabel`.
 *
 * ## Four changes
 *
 * 1. **The heart is a sibling of the prompt, not a child of it.** With
 *    `onPress` set, the base wrapped the whole block — heart included — in a
 *    `Pressable`. A button inside a button is one target on iOS: tapping the
 *    heart fired `onPress`, and a reader was offered the outer control only.
 *    The press now lives on the text block, and the heart sits beside it.
 * 2. **The heart is a real target.** It was a bare glyph with `hitSlop={8}`,
 *    which is roughly 18px of drawn control — `hitSlop` widens where a touch
 *    counts and changes nothing about what a switch-control or a low-vision
 *    user can see or aim at. It clears 44 now, and announces with one name
 *    plus `selected`, which is how the web twin announces it too.
 * 3. **A like is not an error.** The liked heart was `danger` — the slot that
 *    means something has gone wrong, on the most positive gesture in the
 *    product. It is the brand's corrected ink, and filled-vs-hollow carries
 *    the state so it is not colour alone.
 * 4. **Press is a state layer** over the block's own ground, not an `opacity`
 *    that makes a pressed prompt read as an unavailable one.
 */
export function ProfilePromptV4({
  prompt,
  answer,
  variant = 'card',
  glyph,
  liked = false,
  onPress,
  onLike,
  emptyLabel = 'No answer yet',
  likeLabel = 'Like this answer',
  style,
}: ProfilePromptV4Props): React.ReactElement {
  const theme = useXenitionTheme();
  const { colors, tokens } = theme;

  const hasAnswer = answer != null && answer.trim().length > 0;
  const shown = hasAnswer ? answer : emptyLabel;
  const quoted = hasAnswer && variant === 'quote' ? `“${answer}”` : shown;
  const spoken = spokenLine([prompt, shown]);

  const block = (pressed: boolean): React.ReactElement => (
    <View
      style={{
        flex: 1,
        gap: tokens.spacing.xs,
        borderRadius: tokens.radius.sm,
        backgroundColor: pressed ? pressOver(theme, colors.card, colors.onCard) : 'transparent',
      }}
    >
      <View style={{ flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.xs }}>
        {glyph ? (
          <TextV4 size="sm" allowFontScaling={false}>
            {glyph}
          </TextV4>
        ) : null}
        <TextV4 size="sm" weight="semibold" tone="mutedText">
          {prompt}
        </TextV4>
      </View>
      <TextV4
        size={variant === 'quote' ? 'xl' : 'lg'}
        weight={variant === 'quote' ? 'semibold' : 'medium'}
        tone={hasAnswer ? 'onCard' : 'mutedText'}
        style={{ fontStyle: variant === 'quote' ? 'italic' : 'normal' }}
      >
        {quoted}
      </TextV4>
    </View>
  );

  const body = (
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'flex-start',
        gap: tokens.spacing.sm,
      }}
    >
      {onPress ? (
        <Pressable
          accessibilityRole="button"
          accessibilityLabel={spoken}
          onPress={onPress}
          style={{ flex: 1 }}
        >
          {({ pressed }) => block(pressed)}
        </Pressable>
      ) : (
        <View accessible accessibilityLabel={spoken} style={{ flex: 1 }}>
          {block(false)}
        </View>
      )}

      {onLike ? (
        <Pressable
          accessibilityRole="button"
          accessibilityLabel={likeLabel}
          accessibilityState={{ selected: liked }}
          onPress={onLike}
          style={({ pressed }) => ({
            width: minTap(tokens.spacing),
            height: minTap(tokens.spacing),
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: minTap(tokens.spacing) / 2,
            backgroundColor: pressed
              ? pressOver(theme, colors.card, colors.onCard)
              : 'transparent',
          })}
        >
          {/* Filled vs hollow, not red vs grey — the state has a shape. */}
          <TextV4 size="lg" style={{ color: liked ? colors.primaryText : colors.mutedText }}>
            {liked ? '♥' : '♡'}
          </TextV4>
        </Pressable>
      ) : null}
    </View>
  );

  if (variant === 'plain') {
    return <View style={style}>{body}</View>;
  }

  if (variant === 'quote') {
    return (
      <View
        style={[
          {
            flexDirection: 'row',
            gap: tokens.spacing.sm,
            // Composited: the same quote sits on a card and on the page, and a
            // 6% wash of the brand is a different colour on each.
            backgroundColor: mixToken(colors.card, colors.primary, QUOTE_TINT),
            borderRadius: tokens.radius.md,
            paddingVertical: tokens.spacing.sm,
            paddingHorizontal: tokens.spacing.md,
          },
          style,
        ]}
      >
        <View
          accessibilityElementsHidden
          importantForAccessibility="no-hide-descendants"
          style={{
            width: QUOTE_RAIL,
            alignSelf: 'stretch',
            borderRadius: tokens.radius.full,
            backgroundColor: colors.primary,
          }}
        />
        <View style={{ flex: 1 }}>{body}</View>
      </View>
    );
  }

  return (
    <CardV4 variant="outlined" padding="md" style={style}>
      {body}
    </CardV4>
  );
}
