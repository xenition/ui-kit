import * as React from 'react';
import { Text, View, type StyleProp, type ViewStyle } from 'react-native';
import { useXenitionTheme } from '../theme';

export interface EmptyStateProps {
  /** Optional decorative icon/illustration slot. */
  icon?: React.ReactNode;
  /** Headline (e.g. "Your cart is empty"). */
  title: React.ReactNode;
  /** Supporting line under the title. */
  description?: React.ReactNode;
  /** Primary action slot (e.g. a "Browse products" button). */
  action?: React.ReactNode;
  style?: StyleProp<ViewStyle>;
}

/**
 * Generic empty / no-results state — the native mirror of the web
 * `EmptyState`. Centered icon slot, muted copy, optional action. Token-only
 * (dashed `border`, `surface` background, `muted` text). Domain-agnostic: an
 * empty cart, an unmatched filter, a feed with nothing in it yet. It lives in
 * `primitives` because nearly every screen in the kit reaches for it, and
 * because a prop is only confirmable against `dist/native/<module>/<Name>.d.ts`
 * when the component actually has a file in the module it is exported from.
 * `commerce` re-exports it so the older import path keeps working.
 */
export function EmptyState({
  icon,
  title,
  description,
  action,
  style,
}: EmptyStateProps): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();
  return (
    <View
      style={[
        {
          alignItems: 'center',
          justifyContent: 'center',
          gap: tokens.spacing.sm,
          borderRadius: tokens.radius.lg,
          borderWidth: 1,
          borderStyle: 'dashed',
          borderColor: colors.border,
          backgroundColor: colors.surface,
          paddingHorizontal: tokens.spacing.lg,
          paddingVertical: tokens.spacing['2xl'],
        },
        style,
      ]}
    >
      {icon ? <View>{icon}</View> : null}
      {typeof title === 'string' ? (
        <Text
          style={{
            color: colors.onSurface,
            fontSize: tokens.typography.scale.base,
            fontWeight: '600',
            textAlign: 'center',
          }}
        >
          {title}
        </Text>
      ) : (
        title
      )}
      {description ? (
        typeof description === 'string' ? (
          <Text
            style={{
              color: colors.muted,
              fontSize: tokens.typography.scale.sm,
              textAlign: 'center',
              maxWidth: 320,
            }}
          >
            {description}
          </Text>
        ) : (
          description
        )
      ) : null}
      {action ? <View style={{ marginTop: tokens.spacing.sm }}>{action}</View> : null}
    </View>
  );
}
