import * as React from 'react';
import { Pressable, Text, View, type StyleProp, type ViewStyle } from 'react-native';
import { useXenitionTheme } from '../theme';
import { withAlpha } from '../primitives/internal/color';
import { STOP_META, toneColor } from './internal';
import type { RouteStopProps } from './RouteStop';

/** Drop-in for {@link RouteStop}: identical props, a distinct design. */
export type RouteStopV3Props = RouteStopProps;

/**
 * RouteStop, alternate design **V3** — a *dense single line*. A small
 * tone-outlined sequence chip, the address (with a muted recipient/pkg meta
 * segment beneath), then the status glyph + word and the window right-aligned —
 * one compact row with a bottom divider, tuned for a long manifest list. No
 * rail, no card: the inverse of V2's node card. Completed marks the chip `✓`;
 * status stays glyph + word (tone reinforces). Same props. No literal colors.
 */
export function RouteStopV3({
  sequence,
  address,
  recipient,
  status,
  eta,
  packages,
  connected: _connected = true,
  onPress,
  testID,
  style,
}: RouteStopV3Props): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();
  const meta = STOP_META[status] ?? STOP_META.pending;
  const accent = toneColor(colors, meta.tone);
  const done = status === 'completed';

  const metaLine = [recipient, packages != null ? `${packages} pkg` : null].filter(Boolean).join('  ·  ');

  const containerStyle: StyleProp<ViewStyle> = [
    {
      flexDirection: 'row',
      alignItems: 'center',
      gap: tokens.spacing.sm,
      paddingVertical: tokens.spacing.sm,
      paddingHorizontal: tokens.spacing.xs,
      borderBottomWidth: 1,
      borderColor: colors.border,
      backgroundColor: 'transparent',
    },
    style,
  ];

  const inner = (
    <>
      <View
        style={{
          width: 24,
          height: 24,
          borderRadius: tokens.radius.full,
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: done ? accent : 'transparent',
          borderWidth: done ? 0 : 1,
          borderColor: accent,
        }}
      >
        <Text allowFontScaling={false} style={{ fontSize: tokens.typography.scale.xs, fontWeight: '700', color: done ? colors.surface : accent }}>
          {done ? '✓' : sequence}
        </Text>
      </View>

      <View style={{ flex: 1, minWidth: 0, gap: 1 }}>
        <Text numberOfLines={1} style={{ fontSize: tokens.typography.scale.sm, fontWeight: '600', color: colors.onSurface }}>
          {address}
        </Text>
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.xs }}>
          <Text allowFontScaling={false} style={{ fontSize: tokens.typography.scale.xs, color: accent }}>
            {meta.glyph}
          </Text>
          <Text style={{ fontSize: tokens.typography.scale.xs, fontWeight: '600', color: accent }}>{meta.label}</Text>
          {metaLine ? (
            <Text numberOfLines={1} style={{ flex: 1, fontSize: tokens.typography.scale.xs, color: colors.muted }}>
              {`· ${metaLine}`}
            </Text>
          ) : null}
        </View>
      </View>

      {eta ? (
        <Text style={{ fontSize: tokens.typography.scale.xs, color: colors.muted }}>{eta}</Text>
      ) : null}
    </>
  );

  if (onPress) {
    return (
      <Pressable
        accessibilityRole="button"
        accessibilityLabel={`Stop ${sequence}, ${address}, ${meta.label}`}
        onPress={onPress}
        testID={testID}
        style={({ pressed }) => [containerStyle, { backgroundColor: pressed ? withAlpha(colors.primary, 0.04) : 'transparent' }]}
      >
        {inner}
      </Pressable>
    );
  }

  return (
    <View testID={testID} style={containerStyle}>
      {inner}
    </View>
  );
}
