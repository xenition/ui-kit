import * as React from 'react';
import { Pressable, Text, View } from 'react-native';
import { useXenitionTheme, type SemanticColors } from '../theme';
import { Card, Icon, Badge } from '../primitives';
import type { ThermostatDialProps, ThermostatMode } from './ThermostatDial';

/** Alternate design (V3) — identical prop contract to {@link ThermostatDialProps}. */
export type ThermostatDialV3Props = ThermostatDialProps;

const MODE_ACCENT: Record<ThermostatMode, keyof SemanticColors> = {
  heat: 'danger',
  cool: 'primary',
  auto: 'accent',
  off: 'muted',
};

const MODE_TONE: Record<ThermostatMode, 'danger' | 'primary' | 'accent' | 'neutral'> = {
  heat: 'danger',
  cool: 'primary',
  auto: 'accent',
  off: 'neutral',
};

const MODE_LABEL: Record<ThermostatMode, string> = {
  heat: 'Heating',
  cool: 'Cooling',
  auto: 'Auto',
  off: 'Off',
};

/**
 * ThermostatDial — alternate design **V3**: a minimal +/- stepper card, no SVG.
 * A big center setpoint (with optional ambient sub-line) is flanked by large
 * `−`/`+` `Pressable`s, and the mode is announced by a text {@link Badge} so it
 * never rests on color alone. Drop-in replacement for `ThermostatDial` — same
 * props — for tight layouts where a full dial is too heavy. `span`/clamping
 * guard the setpoint math and `offline` dims + disables the steppers.
 */
export function ThermostatDialV3({
  target,
  ambient,
  min = 10,
  max = 30,
  step = 0.5,
  mode = 'heat',
  unit = '°',
  onTargetChange,
  offline = false,
  style,
}: ThermostatDialV3Props): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();
  const accent = offline ? 'muted' : MODE_ACCENT[mode];
  const clampedTarget = Math.min(Math.max(target, min), max);

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
        width: 48,
        height: 48,
        borderRadius: tokens.radius.full,
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 1,
        borderColor: colors.border,
        backgroundColor: colors.surface,
        opacity: offline ? 0.5 : pressed ? 0.8 : 1,
      })}
    >
      <Icon glyph={glyph} color="onSurface" size="xl" />
    </Pressable>
  );

  return (
    <Card
      variant="outlined"
      accessibilityRole="adjustable"
      accessibilityLabel={`Thermostat, ${MODE_LABEL[mode]}`}
      style={[{ opacity: offline ? 0.6 : 1 }, style]}
    >
      <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
        {stepBtn(-1, '−', 'Lower target temperature')}

        <View style={{ alignItems: 'center', flex: 1 }}>
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
            <Text style={{ color: colors.muted, fontSize: tokens.typography.scale.xs, marginBottom: 4 }}>
              {`Now ${ambient}${unit}`}
            </Text>
          ) : null}
          <Badge tone={offline ? 'neutral' : MODE_TONE[mode]} variant="soft" size="sm">
            {offline ? 'Offline' : MODE_LABEL[mode]}
          </Badge>
        </View>

        {stepBtn(1, '+', 'Raise target temperature')}
      </View>
      {/* Keep the accent slot referenced so mode tint stays token-bound. */}
      <View style={{ height: 2, marginTop: tokens.spacing.sm, borderRadius: tokens.radius.full, backgroundColor: colors[accent] }} />
    </Card>
  );
}
