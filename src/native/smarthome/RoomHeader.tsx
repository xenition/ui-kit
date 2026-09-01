import * as React from 'react';
import { Pressable, Text, View, type StyleProp, type ViewStyle } from 'react-native';
import { useXenitionTheme } from '../theme';
import { Icon } from '../primitives';
import { GradientSurface } from './internal/GradientSurface';
import { ambientGradient, ambientInk, ambientInkSoft, ambientTile, ambientBorder } from './internal/ambient';

export interface RoomHeaderProps {
  /** The room's display name — the hero headline (e.g. "Living Room"). */
  roomName: string;
  /** Optional emoji/glyph for the room, shown as a frosted disc (e.g. "🛋️"). */
  glyph?: string;
  /** Optional current temperature, already formatted (e.g. "71°"). */
  temperature?: string;
  /** Optional current humidity, already formatted (e.g. "44%"). */
  humidity?: string;
  /** Optional count of devices currently on in the room. */
  devicesOn?: number;
  /** Optional total device count in the room (paired with `devicesOn`). */
  deviceCount?: number;
  /** When set, the all-off control shows; fires when the user turns everything off. */
  onAllOff?: () => void;
  /** When set, the all-on control shows; fires when the user turns everything on. */
  onAllOn?: () => void;
  /**
   * Optional lights state, driving which combined control is emphasised:
   * `true` → offer "All off", `false` → offer "All on". When omitted, both
   * provided controls render.
   */
  lightsOn?: boolean;
  style?: StyleProp<ViewStyle>;
}

/**
 * RoomHeader — a room **hero** for the smart-home module. A brand-gradient
 * ground carries an optional frosted glyph disc, a big near-white room name,
 * climate + devices-on frosted tiles, and an all-off / all-on control. When
 * `lightsOn` is set it picks the more useful single control (on → "All off",
 * off → "All on"); otherwise both provided controls render. Every color derives
 * from the compiled brand ramp via `ambient*` + `GradientSurface` — the light
 * ramp steps act as near-white "ink" on the saturated ground — token-only, no
 * literals, light + dark. Presentational: shaped data + callbacks, nothing
 * fetches.
 */
export function RoomHeader({
  roomName,
  glyph,
  temperature,
  humidity,
  devicesOn,
  deviceCount,
  onAllOff,
  onAllOn,
  lightsOn,
  style,
}: RoomHeaderProps): React.ReactElement {
  const { tokens } = useXenitionTheme();
  const r = tokens.ramps;
  const ink = ambientInk(r);
  const inkSoft = ambientInkSoft(r);
  const tile = ambientTile(r);
  const border = ambientBorder(r);

  const tiles: { label: string; value: string }[] = [];
  if (temperature != null) tiles.push({ label: 'Temperature', value: temperature });
  if (humidity != null) tiles.push({ label: 'Humidity', value: humidity });
  if (devicesOn != null) {
    tiles.push({
      label: 'Devices on',
      value: deviceCount != null ? `${devicesOn} / ${deviceCount}` : String(devicesOn),
    });
  }

  const showAllOff = onAllOff != null && (lightsOn === undefined || lightsOn === true);
  const showAllOn = onAllOn != null && (lightsOn === undefined || lightsOn === false);

  const Control = ({ label, glyph: g, onPress }: { label: string; glyph: string; onPress: () => void }) => (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={label}
      onPress={onPress}
      style={({ pressed }) => ({
        flex: 1,
        minHeight: 44,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: tokens.spacing.xs,
        paddingHorizontal: tokens.spacing.md,
        paddingVertical: tokens.spacing.sm,
        borderRadius: tokens.radius.md,
        backgroundColor: tile,
        borderWidth: 1,
        borderColor: border,
        opacity: pressed ? 0.85 : 1,
      })}
    >
      <Icon glyph={g} size="sm" style={{ color: ink }} />
      <Text style={{ color: ink, fontSize: tokens.typography.scale.sm, fontWeight: '700' }}>{label}</Text>
    </Pressable>
  );

  return (
    <View style={[{ borderRadius: tokens.radius.lg }, style]}>
      <GradientSurface
        colors={ambientGradient(r)}
        style={{ borderRadius: tokens.radius.lg, padding: tokens.spacing.lg, overflow: 'hidden' }}
      >
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.md }}>
          {glyph ? (
            <View
              style={{
                width: 48,
                height: 48,
                borderRadius: tokens.radius.full,
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: tile,
                borderWidth: 1,
                borderColor: border,
              }}
            >
              <Icon glyph={glyph} size="xl" style={{ color: ink }} />
            </View>
          ) : null}
          <Text numberOfLines={1} style={{ flex: 1, minWidth: 0, color: ink, fontSize: tokens.typography.scale['3xl'], fontWeight: '800', letterSpacing: -0.5 }}>
            {roomName}
          </Text>
        </View>

        {tiles.length > 0 ? (
          <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: tokens.spacing.sm, marginTop: tokens.spacing.lg }}>
            {tiles.map((t) => (
              <View
                key={t.label}
                style={{
                  flexGrow: 1,
                  minWidth: 104,
                  justifyContent: 'center',
                  borderRadius: tokens.radius.md,
                  backgroundColor: tile,
                  borderWidth: 1,
                  borderColor: border,
                  paddingHorizontal: tokens.spacing.md,
                  paddingVertical: tokens.spacing.sm,
                }}
              >
                <Text numberOfLines={1} style={{ color: ink, fontSize: tokens.typography.scale.lg, fontWeight: '700' }}>
                  {t.value}
                </Text>
                <Text numberOfLines={1} style={{ color: inkSoft, fontSize: tokens.typography.scale.xs }}>
                  {t.label}
                </Text>
              </View>
            ))}
          </View>
        ) : null}

        {showAllOff || showAllOn ? (
          <View style={{ flexDirection: 'row', gap: tokens.spacing.sm, marginTop: tokens.spacing.md }}>
            {showAllOff ? <Control label="All off" glyph="⏻" onPress={onAllOff!} /> : null}
            {showAllOn ? <Control label="All on" glyph="💡" onPress={onAllOn!} /> : null}
          </View>
        ) : null}
      </GradientSurface>
    </View>
  );
}
