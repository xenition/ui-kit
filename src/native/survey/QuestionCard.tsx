import * as React from 'react';
import { Text, View, type StyleProp, type ViewStyle } from 'react-native';
import { useXenitionTheme } from '../theme';
import { Card } from '../primitives';

export type QuestionCardVariant = 'default' | 'numbered' | 'compact';

export interface QuestionCardProps {
  /** The question prompt. */
  title: string;
  /** Optional clarifying line under the prompt. */
  helpText?: string;
  /** 1-based position, shown as a badge when `variant='numbered'`. */
  number?: number;
  /** Total questions, rendered as `number / total` when both are set. */
  total?: number;
  /** Marks the question required → red asterisk + a11y hint. */
  required?: boolean;
  /** Validation message shown under the input in the danger tone. */
  error?: string;
  /** Surface treatment. `compact` tightens padding. Default `'default'`. */
  variant?: QuestionCardVariant;
  /** The input control(s) for this question. */
  children?: React.ReactNode;
  style?: StyleProp<ViewStyle>;
}

/**
 * Framed container for one survey question — a token-bound {@link Card} with a
 * prompt, optional help line, an optional position badge (`numbered`), a
 * required marker, and a slot for the answer control. `compact` tightens the
 * padding for dense forms. The prompt is announced as a `header`; the required
 * state is spoken (asterisk color is never the sole signal). No literal colors.
 */
export function QuestionCard({
  title,
  helpText,
  number,
  total,
  required = false,
  error,
  variant = 'default',
  children,
  style,
}: QuestionCardProps): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();
  const compact = variant === 'compact';
  const showBadge = variant === 'numbered' && number != null;

  return (
    <Card variant="outlined" padding={compact ? 'sm' : 'md'} style={style}>
      <View style={{ gap: compact ? tokens.spacing.xs : tokens.spacing.sm }}>
        {showBadge ? (
          <Text
            style={{
              color: colors.primary,
              fontSize: tokens.typography.scale.xs,
              fontWeight: '700',
              letterSpacing: 1,
            }}
          >
            {total != null ? `${number} / ${total}` : `Q${number}`}
          </Text>
        ) : null}

        <Text
          accessibilityRole="header"
          accessibilityLabel={required ? `${title}, required` : title}
          style={{
            color: colors.onSurface,
            fontSize: compact ? tokens.typography.scale.base : tokens.typography.scale.lg,
            fontWeight: '700',
          }}
        >
          {title}
          {required ? (
            <Text style={{ color: colors.danger }}> *</Text>
          ) : null}
        </Text>

        {helpText ? (
          <Text style={{ color: colors.muted, fontSize: tokens.typography.scale.sm }}>
            {helpText}
          </Text>
        ) : null}

        {children ? <View style={{ marginTop: tokens.spacing.xs }}>{children}</View> : null}

        {error ? (
          <Text
            accessibilityRole="text"
            style={{ color: colors.danger, fontSize: tokens.typography.scale.sm, fontWeight: '600' }}
          >
            {error}
          </Text>
        ) : null}
      </View>
    </Card>
  );
}
