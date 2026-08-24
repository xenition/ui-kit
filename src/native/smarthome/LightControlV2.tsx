import * as React from 'react';
import { Text, View } from 'react-native';
import Svg, { Circle, G } from 'react-native-svg';
import { useXenitionTheme } from '../theme';
import { Icon, Switch, Slider } from '../primitives';
import { withAlpha } from '../primitives/internal/color';
import type { LightControlProps } from './LightControl';

/** Alternate design (V2) — identical prop contract to {@link LightControlProps}. */
export type LightControlV2Props = LightControlProps;

/**
 * LightControl — alternate design **V2**: a card built around a circular
 * **brightness ring** (SVG). The ring fills to the current brightness in the
 * `warn` slot when lit (`muted` when off/offline) with the percentage large in
 * its center; below sits a warm→cool color-temp {@link Slider} (shown only when
 * `colorTemp` is provided). A header row keeps the bulb glyph, name, a text
 * `On`/`Off`/`Offline` status (never color-alone), and the power {@link Switch}.
 * Drop-in replacement for `LightControl` — same props. Ring circumference math is
 * guarded and brightness is clamped to `[0,100]`.
 */
export function LightControlV2({
  name,
  on = false,
  brightness = 0,
  colorTemp,
  offline = false,
  onToggle,
  onBrightnessChange,
  onColorTempChange,
  style,
}: LightControlV2Props): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();
  const lit = on && !offline;
  const disabled = offline || !on;
  const shownBrightness = Math.round(Math.min(Math.max(brightness, 0), 100));
  const statusLabel = offline ? 'Offline' : on ? 'On' : 'Off';
  const ringColor = lit ? colors.warn : colors.muted;

  const warmTint = tokens.ramps.accent[300];
  const coolTint = tokens.ramps.accent[600];

  const size = 132;
  const stroke = 12;
  const radius = size / 2 - stroke / 2;
  const circumference = Math.max(2 * Math.PI * radius, 1);
  const dash = (shownBrightness / 100) * circumference;

  return (
    <View
      style={[
        {
          borderRadius: tokens.radius.lg,
          padding: tokens.spacing.md,
          backgroundColor: colors.surface,
          borderWidth: 1,
          borderColor: lit ? withAlpha(colors.warn, 0.35) : colors.border,
          opacity: offline ? 0.7 : 1,
        },
        style,
      ]}
    >
      <View style={{ flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.sm }}>
        <View
          style={{
            width: 36,
            height: 36,
            borderRadius: tokens.radius.md,
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: lit ? withAlpha(colors.warn, 0.14) : colors.surface,
            borderWidth: 1,
            borderColor: lit ? colors.warn : colors.border,
          }}
        >
          <Icon glyph="💡" color={lit ? 'warn' : 'muted'} size="lg" />
        </View>
        <View style={{ flex: 1 }}>
          <Text numberOfLines={1} style={{ color: colors.onSurface, fontSize: tokens.typography.scale.base, fontWeight: '600' }}>
            {name}
          </Text>
          <Text style={{ color: colors.muted, fontSize: tokens.typography.scale.xs }}>{statusLabel}</Text>
        </View>
        <Switch checked={on} disabled={offline} onCheckedChange={onToggle} accessibilityLabel={`${name} power`} />
      </View>

      <View style={{ alignItems: 'center', marginTop: tokens.spacing.md }}>
        <View style={{ width: size, height: size, alignItems: 'center', justifyContent: 'center' }}>
          <Svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
            <G rotation={-90} originX={size / 2} originY={size / 2}>
              <Circle
                cx={size / 2}
                cy={size / 2}
                r={radius}
                fill="none"
                stroke={colors.border}
                strokeWidth={stroke}
              />
              <Circle
                cx={size / 2}
                cy={size / 2}
                r={radius}
                fill="none"
                stroke={ringColor}
                strokeWidth={stroke}
                strokeLinecap="round"
                strokeDasharray={`${dash} ${circumference}`}
              />
            </G>
          </Svg>
          <View style={{ position: 'absolute', alignItems: 'center' }}>
            <Text style={{ color: colors.onSurface, fontSize: tokens.typography.scale['2xl'], fontWeight: '700' }}>
              {`${shownBrightness}%`}
            </Text>
            <Text style={{ color: colors.muted, fontSize: tokens.typography.scale.xs }}>Brightness</Text>
          </View>
        </View>
        <Slider
          value={shownBrightness}
          min={0}
          max={100}
          step={1}
          disabled={disabled}
          onValueChange={onBrightnessChange}
          style={{ alignSelf: 'stretch', marginTop: tokens.spacing.sm }}
        />
      </View>

      {colorTemp != null ? (
        <View style={{ marginTop: tokens.spacing.md, gap: tokens.spacing.xs }}>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
            <Text style={{ color: warmTint, fontSize: tokens.typography.scale.xs, fontWeight: '600' }}>Warm</Text>
            <Text style={{ color: coolTint, fontSize: tokens.typography.scale.xs, fontWeight: '600' }}>Cool</Text>
          </View>
          <Slider value={Math.min(Math.max(colorTemp, 0), 100)} min={0} max={100} step={1} disabled={disabled} onValueChange={onColorTempChange} />
        </View>
      ) : null}
    </View>
  );
}
