import * as React from 'react';
import { Pressable, Text, View, type StyleProp, type ViewStyle } from 'react-native';
import { useXenitionTheme } from '../theme';
import { Icon } from './Icon';

export type ResultStatus = 'success' | 'error' | 'empty' | '404';

export interface ResultProps {
  status?: ResultStatus;
  title: string;
  description?: string;
  /** Primary action button label. */
  actionLabel?: string;
  onAction?: () => void;
  /** Override the default status glyph. */
  icon?: React.ReactNode;
  style?: StyleProp<ViewStyle>;
}

const GLYPH: Record<ResultStatus, string> = {
  success: '✓',
  error: '✕',
  empty: '∅',
  '404': '?',
};

/**
 * Full-screen result state — a centered status glyph, title, description, and
 * optional primary action for success / error / empty / 404 outcomes. The glyph
 * tone maps to a semantic token (`success`→success, `error`→danger, `empty` and
 * `404`→muted); title is `onSurface`, description `muted`. The action reuses the
 * primary/`onPrimary` button convention. No literal colors.
 */
export function Result({
  status = 'success',
  title,
  description,
  actionLabel,
  onAction,
  icon,
  style,
}: ResultProps): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();

  const iconColor: Record<ResultStatus, 'success' | 'danger' | 'muted'> = {
    success: 'success',
    error: 'danger',
    empty: 'muted',
    '404': 'muted',
  };

  return (
    <View
      accessibilityRole="summary"
      style={[
        {
          flex: 1,
          alignItems: 'center',
          justifyContent: 'center',
          gap: tokens.spacing.md,
          padding: tokens.spacing.xl,
          backgroundColor: colors.surface,
        },
        style,
      ]}
    >
      {icon != null ? (
        <View>{icon}</View>
      ) : (
        <Icon glyph={GLYPH[status]} size="3xl" color={iconColor[status]} accessibilityLabel={status} />
      )}
      <Text
        style={{
          fontSize: tokens.typography.scale.xl,
          fontWeight: '700',
          color: colors.onSurface,
          textAlign: 'center',
        }}
      >
        {title}
      </Text>
      {description ? (
        <Text style={{ fontSize: tokens.typography.scale.base, color: colors.muted, textAlign: 'center' }}>
          {description}
        </Text>
      ) : null}
      {actionLabel ? (
        <Pressable
          accessibilityRole="button"
          accessibilityLabel={actionLabel}
          onPress={onAction}
          style={({ pressed }) => ({
            marginTop: tokens.spacing.sm,
            backgroundColor: colors.primary,
            borderRadius: tokens.radius.md,
            paddingVertical: tokens.spacing.md,
            paddingHorizontal: tokens.spacing.xl,
            opacity: pressed ? 0.85 : 1,
          })}
        >
          <Text style={{ fontSize: tokens.typography.scale.base, fontWeight: '600', color: colors.onPrimary }}>
            {actionLabel}
          </Text>
        </Pressable>
      ) : null}
    </View>
  );
}
