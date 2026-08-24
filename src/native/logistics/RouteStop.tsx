import * as React from 'react';
import { Pressable, Text, View, type StyleProp, type ViewStyle } from 'react-native';
import { useXenitionTheme } from '../theme';
import { STOP_META, toneColor, type StopStatus } from './internal';

export interface RouteStopProps {
  /** 1-based stop sequence number shown in the marker. */
  sequence: number;
  /** Address / place name (headline). */
  address: string;
  /** Recipient / customer or note sub-line. */
  recipient?: string;
  /** Stop status — glyph + word, never color alone. */
  status: StopStatus;
  /** Human ETA / window (e.g. `9:00–9:30 AM`). */
  eta?: string;
  /** Number of packages to drop at this stop. */
  packages?: number;
  /** Draws the connector line down to the next stop (false for the last). */
  connected?: boolean;
  /** Makes the stop tappable. */
  onPress?: () => void;
  testID?: string;
  style?: StyleProp<ViewStyle>;
}

/**
 * One stop on a delivery route: a numbered sequence marker joined by a
 * connector rail, the address + recipient, an ETA/window and a package count.
 * The stop status is carried by a glyph + word chip (tone as reinforcement),
 * and the marker fills with the status tone once the stop is completed. All
 * colors are theme tokens.
 */
export function RouteStop({
  sequence,
  address,
  recipient,
  status,
  eta,
  packages,
  connected = true,
  onPress,
  testID,
  style,
}: RouteStopProps): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();
  const meta = STOP_META[status] ?? STOP_META.pending;
  const accent = toneColor(colors, meta.tone);
  const done = status === 'completed';

  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={`Stop ${sequence}, ${address}, ${meta.label}`}
      disabled={!onPress}
      onPress={onPress}
      testID={testID}
      style={[{ flexDirection: 'row', gap: tokens.spacing.md }, style]}
    >
      <View style={{ alignItems: 'center' }}>
        <View
          style={{
            width: 28,
            height: 28,
            borderRadius: tokens.radius.full,
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: done ? accent : 'transparent',
            borderWidth: done ? 0 : 2,
            borderColor: accent,
          }}
        >
          <Text allowFontScaling={false} style={{ fontSize: tokens.typography.scale.xs, fontWeight: '700', color: done ? colors.surface : accent }}>
            {done ? '✓' : sequence}
          </Text>
        </View>
        {connected ? (
          <View style={{ width: 2, flex: 1, marginTop: 2, minHeight: tokens.spacing.md, backgroundColor: colors.border }} />
        ) : null}
      </View>

      <View style={{ flex: 1, minWidth: 0, paddingBottom: connected ? tokens.spacing.md : 0, gap: 1 }}>
        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', gap: tokens.spacing.sm }}>
          <Text numberOfLines={1} style={{ flex: 1, fontSize: tokens.typography.scale.sm, fontWeight: '600', color: colors.onSurface }}>
            {address}
          </Text>
          {eta ? (
            <Text style={{ fontSize: tokens.typography.scale.xs, color: colors.muted }}>{eta}</Text>
          ) : null}
        </View>
        {recipient ? (
          <Text numberOfLines={1} style={{ fontSize: tokens.typography.scale.xs, color: colors.muted }}>
            {recipient}
          </Text>
        ) : null}
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.xs }}>
          <Text allowFontScaling={false} style={{ fontSize: tokens.typography.scale.xs, color: accent }}>
            {meta.glyph}
          </Text>
          <Text style={{ fontSize: tokens.typography.scale.xs, fontWeight: '600', color: accent }}>{meta.label}</Text>
          {packages != null ? (
            <Text style={{ fontSize: tokens.typography.scale.xs, color: colors.muted }}>
              {`· ${packages} pkg`}
            </Text>
          ) : null}
        </View>
      </View>
    </Pressable>
  );
}
