import * as React from 'react';
import { Text, View, type StyleProp, type ViewStyle } from 'react-native';
import { useXenitionTheme } from '../theme';

export type CalloutTone = 'info' | 'success' | 'warn' | 'danger' | 'neutral';

export interface CalloutProps {
  tone?: CalloutTone;
  /** Leading icon node (e.g. an `<Icon glyph="💡" />`). */
  icon?: React.ReactNode;
  /** Bold heading above the body. */
  title?: string;
  children?: React.ReactNode;
  style?: StyleProp<ViewStyle>;
}

/**
 * Callout — a lightweight boxed emphasis block for asides and tips, lighter
 * than `Banner` (no solid fill). A `surface` card with a full 1px border and
 * title tinted to the tone token (`info`→primary, `success`→success,
 * `warn`→warn, `danger`→danger, `neutral`→border/muted), plus an optional
 * leading icon. Body copy stays `onSurface`. No literal colors.
 */
export function Callout({ tone = 'info', icon, title, children, style }: CalloutProps): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();

  const toneColor: Record<CalloutTone, string> = {
    info: colors.primary,
    success: colors.success,
    warn: colors.warn,
    danger: colors.danger,
    neutral: colors.muted,
  };
  const edge = tone === 'neutral' ? colors.border : toneColor[tone];

  return (
    <View
      accessibilityRole="summary"
      style={[
        {
          flexDirection: 'row',
          gap: tokens.spacing.sm,
          backgroundColor: colors.surface,
          borderColor: edge,
          borderWidth: 1,
          borderRadius: tokens.radius.md,
          padding: tokens.spacing.md,
        },
        style,
      ]}
    >
      {icon != null ? <View style={{ marginTop: 2 }}>{icon}</View> : null}
      <View style={{ flex: 1, minWidth: 0, gap: tokens.spacing.xs }}>
        {title ? (
          <Text style={{ fontSize: tokens.typography.scale.sm, fontWeight: '700', color: toneColor[tone] }}>
            {title}
          </Text>
        ) : null}
        {typeof children === 'string' ? (
          <Text style={{ fontSize: tokens.typography.scale.sm, color: colors.onSurface }}>{children}</Text>
        ) : (
          children
        )}
      </View>
    </View>
  );
}
