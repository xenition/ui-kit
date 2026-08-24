import * as React from 'react';
import { Text, View } from 'react-native';
import { useXenitionTheme } from '../theme';
import { withAlpha } from '../primitives/internal/color';
import type { QuestionCardProps } from './QuestionCard';

/** Same Props as {@link QuestionCard} — a drop-in alternate design. */
export type QuestionCardV3Props = QuestionCardProps;

/**
 * QuestionCard, design V3 — **minimal and borderless**. No card, no shadow: a
 * small primary "eyebrow" (`Q n`, or `Q n / total`) sits above a large prompt,
 * separated from the answer control by a single hairline rule. The stripped
 * treatment suits dense, editorial surveys. Required state is spoken and marked
 * (never color-alone); the prompt is the `header`. Token-pure.
 */
export function QuestionCardV3({
  title,
  helpText,
  number,
  total,
  required = false,
  error,
  variant = 'default',
  children,
  style,
}: QuestionCardV3Props): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();
  const compact = variant === 'compact';
  const eyebrow = number != null ? (total != null ? `Q ${number} / ${total}` : `Q ${number}`) : null;

  return (
    <View style={[{ gap: compact ? tokens.spacing.xs : tokens.spacing.sm }, style]}>
      {eyebrow ? (
        <Text
          style={{
            color: colors.primaryText,
            fontSize: tokens.typography.scale.xs,
            fontWeight: '800',
            letterSpacing: 2,
            textTransform: 'uppercase',
          }}
        >
          {eyebrow}
        </Text>
      ) : null}

      <Text
        accessibilityRole="header"
        accessibilityLabel={required ? `${title}, required` : title}
        style={{
          color: colors.onSurface,
          fontSize: compact ? tokens.typography.scale.lg : tokens.typography.scale.xl,
          fontWeight: '700',
          lineHeight: (compact ? tokens.typography.scale.lg : tokens.typography.scale.xl) * 1.25,
        }}
      >
        {title}
        {required ? <Text style={{ color: colors.dangerText }}> *</Text> : null}
      </Text>

      {helpText ? (
        <Text style={{ color: colors.muted, fontSize: tokens.typography.scale.sm }}>{helpText}</Text>
      ) : null}

      <View
        style={{
          height: 1,
          backgroundColor: withAlpha(colors.border, 0.8),
          marginTop: tokens.spacing.xs,
          marginBottom: children ? tokens.spacing.sm : 0,
        }}
      />

      {children ? <View>{children}</View> : null}

      {error ? (
        <Text
          accessibilityRole="text"
          style={{
            marginTop: tokens.spacing.xs,
            color: colors.dangerText,
            fontSize: tokens.typography.scale.sm,
            fontWeight: '700',
          }}
        >
          {error}
        </Text>
      ) : null}
    </View>
  );
}
