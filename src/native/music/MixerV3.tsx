import * as React from 'react';
import { Pressable, Text, View } from 'react-native';
import { EmptyState, Icon, Slider, useXenitionTheme } from '../primitives';
import { clamp, withAlpha } from './types';
import type { MixerProps } from './Mixer';

/** Same public contract as {@link Mixer} — a drop-in alternate design. */
export type MixerV3Props = MixerProps;

/**
 * Mixer, redesigned (v3): a **compact list of horizontal fader rows** — one
 * tight line per channel with the name, an inline `Slider`, a live read-out and
 * a mute pill (plus solo in `full`). No card chrome, hairline dividers only.
 * Mute / solo surface in each control's a11y `selected` state and label, never
 * by color alone. Renders an `EmptyState` when there are no channels. Built for
 * dense side panels. Token-only tints. Distinct at a glance from v1. Same props.
 */
export function MixerV3({
  channels,
  variant = 'full',
  title,
  emptyLabel = 'No channels',
  onVolumeChange,
  onToggleMute,
  onToggleSolo,
  style,
}: MixerV3Props): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();

  if (channels.length === 0) {
    return (
      <EmptyState
        icon={<Icon glyph="🎚️" size="lg" color="muted" accessibilityLabel="Mixer" />}
        title={emptyLabel}
        style={style}
      />
    );
  }

  return (
    <View style={[{ gap: 0 }, style]}>
      {title ? (
        <Text
          accessibilityRole="header"
          style={{
            color: colors.muted,
            fontSize: tokens.typography.scale.xs,
            fontWeight: '700',
            letterSpacing: 0.5,
            marginBottom: tokens.spacing.xs,
          }}
        >
          {title}
        </Text>
      ) : null}
      {channels.map((ch, i) => (
        <View
          key={ch.id}
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            gap: tokens.spacing.sm,
            paddingVertical: tokens.spacing.xs,
            borderTopWidth: i === 0 ? 0 : 1,
            borderTopColor: colors.border,
            opacity: ch.muted ? 0.6 : 1,
          }}
        >
          <Text
            numberOfLines={1}
            style={{ width: 64, color: colors.onSurface, fontSize: tokens.typography.scale.sm, fontWeight: '600' }}
          >
            {ch.muted ? `${ch.name} (m)` : ch.name}
          </Text>
          <View style={{ flex: 1 }}>
            <Slider value={clamp(ch.volume, 0, 100)} min={0} max={100} onValueChange={(v) => onVolumeChange?.(ch, v)} />
          </View>
          <Text
            style={{ width: 28, textAlign: 'right', color: colors.muted, fontSize: tokens.typography.scale.xs, fontWeight: '600' }}
          >
            {Math.round(clamp(ch.volume, 0, 100))}
          </Text>
          <RowPill
            label="M"
            a11y={`${ch.muted ? 'Unmute' : 'Mute'} ${ch.name}`}
            active={ch.muted === true}
            tone={colors.warn}
            onPress={() => onToggleMute?.(ch)}
          />
          {variant === 'full' ? (
            <RowPill
              label="S"
              a11y={`${ch.soloed ? 'Unsolo' : 'Solo'} ${ch.name}`}
              active={ch.soloed === true}
              tone={colors.primary}
              onPress={() => onToggleSolo?.(ch)}
            />
          ) : null}
        </View>
      ))}
    </View>
  );
}

function RowPill({
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
        width: 24,
        height: 24,
        alignItems: 'center',
        justifyContent: 'center',
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
