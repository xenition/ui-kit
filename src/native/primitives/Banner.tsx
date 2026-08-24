import * as React from 'react';
import { Pressable, Text, View, type StyleProp, type ViewStyle } from 'react-native';
import { useXenitionTheme } from '../theme';

export type BannerTone = 'info' | 'success' | 'warn' | 'danger';

export interface BannerProps {
  tone?: BannerTone;
  /** Leading icon node. */
  icon?: React.ReactNode;
  children?: React.ReactNode;
  /** Optional trailing action button label. */
  actionLabel?: string;
  onAction?: () => void;
  /** Renders a dismiss (✕) control that calls this. */
  onClose?: () => void;
  style?: StyleProp<ViewStyle>;
}

/**
 * Full-width inline banner — a solid, edge-to-edge notice keyed to a semantic
 * tone: the background is the tone token (`info`→primary, `success`→success,
 * `warn`→warn, `danger`→danger) and all content uses the paired `onX` token, so
 * contrast is compiler-guaranteed and every color traces to a token. Distinct
 * from `Alert` (surface card + left rule) by its solid, full-bleed fill.
 * Optional trailing action + dismiss. `danger` announces via the `alert` role.
 */
export function Banner({
  tone = 'info',
  icon,
  children,
  actionLabel,
  onAction,
  onClose,
  style,
}: BannerProps): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();

  const bg: Record<BannerTone, string> = {
    info: colors.primary,
    success: colors.success,
    warn: colors.warn,
    danger: colors.danger,
  };
  const fg: Record<BannerTone, string> = {
    info: colors.onPrimary,
    success: colors.onSuccess,
    warn: colors.onWarn,
    danger: colors.onDanger,
  };
  const on = fg[tone];

  return (
    <View
      accessibilityRole={tone === 'danger' ? 'alert' : 'summary'}
      style={[
        {
          flexDirection: 'row',
          alignItems: 'center',
          gap: tokens.spacing.sm,
          width: '100%',
          backgroundColor: bg[tone],
          paddingVertical: tokens.spacing.md,
          paddingHorizontal: tokens.spacing.lg,
        },
        style,
      ]}
    >
      {icon != null ? <View>{icon}</View> : null}
      <View style={{ flex: 1, minWidth: 0 }}>
        {typeof children === 'string' ? (
          <Text style={{ fontSize: tokens.typography.scale.sm, fontWeight: '500', color: on }}>{children}</Text>
        ) : (
          children
        )}
      </View>
      {actionLabel ? (
        <Pressable accessibilityRole="button" accessibilityLabel={actionLabel} onPress={onAction} hitSlop={8}>
          <Text style={{ fontSize: tokens.typography.scale.sm, fontWeight: '700', color: on, textDecorationLine: 'underline' }}>
            {actionLabel}
          </Text>
        </Pressable>
      ) : null}
      {onClose ? (
        <Pressable accessibilityRole="button" accessibilityLabel="Dismiss" onPress={onClose} hitSlop={8}>
          <Text style={{ fontSize: tokens.typography.scale.base, color: on }}>✕</Text>
        </Pressable>
      ) : null}
    </View>
  );
}
