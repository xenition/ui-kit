import * as React from 'react';
import { Pressable, Text, View, type StyleProp, type ViewStyle } from 'react-native';
import { useXenitionTheme } from '../theme';
import type { SemanticColors } from '../theme';

export type TagTone = 'neutral' | 'primary' | 'success' | 'warn' | 'danger';

export interface TagProps {
  tone?: TagTone;
  /** Renders a remove (×) button that calls this. */
  onRemove?: () => void;
  style?: StyleProp<ViewStyle>;
  children?: React.ReactNode;
}

/** Maps a tone to its [background, foreground] semantic slots (allowed tokens only). */
const TONE: Record<TagTone, [keyof SemanticColors, keyof SemanticColors]> = {
  neutral: ['border', 'onSurface'],
  primary: ['primary', 'onPrimary'],
  success: ['success', 'onPrimary'],
  warn: ['accent', 'onPrimary'],
  danger: ['danger', 'onPrimary'],
};

/**
 * Removable chip/tag — the native mirror of the web `Tag`. Token-bound
 * background/foreground per tone; an optional `onRemove` renders a × button.
 * For filters, keywords, multi-select values. No literal colors.
 */
export function Tag({ tone = 'neutral', onRemove, style, children }: TagProps): React.ReactElement {
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
          borderRadius: tokens.radius.sm,
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
      {onRemove ? (
        <Pressable accessibilityRole="button" accessibilityLabel="Remove" onPress={onRemove} hitSlop={8}>
          <Text style={{ color: colors[fg], fontSize: tokens.typography.scale.xs, fontWeight: '500' }}>
            ×
          </Text>
        </Pressable>
      ) : null}
    </View>
  );
}
