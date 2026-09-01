import * as React from 'react';
import { Pressable, Text, View } from 'react-native';
import Svg, { Circle, G, Path } from 'react-native-svg';
import { useXenitionTheme, type SemanticColors } from '../theme';
import { Icon } from '../primitives';
import { withAlpha } from '../primitives/internal/color';
import type { ThermostatDialProps, ThermostatMode } from './ThermostatDial';

/** Drop-in for {@link ThermostatDialProps} — same props, the V4 "ambient" design. */
export type ThermostatDialV4Props = ThermostatDialProps;

const MODE_ACCENT: Record<ThermostatMode, keyof SemanticColors> = {
  heat: 'warn',
  cool: 'primary',
  auto: 'accent',
  off: 'muted',
};

const MODE_LABEL: Record<ThermostatMode, string> = {
  heat: 'Heating',
  cool: 'Cooling',
  auto: 'Auto',
  off: 'Off',
};

function polar(cx: number, cy: number, r: number, angle: number): { x: number; y: number } {
  return { x: cx + r * Math.cos(angle), y: cy + r * Math.sin(angle) };
}

/**
 * ThermostatDial — **V4** "ambient" design. A calm climate dial: the big target
 * numeral sits centered over an optional ambient reading inside a token-bound SVG
 * dial (drawn with the `react-native-svg` peer). A 270° track (`border`) carries a
 * value arc filled in the mode accent (`heat`→warn, `cool`→primary, `auto`→accent,
 * `off`→muted); when running, the dial disc lights with a soft accent wash so the
 * active mode glows. Framing `+`/`−` `Pressable`s step the target within
 * `[min,max]`, and a text label announces the mode (never color alone).
 * `max`/`min` guard the fraction math against divide-by-zero. `offline` dims the
 * dial and blocks changes. Same props/behavior as {@link ThermostatDialProps};
 * token-only colors via `useXenitionTheme()` (+ `withAlpha`).
 */
export function ThermostatDialV4({
  target,
  ambient,
  min = 10,
  max = 30,
  step = 0.5,
  mode = 'heat',
  unit = '°',
  size = 200,
  onTargetChange,
  offline = false,
  style,
}: ThermostatDialV4Props): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();
  const accent = offline ? 'muted' : MODE_ACCENT[mode];
  const accentColor = colors[accent];
  const glowing = !offline && mode !== 'off';

  const thickness = Math.max(8, Math.round(size * 0.06));
  const cx = size / 2;
  const cy = size / 2;
  const r = size / 2 - thickness / 2;

  // 270° sweep centered at the bottom: from 135° round to 405° (=45°).
  const startA = (135 * Math.PI) / 180;
  const sweep = (270 * Math.PI) / 180;
  const span = Math.max(max - min, 1);
  const clampedTarget = Math.min(Math.max(target, min), max);
  const frac = (clampedTarget - min) / span;
  const endA = startA + frac * sweep;

  const trackStart = polar(cx, cy, r, startA);
  const trackEnd = polar(cx, cy, r, startA + sweep);
  const valEnd = polar(cx, cy, r, endA);
  const largeTrack = 1; // 270° always > 180°
  const largeVal = endA - startA > Math.PI ? 1 : 0;

  const bump = (dir: 1 | -1): void => {
    if (offline || !onTargetChange) return;
    const next = Math.min(Math.max(clampedTarget + dir * step, min), max);
    onTargetChange(next);
  };

  // Inset diameter for the glowing dial disc that sits inside the arc.
  const discSize = size - thickness * 2 - 8;

  return (
    <View accessibilityRole="adjustable" accessibilityLabel={`Thermostat, ${offline ? 'Offline' : MODE_LABEL[mode]}`} style={[{ alignItems: 'center', opacity: offline ? 0.6 : 1 }, style]}>
      <View style={{ width: size, height: size, alignItems: 'center', justifyContent: 'center' }}>
        {/* Glowing dial disc — the ambient signature; the active mode tints it. */}
        <View
          pointerEvents="none"
          style={{
            position: 'absolute',
            width: discSize,
            height: discSize,
            borderRadius: discSize / 2,
            backgroundColor: glowing ? withAlpha(accentColor, 0.08) : colors.surface,
            borderWidth: 1,
            borderColor: glowing ? withAlpha(accentColor, 0.4) : colors.border,
            ...(glowing
              ? { shadowColor: accentColor, shadowOpacity: 0.18, shadowRadius: 12, shadowOffset: { width: 0, height: 4 }, elevation: 3 }
              : {}),
          }}
        />
        <Svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
          <G>
            <Path
              d={`M ${trackStart.x} ${trackStart.y} A ${r} ${r} 0 ${largeTrack} 1 ${trackEnd.x} ${trackEnd.y}`}
              fill="none"
              stroke={colors.border}
              strokeWidth={thickness}
              strokeLinecap="round"
            />
            <Path
              d={`M ${trackStart.x} ${trackStart.y} A ${r} ${r} 0 ${largeVal} 1 ${valEnd.x} ${valEnd.y}`}
              fill="none"
              stroke={accentColor}
              strokeWidth={thickness}
              strokeLinecap="round"
            />
            <Circle cx={valEnd.x} cy={valEnd.y} r={thickness / 2} fill={accentColor} />
          </G>
        </Svg>
        <View style={{ position: 'absolute', alignItems: 'center' }}>
          <Text style={{ color: colors.onSurface, fontSize: tokens.typography.scale['3xl'], fontFamily: tokens.typography.fontHeading, fontWeight: '700' }}>
            {clampedTarget}
            {unit}
          </Text>
          {ambient != null ? (
            <Text style={{ color: colors.muted, fontSize: tokens.typography.scale.sm }}>
              {`Now ${ambient}${unit}`}
            </Text>
          ) : null}
          <Text style={{ color: accentColor, fontSize: tokens.typography.scale.xs, fontWeight: '600', marginTop: 2 }}>
            {offline ? 'Offline' : MODE_LABEL[mode]}
          </Text>
        </View>
      </View>

      <View style={{ flexDirection: 'row', gap: tokens.spacing.xl, marginTop: tokens.spacing.md }}>
        <Pressable
          accessibilityRole="button"
          accessibilityLabel="Lower target temperature"
          disabled={offline}
          onPress={() => bump(-1)}
          style={({ pressed }) => ({
            width: 44,
            height: 44,
            borderRadius: tokens.radius.full,
            alignItems: 'center',
            justifyContent: 'center',
            borderWidth: 1,
            borderColor: colors.border,
            backgroundColor: colors.surface,
            opacity: offline ? 0.5 : pressed ? 0.8 : 1,
          })}
        >
          <Icon glyph="−" color="onSurface" size="xl" />
        </Pressable>
        <Pressable
          accessibilityRole="button"
          accessibilityLabel="Raise target temperature"
          disabled={offline}
          onPress={() => bump(1)}
          style={({ pressed }) => ({
            width: 44,
            height: 44,
            borderRadius: tokens.radius.full,
            alignItems: 'center',
            justifyContent: 'center',
            borderWidth: 1,
            borderColor: colors.border,
            backgroundColor: colors.surface,
            opacity: offline ? 0.5 : pressed ? 0.8 : 1,
          })}
        >
          <Icon glyph="+" color="onSurface" size="xl" />
        </Pressable>
      </View>
    </View>
  );
}
