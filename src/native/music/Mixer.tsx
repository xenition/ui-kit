import * as React from 'react';
import { Pressable, Text, View, type StyleProp, type ViewStyle } from 'react-native';
import { Card, EmptyState, Icon, useXenitionTheme } from '../primitives';
import { VolumeFader } from './VolumeFader';
import { clamp, withAlpha, type MixerChannel } from './types';

export type MixerVariant = 'full' | 'compact';

export interface MixerProps {
  /** The channel strips to render. */
  channels: MixerChannel[];
  /**
   * - `full` — fader + mute/solo + meter per strip (default).
   * - `compact` — fader + mute only.
   */
  variant?: MixerVariant;
  /** Optional mixer title. */
  title?: string;
  /** Message shown when there are no channels. */
  emptyLabel?: string;
  /** Fires as a strip's fader is dragged. */
  onVolumeChange?: (channel: MixerChannel, value: number) => void;
  /** Fires when a strip's mute is toggled. */
  onToggleMute?: (channel: MixerChannel) => void;
  /** Fires when a strip's solo is toggled. */
  onToggleSolo?: (channel: MixerChannel) => void;
  style?: StyleProp<ViewStyle>;
}

/**
 * A channel mixer — a UI shell only, no audio routing. Each `MixerChannel`
 * becomes a strip with a `VolumeFader`, a mute toggle, and (in `full`) a solo
 * toggle plus a level meter. Mute / solo are surfaced in the control's a11y
 * `selected` state and its label, never by color alone. Renders an `EmptyState`
 * when there are no channels. Composes `Card`, `VolumeFader`; token-only.
 */
export function Mixer({
  channels,
  variant = 'full',
  title,
  emptyLabel = 'No channels',
  onVolumeChange,
  onToggleMute,
  onToggleSolo,
  style,
}: MixerProps): React.ReactElement {
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
      {channels.map((ch) => (
        <View key={ch.id} style={{ gap: tokens.spacing.xs }}>
          <VolumeFader
            label={ch.name}
            value={ch.volume}
            muted={ch.muted}
            onValueChange={(v) => onVolumeChange?.(ch, v)}
          />
          {variant === 'full' ? <Meter level={ch.level} muted={ch.muted} /> : null}
          <View style={{ flexDirection: 'row', gap: tokens.spacing.xs }}>
            <StripToggle
              label="M"
              a11y={`${ch.muted ? 'Unmute' : 'Mute'} ${ch.name}`}
              active={ch.muted === true}
              tone={colors.warn}
              onPress={() => onToggleMute?.(ch)}
            />
            {variant === 'full' ? (
              <StripToggle
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
    </Card>
  );
}

function Meter({ level, muted }: { level?: number; muted?: boolean }): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();
  const pct = muted ? 0 : clamp((level ?? 0) * 100, 0, 100);
  const tone = pct > 85 ? colors.danger : pct > 60 ? colors.warn : colors.success;
  return (
    <View
      accessibilityRole="image"
      accessibilityLabel={`Output level ${Math.round(pct)} percent`}
      style={{
        height: 4,
        borderRadius: tokens.radius.full,
        backgroundColor: colors.border,
        overflow: 'hidden',
      }}
    >
      <View style={{ width: `${pct}%`, height: '100%', backgroundColor: tone }} />
    </View>
  );
}

function StripToggle({
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
        minWidth: 32,
        paddingVertical: 4,
        paddingHorizontal: tokens.spacing.sm,
        alignItems: 'center',
        borderRadius: tokens.radius.sm,
        borderWidth: 1,
        borderColor: active ? tone : colors.border,
        backgroundColor: active ? withAlpha(tone, 0.18) : 'transparent',
        opacity: pressed ? 0.8 : 1,
      })}
    >
      <Text style={{ color: active ? tone : colors.muted, fontSize: tokens.typography.scale.xs, fontWeight: '700' }}>
        {label}
      </Text>
    </Pressable>
  );
}
