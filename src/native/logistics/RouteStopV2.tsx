import * as React from 'react';
import { Animated, Pressable, Text, View, type StyleProp, type ViewStyle } from 'react-native';
import { useXenitionTheme } from '../theme';
import { withAlpha } from '../primitives/internal/color';
import { shadow } from '../primitives/internal/elevation';
import { usePressScale, useEnter } from '../primitives/internal/motion';
import { STOP_META, toneColor } from './internal';
import type { RouteStopProps } from './RouteStop';

/** Drop-in for {@link RouteStop}: identical props, a distinct design. */
export type RouteStopV2Props = RouteStopProps;

/**
 * RouteStop, alternate design **V2** — a *numbered node card*. Where the classic
 * is a bare rail row, V2 is a shadowed card: a big tone-filled numbered node
 * hangs on the left edge, the address is the headline, the delivery window sits
 * in its own pill, and a status glyph + word chip plus a package count anchor
 * the footer. `connected` still draws a rail down to the next card. Completed
 * fills the node and marks it `✓`; status is always glyph + word (tone
 * reinforces only). Springs on press; fades in. Same props. No literal colors.
 */
export function RouteStopV2({
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
}: RouteStopV2Props): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();
  const meta = STOP_META[status] ?? STOP_META.pending;
  const accent = toneColor(colors, meta.tone);
  const done = status === 'completed';
  const enter = useEnter({ translateY: 6 });
  const press = usePressScale();

  const cardStyle: StyleProp<ViewStyle> = [
    {
      flex: 1,
      borderRadius: tokens.radius.lg,
      backgroundColor: colors.surface,
      padding: tokens.spacing.md,
      gap: tokens.spacing.sm,
      ...shadow('sm', tokens),
    },
  ];

  const node = (
    <View style={{ alignItems: 'center' }}>
      <View
        style={{
          width: 36,
          height: 36,
          borderRadius: tokens.radius.full,
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: done ? accent : withAlpha(accent, 0.14),
          borderWidth: done ? 0 : 2,
          borderColor: accent,
        }}
      >
        <Text allowFontScaling={false} style={{ fontSize: tokens.typography.scale.sm, fontWeight: '700', color: done ? colors.surface : accent }}>
          {done ? '✓' : sequence}
        </Text>
      </View>
      {connected ? (
        <View style={{ width: 2, flex: 1, marginTop: tokens.spacing.xs, minHeight: tokens.spacing.md, backgroundColor: colors.border }} />
      ) : null}
    </View>
  );

  const card = (
    <View style={cardStyle}>
      <View style={{ flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'space-between', gap: tokens.spacing.sm }}>
        <Text numberOfLines={2} style={{ flex: 1, fontSize: tokens.typography.scale.base, fontWeight: '700', color: colors.onSurface }}>
          {address}
        </Text>
        {eta ? (
          <View
            style={{
              paddingHorizontal: tokens.spacing.sm,
              paddingVertical: tokens.spacing.xs,
              borderRadius: tokens.radius.full,
              backgroundColor: tokens.ramps.neutral[100],
            }}
          >
            <Text style={{ fontSize: tokens.typography.scale.xs, fontWeight: '600', color: colors.onSurface }}>{eta}</Text>
          </View>
        ) : null}
      </View>

      {recipient ? (
        <Text numberOfLines={1} style={{ fontSize: tokens.typography.scale.xs, color: colors.muted }}>
          {recipient}
        </Text>
      ) : null}

      <View style={{ flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.sm }}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            gap: tokens.spacing.xs,
            paddingHorizontal: tokens.spacing.sm,
            paddingVertical: tokens.spacing.xs,
            borderRadius: tokens.radius.full,
            backgroundColor: withAlpha(accent, 0.16),
          }}
        >
          <Text allowFontScaling={false} style={{ fontSize: tokens.typography.scale.xs, color: accent }}>
            {meta.glyph}
          </Text>
          <Text style={{ fontSize: tokens.typography.scale.xs, fontWeight: '700', color: accent }}>{meta.label}</Text>
        </View>
        {packages != null ? (
          <Text style={{ fontSize: tokens.typography.scale.xs, color: colors.muted }}>
            {`${packages} ${packages === 1 ? 'pkg' : 'pkgs'}`}
          </Text>
        ) : null}
      </View>
    </View>
  );

  const body = (
    <View style={{ flexDirection: 'row', gap: tokens.spacing.md }}>
      {node}
      {card}
    </View>
  );

  if (onPress) {
    return (
      <Animated.View style={[enter, { transform: [...enter.transform, { scale: press.scale }] }]}>
        <Pressable
          accessibilityRole="button"
          accessibilityLabel={`Stop ${sequence}, ${address}, ${meta.label}`}
          onPress={onPress}
          onPressIn={press.onPressIn}
          onPressOut={press.onPressOut}
          testID={testID}
          style={style}
        >
          {body}
        </Pressable>
      </Animated.View>
    );
  }

  return (
    <Animated.View
      accessibilityLabel={`Stop ${sequence}, ${address}, ${meta.label}`}
      testID={testID}
      style={[enter, style]}
    >
      {body}
    </Animated.View>
  );
}
