import * as React from 'react';
import { Text, View, type StyleProp, type ViewStyle } from 'react-native';
import { useXenitionTheme } from '../theme';
import { Icon } from '../primitives/Icon';
import { GradientSurface } from './internal/GradientSurface';
import { withAlpha } from '../primitives/internal/color';
import { calmGradient, calmInk } from './internal/calm';

export interface AchievementBadgeProps {
  /** Achievement name. */
  title: string;
  /** A short line describing how it's earned. */
  description?: string;
  /** Glyph shown on the earned medallion. Default `'🏅'`. */
  glyph?: string;
  /** Whether the badge has been unlocked. */
  earned?: boolean;
  /** Progress toward earning (0–1); shown as a caption on the locked medallion. */
  progress?: number;
  style?: StyleProp<ViewStyle>;
}

/**
 * AchievementBadge — a medallion on a calm, clean surface card. When earned, the
 * medallion is a vivid brand gradient with the achievement glyph; when locked it
 * falls back to a muted neutral disc with a lock and an optional progress caption.
 * The earned/locked state is carried by the label and the glyph, not by color
 * alone. Color derives entirely from the ramp, so it adapts light + dark and
 * restyles from the seed — the reward gradient earns its saturation only once the
 * badge is unlocked.
 */
export function AchievementBadge({
  title,
  description,
  glyph = '🏅',
  earned = false,
  progress,
  style,
}: AchievementBadgeProps): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();
  const r = tokens.ramps;
  const pctLabel = progress != null ? `${Math.round(Math.max(0, Math.min(1, progress)) * 100)}%` : null;
  const a11y = `${title}, ${earned ? 'earned' : 'locked'}${
    !earned && pctLabel ? ', ' + pctLabel + ' complete' : ''
  }${description ? '. ' + description : ''}`;

  return (
    <View
      accessible
      accessibilityRole="image"
      accessibilityLabel={a11y}
      style={[
        {
          backgroundColor: colors.surface,
          borderColor: colors.border,
          borderWidth: 1,
          borderRadius: tokens.radius.lg,
          padding: tokens.spacing.lg,
          alignItems: 'center',
          gap: tokens.spacing.sm,
        },
        style,
      ]}
    >
      {earned ? (
        <GradientSurface
          colors={calmGradient(r)}
          style={{
            width: 72,
            height: 72,
            borderRadius: tokens.radius.full,
            alignItems: 'center',
            justifyContent: 'center',
            overflow: 'hidden',
          }}
        >
          <Icon glyph={glyph} size={tokens.typography.scale['2xl']} style={{ color: calmInk(r) }} />
        </GradientSurface>
      ) : (
        <View
          style={{
            width: 72,
            height: 72,
            borderRadius: tokens.radius.full,
            alignItems: 'center',
            justifyContent: 'center',
            gap: 2,
            backgroundColor: withAlpha(colors.onSurface, 0.08),
          }}
        >
          <Icon glyph="🔒" size={tokens.typography.scale.xl} style={{ color: colors.mutedText, opacity: 0.7 }} />
          {pctLabel ? (
            <Text style={{ color: colors.mutedText, fontSize: tokens.typography.scale.xs, fontWeight: '700' }}>
              {pctLabel}
            </Text>
          ) : null}
        </View>
      )}

      <View style={{ alignItems: 'center', gap: 2 }}>
        <Text
          style={{
            color: colors.onSurface,
            fontSize: tokens.typography.scale.base,
            fontWeight: '700',
            textAlign: 'center',
            opacity: earned ? 1 : 0.7,
          }}
        >
          {title}
        </Text>
        {description ? (
          <Text style={{ color: colors.mutedText, fontSize: tokens.typography.scale.sm, textAlign: 'center' }}>
            {description}
          </Text>
        ) : null}
      </View>
    </View>
  );
}
