import * as React from 'react';
import { Pressable, Text, View } from 'react-native';
import { useXenitionTheme, type SemanticColors } from '../theme';
import { Rating, Progress } from '../primitives';
import { withAlpha } from '../primitives/internal/color';
import type { CourseCardProps, CourseLevel } from './CourseCard';

/** Same public contract as {@link CourseCard} — a drop-in alternate design. */
export type CourseCardV3Props = CourseCardProps;

const LEVEL_META: Record<CourseLevel, { label: string; color: keyof SemanticColors }> = {
  beginner: { label: 'Beginner', color: 'success' },
  intermediate: { label: 'Intermediate', color: 'accent' },
  advanced: { label: 'Advanced', color: 'danger' },
};

/**
 * CourseCard, design v3 — **minimal, typographic**: no thumbnail, no chrome.
 * A single bold tinted level chip sits above an oversized title, then a quiet
 * meta strip and a hairline progress bar. The whole surface is the press target
 * with a trailing chevron. Same props as {@link CourseCard}. Token-only colors.
 */
export function CourseCardV3({
  title,
  instructor,
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
}: CourseCardV3Props): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();
  const levelMeta = level ? LEVEL_META[level] : undefined;
  const inProgress = progress != null;
  const label = ctaLabel ?? (inProgress ? 'Continue' : 'Enroll');

  const body = (
    <View
      style={[
        {
          gap: tokens.spacing.sm,
          paddingVertical: tokens.spacing.lg,
          paddingHorizontal: tokens.spacing.md,
          backgroundColor: 'transparent',
          borderBottomWidth: 1,
          borderBottomColor: colors.border,
        },
        style,
      ]}
    >
      {levelMeta || category ? (
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.sm }}>
          {levelMeta ? (
            <View
              style={{
                alignSelf: 'flex-start',
                paddingVertical: 3,
                paddingHorizontal: tokens.spacing.sm,
                borderRadius: tokens.radius.full,
                backgroundColor: withAlpha(colors[levelMeta.color], 0.14),
              }}
            >
              <Text
                style={{
                  color: colors[levelMeta.color],
                  fontSize: tokens.typography.scale.xs,
                  fontWeight: '800',
                  textTransform: 'uppercase',
                  letterSpacing: 0.5,
                }}
              >
                {levelMeta.label}
              </Text>
            </View>
          ) : null}
          {category ? (
            <Text style={{ color: colors.muted, fontSize: tokens.typography.scale.xs, fontWeight: '600' }}>{category}</Text>
          ) : null}
        </View>
      ) : null}

      <Text numberOfLines={2} style={{ color: colors.onSurface, fontSize: tokens.typography.scale['2xl'], fontWeight: '800' }}>
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

      {lessonCount != null || durationLabel ? (
        <Text style={{ color: colors.muted, fontSize: tokens.typography.scale.xs }}>
          {[lessonCount != null ? `${lessonCount} lessons` : null, durationLabel].filter(Boolean).join('  ·  ')}
        </Text>
      ) : null}

      {inProgress ? (
        <View style={{ gap: 4, marginTop: tokens.spacing.xs }}>
          <Progress value={progress} tone="primary" size="sm" />
          <Text style={{ color: colors.muted, fontSize: tokens.typography.scale.xs }}>{Math.round(progress)}% complete</Text>
        </View>
      ) : null}

      <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginTop: tokens.spacing.xs }}>
        {price ? (
          <Text style={{ color: colors.onSurface, fontSize: tokens.typography.scale.xl, fontWeight: '800' }}>{price}</Text>
        ) : (
          <View />
        )}
        {onPress ? (
          <Text style={{ color: colors.primary, fontSize: tokens.typography.scale.sm, fontWeight: '700' }}>{label} ›</Text>
        ) : null}
      </View>
    </View>
  );

  const a11y = `Course: ${title}${instructor ? `, by ${instructor}` : ''}`;

  if (!onPress) {
    return (
      <View accessibilityLabel={a11y}>{body}</View>
    );
  }

  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={`${label}: ${title}`}
      onPress={onPress}
      style={({ pressed }) => ({ opacity: pressed ? 0.9 : 1 })}
    >
      {body}
    </Pressable>
  );
}
