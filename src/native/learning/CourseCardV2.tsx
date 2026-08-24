import * as React from 'react';
import { Image, Text, View } from 'react-native';
import { useXenitionTheme } from '../theme';
import { Badge, Rating, Button } from '../primitives';
import { ProgressRing } from '../charts';
import { shadow } from '../primitives/internal/elevation';
import type { CourseCardProps, CourseLevel } from './CourseCard';

/** Same public contract as {@link CourseCard} — a drop-in alternate design. */
export type CourseCardV2Props = CourseCardProps;

const LEVEL_META: Record<CourseLevel, { label: string; tone: 'success' | 'warn' | 'danger' }> = {
  beginner: { label: 'Beginner', tone: 'success' },
  intermediate: { label: 'Intermediate', tone: 'warn' },
  advanced: { label: 'Advanced', tone: 'danger' },
};

/**
 * CourseCard, design v2 — a **horizontal** row: a square thumbnail (or glyph)
 * on the left, a stacked content column on the right, and an elevated,
 * borderless surface (drop shadow). When `progress` is set the card shows a
 * compact {@link ProgressRing} instead of a bar. Same props as {@link CourseCard}.
 * Token-only colors.
 */
export function CourseCardV2({
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
}: CourseCardV2Props): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();
  const levelMeta = level ? LEVEL_META[level] : undefined;
  const inProgress = progress != null;
  const label = ctaLabel ?? (inProgress ? 'Continue' : 'Enroll');

  return (
    <View
      accessibilityLabel={`Course: ${title}${instructor ? `, by ${instructor}` : ''}`}
      style={[
        {
          flexDirection: 'row',
          gap: tokens.spacing.md,
          padding: tokens.spacing.md,
          backgroundColor: colors.surface,
          borderRadius: tokens.radius.lg,
          ...shadow('md', tokens),
        },
        style,
      ]}
    >
      <View
        style={{
          width: 92,
          height: 92,
          borderRadius: tokens.radius.md,
          backgroundColor: colors.accent,
          alignItems: 'center',
          justifyContent: 'center',
          overflow: 'hidden',
        }}
      >
        {thumbnail ? (
          <Image source={{ uri: thumbnail }} style={{ width: '100%', height: '100%' }} resizeMode="cover" />
        ) : (
          <Text allowFontScaling={false} style={{ fontSize: tokens.typography.scale['2xl'] }}>
            {glyph}
          </Text>
        )}
      </View>

      <View style={{ flex: 1, gap: tokens.spacing.xs }}>
        <View style={{ flexDirection: 'row', gap: tokens.spacing.xs, flexWrap: 'wrap' }}>
          {levelMeta ? <Badge tone={levelMeta.tone}>{levelMeta.label}</Badge> : null}
          {category ? <Badge tone="neutral">{category}</Badge> : null}
        </View>

        <Text numberOfLines={2} style={{ color: colors.onSurface, fontSize: tokens.typography.scale.base, fontWeight: '700' }}>
          {title}
        </Text>
        {instructor ? (
          <Text numberOfLines={1} style={{ color: colors.muted, fontSize: tokens.typography.scale.xs }}>
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
            {[lessonCount != null ? `${lessonCount} lessons` : null, durationLabel].filter(Boolean).join(' · ')}
          </Text>
        ) : null}

        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginTop: tokens.spacing.xs }}>
          {price ? (
            <Text style={{ color: colors.onSurface, fontSize: tokens.typography.scale.base, fontWeight: '700' }}>{price}</Text>
          ) : (
            <View />
          )}
          {onPress ? (
            <Button variant="primary" size="sm" onPress={onPress} accessibilityLabel={`${label}: ${title}`}>
              {label}
            </Button>
          ) : null}
        </View>
      </View>

      {inProgress ? (
        <View style={{ alignItems: 'center', justifyContent: 'center' }}>
          <ProgressRing value={progress} max={100} size={52} strokeWidth={6} color="primary" />
        </View>
      ) : null}
    </View>
  );
}
