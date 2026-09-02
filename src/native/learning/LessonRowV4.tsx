import * as React from 'react';
import { Pressable, Text, View, type ViewStyle } from 'react-native';
import { useXenitionTheme, type SemanticColors } from '../theme';
import { withAlpha } from '../primitives/internal/color';
import type { LessonRowProps, LessonStatus } from './LessonRow';

/** V4 layout choices for the "campus" design. */
export type LessonRowLayout = 'full' | 'compact';

/** Drop-in for {@link LessonRowProps} — same props, the V4 "campus" design. */
export interface LessonRowV4Props extends LessonRowProps {
  /** V4 layout: `full` (default) or `compact` (denser single line). */
  variant?: LessonRowLayout;
}

const STATUS_META: Record<LessonStatus, { glyph: string; color: keyof SemanticColors; a11y: string }> = {
  locked: { glyph: '🔒', color: 'muted', a11y: 'locked' },
  available: { glyph: '▷', color: 'primary', a11y: 'available' },
  'in-progress': { glyph: '◑', color: 'accent', a11y: 'in progress' },
  completed: { glyph: '✓', color: 'success', a11y: 'completed' },
};

/**
 * LessonRow — **V4** "campus" design (native twin of the web V4). An elevated
 * rounded row with a soft shadow, a status glyph in a tone-tinted well (glyph +
 * tone, never color alone), an optional index, the title, a content-kind ·
 * duration meta line, and a chevron. `locked` rows are non-interactive; others
 * are a tappable `role="button"`. Honors the V4 `variant` — `full` (default) and
 * `compact` (a denser single line). Token-only colors via `useXenitionTheme()`.
 */
export function LessonRowV4({
  title,
  index,
  durationLabel,
  status = 'available',
  kind,
  onPress,
  variant = 'full',
  style,
}: LessonRowV4Props): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();
  const meta = STATUS_META[status];
  const locked = status === 'locked';
  const interactive = !!onPress && !locked;
  const compact = variant === 'compact';
  const tone = colors[meta.color];
  const shell: ViewStyle = {
    flexDirection: 'row',
    alignItems: 'center',
    gap: tokens.spacing.md,
    minHeight: compact ? 44 : 56,
    paddingVertical: tokens.spacing.sm,
    paddingHorizontal: tokens.spacing.md,
    backgroundColor: colors.card,
    borderColor: colors.border,
    borderWidth: 1,
    borderRadius: tokens.radius.lg,
    opacity: locked ? 0.6 : 1,
    shadowColor: colors.onSurface,
    shadowOpacity: 0.06,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },
    elevation: 2,
  };

  const body = (
    <View style={[shell, style]}>
      <View style={{ width: 36, height: 36, borderRadius: 18, alignItems: 'center', justifyContent: 'center', backgroundColor: withAlpha(tone, 0.12) }}>
        <Text allowFontScaling={false} style={{ color: tone, fontSize: tokens.typography.scale.base }}>{meta.glyph}</Text>
      </View>
      <View style={{ flex: 1, gap: 2 }}>
        <Text numberOfLines={1} style={{ color: colors.onSurface, fontSize: tokens.typography.scale.base, fontWeight: '600' }}>
          {index != null ? `${index}. ` : ''}
          {title}
        </Text>
        {!compact && (kind || durationLabel) ? (
          <Text style={{ color: colors.muted, fontSize: tokens.typography.scale.xs }}>{[kind, durationLabel].filter(Boolean).join(' · ')}</Text>
        ) : null}
      </View>
      {interactive ? <Text style={{ color: colors.muted, fontSize: tokens.typography.scale.base }}>›</Text> : null}
    </View>
  );

  const a11yLabel = `${title}, ${meta.a11y}${durationLabel ? `, ${durationLabel}` : ''}`;

  if (!interactive) {
    return <View accessibilityRole="text" accessibilityLabel={a11yLabel}>{body}</View>;
  }
  return (
    <Pressable accessibilityRole="button" accessibilityLabel={a11yLabel} onPress={onPress} style={({ pressed }) => ({ opacity: pressed ? 0.85 : 1 })}>
      {body}
    </Pressable>
  );
}
