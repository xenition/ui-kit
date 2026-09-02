import * as React from 'react';
import { Image, Pressable, Text, View, type ViewStyle } from 'react-native';
import { useXenitionTheme } from '../theme';
import { withAlpha } from '../primitives/internal/color';
import { Badge, Rating, Progress } from '../primitives';
import type { CourseCardProps, CourseLevel } from './CourseCard';

/** V4 layout choices for the "campus" design. */
export type CourseCardLayout = 'full' | 'compact';

/** Drop-in for {@link CourseCardProps} — same props, the V4 "campus" design. */
export interface CourseCardV4Props extends CourseCardProps {
  /** V4 layout: `full` (card, default) or `compact` (dense single row). */
  variant?: CourseCardLayout;
}

const LEVEL_META: Record<CourseLevel, { label: string; tone: 'success' | 'warn' | 'danger' }> = {
  beginner: { label: 'Beginner', tone: 'success' },
  intermediate: { label: 'Intermediate', tone: 'warn' },
  advanced: { label: 'Advanced', tone: 'danger' },
};

/**
 * CourseCard — **V4** "campus" design (native twin of the web V4). An elevated
 * rounded card with a soft shadow, a soft-primary media well (thumbnail or
 * glyph), level + category badges, the title + instructor, a rating, a lessons ·
 * duration strip, an optional progress bar with a **tabular-nums** percentage,
 * price, and one dominant CTA. Honors the V4 `variant` — `full` (card, default)
 * and `compact` (a dense single row). Token-only colors via `useXenitionTheme()`.
 */
export function CourseCardV4({
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
  variant = 'full',
  style,
}: CourseCardV4Props): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();
  const levelMeta = level ? LEVEL_META[level] : undefined;
  const inProgress = progress != null;
  const label = ctaLabel ?? (inProgress ? 'Continue' : 'Enroll');
  const shell: ViewStyle = {
    backgroundColor: colors.card,
    borderColor: colors.border,
    borderWidth: 1,
    borderRadius: tokens.radius.lg,
    shadowColor: colors.onSurface,
    shadowOpacity: 0.06,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },
    elevation: 2,
  };

  const cta = onPress ? (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={`${label}: ${title}`}
      onPress={onPress}
      style={({ pressed }) => ({ borderRadius: tokens.radius.md, paddingVertical: tokens.spacing.sm, paddingHorizontal: tokens.spacing.lg, backgroundColor: colors.primary, opacity: pressed ? 0.85 : 1 })}
    >
      <Text style={{ color: colors.onPrimary, fontSize: tokens.typography.scale.sm, fontWeight: '600' }}>{label}</Text>
    </Pressable>
  ) : null;

  // ── compact: dense single row ──
  if (variant === 'compact') {
    return (
      <View accessibilityLabel={`Course: ${title}${instructor ? `, by ${instructor}` : ''}`} style={[shell, { flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.sm, padding: tokens.spacing.sm }, style]}>
        <View style={{ width: 44, height: 44, borderRadius: tokens.radius.md, overflow: 'hidden', alignItems: 'center', justifyContent: 'center', backgroundColor: withAlpha(colors.primary, 0.1) }}>
          {thumbnail ? <Image source={{ uri: thumbnail }} style={{ width: '100%', height: '100%' }} resizeMode="cover" /> : <Text allowFontScaling={false} style={{ fontSize: tokens.typography.scale.xl }}>{glyph}</Text>}
        </View>
        <View style={{ flex: 1, minWidth: 0, gap: 2 }}>
          <Text numberOfLines={1} style={{ color: colors.onSurface, fontSize: tokens.typography.scale.sm, fontWeight: '700' }}>{title}</Text>
          {instructor ? <Text numberOfLines={1} style={{ color: colors.muted, fontSize: tokens.typography.scale.xs }}>{instructor}</Text> : null}
        </View>
        {levelMeta ? <Badge tone={levelMeta.tone} variant="soft">{levelMeta.label}</Badge> : null}
        {cta}
      </View>
    );
  }

  return (
    <View accessibilityLabel={`Course: ${title}${instructor ? `, by ${instructor}` : ''}`} style={[shell, { overflow: 'hidden' }, style]}>
      <View style={{ height: 120, backgroundColor: withAlpha(colors.primary, 0.1), alignItems: 'center', justifyContent: 'center' }}>
        {thumbnail ? <Image source={{ uri: thumbnail }} style={{ width: '100%', height: '100%' }} resizeMode="cover" /> : <Text allowFontScaling={false} style={{ fontSize: tokens.typography.scale['3xl'] }}>{glyph}</Text>}
      </View>

      <View style={{ padding: tokens.spacing.lg, gap: tokens.spacing.sm }}>
        {levelMeta || category ? (
          <View style={{ flexDirection: 'row', gap: tokens.spacing.xs }}>
            {levelMeta ? <Badge tone={levelMeta.tone} variant="soft">{levelMeta.label}</Badge> : null}
            {category ? <Badge tone="neutral" variant="soft">{category}</Badge> : null}
          </View>
        ) : null}

        <Text numberOfLines={2} style={{ color: colors.onSurface, fontSize: tokens.typography.scale.lg, fontWeight: '700' }}>{title}</Text>
        {instructor ? <Text numberOfLines={1} style={{ color: colors.muted, fontSize: tokens.typography.scale.sm }}>{instructor}</Text> : null}

        {rating != null ? (
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.xs }}>
            <Rating value={rating} size="sm" showValue />
            {ratingCount != null ? <Text style={{ color: colors.muted, fontSize: tokens.typography.scale.xs, fontVariant: ['tabular-nums'] }}>({ratingCount})</Text> : null}
          </View>
        ) : null}

        {lessonCount != null || durationLabel ? (
          <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: tokens.spacing.sm, backgroundColor: withAlpha(colors.primary, 0.05), borderRadius: tokens.radius.md, paddingHorizontal: tokens.spacing.sm, paddingVertical: tokens.spacing.xs }}>
            {lessonCount != null ? <Text style={{ color: colors.muted, fontSize: tokens.typography.scale.xs, fontVariant: ['tabular-nums'] }}>📘 {lessonCount} lessons</Text> : null}
            {durationLabel ? <Text style={{ color: colors.muted, fontSize: tokens.typography.scale.xs, fontVariant: ['tabular-nums'] }}>⏱ {durationLabel}</Text> : null}
          </View>
        ) : null}

        {inProgress ? (
          <View style={{ gap: 4 }}>
            <Progress value={progress} tone="primary" size="sm" />
            <Text style={{ color: colors.muted, fontSize: tokens.typography.scale.xs, fontVariant: ['tabular-nums'] }}>{Math.round(progress)}% complete</Text>
          </View>
        ) : null}

        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginTop: tokens.spacing.xs }}>
          {price ? <Text style={{ color: colors.onSurface, fontSize: tokens.typography.scale.lg, fontWeight: '700', fontVariant: ['tabular-nums'] }}>{price}</Text> : <View />}
          {cta}
        </View>
      </View>
    </View>
  );
}
