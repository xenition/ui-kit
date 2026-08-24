import * as React from 'react';
import { Pressable, Text, View } from 'react-native';
import { useXenitionTheme, type SemanticColors } from '../theme';
import { Badge } from '../primitives';
import { withAlpha } from '../primitives/internal/color';
import type { LessonRowProps, LessonStatus } from './LessonRow';

/** Same public contract as {@link LessonRow} — a drop-in alternate design. */
export type LessonRowV3Props = LessonRowProps;

const STATUS_META: Record<
  LessonStatus,
  { glyph: string; color: keyof SemanticColors; a11y: string; badge: 'neutral' | 'primary' | 'accent' | 'success'; badgeText: string }
> = {
  locked: { glyph: '🔒', color: 'muted', a11y: 'locked', badge: 'neutral', badgeText: 'Locked' },
  available: { glyph: '▷', color: 'primary', a11y: 'available', badge: 'primary', badgeText: 'Start' },
  'in-progress': { glyph: '◑', color: 'accent', a11y: 'in progress', badge: 'accent', badgeText: 'Resume' },
  completed: { glyph: '✓', color: 'success', a11y: 'completed', badge: 'success', badgeText: 'Done' },
};

/**
 * LessonRow, design v3 — a **filled chip row**: a solid tinted disc holds the
 * status glyph on the left, the title stacks over quiet meta in the middle, and
 * a status {@link Badge} (glyph-free but spoken via the row a11y label) sits on
 * the right. The whole row is a rounded filled surface. Same props as
 * {@link LessonRow}. Token-only colors.
 */
export function LessonRowV3({
  title,
  index,
  durationLabel,
  status = 'available',
  kind,
  onPress,
  style,
}: LessonRowV3Props): React.ReactElement {
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
          paddingVertical: tokens.spacing.md,
          paddingHorizontal: tokens.spacing.md,
          borderRadius: tokens.radius.md,
          backgroundColor: withAlpha(tint, 0.08),
          opacity: locked ? 0.6 : 1,
        },
        style,
      ]}
    >
      <View
        style={{
          width: 36,
          height: 36,
          borderRadius: tokens.radius.md,
          backgroundColor: withAlpha(tint, 0.18),
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Text allowFontScaling={false} style={{ color: tint, fontSize: tokens.typography.scale.base, fontWeight: '700' }}>
          {meta.glyph}
        </Text>
      </View>
      <View style={{ flex: 1, gap: 2 }}>
        <Text numberOfLines={1} style={{ color: colors.onSurface, fontSize: tokens.typography.scale.base, fontWeight: '700' }}>
          {index != null ? `${index}. ` : ''}
          {title}
        </Text>
        {kind || durationLabel ? (
          <Text style={{ color: colors.muted, fontSize: tokens.typography.scale.xs }}>
            {[kind, durationLabel].filter(Boolean).join(' · ')}
          </Text>
        ) : null}
      </View>
      <Badge tone={meta.badge} variant="soft">
        {meta.badgeText}
      </Badge>
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
