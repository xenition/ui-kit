import * as React from 'react';
import { Animated, Pressable, Text, View } from 'react-native';
import { useXenitionTheme, type SemanticColors } from '../theme';
import { Skeleton } from '../primitives';
import { withAlpha } from '../primitives/internal/color';
import { useEnter, usePressScale } from '../primitives/internal/motion';
import type { MeditationSessionCardProps, MeditationCategory } from './MeditationSessionCard';

/** Drop-in for {@link MeditationSessionCardProps} — same props, a different design. */
export type MeditationSessionCardV3Props = MeditationSessionCardProps;

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

/**
 * MeditationSessionCard — **media-left row** design (v3). A compact horizontal
 * item: a square category-tinted thumbnail on the left (with a small resume dot
 * when in progress), the category label + title + a meta line in the middle, and
 * a round start/resume control on the right. `locked` shows a lock control and
 * an unlock note; `loading` renders a skeleton. Same props as
 * {@link MeditationSessionCardProps}; token-only colors.
 */
export function MeditationSessionCardV3({
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
}: MeditationSessionCardV3Props): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();
  const enter = useEnter();
  const press = usePressScale();
  const meta = CATEGORY_META[category] ?? CATEGORY_META.calm;
  const accent = colors[meta.color];

  const containerStyle = {
    flexDirection: 'row' as const,
    alignItems: 'center' as const,
    gap: tokens.spacing.md,
    backgroundColor: colors.surface,
    borderColor: colors.border,
    borderWidth: 1,
    borderRadius: tokens.radius.lg,
    padding: tokens.spacing.md,
  };

  if (loading) {
    return (
      <View accessibilityLabel="Loading session" style={[containerStyle, style]}>
        <Skeleton variant="rect" width={64} height={64} />
        <View style={{ flex: 1, gap: tokens.spacing.xs }}>
          <Skeleton width="70%" height={tokens.typography.scale.base} />
          <Skeleton width="45%" height={tokens.typography.scale.sm} />
        </View>
      </View>
    );
  }

  const resume = progress != null && progress > 0 && progress < 1;
  const cta = startLabel ?? (resume ? 'Resume' : 'Start');
  const pct = progress != null ? Math.round(Math.min(Math.max(progress, 0), 1) * 100) : 0;
  const metaLine =
    [durationMin != null ? `${durationMin} min` : null, level ? cap(level) : null, instructor ? instructor : null]
      .filter(Boolean)
      .join(' · ') ||
    description ||
    '';

  return (
    <Animated.View style={{ opacity: enter.opacity, transform: enter.transform }}>
      <View
        accessibilityLabel={`${meta.label} session: ${title}${locked ? ', premium' : ''}${
          resume ? `, ${pct}% complete` : ''
        }`}
        style={[containerStyle, style]}
      >
        <View
          style={{
            width: 64,
            height: 64,
            borderRadius: tokens.radius.md,
            backgroundColor: withAlpha(accent, 0.16),
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Text allowFontScaling={false} style={{ fontSize: tokens.typography.scale['2xl'] }}>
            {meta.glyph}
          </Text>
          {resume ? (
            <View
              style={{
                position: 'absolute',
                bottom: 4,
                right: 4,
                paddingHorizontal: 4,
                borderRadius: tokens.radius.full,
                backgroundColor: accent,
              }}
            >
              <Text allowFontScaling={false} style={{ color: colors.onPrimary, fontSize: tokens.typography.scale.xs, fontWeight: '700' }}>
                {pct}%
              </Text>
            </View>
          ) : null}
        </View>

        <View style={{ flex: 1, gap: 2 }}>
          <Text style={{ color: accent, fontSize: tokens.typography.scale.xs, fontWeight: '700', textTransform: 'uppercase' }}>
            {meta.label}
          </Text>
          <Text numberOfLines={1} style={{ color: colors.onSurface, fontSize: tokens.typography.scale.base, fontWeight: '700' }}>
            {title}
          </Text>
          {metaLine ? (
            <Text numberOfLines={1} style={{ color: colors.muted, fontSize: tokens.typography.scale.xs }}>
              {metaLine}
            </Text>
          ) : null}
          {locked ? (
            <Text style={{ color: colors.muted, fontSize: tokens.typography.scale.xs, fontWeight: '600' }}>
              🔒 Membership
            </Text>
          ) : null}
        </View>

        <Animated.View style={{ transform: [{ scale: press.scale }] }}>
          <Pressable
            accessibilityRole="button"
            accessibilityLabel={locked ? 'Premium, locked' : cta}
            accessibilityState={{ disabled: locked }}
            disabled={locked || !onStart}
            onPress={onStart}
            onPressIn={press.onPressIn}
            onPressOut={press.onPressOut}
            style={({ pressed }) => ({
              width: 44,
              height: 44,
              borderRadius: tokens.radius.full,
              backgroundColor: locked ? withAlpha(colors.muted, 0.16) : accent,
              alignItems: 'center',
              justifyContent: 'center',
              opacity: locked ? 0.6 : pressed ? 0.8 : 1,
            })}
          >
            <Text
              allowFontScaling={false}
              style={{ fontSize: tokens.typography.scale.base, color: locked ? colors.muted : colors.onPrimary }}
            >
              {locked ? '🔒' : '▶'}
            </Text>
          </Pressable>
        </Animated.View>
      </View>
    </Animated.View>
  );
}

function cap(s: string): string {
  return s.length === 0 ? s : s.charAt(0).toUpperCase() + s.slice(1);
}
