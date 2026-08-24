import * as React from 'react';
import { Pressable, Text, View, type StyleProp, type ViewStyle } from 'react-native';
import { useXenitionTheme, type SemanticColors } from '../theme';
import { Skeleton } from '../primitives';
import { withAlpha } from '../primitives/internal/color';

export type DailyQuoteTone = 'primary' | 'accent' | 'success';

const TONE_KEY: Record<DailyQuoteTone, keyof SemanticColors> = {
  primary: 'primary',
  accent: 'accent',
  success: 'success',
};

export interface DailyQuoteCardProps {
  /** The quote text (without surrounding quotation marks). */
  quote?: string;
  /** Attribution. */
  author?: string;
  /** Small category / theme eyebrow, e.g. "Presence". */
  category?: string;
  /** Accent tone. Default `'primary'`. */
  tone?: DailyQuoteTone;
  /** Whether the quote is saved (fills the favorite control). */
  favorited?: boolean;
  /** Render a placeholder skeleton. */
  loading?: boolean;
  /** Fires when the favorite control is tapped, with the next state. */
  onFavorite?: (next: boolean) => void;
  /** Fires when the share control is tapped (omit to hide it). */
  onShare?: () => void;
  /** Note shown when there is no quote. Default "No quote today.". */
  emptyLabel?: string;
  style?: StyleProp<ViewStyle>;
}

/**
 * A daily inspiration card: a tinted quote mark, the quote and author, an
 * optional category eyebrow, and favorite / share controls. `favorited` flips
 * the heart glyph and its a11y state (state, not color alone); `loading`
 * renders a skeleton and a missing quote shows an empty note. Token-only colors
 * (semantic slots + a `withAlpha` tint).
 */
export function DailyQuoteCard({
  quote,
  author,
  category,
  tone = 'primary',
  favorited = false,
  loading = false,
  onFavorite,
  onShare,
  emptyLabel = 'No quote today.',
  style,
}: DailyQuoteCardProps): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();
  const accent = colors[TONE_KEY[tone] ?? 'primary'];

  const containerStyle: ViewStyle = {
    backgroundColor: colors.surface,
    borderColor: colors.border,
    borderWidth: 1,
    borderRadius: tokens.radius.lg,
    padding: tokens.spacing.lg,
    gap: tokens.spacing.md,
  };

  if (loading) {
    return (
      <View accessibilityLabel="Loading quote" style={[containerStyle, style]}>
        <Skeleton width="90%" height={tokens.typography.scale.lg} />
        <Skeleton width="75%" height={tokens.typography.scale.lg} />
        <Skeleton width="40%" height={tokens.typography.scale.sm} />
      </View>
    );
  }

  if (!quote) {
    return (
      <View accessibilityLabel={emptyLabel} style={[containerStyle, { alignItems: 'center' }, style]}>
        <Text allowFontScaling={false} style={{ fontSize: tokens.typography.scale.xl }}>
          🕊️
        </Text>
        <Text style={{ color: colors.muted, fontSize: tokens.typography.scale.sm }}>{emptyLabel}</Text>
      </View>
    );
  }

  return (
    <View accessibilityLabel={`Quote${author ? ` by ${author}` : ''}: ${quote}`} style={[containerStyle, style]}>
      {category ? (
        <Text style={{ color: accent, fontSize: tokens.typography.scale.xs, fontWeight: '700', textTransform: 'uppercase' }}>
          {category}
        </Text>
      ) : null}

      <View style={{ flexDirection: 'row', gap: tokens.spacing.sm }}>
        <Text allowFontScaling={false} style={{ fontSize: tokens.typography.scale['2xl'], color: withAlpha(accent, 0.5) }}>
          “
        </Text>
        <Text
          style={{
            flex: 1,
            color: colors.onSurface,
            fontSize: tokens.typography.scale.lg,
            fontWeight: '600',
            lineHeight: Math.round(tokens.typography.scale.lg * 1.4),
          }}
        >
          {quote}
        </Text>
      </View>

      {author ? (
        <Text style={{ color: colors.muted, fontSize: tokens.typography.scale.sm, fontStyle: 'italic' }}>
          — {author}
        </Text>
      ) : null}

      {onFavorite || onShare ? (
        <View style={{ flexDirection: 'row', gap: tokens.spacing.md }}>
          {onFavorite ? (
            <Pressable
              accessibilityRole="button"
              accessibilityState={{ selected: favorited }}
              accessibilityLabel={favorited ? 'Remove from favorites' : 'Add to favorites'}
              onPress={() => onFavorite(!favorited)}
              style={({ pressed }) => ({ opacity: pressed ? 0.7 : 1 })}
            >
              <Text style={{ color: favorited ? colors.danger : colors.muted, fontSize: tokens.typography.scale.lg }}>
                {favorited ? '♥' : '♡'}
              </Text>
            </Pressable>
          ) : null}
          {onShare ? (
            <Pressable
              accessibilityRole="button"
              accessibilityLabel="Share quote"
              onPress={onShare}
              style={({ pressed }) => ({ opacity: pressed ? 0.7 : 1 })}
            >
              <Text style={{ color: colors.muted, fontSize: tokens.typography.scale.lg }}>↗</Text>
            </Pressable>
          ) : null}
        </View>
      ) : null}
    </View>
  );
}
