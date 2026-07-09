import * as React from 'react';
import { Text, View, type StyleProp, type ViewStyle } from 'react-native';
import { useXenitionTheme } from '../theme';
import type { SemanticColors } from '../theme';

export type OrderStatus =
  | 'pending'
  | 'paid'
  | 'fulfilled'
  | 'shipped'
  | 'cancelled'
  | 'refunded';

export interface StatusBadgeProps {
  /** Order lifecycle status; drives the semantic contrast pair. */
  status: OrderStatus;
  /** Human label (default: the capitalized status). */
  children?: React.ReactNode;
  style?: StyleProp<ViewStyle>;
}

/**
 * Semantic → contrast-checked `X`/`on-X` token pairs. Using the paired slots
 * (not a translucent tint) keeps the badge AA-readable in both modes with zero
 * configuration — the native mirror of the web `StatusBadge`.
 */
function pair(
  status: OrderStatus,
  colors: SemanticColors,
  neutral200: string
): { bg: string; fg: string } {
  switch (status) {
    case 'pending':
      return { bg: colors.warn, fg: colors.onWarn };
    case 'paid':
    case 'fulfilled':
      return { bg: colors.success, fg: colors.onSuccess };
    case 'shipped':
      return { bg: colors.primary, fg: colors.onPrimary };
    case 'cancelled':
      return { bg: colors.danger, fg: colors.onDanger };
    case 'refunded':
      return { bg: neutral200, fg: colors.onSurface };
  }
}

const capitalize = (s: string): string => s.charAt(0).toUpperCase() + s.slice(1);

/** Small pill badge for an order's status. Token-only, contrast-guaranteed. */
export function StatusBadge({
  status,
  children,
  style,
}: StatusBadgeProps): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();
  const { bg, fg } = pair(status, colors, tokens.ramps.neutral[200]);

  return (
    <View
      style={[
        {
          alignSelf: 'flex-start',
          flexDirection: 'row',
          alignItems: 'center',
          backgroundColor: bg,
          borderRadius: tokens.radius.full,
          paddingHorizontal: tokens.spacing.sm,
          paddingVertical: 2,
        },
        style,
      ]}
    >
      <Text style={{ color: fg, fontSize: tokens.typography.scale.xs, fontWeight: '500' }}>
        {children ?? capitalize(status)}
      </Text>
    </View>
  );
}
