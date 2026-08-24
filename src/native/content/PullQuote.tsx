import * as React from 'react';
import { Text, View, type StyleProp, type ViewStyle } from 'react-native';
import { useXenitionTheme } from '../primitives';

export type PullQuoteVariant = 'bordered' | 'block' | 'large';

export interface PullQuoteProps {
  /** The quoted text (without surrounding quotation marks — added visually). */
  quote: string;
  /** Optional attribution, e.g. `'Ada Lovelace'`. */
  attribution?: string;
  /**
   * - `bordered` — accent left rule + italic quote (default).
   * - `block`    — filled surface card.
   * - `large`    — oversized display quote, centered.
   */
  variant?: PullQuoteVariant;
  style?: StyleProp<ViewStyle>;
}

/**
 * A pull quote / block quote for long-form articles — the visually emphasized
 * excerpt lifted out of the body. Three token-bound variants: a `bordered`
 * left-rule quote, a filled `block` card, and an oversized centered `large`
 * display quote. Rendered as an accessible quote for screen readers. All colors
 * come from `SemanticColors`; no literal hex.
 */
export function PullQuote({
  quote,
  attribution,
  variant = 'bordered',
  style,
}: PullQuoteProps): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();

  const large = variant === 'large';
  const quoteSize = large ? tokens.typography.scale['2xl'] : tokens.typography.scale.xl;

  const containerStyle: ViewStyle =
    variant === 'block'
      ? {
          backgroundColor: colors.surface,
          borderColor: colors.border,
          borderWidth: 1,
          borderRadius: tokens.radius.lg,
          padding: tokens.spacing.lg,
        }
      : variant === 'large'
        ? { paddingVertical: tokens.spacing.lg, alignItems: 'center' }
        : {
            borderLeftWidth: 3,
            borderLeftColor: colors.accent,
            paddingLeft: tokens.spacing.md,
            paddingVertical: tokens.spacing.xs,
          };

  return (
    <View
      accessibilityRole="text"
      accessibilityLabel={`Quote: ${quote}${attribution ? `, ${attribution}` : ''}`}
      style={[containerStyle, style]}
    >
      <Text
        style={{
          color: colors.onSurface,
          fontSize: quoteSize,
          lineHeight: quoteSize * 1.35,
          fontStyle: large ? 'normal' : 'italic',
          fontWeight: large ? '700' : '500',
          textAlign: large ? 'center' : 'left',
        }}
      >
        {`“${quote}”`}
      </Text>
      {attribution ? (
        <Text
          style={{
            color: colors.muted,
            fontSize: tokens.typography.scale.sm,
            fontWeight: '600',
            marginTop: tokens.spacing.sm,
            textAlign: large ? 'center' : 'left',
          }}
        >
          {`— ${attribution}`}
        </Text>
      ) : null}
    </View>
  );
}
