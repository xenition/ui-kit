import * as React from 'react';
import { Animated, Pressable, Text, View } from 'react-native';
import { useXenitionTheme, type SemanticColors } from '../theme';
import { Skeleton } from '../primitives';
import { withAlpha } from '../primitives/internal/color';
import { useEnter, usePressScale } from '../primitives/internal/motion';
import type { MeditationSessionCardProps, MeditationCategory } from './MeditationSessionCard';

/** Drop-in for {@link MeditationSessionCardProps} — same props, a different design. */
export type MeditationSessionCardV2Props = MeditationSessionCardProps;

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
 * MeditationSessionCard — **full-bleed hero** design (v2). A tall calm cover: a
 * dark neutral base washed with the category accent and a bottom scrim, a
 * category tag pinned top-left (lock top-right), one big centered play control,
 * and the title + a duration/level/teacher meta strip + a resume bar stacked
 * over the scrim. `locked` swaps the play for a lock and an unlock note;
 * `loading` renders a skeleton. Same props as {@link MeditationSessionCardProps};
 * token-only colors (semantic slots, fixed neutral-ramp ink, `withAlpha` tints).
 */
export function MeditationSessionCardV2({
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
}: MeditationSessionCardV2Props): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();
  const enter = useEnter();
  const press = usePressScale();
  const meta = CATEGORY_META[category] ?? CATEGORY_META.calm;
  const accent = colors[meta.color];
  // Fixed near-white / near-black from the ramp read the same in light & dark,
  // so text stays legible over the dark hero regardless of scheme.
  const ink = tokens.ramps.neutral[50] ?? colors.onPrimary;
  const base = tokens.ramps.neutral[800] ?? colors.onSurface;

  if (loading) {
    return (
      <View
        accessibilityLabel="Loading session"
        style={[
          {
            backgroundColor: colors.surface,
            borderColor: colors.border,
            borderWidth: 1,
            borderRadius: tokens.radius.lg,
            padding: tokens.spacing.lg,
            gap: tokens.spacing.md,
          },
          style,
        ]}
      >
        <Skeleton variant="rect" width="100%" height={140} />
        <Skeleton width="60%" height={tokens.typography.scale.lg} />
        <Skeleton width="40%" height={tokens.typography.scale.sm} />
      </View>
    );
  }

  const resume = progress != null && progress > 0 && progress < 1;
  const cta = startLabel ?? (resume ? 'Resume' : 'Start');
  const pct = progress != null ? Math.round(Math.min(Math.max(progress, 0), 1) * 100) : 0;
  const metaBits = [
    durationMin != null ? `${durationMin} min` : null,
    level ? cap(level) : null,
    instructor ? instructor : null,
  ].filter(Boolean) as string[];

  return (
    <Animated.View
      accessibilityLabel={`${meta.label} session: ${title}${locked ? ', premium' : ''}${
        resume ? `, ${pct}% complete` : ''
      }`}
      style={[{ opacity: enter.opacity, transform: enter.transform }, style]}
    >
      <View
        style={{
          borderRadius: tokens.radius.lg,
          overflow: 'hidden',
          borderColor: colors.border,
          borderWidth: 1,
          minHeight: 232,
          backgroundColor: base,
        }}
      >
        {/* accent wash + bottom scrim, both token-derived rgba (no literal hex) */}
        <View style={{ ...fill, backgroundColor: withAlpha(accent, 0.5) }} />
        <View style={{ ...fill, top: '35%', backgroundColor: withAlpha(base, 0.66) }} />

        {/* top row: tag + lock */}
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: tokens.spacing.md,
          }}
        >
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              gap: tokens.spacing.xs,
              paddingVertical: 4,
              paddingHorizontal: tokens.spacing.sm,
              borderRadius: tokens.radius.full,
              backgroundColor: withAlpha(ink, 0.18),
            }}
          >
            <Text allowFontScaling={false} style={{ fontSize: tokens.typography.scale.sm }}>
              {meta.glyph}
            </Text>
            <Text style={{ color: ink, fontSize: tokens.typography.scale.xs, fontWeight: '700', textTransform: 'uppercase' }}>
              {meta.label}
            </Text>
          </View>
          {locked ? (
            <Text allowFontScaling={false} accessibilityLabel="Premium" style={{ fontSize: tokens.typography.scale.base }}>
              🔒
            </Text>
          ) : null}
        </View>

        {/* big centered play */}
        <View style={{ alignItems: 'center', justifyContent: 'center', paddingVertical: tokens.spacing.md }}>
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
                width: 72,
                height: 72,
                borderRadius: tokens.radius.full,
                backgroundColor: withAlpha(ink, 0.95),
                alignItems: 'center',
                justifyContent: 'center',
                opacity: locked ? 0.55 : pressed ? 0.85 : 1,
              })}
            >
              <Text allowFontScaling={false} style={{ fontSize: tokens.typography.scale.xl, color: accent }}>
                {locked ? '🔒' : '▶'}
              </Text>
            </Pressable>
          </Animated.View>
        </View>

        {/* bottom copy over the scrim */}
        <View style={{ padding: tokens.spacing.lg, gap: tokens.spacing.xs }}>
          <Text numberOfLines={1} style={{ color: ink, fontSize: tokens.typography.scale.xl, fontWeight: '800' }}>
            {title}
          </Text>
          {description ? (
            <Text numberOfLines={2} style={{ color: withAlpha(ink, 0.82), fontSize: tokens.typography.scale.sm }}>
              {description}
            </Text>
          ) : null}
          {metaBits.length > 0 ? (
            <Text style={{ color: withAlpha(ink, 0.82), fontSize: tokens.typography.scale.sm, fontWeight: '600' }}>
              {metaBits.join('  ·  ')}
            </Text>
          ) : null}

          {resume ? (
            <View style={{ gap: 4, marginTop: tokens.spacing.xs }}>
              <View
                style={{
                  height: 4,
                  borderRadius: tokens.radius.full,
                  backgroundColor: withAlpha(ink, 0.25),
                  overflow: 'hidden',
                }}
              >
                <View style={{ width: `${pct}%`, height: '100%', backgroundColor: accent, borderRadius: tokens.radius.full }} />
              </View>
              <Text style={{ color: withAlpha(ink, 0.82), fontSize: tokens.typography.scale.xs }}>{pct}% complete</Text>
            </View>
          ) : null}

          {locked ? (
            <Text style={{ color: ink, fontSize: tokens.typography.scale.sm, fontWeight: '700', marginTop: tokens.spacing.xs }}>
              🔒 Unlock with a membership
            </Text>
          ) : null}
        </View>
      </View>
    </Animated.View>
  );
}

const fill = { position: 'absolute', top: 0, left: 0, right: 0, bottom: 0 } as const;

function cap(s: string): string {
  return s.length === 0 ? s : s.charAt(0).toUpperCase() + s.slice(1);
}
