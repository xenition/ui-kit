import * as React from 'react';
import { Pressable, Text, View } from 'react-native';
import { useXenitionTheme } from '../theme';
import { Icon } from '../primitives/Icon';
import { clamp, withAlpha } from './weather-utils';
import { GradientSurface } from './internal/GradientSurface';
import { skyGradient, skyInk, skyInkSoft, skyTile } from './internal/v4-sky';
import type { RadarCardProps } from './RadarCard';

/** Drop-in for {@link RadarCardProps} — same props, a different design. */
export type RadarCardV4Props = RadarCardProps;

/**
 * RadarCard — **sky scope** design (v4). A dependency-free radar placeholder that
 * actually looks like a scope: a gradient sky canvas with concentric range rings,
 * a crosshair, a rotated sweep beam, a couple of translucent "precip" returns, and
 * a pinging center marker — all built from `View`s (no maps SDK, no SVG, no image).
 * A header carries the title and a "live" pill. Optional `onPress` opens a full
 * view. Gradient stops, rings and ink derive from the brand ramp; returns use the
 * `accent`/`warn` tokens — no literal colors. Same props as {@link RadarCardProps}.
 */
export function RadarCardV4({
  title = 'Radar',
  caption,
  height = 200,
  onPress,
  placeholderLabel = 'Radar preview',
  style,
}: RadarCardV4Props): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();
  const r = tokens.ramps;
  const ink = skyInk(r);
  const inkSoft = skyInkSoft(r);
  const canvas = clamp(height, 120, 480);
  const rings = [1, 0.68, 0.36];

  const card = {
    backgroundColor: colors.card,
    borderRadius: tokens.radius.lg,
    padding: tokens.spacing.md,
    shadowColor: colors.onSurface,
    shadowOpacity: 0.12,
    shadowRadius: 14,
    shadowOffset: { width: 0, height: 6 },
    elevation: 3,
  } as const;

  const Scope = (
    <GradientSurface
      colors={skyGradient(r)}
      style={{
        height: canvas,
        borderRadius: tokens.radius.md,
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
      }}
    >
      {/* Concentric range rings. */}
      {rings.map((scale, i) => {
        const dim = canvas * 0.86 * scale;
        return (
          <View
            key={i}
            pointerEvents="none"
            style={{
              position: 'absolute',
              width: dim,
              height: dim,
              borderRadius: dim / 2,
              borderWidth: 1,
              borderColor: skyTile(r, 0.4),
            }}
          />
        );
      })}
      {/* Crosshair. */}
      <View pointerEvents="none" style={{ position: 'absolute', width: '86%', height: 1, backgroundColor: skyTile(r, 0.35) }} />
      <View pointerEvents="none" style={{ position: 'absolute', width: 1, height: '86%', backgroundColor: skyTile(r, 0.35) }} />
      {/* Sweep beam. */}
      <View
        pointerEvents="none"
        style={{
          position: 'absolute',
          width: canvas * 0.42,
          height: 2,
          left: '50%',
          top: '50%',
          backgroundColor: withAlpha(ink, 0.55),
          transform: [{ translateX: 0 }, { rotate: '-35deg' }],
          transformOrigin: 'left center',
        }}
      />
      {/* Translucent precip returns. */}
      <View pointerEvents="none" style={{ position: 'absolute', top: canvas * 0.24, left: canvas * 0.3, width: canvas * 0.2, height: canvas * 0.2, borderRadius: canvas * 0.1, backgroundColor: withAlpha(colors.accent, 0.5) }} />
      <View pointerEvents="none" style={{ position: 'absolute', bottom: canvas * 0.22, right: canvas * 0.26, width: canvas * 0.14, height: canvas * 0.14, borderRadius: canvas * 0.07, backgroundColor: withAlpha(colors.warn, 0.5) }} />
      {/* Center ping. */}
      <View pointerEvents="none" style={{ position: 'absolute', width: 22, height: 22, borderRadius: 11, borderWidth: 1, borderColor: withAlpha(colors.accent, 0.7) }} />
      <View pointerEvents="none" style={{ position: 'absolute', width: 8, height: 8, borderRadius: 4, backgroundColor: colors.accent }} />
      {/* Label pill. */}
      <View style={{ position: 'absolute', bottom: tokens.spacing.sm, alignSelf: 'center', flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.xs, paddingHorizontal: tokens.spacing.md, paddingVertical: tokens.spacing.xs, borderRadius: tokens.radius.full, backgroundColor: skyTile(r, 0.22) }}>
        <Icon glyph="📡" size="sm" accessibilityLabel="Radar" style={{ color: ink }} />
        <Text style={{ color: ink, fontSize: tokens.typography.scale.sm, fontWeight: '600' }}>{placeholderLabel}</Text>
      </View>
    </GradientSurface>
  );

  return (
    <View style={[card, style]} accessibilityRole="summary" accessibilityLabel={`${title}${caption ? `, ${caption}` : ''}, ${placeholderLabel}`}>
      <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: tokens.spacing.sm, paddingHorizontal: tokens.spacing.xs }}>
        <Text style={{ color: colors.onSurface, fontSize: tokens.typography.scale.lg, fontWeight: '700' }}>{title}</Text>
        {caption ? (
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.xs, paddingHorizontal: tokens.spacing.sm, paddingVertical: 2, borderRadius: tokens.radius.full, backgroundColor: withAlpha(colors.accent, 0.14) }}>
            <View style={{ width: 6, height: 6, borderRadius: 3, backgroundColor: colors.accent }} />
            <Text style={{ color: colors.accentText, fontSize: tokens.typography.scale.xs, fontWeight: '600' }}>{caption}</Text>
          </View>
        ) : null}
      </View>

      {onPress ? (
        <Pressable accessibilityRole="button" accessibilityLabel="Open radar" onPress={onPress} style={({ pressed }) => ({ opacity: pressed ? 0.9 : 1 })}>
          {Scope}
        </Pressable>
      ) : (
        Scope
      )}
    </View>
  );
}
