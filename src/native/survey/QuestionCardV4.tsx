import * as React from 'react';
import { Text, View } from 'react-native';
import { useXenitionTheme } from '../theme';
import { withAlpha } from '../primitives/internal/color';
import type { QuestionCardProps } from './QuestionCard';

/** Drop-in for {@link QuestionCardProps} — same props, the V4 "focus" design. */
export type QuestionCardV4Props = QuestionCardProps;

/**
 * QuestionCard — **V4** "focus" design. The calm, legible take on a survey
 * question: an elevated rounded surface with generous air, a soft-primary
 * number pill (`N / total`), a big prompt, and a slim primary focus bar down the
 * left edge — the single signature accent that anchors the eye. Required shows a
 * spoken danger asterisk; `error` flips the focus bar and message to danger.
 * Same props/behavior as {@link QuestionCardProps}; token-only colors via
 * `useXenitionTheme()`. `variant="compact"` tightens the padding.
 */
export function QuestionCardV4({
  title,
  helpText,
  number,
  total,
  required = false,
  error,
  variant = 'default',
  children,
  style,
}: QuestionCardV4Props): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();
  const compact = variant === 'compact';
  const showBadge = number != null;
  const accent = error ? colors.danger : colors.primary;

  return (
    <View
      style={[
        {
          flexDirection: 'row',
          backgroundColor: colors.card,
          borderRadius: tokens.radius.lg,
          borderWidth: 1,
          borderColor: colors.border,
          overflow: 'hidden',
          shadowColor: colors.onSurface,
          shadowOpacity: 0.06,
          shadowRadius: 10,
          shadowOffset: { width: 0, height: 4 },
          elevation: 2,
        },
        style,
      ]}
    >
      {/* Slim focus bar — the single V4 accent. */}
      <View style={{ width: 4, backgroundColor: accent }} />

      <View style={{ flex: 1, gap: compact ? tokens.spacing.xs : tokens.spacing.sm, padding: compact ? tokens.spacing.md : tokens.spacing.lg }}>
        {showBadge ? (
          <View
            style={{
              alignSelf: 'flex-start',
              paddingHorizontal: tokens.spacing.sm,
              paddingVertical: 2,
              borderRadius: tokens.radius.full,
              backgroundColor: withAlpha(colors.primary, 0.12),
            }}
          >
            <Text style={{ color: colors.primary, fontSize: tokens.typography.scale.xs, fontWeight: '800', letterSpacing: 0.5 }}>
              {total != null ? `${number} / ${total}` : `Q${number}`}
            </Text>
          </View>
        ) : null}

        <Text
          accessibilityRole="header"
          accessibilityLabel={required ? `${title}, required` : title}
          style={{
            color: colors.onSurface,
            fontSize: compact ? tokens.typography.scale.lg : tokens.typography.scale.xl,
            fontWeight: '800',
            lineHeight: (compact ? tokens.typography.scale.lg : tokens.typography.scale.xl) * 1.3,
          }}
        >
          {title}
          {required ? <Text style={{ color: colors.danger }}> *</Text> : null}
        </Text>

        {helpText ? (
          <Text style={{ color: colors.mutedText, fontSize: tokens.typography.scale.sm }}>{helpText}</Text>
        ) : null}

        {children ? <View style={{ marginTop: tokens.spacing.xs }}>{children}</View> : null}

        {error ? (
          <Text accessibilityRole="text" style={{ color: colors.danger, fontSize: tokens.typography.scale.sm, fontWeight: '700' }}>
            {error}
          </Text>
        ) : null}
      </View>
    </View>
  );
}
