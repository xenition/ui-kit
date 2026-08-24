import * as React from 'react';
import { Text, View, type StyleProp, type ViewStyle } from 'react-native';
import { useXenitionTheme, type SemanticColors } from '../theme';
import { Button, Progress, Skeleton } from '../primitives';
import { withAlpha } from '../primitives/internal/color';

export type MeditationCategory =
  | 'breathing'
  | 'focus'
  | 'sleep'
  | 'calm'
  | 'movement'
  | 'body-scan'
  | 'loving-kindness';

interface CategoryMeta {
  glyph: string;
  label: string;
  color: keyof SemanticColors;
}

const CATEGORY_META: Record<MeditationCategory, CategoryMeta> = {
  breathing: { glyph: '🌬️', label: 'Breathing', color: 'primary' },
  focus: { glyph: '🎯', label: 'Focus', color: 'accent' },
  sleep: { glyph: '🌙', label: 'Sleep', color: 'primary' },
  calm: { glyph: '🍃', label: 'Calm', color: 'success' },
  movement: { glyph: '🧘', label: 'Movement', color: 'warn' },
  'body-scan': { glyph: '🌀', label: 'Body scan', color: 'accent' },
  'loving-kindness': { glyph: '💗', label: 'Loving kindness', color: 'danger' },
};

export interface MeditationSessionCardProps {
  /** Session title, e.g. "Morning stillness". */
  title: string;
  /** Category — drives the icon, tag label, and accent tone. */
  category: MeditationCategory;
  /** Length in minutes. */
  durationMin?: number;
  /** Difficulty / experience level. */
  level?: 'beginner' | 'intermediate' | 'advanced';
  /** Teacher / narrator name. */
  instructor?: string;
  /** Short description or focus line. */
  description?: string;
  /** Fraction 0–1 of the session already listened to (shows a resume bar). */
  progress?: number;
  /** Gate the session behind a paywall — swaps the CTA for a locked note. */
  locked?: boolean;
  /** Render a placeholder skeleton instead of content. */
  loading?: boolean;
  /** CTA label; defaults to "Start" (or "Resume" when `progress` > 0). */
  startLabel?: string;
  onStart?: () => void;
  style?: StyleProp<ViewStyle>;
}

/**
 * A meditation session summary card: category icon + tag, title, a
 * duration / level / instructor meta strip, an optional resume progress bar,
 * and a single dominant start action. `locked` swaps the CTA for a premium
 * note; `loading` renders a skeleton. `category` sets the icon and accent tone.
 * Token-only colors (semantic slots + a `withAlpha` tint).
 */
export function MeditationSessionCard({
  title,
  category,
  durationMin,
  level,
  instructor,
  description,
  progress,
  locked = false,
  loading = false,
  startLabel,
  onStart,
  style,
}: MeditationSessionCardProps): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();
  const meta = CATEGORY_META[category] ?? CATEGORY_META.calm;
  const accent = colors[meta.color];

  const containerStyle: ViewStyle = {
    backgroundColor: colors.surface,
    borderColor: colors.border,
    borderWidth: 1,
    borderRadius: tokens.radius.lg,
    padding: tokens.spacing.lg,
    gap: tokens.spacing.md,
  };

  if (loading) {
    return (
      <View accessibilityLabel="Loading session" style={[containerStyle, style]}>
        <Skeleton width="40%" height={tokens.typography.scale.sm} />
        <Skeleton width="80%" height={tokens.typography.scale.lg} />
        <Skeleton width="60%" height={tokens.typography.scale.sm} />
      </View>
    );
  }

  const resume = progress != null && progress > 0 && progress < 1;
  const cta = startLabel ?? (resume ? 'Resume' : 'Start');
  const pct = progress != null ? Math.round(Math.min(Math.max(progress, 0), 1) * 100) : 0;

  return (
    <View
      accessibilityLabel={`${meta.label} session: ${title}${locked ? ', premium' : ''}${
        resume ? `, ${pct}% complete` : ''
      }`}
      style={[containerStyle, style]}
    >
      <View style={{ flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.sm }}>
        <View
          style={{
            width: 44,
            height: 44,
            borderRadius: tokens.radius.full,
            backgroundColor: withAlpha(accent, 0.14),
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Text allowFontScaling={false} style={{ fontSize: tokens.typography.scale.lg }}>
            {meta.glyph}
          </Text>
        </View>
        <View style={{ flex: 1, gap: 2 }}>
          <Text
            style={{
              color: accent,
              fontSize: tokens.typography.scale.xs,
              fontWeight: '700',
              textTransform: 'uppercase',
            }}
          >
            {meta.label}
          </Text>
          <Text
            numberOfLines={1}
            style={{ color: colors.onSurface, fontSize: tokens.typography.scale.lg, fontWeight: '700' }}
          >
            {title}
          </Text>
        </View>
        {locked ? (
          <Text allowFontScaling={false} accessibilityLabel="Premium" style={{ fontSize: tokens.typography.scale.base }}>
            🔒
          </Text>
        ) : null}
      </View>

      {description ? (
        <Text numberOfLines={2} style={{ color: colors.muted, fontSize: tokens.typography.scale.sm }}>
          {description}
        </Text>
      ) : null}

      <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: tokens.spacing.lg }}>
        {durationMin != null ? (
          <Meta label="Duration" value={`${durationMin} min`} />
        ) : null}
        {level ? <Meta label="Level" value={cap(level)} /> : null}
        {instructor ? <Meta label="Teacher" value={instructor} /> : null}
      </View>

      {resume ? (
        <View style={{ gap: tokens.spacing.xs }}>
          <Progress value={pct} tone="primary" size="sm" />
          <Text style={{ color: colors.muted, fontSize: tokens.typography.scale.xs }}>{pct}% complete</Text>
        </View>
      ) : null}

      {locked ? (
        <Text style={{ color: colors.muted, fontSize: tokens.typography.scale.sm, fontWeight: '600' }}>
          🔒 Unlock with a membership
        </Text>
      ) : onStart ? (
        <Button variant="primary" onPress={onStart}>
          {cta}
        </Button>
      ) : null}
    </View>
  );
}

function Meta({ label, value }: { label: string; value: string }): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();
  return (
    <View style={{ gap: 2 }}>
      <Text style={{ color: colors.muted, fontSize: tokens.typography.scale.xs }}>{label}</Text>
      <Text style={{ color: colors.onSurface, fontSize: tokens.typography.scale.base, fontWeight: '600' }}>
        {value}
      </Text>
    </View>
  );
}

function cap(s: string): string {
  return s.length === 0 ? s : s.charAt(0).toUpperCase() + s.slice(1);
}
