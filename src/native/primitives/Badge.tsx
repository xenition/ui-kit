import * as React from 'react';
import { Text, View, type StyleProp, type ViewStyle } from 'react-native';
import { useXenitionTheme } from '../theme';
import type { SemanticColors } from '../theme';

export type BadgeTone = 'neutral' | 'primary' | 'success' | 'warn' | 'danger';

export interface BadgeProps {
  tone?: BadgeTone;
  style?: StyleProp<ViewStyle>;
  children?: React.ReactNode;
}

/** Maps a tone to its [background, foreground] semantic slots. */
const TONE: Record<BadgeTone, [keyof SemanticColors, keyof SemanticColors]> = {
  neutral: ['border', 'onSurface'],
  primary: ['primary', 'onPrimary'],
  success: ['success', 'onSuccess'],
  warn: ['warn', 'onWarn'],
  danger: ['danger', 'onDanger'],
};

/**
 * Small status/label pill — the native mirror of the web `Badge`. Token-bound
 * background/foreground per tone; for statuses, tags, counts. No literal colors.
 */
export function Badge({ tone = 'neutral', style, children }: BadgeProps): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();
  const [bg, fg] = TONE[tone];
  return (
    <View
      style={[
        {
          alignSelf: 'flex-start',
          flexDirection: 'row',
          alignItems: 'center',
          gap: tokens.spacing.xs,
          backgroundColor: colors[bg],
          borderRadius: tokens.radius.full,
          paddingVertical: 2,
          paddingHorizontal: tokens.spacing.sm,
        },
        style,
      ]}
    >
      {typeof children === 'string' ? (
        <Text style={{ color: colors[fg], fontSize: tokens.typography.scale.xs, fontWeight: '500' }}>
          {children}
        </Text>
      ) : (
        children
      )}
    </View>
  );
}
