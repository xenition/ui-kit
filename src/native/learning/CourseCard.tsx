import * as React from 'react';
import { Image, Pressable, Text, View, type StyleProp, type ViewStyle } from 'react-native';
import { useXenitionTheme } from '../theme';
import { Badge, Rating, Progress } from '../primitives';

/** Difficulty level — drives the level tag tone + label. */
export type CourseLevel = 'beginner' | 'intermediate' | 'advanced';

interface LevelMeta {
  label: string;
  tone: 'success' | 'warn' | 'danger';
}

const LEVEL_META: Record<CourseLevel, LevelMeta> = {
  beginner: { label: 'Beginner', tone: 'success' },
  intermediate: { label: 'Intermediate', tone: 'warn' },
  advanced: { label: 'Advanced', tone: 'danger' },
};

export interface CourseCardProps {
  /** Course title. */
  title: string;
  /** Instructor / author name. */
  instructor?: string;
  /** Remote thumbnail image URI. */
  thumbnail?: string;
  /** Emoji/glyph shown when there's no thumbnail. */
  glyph?: string;
  /** Difficulty; sets the level tag. */
  level?: CourseLevel;
  /** Short subject / category label. */
  category?: string;
  /** Number of lessons in the course. */
  lessonCount?: number;
  /** Human duration label, e.g. "4h 30m". */
  durationLabel?: string;
  /** Average rating (0–5). */
  rating?: number;
  /** Number of ratings, shown next to the stars. */
  ratingCount?: number;
  /** Enrollment progress 0–100. When set, the card reads as "in progress". */
  progress?: number;
  /** Price label, e.g. "$49" or "Free". */
  price?: string;
  /** CTA label; defaults to "Continue" when `progress` is set, else "Enroll". */
  ctaLabel?: string;
  /** Fires when the CTA is pressed. */
  onPress?: () => void;
  style?: StyleProp<ViewStyle>;
}

/**
 * A course summary card: thumbnail (or glyph fallback), level + category tags,
 * title, instructor, a lessons / duration / rating stat strip, an optional
 * progress bar, price, and a single dominant CTA. `progress` flips the card into
 * an "in progress" state (Continue). Token-only colors.
 */
export function CourseCard({
  title,
  instructor,
  thumbnail,
  glyph = '📚',
  level,
  category,
  lessonCount,
  durationLabel,
  rating,
  ratingCount,
  progress,
  price,
  ctaLabel,
  onPress,
  style,
}: CourseCardProps): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();
  const levelMeta: LevelMeta | undefined = level ? LEVEL_META[level] : undefined;
  const inProgress = progress != null;
  const label = ctaLabel ?? (inProgress ? 'Continue' : 'Enroll');

  return (
    <View
      accessibilityLabel={`Course: ${title}${instructor ? `, by ${instructor}` : ''}`}
      style={[
        {
          backgroundColor: colors.surface,
          borderColor: colors.border,
          borderWidth: 1,
          borderRadius: tokens.radius.lg,
          overflow: 'hidden',
        },
        style,
      ]}
    >
      <View
        style={{
          height: 120,
          backgroundColor: colors.accent,
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        {thumbnail ? (
          <Image source={{ uri: thumbnail }} style={{ width: '100%', height: '100%' }} resizeMode="cover" />
        ) : (
          <Text allowFontScaling={false} style={{ fontSize: tokens.typography.scale['3xl'] }}>
            {glyph}
          </Text>
        )}
      </View>

      <View style={{ padding: tokens.spacing.lg, gap: tokens.spacing.sm }}>
        <View style={{ flexDirection: 'row', gap: tokens.spacing.xs }}>
          {levelMeta ? <Badge tone={levelMeta.tone}>{levelMeta.label}</Badge> : null}
          {category ? <Badge tone="neutral">{category}</Badge> : null}
        </View>

        <Text numberOfLines={2} style={{ color: colors.onSurface, fontSize: tokens.typography.scale.lg, fontWeight: '700' }}>
          {title}
        </Text>
        {instructor ? (
          <Text numberOfLines={1} style={{ color: colors.muted, fontSize: tokens.typography.scale.sm }}>
            {instructor}
          </Text>
        ) : null}

        {rating != null ? (
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.xs }}>
            <Rating value={rating} size="sm" showValue />
            {ratingCount != null ? (
              <Text style={{ color: colors.muted, fontSize: tokens.typography.scale.xs }}>({ratingCount})</Text>
            ) : null}
          </View>
        ) : null}

        <View style={{ flexDirection: 'row', gap: tokens.spacing.lg }}>
          {lessonCount != null ? (
            <Text style={{ color: colors.muted, fontSize: tokens.typography.scale.xs }}>{lessonCount} lessons</Text>
          ) : null}
          {durationLabel ? (
            <Text style={{ color: colors.muted, fontSize: tokens.typography.scale.xs }}>{durationLabel}</Text>
          ) : null}
        </View>

        {inProgress ? (
          <View style={{ gap: 4 }}>
            <Progress value={progress} tone="primary" size="sm" />
            <Text style={{ color: colors.muted, fontSize: tokens.typography.scale.xs }}>
              {Math.round(progress)}% complete
            </Text>
          </View>
        ) : null}

        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginTop: tokens.spacing.xs }}>
          {price ? (
            <Text style={{ color: colors.onSurface, fontSize: tokens.typography.scale.lg, fontWeight: '700' }}>{price}</Text>
          ) : (
            <View />
          )}
          {onPress ? (
            <Pressable
              accessibilityRole="button"
              accessibilityLabel={`${label}: ${title}`}
              onPress={onPress}
              style={({ pressed }) => ({
                borderRadius: tokens.radius.md,
                paddingVertical: tokens.spacing.sm,
                paddingHorizontal: tokens.spacing.lg,
                backgroundColor: colors.primary,
                opacity: pressed ? 0.85 : 1,
              })}
            >
              <Text style={{ color: colors.onPrimary, fontSize: tokens.typography.scale.sm, fontWeight: '600' }}>
                {label}
              </Text>
            </Pressable>
          ) : null}
        </View>
      </View>
    </View>
  );
}
