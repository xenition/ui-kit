import * as React from 'react';
import { Image, Pressable, Text, View, type StyleProp, type ViewStyle } from 'react-native';
import { useXenitionTheme } from '../primitives';
import { GradientSurface } from './internal/GradientSurface';
import {
  broadcastGradient,
  broadcastInk,
  broadcastInkSoft,
  broadcastTile,
  broadcastBorder,
} from './internal/broadcast';

/** One `{ label, value }` stat rendered as a frosted tile on the gradient. */
export interface PlayerStat {
  /** Short caption under the value (e.g. `Goals`). */
  label: string;
  /** The stat value, pre-formatted by the caller (e.g. `24`, `1.4k`). */
  value: string;
}

/** A gradient player hero: crest/photo, jersey number, name, and frosted stat tiles. */
export interface PlayerProfileHeaderProps {
  /** Player display name (the near-white headline). */
  name: string;
  /** Playing position (e.g. `Forward`). */
  position?: string;
  /** Club / national side the player belongs to. */
  team?: string;
  /** Jersey number, rendered large in near-white ink. */
  number?: number;
  /** Photo/avatar URL. When present it fills the avatar; otherwise `crest` is shown. */
  photoUrl?: string;
  /** Crest/emoji glyph shown in the avatar when no `photoUrl` is given. */
  crest?: string;
  /** Career/season stats, rendered as frosted tiles (`broadcastTile`). */
  stats: readonly PlayerStat[];
  /** Fires on the follow toggle; the CTA only renders when set. */
  onFollow?: () => void;
  /** Whether the viewer already follows this player (drives the CTA label/state). */
  following?: boolean;
  style?: StyleProp<ViewStyle>;
}

/**
 * PlayerProfileHeader — a **gradient player hero**. A brand-gradient ground with
 * the player's crest/photo avatar and big jersey number up top, the near-white
 * name + position · team beneath, an optional follow CTA, and a row of frosted
 * stat tiles (`broadcastTile` + `broadcastBorder`) along the bottom.
 * Presentational only: shaped `stats` plus an optional `onFollow`; nothing
 * fetches. Token-only colors via `useXenitionTheme()` + `broadcast*(tokens.ramps)`
 * — no literals, dark-safe.
 */
export function PlayerProfileHeader({
  name,
  position,
  team,
  number,
  photoUrl,
  crest,
  stats,
  onFollow,
  following = false,
  style,
}: PlayerProfileHeaderProps): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();
  const r = tokens.ramps;
  const ink = broadcastInk(r);
  const inkSoft = broadcastInkSoft(r);
  const subtitle = [position, team].filter(Boolean).join(' · ');

  return (
    <View style={[{ borderRadius: tokens.radius.lg }, style]}>
      <GradientSurface
        colors={broadcastGradient(r)}
        style={{ borderRadius: tokens.radius.lg, padding: tokens.spacing.lg, overflow: 'hidden' }}
      >
        <View style={{ flexDirection: 'row', alignItems: 'flex-start' }}>
          <View
            accessibilityRole="image"
            accessibilityLabel={`${name} avatar`}
            style={{
              width: 64,
              height: 64,
              borderRadius: tokens.radius.full,
              alignItems: 'center',
              justifyContent: 'center',
              overflow: 'hidden',
              backgroundColor: broadcastTile(r),
              borderWidth: 1,
              borderColor: broadcastBorder(r),
            }}
          >
            {photoUrl ? (
              <Image source={{ uri: photoUrl }} style={{ width: '100%', height: '100%' }} />
            ) : (
              <Text allowFontScaling={false} style={{ fontSize: tokens.typography.scale['2xl'] }}>
                {crest ?? '🧑'}
              </Text>
            )}
          </View>
          {number !== undefined ? (
            <Text
              allowFontScaling={false}
              accessibilityLabel={`Jersey number ${number}`}
              style={{
                marginLeft: 'auto',
                color: ink,
                fontSize: tokens.typography.scale['3xl'] * 1.3,
                fontWeight: '800',
                letterSpacing: -1,
              }}
            >
              {number}
            </Text>
          ) : null}
        </View>

        <Text
          numberOfLines={1}
          style={{ color: ink, fontSize: tokens.typography.scale['2xl'], fontWeight: '800', marginTop: tokens.spacing.md }}
        >
          {name}
        </Text>
        {subtitle ? (
          <Text numberOfLines={1} style={{ color: inkSoft, fontSize: tokens.typography.scale.sm, fontWeight: '600', marginTop: 2 }}>
            {subtitle}
          </Text>
        ) : null}

        {onFollow ? (
          <Pressable
            accessibilityRole="button"
            accessibilityLabel={following ? `Unfollow ${name}` : `Follow ${name}`}
            accessibilityState={{ selected: following }}
            onPress={onFollow}
            style={({ pressed }) => ({
              alignSelf: 'flex-start',
              minHeight: 44,
              justifyContent: 'center',
              paddingHorizontal: tokens.spacing.lg,
              borderRadius: tokens.radius.full,
              marginTop: tokens.spacing.md,
              backgroundColor: following ? broadcastTile(r) : ink,
              borderWidth: following ? 1 : 0,
              borderColor: broadcastBorder(r),
              opacity: pressed ? 0.9 : 1,
            })}
          >
            <Text
              style={{
                color: following ? ink : colors.primary,
                fontSize: tokens.typography.scale.sm,
                fontWeight: '800',
              }}
            >
              {following ? 'Following' : 'Follow'}
            </Text>
          </Pressable>
        ) : null}

        {stats.length > 0 ? (
          <View style={{ flexDirection: 'row', gap: tokens.spacing.sm, marginTop: tokens.spacing.lg }}>
            {stats.map((s, i) => (
              <View
                key={`${s.label}-${i}`}
                style={{
                  flex: 1,
                  alignItems: 'center',
                  gap: 2,
                  paddingVertical: tokens.spacing.md,
                  paddingHorizontal: tokens.spacing.sm,
                  borderRadius: tokens.radius.md,
                  backgroundColor: broadcastTile(r),
                  borderWidth: 1,
                  borderColor: broadcastBorder(r),
                }}
              >
                <Text allowFontScaling={false} style={{ color: ink, fontSize: tokens.typography.scale.lg, fontWeight: '800' }}>
                  {s.value}
                </Text>
                <Text numberOfLines={1} style={{ color: inkSoft, fontSize: tokens.typography.scale.xs, fontWeight: '600' }}>
                  {s.label}
                </Text>
              </View>
            ))}
          </View>
        ) : null}
      </GradientSurface>
    </View>
  );
}
