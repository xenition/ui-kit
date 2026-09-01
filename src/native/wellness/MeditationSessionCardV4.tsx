import * as React from 'react';
import { Text, View, type StyleProp, type ViewStyle } from 'react-native';
import { useXenitionTheme, type SemanticColors } from '../theme';
import { Button, Skeleton } from '../primitives';
import { Icon } from '../primitives/Icon';
import { withAlpha } from '../primitives/internal/color';
import { GradientSurface } from './internal/GradientSurface';
import { calmGradient, calmInk } from './internal/calm';
import type { MeditationSessionCardProps, MeditationCategory } from './MeditationSessionCard';

export type MeditationSessionCardV4Props = MeditationSessionCardProps;

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
 * MeditationSessionCardV4 — the "calm" restyle of {@link MeditationSessionCard}.
 * Same props, defaults, labels, a11y and behavior; only the surface changes: a
 * clean neutral card whose one spot of color is a gradient cover tile carrying
 * the category glyph in near-white ink, and a slim gradient resume fill. The
 * Start/Resume CTA, locked note, and loading skeleton are preserved.
 */
export function MeditationSessionCardV4({
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
}: MeditationSessionCardV4Props): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();
  const r = tokens.ramps;
  const meta = CATEGORY_META[category] ?? CATEGORY_META.calm;

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
      <View style={{ flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.md }}>
        <GradientSurface
          colors={calmGradient(r)}
          style={{
            width: 56,
            height: 56,
            borderRadius: tokens.radius.md,
            alignItems: 'center',
            justifyContent: 'center',
            overflow: 'hidden',
          }}
        >
          <Icon glyph={meta.glyph} size={24} style={{ color: calmInk(r) }} />
        </GradientSurface>
        <View style={{ flex: 1, gap: 2 }}>
          <Text
            style={{
              color: colors.mutedText,
              fontSize: tokens.typography.scale.xs,
              fontWeight: '700',
              letterSpacing: 1,
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
        <Text numberOfLines={2} style={{ color: colors.mutedText, fontSize: tokens.typography.scale.sm }}>
          {description}
        </Text>
      ) : null}

      <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: tokens.spacing.lg }}>
        {durationMin != null ? <Meta label="Duration" value={`${durationMin} min`} /> : null}
        {level ? <Meta label="Level" value={cap(level)} /> : null}
        {instructor ? <Meta label="Teacher" value={instructor} /> : null}
      </View>

      {resume ? (
        <View style={{ gap: tokens.spacing.xs }}>
          <View
            style={{
              height: 6,
              borderRadius: tokens.radius.full,
              backgroundColor: withAlpha(colors.onSurface, 0.1),
              overflow: 'hidden',
            }}
          >
            <GradientSurface
              colors={calmGradient(r)}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={{ width: `${pct}%`, height: 6, borderRadius: tokens.radius.full }}
            />
          </View>
          <Text style={{ color: colors.mutedText, fontSize: tokens.typography.scale.xs }}>{pct}% complete</Text>
        </View>
      ) : null}

      {locked ? (
        <Text style={{ color: colors.mutedText, fontSize: tokens.typography.scale.sm, fontWeight: '600' }}>
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
      <Text style={{ color: colors.mutedText, fontSize: tokens.typography.scale.xs }}>{label}</Text>
      <Text style={{ color: colors.onSurface, fontSize: tokens.typography.scale.base, fontWeight: '600' }}>
        {value}
      </Text>
    </View>
  );
}

function cap(s: string): string {
  return s.length === 0 ? s : s.charAt(0).toUpperCase() + s.slice(1);
}
