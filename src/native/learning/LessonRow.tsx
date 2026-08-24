import * as React from 'react';
import { Pressable, Text, View, type StyleProp, type ViewStyle } from 'react-native';
import { useXenitionTheme, type SemanticColors } from '../theme';

/** Lesson lifecycle state — drives the leading indicator and interactivity. */
export type LessonStatus = 'locked' | 'available' | 'in-progress' | 'completed';

interface StatusMeta {
  glyph: string;
  color: keyof SemanticColors;
  a11y: string;
}

const STATUS_META: Record<LessonStatus, StatusMeta> = {
  locked: { glyph: '🔒', color: 'muted', a11y: 'locked' },
  available: { glyph: '▷', color: 'primary', a11y: 'available' },
  'in-progress': { glyph: '◑', color: 'accent', a11y: 'in progress' },
  completed: { glyph: '✓', color: 'success', a11y: 'completed' },
};

export interface LessonRowProps {
  /** Lesson title. */
  title: string;
  /** Optional 1-based index shown before the title. */
  index?: number;
  /** Duration label, e.g. "12 min". */
  durationLabel?: string;
  /** Lifecycle state; `locked` disables interaction. */
  status?: LessonStatus;
  /** Content type hint, e.g. "Video", "Reading", "Quiz". */
  kind?: string;
  /** Fires on press (suppressed when `locked`). */
  onPress?: () => void;
  style?: StyleProp<ViewStyle>;
}

/**
 * A single lesson row for a course/module list: a status indicator (glyph +
 * semantic tone, never color alone), an optional index, title, content-kind and
 * duration meta, and a chevron affordance. `locked` rows are non-interactive and
 * announced as such. Token-only colors.
 */
export function LessonRow({
  title,
  index,
  durationLabel,
  status = 'available',
  kind,
  onPress,
  style,
}: LessonRowProps): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();
  const meta = STATUS_META[status];
  const locked = status === 'locked';
  const interactive = !!onPress && !locked;

  const body = (
    <View
      style={[
        {
          flexDirection: 'row',
          alignItems: 'center',
          gap: tokens.spacing.md,
          paddingVertical: tokens.spacing.md,
          paddingHorizontal: tokens.spacing.md,
          backgroundColor: colors.surface,
          borderRadius: tokens.radius.md,
          opacity: locked ? 0.6 : 1,
        },
        style,
      ]}
    >
      <Text allowFontScaling={false} style={{ color: colors[meta.color], fontSize: tokens.typography.scale.base }}>
        {meta.glyph}
      </Text>
      <View style={{ flex: 1, gap: 2 }}>
        <Text numberOfLines={1} style={{ color: colors.onSurface, fontSize: tokens.typography.scale.base, fontWeight: '600' }}>
          {index != null ? `${index}. ` : ''}
          {title}
        </Text>
        {(kind || durationLabel) ? (
          <Text style={{ color: colors.muted, fontSize: tokens.typography.scale.xs }}>
            {[kind, durationLabel].filter(Boolean).join(' · ')}
          </Text>
        ) : null}
      </View>
      {interactive ? (
        <Text style={{ color: colors.muted, fontSize: tokens.typography.scale.base }}>›</Text>
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
