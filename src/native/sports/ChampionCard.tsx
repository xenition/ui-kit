import * as React from 'react';
import { Pressable, Text, View, type StyleProp, type ViewStyle } from 'react-native';
import { useXenitionTheme } from '../primitives';
import { GradientSurface } from './internal/GradientSurface';
import {
  broadcastTrophy,
  broadcastInk,
  broadcastInkSoft,
  broadcastTile,
  broadcastBorder,
} from './internal/broadcast';

/** A single celebratory stat (e.g. `{ label: 'Points', value: '89' }`). */
export interface ChampionStat {
  /** Short caption under the value (e.g. `Points`). */
  label: string;
  /** The stat value, pre-formatted by the caller (e.g. `89`). */
  value: string;
}

/** A trophy / champion celebration hero — the peak-end moment. Presentational only. */
export interface ChampionCardProps {
  /** Celebration headline (e.g. `Champions 2024`). */
  title: string;
  /** The winning team's name (the near-white hero line under the trophy). */
  team: string;
  /** Crest/emoji glyph for the team, shown beside the name. */
  crest?: string;
  /** Competition subtitle above the title (e.g. `Premier League`). */
  subtitle?: string;
  /** One optional headline stat rendered as a frosted tile (e.g. season points). */
  stat?: ChampionStat;
  /** Fires on the share action; the CTA only renders when set. */
  onShare?: () => void;
  style?: StyleProp<ViewStyle>;
}

/**
 * ChampionCard — the sports module's **peak-end trophy celebration**. A two-hue
 * accent→primary "trophy glow" gradient ground (`broadcastTrophy`) with a big 🏆
 * glyph, the optional competition subtitle, the celebration `title`, and the
 * winning `team` (crest + name) all in near-white ink, plus an optional frosted
 * stat tile and a share CTA. Presentational only: shaped data plus an optional
 * `onShare`; nothing fetches. Token-only colors via `useXenitionTheme()` +
 * `broadcast*(tokens.ramps)` — no literals, dark-safe.
 */
export function ChampionCard({
  title,
  team,
  crest,
  subtitle,
  stat,
  onShare,
  style,
}: ChampionCardProps): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();
  const r = tokens.ramps;
  const ink = broadcastInk(r);
  const inkSoft = broadcastInkSoft(r);
  const a11y = `${title}${subtitle ? `, ${subtitle}` : ''}, ${team}`;

  return (
    <View accessible accessibilityLabel={a11y} style={[{ borderRadius: tokens.radius.lg }, style]}>
      <GradientSurface
        colors={broadcastTrophy(r)}
        style={{
          borderRadius: tokens.radius.lg,
          padding: tokens.spacing.lg,
          overflow: 'hidden',
          alignItems: 'center',
        }}
      >
        <View
          accessibilityRole="image"
          accessibilityLabel="Trophy"
          style={{
            width: 80,
            height: 80,
            borderRadius: tokens.radius.full,
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: broadcastTile(r),
            borderWidth: 1,
            borderColor: broadcastBorder(r),
          }}
        >
          <Text allowFontScaling={false} style={{ fontSize: tokens.typography.scale['3xl'] }}>
            🏆
          </Text>
        </View>

        {subtitle ? (
          <Text
            style={{
              color: inkSoft,
              fontSize: tokens.typography.scale.xs,
              fontWeight: '800',
              letterSpacing: 0.5,
              marginTop: tokens.spacing.md,
            }}
          >
            {subtitle.toUpperCase()}
          </Text>
        ) : null}

        <Text style={{ color: ink, fontSize: tokens.typography.scale['2xl'], fontWeight: '800', marginTop: tokens.spacing.xs, textAlign: 'center' }}>
          {title}
        </Text>

        <View style={{ flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.sm, marginTop: tokens.spacing.xs }}>
          <Text allowFontScaling={false} style={{ fontSize: tokens.typography.scale.lg }}>
            {crest ?? '🛡'}
          </Text>
          <Text numberOfLines={1} style={{ color: ink, fontSize: tokens.typography.scale.lg, fontWeight: '700' }}>
            {team}
          </Text>
        </View>

        {stat ? (
          <View
            style={{
              minWidth: 128,
              alignItems: 'center',
              gap: 2,
              paddingVertical: tokens.spacing.md,
              paddingHorizontal: tokens.spacing.lg,
              borderRadius: tokens.radius.md,
              backgroundColor: broadcastTile(r),
              borderWidth: 1,
              borderColor: broadcastBorder(r),
              marginTop: tokens.spacing.lg,
            }}
          >
            <Text allowFontScaling={false} style={{ color: ink, fontSize: tokens.typography.scale['2xl'], fontWeight: '800' }}>
              {stat.value}
            </Text>
            <Text style={{ color: inkSoft, fontSize: tokens.typography.scale.xs, fontWeight: '600' }}>
              {stat.label}
            </Text>
          </View>
        ) : null}

        {onShare ? (
          <Pressable
            accessibilityRole="button"
            accessibilityLabel="Share"
            onPress={onShare}
            style={({ pressed }) => ({
              flexDirection: 'row',
              alignItems: 'center',
              gap: 6,
              minHeight: 44,
              justifyContent: 'center',
              paddingHorizontal: tokens.spacing.lg,
              borderRadius: tokens.radius.full,
              backgroundColor: ink,
              marginTop: tokens.spacing.lg,
              opacity: pressed ? 0.9 : 1,
            })}
          >
            <Text allowFontScaling={false} style={{ color: colors.primary, fontSize: tokens.typography.scale.sm }}>
              ↗
            </Text>
            <Text style={{ color: colors.primary, fontSize: tokens.typography.scale.sm, fontWeight: '800' }}>
              Share
            </Text>
          </Pressable>
        ) : null}
      </GradientSurface>
    </View>
  );
}
