import * as React from 'react';
import { Pressable, Text, View } from 'react-native';
import { Card, EmptyState, Icon, useXenitionTheme } from '../primitives';
import { VolumeFaderV4 } from './VolumeFaderV4';
import { clamp, padAccentKey, withAlpha } from './types';
import type { MixerProps } from './Mixer';

/** Drop-in for {@link MixerProps} — same props, the V4 "session" design. */
export type MixerV4Props = MixerProps;

/**
 * Mixer — **V4** "session" design. The tactile DAW take on a channel mixer: each
 * `MixerChannel` becomes a rounded control surface (`colors.surface` +
 * `colors.border`) housing a `VolumeFaderV4`, a mute toggle, and (in `full`) a
 * solo toggle plus a token-well level meter. Every strip keeps its **channel
 * accent** — cycled through the module's semantic slots via `padAccentKey` and
 * resolved through `colors[accentKey]` (never a literal). Armed / mute / solo
 * states light with a soft-token fill *and* a glyph/label marker (never color
 * alone), surfaced in the a11y `selected` state + label. Honors both `variant`s
 * (`full` / `compact`), identical props/behavior to {@link MixerProps}. Renders
 * an `EmptyState` when there are no channels. Token-only colors via
 * `useXenitionTheme()`.
 */
export function MixerV4({
  channels,
  variant = 'full',
  title,
  emptyLabel = 'No channels',
  onVolumeChange,
  onToggleMute,
  onToggleSolo,
  style,
}: MixerV4Props): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();

  if (channels.length === 0) {
    return (
      <EmptyState
        icon={<Icon glyph="🎚️" size="2xl" color="muted" accessibilityLabel="Mixer" />}
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
          style={{ color: colors.onSurface, fontSize: tokens.typography.scale.base, fontWeight: '700' }}
        >
          {title}
        </Text>
      ) : null}
      {channels.map((ch, index) => {
        // The channel accent — cycled through the module's semantic slots, then
        // resolved through the theme so it always traces to a token color.
        const accentKey = padAccentKey(index);
        const accent = colors[accentKey];
        const armed = ch.armed === true;
        return (
          <View
            key={ch.id}
            style={{
              gap: tokens.spacing.xs,
              padding: tokens.spacing.sm,
              borderRadius: tokens.radius.md,
              borderWidth: 1,
              borderColor: armed ? accent : colors.border,
              backgroundColor: colors.surface,
            }}
          >
            <View style={{ flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.xs }}>
              {/* Accent dot marks the channel's color (a marker, never color alone). */}
              <View style={{ width: 8, height: 8, borderRadius: tokens.radius.full, backgroundColor: accent }} />
              {armed ? (
                <View style={{ flexDirection: 'row', alignItems: 'center', gap: 4 }}>
                  <Icon glyph="●" size="xs" color="danger" accessibilityLabel="Record armed" />
                  <Text style={{ color: accent, fontSize: tokens.typography.scale.xs, fontWeight: '700' }}>ARM</Text>
                </View>
              ) : null}
            </View>
            <VolumeFaderV4
              label={ch.name}
              value={ch.volume}
              muted={ch.muted}
              onValueChange={(v) => onVolumeChange?.(ch, v)}
            />
            {variant === 'full' ? <Meter level={ch.level} muted={ch.muted} accent={accent} /> : null}
            <View style={{ flexDirection: 'row', gap: tokens.spacing.xs }}>
              <StripToggle
                label="M"
                glyph="🔇"
                a11y={`${ch.muted ? 'Unmute' : 'Mute'} ${ch.name}`}
                active={ch.muted === true}
                tone={colors.warn}
                onPress={() => onToggleMute?.(ch)}
              />
              {variant === 'full' ? (
                <StripToggle
                  label="S"
                  glyph="◎"
                  a11y={`${ch.soloed ? 'Unsolo' : 'Solo'} ${ch.name}`}
                  active={ch.soloed === true}
                  tone={accent}
                  onPress={() => onToggleSolo?.(ch)}
                />
              ) : null}
            </View>
          </View>
        );
      })}
    </Card>
  );
}

function Meter({
  level,
  muted,
  accent,
}: {
  level?: number;
  muted?: boolean;
  accent: string;
}): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();
  const pct = muted ? 0 : clamp((level ?? 0) * 100, 0, 100);
  // The channel accent tints the meter fill; overloads still warn/danger.
  const tone = pct > 85 ? colors.danger : pct > 60 ? colors.warn : accent;
  return (
    <View
      accessibilityRole="image"
      accessibilityLabel={`Output level ${Math.round(pct)} percent`}
      style={{
        height: 4,
        borderRadius: tokens.radius.full,
        backgroundColor: withAlpha(colors.primary, 0.15),
        overflow: 'hidden',
      }}
    >
      <View style={{ width: `${pct}%`, height: '100%', backgroundColor: tone }} />
    </View>
  );
}

function StripToggle({
  label,
  glyph,
  a11y,
  active,
  tone,
  onPress,
}: {
  label: string;
  glyph: string;
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
        minWidth: 44,
        minHeight: 44,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 4,
        paddingVertical: 4,
        paddingHorizontal: tokens.spacing.sm,
        borderRadius: tokens.radius.sm,
        borderWidth: 1,
        borderColor: active ? tone : colors.border,
        backgroundColor: active ? withAlpha(tone, 0.18) : 'transparent',
        opacity: pressed ? 0.8 : 1,
      })}
    >
      {/* Glyph marker so the active state never reads by color alone. */}
      {active ? <Text style={{ fontSize: tokens.typography.scale.xs }}>{glyph}</Text> : null}
      <Text style={{ color: active ? tone : colors.muted, fontSize: tokens.typography.scale.xs, fontWeight: '700' }}>
        {label}
      </Text>
    </Pressable>
  );
}
