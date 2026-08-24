import * as React from 'react';
import { Pressable, Text, View, type StyleProp, type ViewStyle } from 'react-native';
import { useXenitionTheme, type SemanticColors } from '../theme';

/** Color-coded label tone (folders, categories, tags). */
export type LabelTone = 'neutral' | 'primary' | 'success' | 'warn' | 'danger';

export interface LabelChipProps {
  /** Chip text. */
  label: string;
  /** Semantic tone for the leading dot + subtle background. */
  tone?: LabelTone;
  /** Renders a remove (×) button that calls this. */
  onRemove?: () => void;
  /** Makes the whole chip pressable (e.g. to filter). */
  onPress?: () => void;
  style?: StyleProp<ViewStyle>;
}

/** Maps a tone to the semantic slot used for its accent dot. */
const DOT: Record<LabelTone, keyof SemanticColors> = {
  neutral: 'muted',
  primary: 'primary',
  success: 'success',
  warn: 'warn',
  danger: 'danger',
};

/**
 * Outlined, color-coded label chip — a token-bound accent dot plus text on a
 * surface background, with optional press + remove affordances. The dot tone
 * traces to a `SemanticColors` slot. No literal colors.
 */
export function LabelChip({ label, tone = 'neutral', onRemove, onPress, style }: LabelChipProps): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();
  const dot = colors[DOT[tone] ?? 'muted'];

  const body = (
    <>
      <View style={{ width: 8, height: 8, borderRadius: tokens.radius.full, backgroundColor: dot }} />
      <Text style={{ color: colors.onSurface, fontSize: tokens.typography.scale.xs, fontWeight: '500' }}>
        {label}
      </Text>
      {onRemove ? (
        <Pressable accessibilityRole="button" accessibilityLabel={`Remove ${label}`} onPress={onRemove} hitSlop={8}>
          <Text style={{ color: colors.muted, fontSize: tokens.typography.scale.xs, fontWeight: '600' }}>×</Text>
        </Pressable>
      ) : null}
    </>
  );

  const containerStyle: StyleProp<ViewStyle> = [
    {
      alignSelf: 'flex-start',
      flexDirection: 'row',
      alignItems: 'center',
      gap: tokens.spacing.xs,
      borderWidth: 1,
      borderColor: colors.border,
      backgroundColor: colors.surface,
      borderRadius: tokens.radius.full,
      paddingVertical: 2,
      paddingHorizontal: tokens.spacing.sm,
    },
    style,
  ];

  if (onPress) {
    return (
      <Pressable
        accessibilityRole="button"
        accessibilityLabel={label}
        onPress={onPress}
        style={({ pressed }) => [containerStyle, { opacity: pressed ? 0.7 : 1 }]}
      >
        {body}
      </Pressable>
    );
  }

  return <View style={containerStyle}>{body}</View>;
}
