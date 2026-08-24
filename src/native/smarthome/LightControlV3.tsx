import * as React from 'react';
import { Text, View } from 'react-native';
import { useXenitionTheme } from '../theme';
import { Icon, Switch, Progress } from '../primitives';
import { withAlpha } from '../primitives/internal/color';
import type { LightControlProps } from './LightControl';

/** Alternate design (V3) — identical prop contract to {@link LightControlProps}. */
export type LightControlV3Props = LightControlProps;

/**
 * LightControl — alternate design **V3**: a compact single row with an inline
 * brightness bar. The bulb glyph + name lead, a thin {@link Progress} bar plus a
 * percentage read the current brightness in the row itself, and the power
 * {@link Switch} trails. A text `On`/`Off`/`Offline` status carries state (never
 * color-alone). Drop-in replacement for `LightControl` — same props — for dense
 * light lists; the color-temp control is intentionally dropped for compactness.
 * Brightness is clamped to `[0,100]` and the bar hides when the light is dark.
 */
export function LightControlV3({
  name,
  on = false,
  brightness = 0,
  offline = false,
  onToggle,
  style,
}: LightControlV3Props): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();
  const lit = on && !offline;
  const shownBrightness = Math.round(Math.min(Math.max(brightness, 0), 100));
  const statusLabel = offline ? 'Offline' : on ? 'On' : 'Off';

  return (
    <View
      style={[
        {
          flexDirection: 'row',
          alignItems: 'center',
          gap: tokens.spacing.sm,
          paddingVertical: tokens.spacing.sm,
          paddingHorizontal: tokens.spacing.sm,
          borderRadius: tokens.radius.md,
          backgroundColor: colors.surface,
          borderWidth: 1,
          borderColor: colors.border,
          opacity: offline ? 0.7 : 1,
        },
        style,
      ]}
    >
      <View
        style={{
          width: 30,
          height: 30,
          borderRadius: tokens.radius.sm,
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: lit ? withAlpha(colors.warn, 0.14) : colors.surface,
        }}
      >
        <Icon glyph="💡" color={lit ? 'warn' : 'muted'} size="base" />
      </View>

      <View style={{ flex: 1, gap: 4 }}>
        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
          <Text numberOfLines={1} style={{ flex: 1, color: colors.onSurface, fontSize: tokens.typography.scale.sm, fontWeight: '600' }}>
            {name}
          </Text>
          <Text style={{ color: colors.muted, fontSize: tokens.typography.scale.xs, fontWeight: '600' }}>
            {lit ? `${shownBrightness}%` : statusLabel}
          </Text>
        </View>
        {lit ? (
          <Progress value={shownBrightness} max={100} tone="warn" size="sm" />
        ) : null}
      </View>

      <Switch checked={on} disabled={offline} onCheckedChange={onToggle} accessibilityLabel={`${name} power`} />
    </View>
  );
}
