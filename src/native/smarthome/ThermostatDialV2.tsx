import * as React from 'react';
import { Pressable, Text, View } from 'react-native';
import Svg, { Circle, Defs, G, LinearGradient, Path, Stop } from 'react-native-svg';
import { useXenitionTheme, type SemanticColors } from '../theme';
import { Icon } from '../primitives';
import type { ThermostatDialProps, ThermostatMode } from './ThermostatDial';

/** Alternate design (V2) — identical prop contract to {@link ThermostatDialProps}. */
export type ThermostatDialV2Props = ThermostatDialProps;

const MODE_ACCENT: Record<ThermostatMode, keyof SemanticColors> = {
  heat: 'danger',
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
 * ThermostatDial — alternate design **V2**: a large circular SVG dial whose
 * value arc is painted with a cool→warm **temperature gradient** (a token-stop
 * `LinearGradient`: `primary`→`accent`→`danger`) instead of a single accent, so
 * the fill reads as a heat scale at a glance. The setpoint sits large in the
 * center over an optional ambient reading and a text mode label (never color
 * alone), and framing `−`/`+` `Pressable`s step the target within `[min,max]`.
 * Drop-in replacement for `ThermostatDial` — same props. The `span` is guarded
 * against divide-by-zero and `offline` dims + disables the dial.
 */
export function ThermostatDialV2({
  target,
  ambient,
  min = 10,
  max = 30,
  step = 0.5,
  mode = 'heat',
  unit = '°',
  size = 240,
  onTargetChange,
  offline = false,
  style,
}: ThermostatDialV2Props): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();
  const accent = offline ? 'muted' : MODE_ACCENT[mode];

  const thickness = Math.max(12, Math.round(size * 0.08));
  const cx = size / 2;
  const cy = size / 2;
  const r = size / 2 - thickness / 2;

  const startA = (135 * Math.PI) / 180;
  const sweep = (270 * Math.PI) / 180;
  const span = Math.max(max - min, 1);
  const clampedTarget = Math.min(Math.max(target, min), max);
  const frac = (clampedTarget - min) / span;
  const endA = startA + frac * sweep;

  const trackStart = polar(cx, cy, r, startA);
  const trackEnd = polar(cx, cy, r, startA + sweep);
  const valEnd = polar(cx, cy, r, endA);
  const largeVal = endA - startA > Math.PI ? 1 : 0;

  const gradientId = React.useId();

  const bump = (dir: 1 | -1): void => {
    if (offline || !onTargetChange) return;
    const next = Math.min(Math.max(clampedTarget + dir * step, min), max);
    onTargetChange(next);
  };

  const stepBtn = (dir: 1 | -1, glyph: string, label: string): React.ReactElement => (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={label}
      disabled={offline}
      onPress={() => bump(dir)}
      style={({ pressed }) => ({
        width: 52,
        height: 52,
        borderRadius: tokens.radius.full,
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 1,
        borderColor: colors.border,
        backgroundColor: colors.surface,
        opacity: offline ? 0.5 : pressed ? 0.8 : 1,
      })}
    >
      <Icon glyph={glyph} color="onSurface" size="2xl" />
    </Pressable>
  );

  return (
    <View
      accessibilityRole="adjustable"
      accessibilityLabel={`Thermostat, ${MODE_LABEL[mode]}`}
      style={[{ alignItems: 'center', opacity: offline ? 0.6 : 1 }, style]}
    >
      <View style={{ width: size, height: size, alignItems: 'center', justifyContent: 'center' }}>
        <Svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
          <Defs>
            <LinearGradient id={gradientId} x1="0" y1="1" x2="1" y2="0">
              <Stop offset="0" stopColor={offline ? colors.muted : colors.primary} />
              <Stop offset="0.5" stopColor={offline ? colors.muted : colors.accent} />
              <Stop offset="1" stopColor={offline ? colors.muted : colors.danger} />
            </LinearGradient>
          </Defs>
          <G>
            <Path
              d={`M ${trackStart.x} ${trackStart.y} A ${r} ${r} 0 1 1 ${trackEnd.x} ${trackEnd.y}`}
              fill="none"
              stroke={colors.border}
              strokeWidth={thickness}
              strokeLinecap="round"
            />
            <Path
              d={`M ${trackStart.x} ${trackStart.y} A ${r} ${r} 0 ${largeVal} 1 ${valEnd.x} ${valEnd.y}`}
              fill="none"
              stroke={`url(#${gradientId})`}
              strokeWidth={thickness}
              strokeLinecap="round"
            />
            <Circle cx={valEnd.x} cy={valEnd.y} r={thickness / 2 - 1} fill={colors[accent]} />
          </G>
        </Svg>
        <View style={{ position: 'absolute', alignItems: 'center' }}>
          <Text
            style={{
              color: colors.onSurface,
              fontSize: tokens.typography.scale['3xl'],
              fontFamily: tokens.typography.fontHeading,
              fontWeight: '700',
            }}
          >
            {clampedTarget}
            {unit}
          </Text>
          {ambient != null ? (
            <Text style={{ color: colors.muted, fontSize: tokens.typography.scale.sm }}>
              {`Now ${ambient}${unit}`}
            </Text>
          ) : null}
          <Text style={{ color: colors[accent], fontSize: tokens.typography.scale.xs, fontWeight: '600', marginTop: 2 }}>
            {offline ? 'Offline' : MODE_LABEL[mode]}
          </Text>
        </View>
      </View>

      <View style={{ flexDirection: 'row', gap: tokens.spacing.xl, marginTop: tokens.spacing.md }}>
        {stepBtn(-1, '−', 'Lower target temperature')}
        {stepBtn(1, '+', 'Raise target temperature')}
      </View>
    </View>
  );
}
