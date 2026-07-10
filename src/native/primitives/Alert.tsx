import * as React from 'react';
import { Pressable, Text, View, type StyleProp, type ViewStyle } from 'react-native';
import { useXenitionTheme } from '../theme';

export type AlertTone = 'info' | 'success' | 'warn' | 'danger';

export interface AlertProps {
  tone?: AlertTone;
  /** Bold heading above the body. */
  title?: React.ReactNode;
  /** Renders a dismiss (✕) button that calls this. */
  onClose?: () => void;
  /** Optional leading icon/glyph. */
  icon?: React.ReactNode;
  children?: React.ReactNode;
  style?: StyleProp<ViewStyle>;
}

/**
 * Inline, optionally dismissible alert — the native mirror of the web `Alert`.
 * A token-bound surface with a colored left rule keyed to the tone
 * (`info`→primary, `success`→success, `warn`→accent, `danger`→danger). The
 * `danger` tone announces via the `alert` role; the rest use `status`. The
 * `warn` tone maps to the `accent` token because there is no dedicated warning
 * slot in the primitive token whitelist. No literal colors.
 */
export function Alert({
  tone = 'info',
  title,
  onClose,
  icon,
  children,
  style,
}: AlertProps): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();

  const accent: Record<AlertTone, string> = {
    info: colors.primary,
    success: colors.success,
    warn: colors.accent,
    danger: colors.danger,
  };
  const ruleColor = accent[tone];

  return (
    <View
      accessibilityRole={tone === 'danger' ? 'alert' : 'summary'}
      style={[
        {
          flexDirection: 'row',
          gap: tokens.spacing.sm,
          backgroundColor: colors.surface,
          borderColor: colors.border,
          borderWidth: 1,
          borderLeftWidth: 4,
          borderLeftColor: ruleColor,
          borderRadius: tokens.radius.md,
          padding: tokens.spacing.md,
        },
        style,
      ]}
    >
      {icon != null ? <View style={{ marginTop: 2 }}>{icon}</View> : null}
      <View style={{ flex: 1, minWidth: 0, gap: tokens.spacing.xs }}>
        {title != null ? (
          typeof title === 'string' ? (
            <Text
              style={{
                fontSize: tokens.typography.scale.sm,
                fontWeight: '600',
                color: ruleColor,
              }}
            >
              {title}
            </Text>
          ) : (
            title
          )
        ) : null}
        {children != null ? (
          typeof children === 'string' ? (
            <Text style={{ fontSize: tokens.typography.scale.sm, color: colors.onSurface }}>
              {children}
            </Text>
          ) : (
            children
          )
        ) : null}
      </View>
      {onClose ? (
        <Pressable accessibilityRole="button" accessibilityLabel="Dismiss" onPress={onClose} hitSlop={8}>
          <Text style={{ fontSize: tokens.typography.scale.base, color: colors.muted }}>✕</Text>
        </Pressable>
      ) : null}
    </View>
  );
}
