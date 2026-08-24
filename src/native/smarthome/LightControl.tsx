import * as React from 'react';
import { Text, View, type StyleProp, type ViewStyle } from 'react-native';
import { useXenitionTheme } from '../theme';
import { Card, Icon, Switch, Slider } from '../primitives';

export interface LightControlProps {
  /** Light display name (e.g. "Kitchen Ceiling"). */
  name: string;
  /** Whether the light is on. Controls slider availability. */
  on?: boolean;
  /** Brightness 0–100. */
  brightness?: number;
  /** Color temperature 0–100 (0 = warm, 100 = cool). Omit to hide the row. */
  colorTemp?: number;
  /** Device is unreachable — disables all controls. */
  offline?: boolean;
  /** Fires with the requested on/off value. */
  onToggle?: (next: boolean) => void;
  /** Fires with the new brightness (0–100). */
  onBrightnessChange?: (value: number) => void;
  /** Fires with the new color temperature (0–100). */
  onColorTempChange?: (value: number) => void;
  style?: StyleProp<ViewStyle>;
}

/**
 * Light controller — an on/off {@link Switch} over brightness and (optional)
 * color-temperature {@link Slider}s. The tinted bulb glyph uses the `warn` slot
 * when lit and `muted` when dark (a text `On`/`Off`/`Offline` label carries the
 * state so it never rests on color alone). Sliders are disabled when the light is
 * off or `offline`, and a warm→cool hint sits under the color-temp track using
 * `tokens.ramps.accent` tints (token-derived, not literal hex). Guards keep the
 * brightness readout in `[0,100]`. No literal colors.
 */
export function LightControl({
  name,
  on = false,
  brightness = 0,
  colorTemp,
  offline = false,
  onToggle,
  onBrightnessChange,
  onColorTempChange,
  style,
}: LightControlProps): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();
  const disabled = offline || !on;
  const shownBrightness = Math.round(Math.min(Math.max(brightness, 0), 100));
  const statusLabel = offline ? 'Offline' : on ? 'On' : 'Off';

  // Token-derived warm / cool endpoints for the color-temp hint (ramps, not hex).
  const warmTint = tokens.ramps.accent[300];
  const coolTint = tokens.ramps.accent[600];

  return (
    <Card variant={on && !offline ? 'elevated' : 'outlined'} style={[{ opacity: offline ? 0.7 : 1 }, style]}>
      <View style={{ flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.sm }}>
        <View
          style={{
            width: 36,
            height: 36,
            borderRadius: tokens.radius.md,
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: colors.surface,
            borderWidth: 1,
            borderColor: on && !offline ? colors.warn : colors.border,
          }}
        >
          <Icon glyph="💡" color={on && !offline ? 'warn' : 'muted'} size="lg" />
        </View>
        <View style={{ flex: 1 }}>
          <Text numberOfLines={1} style={{ color: colors.onSurface, fontSize: tokens.typography.scale.base, fontWeight: '600' }}>
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
