import * as React from 'react';
import { Pressable, Text, View, type StyleProp, type ViewStyle } from 'react-native';
import { useXenitionTheme, type SemanticColors } from '../theme';
import { withAlpha } from '../primitives/internal/color';
import type { LabelChipProps, LabelTone } from './LabelChip';

/** Drop-in for {@link LabelChipProps} — same props, the V4 "flow" design. */
export type LabelChipV4Props = LabelChipProps;

/** Maps a tone to the semantic slot used for its accent dot + soft tint. */
const SLOT: Record<LabelTone, keyof SemanticColors> = {
  neutral: 'muted',
  primary: 'primary',
  success: 'success',
  warn: 'warn',
  danger: 'danger',
};

/**
 * LabelChip — **V4** "flow" design. The focused-workspace take on a label: a
 * rounded, **soft-tint** chip carrying a small tone-colored dot and its text,
 * with an optional remove (×). Calm and borderless — the tone lives in a gentle
 * `withAlpha` wash rather than an outline, and the single accent dot does the
 * work. Same props/behavior as {@link LabelChipProps} (`tone` dot, `onPress`,
 * `onRemove`); token-only colors via `useXenitionTheme()`.
 */
export function LabelChipV4({ label, tone = 'neutral', onRemove, onPress, style }: LabelChipV4Props): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();
  const accent = colors[SLOT[tone] ?? 'muted'];

  const body = (
    <>
      <View style={{ width: 8, height: 8, borderRadius: tokens.radius.full, backgroundColor: accent }} />
      <Text style={{ color: colors.onSurface, fontSize: tokens.typography.scale.sm, fontWeight: '500' }}>
        {label}
      </Text>
      {onRemove ? (
        <Pressable accessibilityRole="button" accessibilityLabel={`Remove ${label}`} onPress={onRemove} hitSlop={8}>
          <Text style={{ color: colors.muted, fontSize: tokens.typography.scale.sm, fontWeight: '600' }}>×</Text>
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
      backgroundColor: withAlpha(accent, 0.1),
      borderRadius: tokens.radius.full,
      paddingVertical: 4,
      paddingHorizontal: tokens.spacing.sm + 2,
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
