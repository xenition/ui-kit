import * as React from 'react';
import { Pressable, Text, View, type StyleProp, type ViewStyle } from 'react-native';
import { Icon, useXenitionTheme } from '../primitives';
import { MediaFigure } from '../media';
import type { MediaItem } from '../media';
import { GradientSurface } from './internal/GradientSurface';
import { spotlightGlow, spotlightInk, spotlightInkSoft, spotlightTile, spotlightBorder } from './internal/spotlight';

/**
 * Props for {@link AlbumHeader} — the gradient album / playlist hero (native).
 * Presentational shell only: shaped display data + CTA callbacks; nothing
 * fetches a catalog or a playback engine.
 */
export interface AlbumHeaderProps {
  /** Album / playlist title, set large in near-white ink over the gradient. */
  title: string;
  /** Secondary line — artist, curator, or owner. */
  subtitle?: string;
  /** Cover artwork URL; falls back to a glyph placeholder when absent. */
  artworkUrl?: string;
  /** Metadata facts (e.g. `["2024", "12 songs", "48 min"]`) rendered as frosted chips. */
  meta?: readonly string[];
  /** Fires when the primary Play CTA is pressed; the pill is hidden when unset. */
  onPlay?: () => void;
  /** Fires when the Shuffle CTA is pressed; the ghost button is hidden when unset. */
  onShuffle?: () => void;
  style?: StyleProp<ViewStyle>;
}

/**
 * AlbumHeader — the **V4 "spotlight"** gradient hero for an album / playlist
 * (native). The cover sits on a two-hue brand glow (accent → primary) beside a
 * big near-white title, an optional subtitle, `meta` facts as frosted chips, and
 * Play (a near-white pill) + Shuffle (a ghost button) CTAs. Token-only colors via
 * `useXenitionTheme()` + `spotlight*(tokens.ramps)` on `GradientSurface` — no
 * literals; dark-mode safe.
 */
export function AlbumHeader({
  title,
  subtitle,
  artworkUrl,
  meta,
  onPlay,
  onShuffle,
  style,
}: AlbumHeaderProps): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();
  const r = tokens.ramps;
  const ink = spotlightInk(r);
  const inkSoft = spotlightInkSoft(r);
  const tile = spotlightTile(r);
  const border = spotlightBorder(r);

  const artItem: MediaItem = {
    url: artworkUrl ?? '',
    alt: subtitle ? `${title} — ${subtitle}` : title,
    width: 1,
    height: 1,
  };

  return (
    <View style={[{ borderRadius: tokens.radius.lg }, style]}>
      <GradientSurface
        colors={spotlightGlow(r)}
        style={{
          borderRadius: tokens.radius.lg,
          padding: tokens.spacing.xl,
          gap: tokens.spacing.lg,
          overflow: 'hidden',
        }}
      >
        {/* Cover on the gradient. */}
        <View
          style={{
            alignSelf: 'center',
            width: '52%',
            padding: tokens.spacing.xs,
            borderRadius: tokens.radius.lg,
            backgroundColor: tile,
            borderWidth: 1,
            borderColor: border,
            overflow: 'hidden',
          }}
        >
          {artworkUrl ? (
            <View style={{ width: '100%', borderRadius: tokens.radius.md, overflow: 'hidden' }}>
              <MediaFigure item={artItem} reserveAspect />
            </View>
          ) : (
            <View style={{ width: '100%', aspectRatio: 1, alignItems: 'center', justifyContent: 'center' }}>
              <Text style={{ color: ink, fontSize: tokens.typography.scale['3xl'] }}>♪</Text>
            </View>
          )}
        </View>

        {/* Title + subtitle. */}
        <View style={{ gap: tokens.spacing.xs, alignItems: 'center' }}>
          <Text numberOfLines={2} style={{ color: ink, fontSize: tokens.typography.scale.xl * 1.15, fontWeight: '800', textAlign: 'center' }}>
            {title}
          </Text>
          {subtitle ? (
            <Text numberOfLines={1} style={{ color: inkSoft, fontSize: tokens.typography.scale.base, fontWeight: '600' }}>
              {subtitle}
            </Text>
          ) : null}
        </View>

        {/* Meta facts as frosted chips. */}
        {meta && meta.length > 0 ? (
          <View style={{ flexDirection: 'row', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'center', gap: tokens.spacing.sm }}>
            {meta.map((fact, i) => (
              <View
                key={i}
                style={{
                  paddingHorizontal: tokens.spacing.md,
                  paddingVertical: tokens.spacing.xs,
                  borderRadius: tokens.radius.full,
                  backgroundColor: tile,
                  borderWidth: 1,
                  borderColor: border,
                }}
              >
                <Text style={{ color: inkSoft, fontSize: tokens.typography.scale.sm, fontWeight: '600' }}>{fact}</Text>
              </View>
            ))}
          </View>
        ) : null}

        {/* Play + Shuffle CTAs. */}
        {onPlay || onShuffle ? (
          <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: tokens.spacing.sm }}>
            {onPlay ? (
              <Pressable
                accessibilityRole="button"
                accessibilityLabel="Play"
                onPress={onPlay}
                style={({ pressed }) => ({
                  minHeight: 44,
                  flexDirection: 'row',
                  alignItems: 'center',
                  gap: tokens.spacing.xs,
                  paddingHorizontal: tokens.spacing.xl,
                  paddingVertical: tokens.spacing.sm,
                  borderRadius: tokens.radius.full,
                  backgroundColor: ink,
                  opacity: pressed ? 0.9 : 1,
                })}
              >
                <Icon glyph="▶" size="base" color="primary" />
                <Text style={{ color: colors.primary, fontSize: tokens.typography.scale.base, fontWeight: '800' }}>Play</Text>
              </Pressable>
            ) : null}
            {onShuffle ? (
              <Pressable
                accessibilityRole="button"
                accessibilityLabel="Shuffle"
                onPress={onShuffle}
                style={({ pressed }) => ({
                  minHeight: 44,
                  flexDirection: 'row',
                  alignItems: 'center',
                  gap: tokens.spacing.xs,
                  paddingHorizontal: tokens.spacing.lg,
                  paddingVertical: tokens.spacing.sm,
                  borderRadius: tokens.radius.full,
                  backgroundColor: tile,
                  borderWidth: 1,
                  borderColor: border,
                  opacity: pressed ? 0.8 : 1,
                })}
              >
                <Icon glyph="🔀" size="base" color="onPrimary" />
                <Text style={{ color: ink, fontSize: tokens.typography.scale.base, fontWeight: '700' }}>Shuffle</Text>
              </Pressable>
            ) : null}
          </View>
        ) : null}
      </GradientSurface>
    </View>
  );
}
