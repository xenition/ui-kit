import * as React from 'react';
import {
  PanResponder,
  Pressable,
  ScrollView,
  Text,
  View,
  type LayoutChangeEvent,
} from 'react-native';
import { Card, EmptyState, Icon, useXenitionTheme } from '../primitives';
import { clamp, withAlpha } from './types';
import type { MixerProps } from './Mixer';

/** Same public contract as {@link Mixer} — a drop-in alternate design. */
export type MixerV2Props = MixerProps;

/**
 * Mixer, redesigned (v2): a **console of vertical channel strips** in a
 * horizontal scroller. Each strip stacks the channel name, an output meter and
 * a floor-to-top **vertical fader**, then mute / solo pills below. The fader is
 * an `adjustable` track dragged along its height; mute / solo surface in the
 * control's a11y `selected` state and caption, never by color alone. Renders an
 * `EmptyState` when there are no channels. Composes `Card`; token-only tints.
 * Distinct at a glance from v1's stacked horizontal rows. Same props.
 */
export function MixerV2({
  channels,
  variant = 'full',
  title,
  emptyLabel = 'No channels',
  onVolumeChange,
  onToggleMute,
  onToggleSolo,
  style,
}: MixerV2Props): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();

  if (channels.length === 0) {
    return (
      <EmptyState
        icon={<Icon glyph="🎚️" size="3xl" color="muted" accessibilityLabel="Mixer" />}
        title={emptyLabel}
        style={style}
      />
    );
  }

  return (
    <Card style={[{ gap: tokens.spacing.md }, style]}>
      {title ? (
        <Text
          accessibilityRole="header"
          style={{ color: colors.onSurface, fontSize: tokens.typography.scale.lg, fontWeight: '800' }}
        >
          {title}
        </Text>
      ) : null}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ gap: tokens.spacing.sm }}
      >
        {channels.map((ch) => (
          <View
            key={ch.id}
            style={{
              width: 76,
              alignItems: 'center',
              gap: tokens.spacing.xs,
              paddingVertical: tokens.spacing.sm,
              paddingHorizontal: tokens.spacing.xs,
              borderRadius: tokens.radius.md,
              borderWidth: 1,
              borderColor: colors.border,
              backgroundColor: withAlpha(colors.onSurface, 0.03),
            }}
          >
            <Text
              numberOfLines={1}
              style={{ color: colors.onSurface, fontSize: tokens.typography.scale.xs, fontWeight: '700' }}
            >
              {ch.name}
            </Text>
            <View style={{ flexDirection: 'row', gap: 6, alignItems: 'stretch', height: 132 }}>
              {variant === 'full' ? <VerticalMeter level={ch.level} muted={ch.muted} /> : null}
              <VerticalFader
                name={ch.name}
                value={ch.volume}
                muted={ch.muted}
                onValueChange={(v) => onVolumeChange?.(ch, v)}
              />
            </View>
            <Text style={{ color: colors.muted, fontSize: tokens.typography.scale.xs, fontWeight: '600' }}>
              {Math.round(clamp(ch.volume, 0, 100))}
            </Text>
            <View style={{ flexDirection: 'row', gap: 4 }}>
              <StripPill
                label="M"
                a11y={`${ch.muted ? 'Unmute' : 'Mute'} ${ch.name}`}
                active={ch.muted === true}
                tone={colors.warn}
                onPress={() => onToggleMute?.(ch)}
              />
              {variant === 'full' ? (
                <StripPill
                  label="S"
                  a11y={`${ch.soloed ? 'Unsolo' : 'Solo'} ${ch.name}`}
                  active={ch.soloed === true}
                  tone={colors.primary}
                  onPress={() => onToggleSolo?.(ch)}
                />
              ) : null}
            </View>
          </View>
        ))}
      </ScrollView>
    </Card>
  );
}

/** A floor-to-top fader track dragged along its height; reports [0,100]. */
function VerticalFader({
  name,
  value,
  muted,
  onValueChange,
}: {
  name: string;
  value: number;
  muted?: boolean;
  onValueChange?: (value: number) => void;
}): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();
  const heightRef = React.useRef(0);
  const safe = clamp(value, 0, 100);

  const updateRef = React.useRef<(y: number) => void>(() => undefined);
  updateRef.current = (y: number): void => {
    const h = heightRef.current;
    if (h <= 0) return;
    // Top of the track = max, bottom = min.
    const ratio = Math.max(0, Math.min(1, 1 - y / h));
    onValueChange?.(Math.round(ratio * 100));
  };

  const responder = React.useMemo(
    () =>
      PanResponder.create({
        onStartShouldSetPanResponder: () => true,
        onMoveShouldSetPanResponder: () => true,
        onPanResponderGrant: (e) => updateRef.current(e.nativeEvent.locationY),
        onPanResponderMove: (e) => updateRef.current(e.nativeEvent.locationY),
      }),
    []
  );

  return (
    <View
      {...responder.panHandlers}
      accessibilityRole="adjustable"
      accessibilityLabel={`${name} fader${muted ? ', muted' : ''}`}
      accessibilityValue={{ min: 0, max: 100, now: Math.round(safe) }}
      onLayout={(e: LayoutChangeEvent) => {
        heightRef.current = e.nativeEvent.layout.height;
      }}
      style={{
        width: 14,
        justifyContent: 'flex-end',
        borderRadius: tokens.radius.full,
        backgroundColor: colors.border,
        overflow: 'hidden',
        opacity: muted ? 0.5 : 1,
      }}
    >
      <View
        style={{
          height: `${safe}%`,
          width: '100%',
          borderRadius: tokens.radius.full,
          backgroundColor: colors.primary,
        }}
      />
    </View>
  );
}

/** A slim bottom-anchored output meter; tone steps by level, muted → empty. */
function VerticalMeter({ level, muted }: { level?: number; muted?: boolean }): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();
  const pct = muted ? 0 : clamp((level ?? 0) * 100, 0, 100);
  const tone = pct > 85 ? colors.danger : pct > 60 ? colors.warn : colors.success;
  return (
    <View
      accessibilityRole="image"
      accessibilityLabel={`Output level ${Math.round(pct)} percent`}
      style={{
        width: 6,
        justifyContent: 'flex-end',
        borderRadius: tokens.radius.full,
        backgroundColor: colors.border,
        overflow: 'hidden',
      }}
    >
      <View style={{ height: `${pct}%`, width: '100%', backgroundColor: tone }} />
    </View>
  );
}

function StripPill({
  label,
  a11y,
  active,
  tone,
  onPress,
}: {
  label: string;
  a11y: string;
  active: boolean;
  tone: string;
  onPress: () => void;
}): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();
  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={a11y}
      accessibilityState={{ selected: active }}
      onPress={onPress}
      style={({ pressed }) => ({
        width: 26,
        paddingVertical: 3,
        alignItems: 'center',
        borderRadius: tokens.radius.sm,
        borderWidth: 1,
        borderColor: active ? tone : colors.border,
        backgroundColor: active ? withAlpha(tone, 0.2) : 'transparent',
        opacity: pressed ? 0.8 : 1,
      })}
    >
      <Text style={{ color: active ? tone : colors.muted, fontSize: tokens.typography.scale.xs, fontWeight: '800' }}>
        {label}
      </Text>
    </Pressable>
  );
}
