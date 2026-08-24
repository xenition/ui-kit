import * as React from 'react';
import { Animated, Text, View } from 'react-native';
import { useXenitionTheme } from '../theme';
import { shadow } from '../primitives/internal/elevation';
import { withAlpha } from '../primitives/internal/color';
import { useEnter } from '../primitives/internal/motion';
import type { QuestionCardProps } from './QuestionCard';

/** Same Props as {@link QuestionCard} — a drop-in alternate design. */
export type QuestionCardV2Props = QuestionCardProps;

/**
 * QuestionCard, design V2 — an **elevated, borderless card led by a big circular
 * number badge**. Where the original frames the prompt in a flat outlined box,
 * V2 floats on a token drop-shadow and anchors the question with a filled
 * primary badge showing its position (`number`, or `number / total` beneath it).
 * The prompt sits beside the badge as the `header`; required state is spoken and
 * marked (never color-alone), and the answer control drops in below the divider.
 * Token-pure — fill/shadow/tints all trace to compiled tokens.
 */
export function QuestionCardV2({
  title,
  helpText,
  number,
  total,
  required = false,
  error,
  variant = 'default',
  children,
  style,
}: QuestionCardV2Props): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();
  const enter = useEnter({ translateY: 8 });
  const compact = variant === 'compact';
  const pad = compact ? tokens.spacing.md : tokens.spacing.lg;

  return (
    <Animated.View
      style={[
        {
          backgroundColor: colors.surface,
          borderRadius: tokens.radius.lg,
          borderWidth: 0,
          padding: pad,
          ...shadow('md', tokens),
          opacity: enter.opacity,
          transform: enter.transform,
        },
        style,
      ]}
    >
      <View style={{ flexDirection: 'row', gap: tokens.spacing.md, alignItems: 'flex-start' }}>
        <View style={{ alignItems: 'center', gap: 2 }}>
          <View
            style={{
              width: 44,
              height: 44,
              borderRadius: tokens.radius.full,
              backgroundColor: number != null ? colors.primary : withAlpha(colors.primary, 0.12),
              alignItems: 'center',
              justifyContent: 'center',
              ...shadow('sm', tokens),
            }}
          >
            <Text
              style={{
                color: number != null ? colors.onPrimary : colors.primaryText,
                fontSize: tokens.typography.scale.lg,
                fontWeight: '800',
              }}
            >
              {number != null ? number : '?'}
            </Text>
          </View>
          {number != null && total != null ? (
            <Text style={{ color: colors.muted, fontSize: tokens.typography.scale.xs, fontWeight: '600' }}>
              {`/ ${total}`}
            </Text>
          ) : null}
        </View>

        <View style={{ flex: 1, gap: tokens.spacing.xs }}>
          <Text
            accessibilityRole="header"
            accessibilityLabel={required ? `${title}, required` : title}
            style={{
              color: colors.onSurface,
              fontSize: compact ? tokens.typography.scale.base : tokens.typography.scale.lg,
              fontWeight: '800',
            }}
          >
            {title}
            {required ? <Text style={{ color: colors.dangerText }}> *</Text> : null}
          </Text>
          {helpText ? (
            <Text style={{ color: colors.muted, fontSize: tokens.typography.scale.sm }}>{helpText}</Text>
          ) : null}
        </View>
      </View>

      {children ? (
        <View
          style={{
            marginTop: tokens.spacing.md,
            paddingTop: tokens.spacing.md,
            borderTopWidth: 1,
            borderTopColor: withAlpha(colors.border, 0.9),
          }}
        >
          {children}
        </View>
      ) : null}

      {error ? (
        <Text
          accessibilityRole="text"
          style={{
            marginTop: tokens.spacing.sm,
            color: colors.dangerText,
            fontSize: tokens.typography.scale.sm,
            fontWeight: '700',
          }}
        >
          {error}
        </Text>
      ) : null}
    </Animated.View>
  );
}
