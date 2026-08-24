import * as React from 'react';
import { Text, View, type StyleProp, type ViewStyle } from 'react-native';
import { useXenitionTheme } from '../theme';
import { Button } from '../primitives';

export interface EmptyDashboardProps {
  /** Headline, e.g. "Nothing here yet". */
  title: string;
  /** One or two lines explaining what to do next. */
  message?: string;
  /** Label for the single dominant action button. */
  actionLabel?: string;
  onAction?: () => void;
  /** Optional decorative slot above the title (illustration-less by default). */
  icon?: React.ReactNode;
  style?: StyleProp<ViewStyle>;
}

/**
 * A first-run / empty dashboard state (design.md §15): a centered headline, a
 * short guiding message, and exactly one dominant action. Illustration-less by
 * default. Token-only.
 */
export function EmptyDashboard({
  title,
  message,
  actionLabel,
  onAction,
  icon,
  style,
}: EmptyDashboardProps): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();
  return (
    <View
      accessibilityLabel={title}
      style={[
        {
          alignItems: 'center',
          justifyContent: 'center',
          gap: tokens.spacing.sm,
          paddingHorizontal: tokens.spacing.xl,
          paddingVertical: tokens.spacing['2xl'],
        },
        style,
      ]}
    >
      {icon ? <View style={{ marginBottom: tokens.spacing.sm }}>{icon}</View> : null}
      <Text
        style={{
          color: colors.onSurface,
          fontSize: tokens.typography.scale.xl,
          fontWeight: '700',
          textAlign: 'center',
        }}
      >
        {title}
      </Text>
      {message ? (
        <Text
          style={{
            color: colors.muted,
            fontSize: tokens.typography.scale.base,
            textAlign: 'center',
            maxWidth: 340,
          }}
        >
          {message}
        </Text>
      ) : null}
      {actionLabel && onAction ? (
        <View style={{ marginTop: tokens.spacing.md }}>
          <Button onPress={onAction}>{actionLabel}</Button>
        </View>
      ) : null}
    </View>
  );
}
