import * as React from 'react';
import { Pressable, Text, View, type StyleProp, type ViewStyle } from 'react-native';
import { useXenitionTheme } from '../theme';
import { withAlpha } from '../primitives/internal/color';
import { Card } from '../primitives';

export type ProfilePromptVariant = 'card' | 'quote' | 'plain';

export interface ProfilePromptProps {
  /** The prompt question (e.g. "A perfect Sunday is…"). */
  prompt: string;
  /** The person's answer. When absent, the placeholder/empty copy shows. */
  answer?: string;
  /** Presentation. Defaults to `card`. */
  variant?: ProfilePromptVariant;
  /** Optional glyph beside the prompt. */
  glyph?: string;
  /** Show a like affordance on the answer (dating "like this prompt"). */
  liked?: boolean;
  /** Fires when the whole prompt is tapped (e.g. to like/comment). */
  onPress?: () => void;
  /** Fires the heart affordance. Rendering it requires this handler. */
  onLike?: () => void;
  /** Copy when there is no answer yet. */
  emptyLabel?: string;
  style?: StyleProp<ViewStyle>;
}

/**
 * A profile prompt + answer block — the native mirror of a dating "prompt" card
 * ("My simple pleasures → …"). The prompt is styled quietly, the answer is the
 * emphasis. Optional tap-to-like affordance surfaces its pressed state through
 * `accessibilityState.selected`, not color. Colors come from theme tokens and
 * `withAlpha` tints — no literal colors. Renders a graceful empty state when the
 * answer is missing.
 */
export function ProfilePrompt({
  prompt,
  answer,
  variant = 'card',
  glyph,
  liked = false,
  onPress,
  onLike,
  emptyLabel = 'No answer yet',
  style,
}: ProfilePromptProps): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();
  const hasAnswer = answer != null && answer.trim().length > 0;

  const body = (
    <View style={{ gap: tokens.spacing.xs }}>
      <View style={{ flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.xs }}>
        {glyph ? (
          <Text style={{ fontSize: tokens.typography.scale.sm }} allowFontScaling={false}>
            {glyph}
          </Text>
        ) : null}
        <Text style={{ color: colors.muted, fontSize: tokens.typography.scale.sm, fontWeight: '600' }}>
          {prompt}
        </Text>
      </View>

      <View style={{ flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'space-between', gap: tokens.spacing.sm }}>
        <Text
          style={{
            flex: 1,
            color: hasAnswer ? colors.onSurface : colors.muted,
            fontSize: tokens.typography.scale[variant === 'quote' ? 'xl' : 'lg'],
            fontStyle: variant === 'quote' ? 'italic' : 'normal',
            fontWeight: variant === 'quote' ? '600' : '500',
          }}
        >
          {hasAnswer ? (variant === 'quote' ? `“${answer}”` : answer) : emptyLabel}
        </Text>

        {onLike ? (
          <Pressable
            accessibilityRole="button"
            accessibilityLabel={liked ? 'Unlike prompt' : 'Like prompt'}
            accessibilityState={{ selected: liked }}
            onPress={onLike}
            hitSlop={8}
          >
            <Text style={{ color: liked ? colors.danger : colors.muted, fontSize: tokens.typography.scale.lg }}>
              {liked ? '♥' : '♡'}
            </Text>
          </Pressable>
        ) : null}
      </View>
    </View>
  );

  const content =
    variant === 'plain' ? (
      <View style={style}>{body}</View>
    ) : variant === 'quote' ? (
      <View
        style={[
          {
            borderLeftWidth: 3,
            borderLeftColor: colors.primary,
            backgroundColor: withAlpha(colors.primary, 0.06),
            borderRadius: tokens.radius.md,
            paddingVertical: tokens.spacing.sm,
            paddingHorizontal: tokens.spacing.md,
          },
          style,
        ]}
      >
        {body}
      </View>
    ) : (
      <Card variant="outlined" padding="md" style={style}>
        {body}
      </Card>
    );

  if (onPress) {
    return (
      <Pressable accessibilityRole="button" accessibilityLabel={`${prompt}. ${hasAnswer ? answer : emptyLabel}`} onPress={onPress}>
        {content}
      </Pressable>
    );
  }
  return content;
}
