import * as React from 'react';
import { Pressable, Text, View } from 'react-native';
import { useXenitionTheme, type SemanticColors } from '../theme';
import { withAlpha } from '../primitives/internal/color';
import type { LessonRowProps, LessonStatus } from './LessonRow';

/** Same public contract as {@link LessonRow} — a drop-in alternate design. */
export type LessonRowV2Props = LessonRowProps;

const STATUS_META: Record<LessonStatus, { glyph: string; color: keyof SemanticColors; a11y: string }> = {
  locked: { glyph: '🔒', color: 'muted', a11y: 'locked' },
  available: { glyph: '▷', color: 'primary', a11y: 'available' },
  'in-progress': { glyph: '◑', color: 'accent', a11y: 'in progress' },
  completed: { glyph: '✓', color: 'success', a11y: 'completed' },
};

/**
 * LessonRow, design v2 — a **timeline node** row: a large ringed circle on the
 * left carries the 1-based index (or a status glyph when there's no index),
 * tinted by the lesson's semantic status. The title and meta sit to the right
 * with no surrounding card. Same props as {@link LessonRow}. Token-only colors.
 */
export function LessonRowV2({
  title,
  index,
  durationLabel,
  status = 'available',
  kind,
  onPress,
  style,
}: LessonRowV2Props): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();
  const meta = STATUS_META[status];
  const locked = status === 'locked';
  const interactive = !!onPress && !locked;
  const tint = colors[meta.color];

  const body = (
    <View
      style={[
        {
          flexDirection: 'row',
          alignItems: 'center',
          gap: tokens.spacing.md,
          paddingVertical: tokens.spacing.sm,
          opacity: locked ? 0.6 : 1,
        },
        style,
      ]}
    >
      <View
        style={{
          width: 40,
          height: 40,
          borderRadius: tokens.radius.full,
          borderWidth: 2,
          borderColor: tint,
          backgroundColor: withAlpha(tint, 0.1),
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        {index != null && !locked ? (
          <Text style={{ color: tint, fontSize: tokens.typography.scale.base, fontWeight: '800' }}>{index}</Text>
        ) : (
          <Text allowFontScaling={false} style={{ color: tint, fontSize: tokens.typography.scale.base }}>
            {meta.glyph}
          </Text>
        )}
      </View>
      <View style={{ flex: 1, gap: 2 }}>
        <Text numberOfLines={1} style={{ color: colors.onSurface, fontSize: tokens.typography.scale.base, fontWeight: '600' }}>
          {title}
        </Text>
        {kind || durationLabel ? (
          <Text style={{ color: colors.muted, fontSize: tokens.typography.scale.xs }}>
            {[kind, durationLabel].filter(Boolean).join(' · ')}
          </Text>
        ) : null}
      </View>
      {interactive ? (
        <Text style={{ color: colors.muted, fontSize: tokens.typography.scale.lg }}>›</Text>
      ) : null}
    </View>
  );

  const a11yLabel = `${title}, ${meta.a11y}${durationLabel ? `, ${durationLabel}` : ''}`;

  if (!interactive) {
    return (
      <View accessibilityRole="text" accessibilityLabel={a11yLabel}>
        {body}
      </View>
    );
  }

  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={a11yLabel}
      onPress={onPress}
      style={({ pressed }) => ({ opacity: pressed ? 0.85 : 1 })}
    >
      {body}
    </Pressable>
  );
}
