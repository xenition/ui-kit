import * as React from 'react';
import { Text, View } from 'react-native';
import { useXenitionTheme } from '../theme';
import { Card, Icon, Switch, Slider } from '../primitives';
import { withAlpha } from '../primitives/internal/color';
import type { LightControlProps } from './LightControl';

/** Drop-in for {@link LightControlProps} — same props, the V4 "ambient" design. */
export type LightControlV4Props = LightControlProps;

/**
 * LightControl — **V4** "ambient" design. The control-panel take on a light: when
 * the bulb is lit the whole card glows — a soft warm-tinted wash
 * (`withAlpha(warn, 0.08)`), a `warn` border, and a glowing bulb disc; off/`offline`
 * stay calm on `card`. A big legible brightness {@link Slider} and an optional
 * warm→cool color-temperature row keep the base controls; a text
 * `On`/`Off`/`Offline` label carries the state so it never rests on color alone.
 * Sliders disable when off or `offline`. Guards keep the brightness readout in
 * `[0,100]`. Same props/behavior as {@link LightControlProps}; token-only colors
 * via `useXenitionTheme()` (+ `withAlpha`).
 */
export function LightControlV4({
  name,
  on = false,
  brightness = 0,
  colorTemp,
  offline = false,
  onToggle,
  onBrightnessChange,
  onColorTempChange,
  style,
}: LightControlV4Props): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();
  const disabled = offline || !on;
  const lit = on && !offline;
  const shownBrightness = Math.round(Math.min(Math.max(brightness, 0), 100));
  const statusLabel = offline ? 'Offline' : on ? 'On' : 'Off';

  // Token-derived warm / cool endpoints for the color-temp hint (ramps, not hex).
  const warmTint = tokens.ramps.accent[300];
  const coolTint = tokens.ramps.accent[600];

  const shell = {
    borderRadius: tokens.radius.lg,
    borderWidth: 1,
    padding: tokens.spacing.lg,
    backgroundColor: lit ? withAlpha(colors.warn, 0.08) : colors.card,
    borderColor: lit ? withAlpha(colors.warn, 0.5) : colors.border,
    ...(lit
      ? { shadowColor: colors.warn, shadowOpacity: 0.18, shadowRadius: 12, shadowOffset: { width: 0, height: 4 }, elevation: 3 }
      : {}),
  } as const;

  return (
    <Card variant="flat" style={[shell, { opacity: offline ? 0.7 : 1 }, style]}>
      <View style={{ flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.sm }}>
        {/* Glowing bulb disc — the ambient signature. */}
        <View
          style={{
            width: 44,
            height: 44,
            borderRadius: tokens.radius.md,
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: lit ? withAlpha(colors.warn, 0.15) : withAlpha(colors.onSurface, 0.05),
            borderWidth: 1,
            borderColor: lit ? withAlpha(colors.warn, 0.4) : colors.border,
          }}
        >
          <Icon glyph="💡" color={lit ? 'warn' : 'muted'} size="lg" />
        </View>
        <View style={{ flex: 1 }}>
          <Text numberOfLines={1} style={{ color: colors.onSurface, fontSize: tokens.typography.scale.base, fontWeight: '700' }}>
            {name}
          </Text>
          <Text style={{ color: colors.muted, fontSize: tokens.typography.scale.xs }}>{statusLabel}</Text>
        </View>
        <Switch checked={on} disabled={offline} onCheckedChange={onToggle} accessibilityLabel={`${name} power`} />
      </View>

      <View style={{ marginTop: tokens.spacing.md, gap: tokens.spacing.xs }}>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
          <Text style={{ color: colors.muted, fontSize: tokens.typography.scale.xs }}>Brightness</Text>
          <Text style={{ color: colors.onSurface, fontSize: tokens.typography.scale.xs, fontWeight: '600' }}>
            {shownBrightness}%
          </Text>
        </View>
        <Slider value={shownBrightness} min={0} max={100} step={1} disabled={disabled} onValueChange={onBrightnessChange} />
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
    </Card>
  );
}
